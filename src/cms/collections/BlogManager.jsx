import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';

// Icons
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import PhotoIcon from '@mui/icons-material/Photo';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import TitleIcon from '@mui/icons-material/Title';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import ReactMarkdown from 'react-markdown';
import { getFilesList, getFileContent, saveFileContent, uploadMedia, deleteFile, getMediaUrl } from '../githubApi';
import { useNotification } from '../NotificationContext';

const BlogManager = ({ onSync }) => {
    const { showNotification } = useNotification();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [previewUrl, setPreviewUrl] = useState({ en: '', sw: '' });
    const [editTab, setEditTab] = useState(0); // 0 = EN, 1 = SW
    const [mode, setMode] = useState('write'); // 'write' or 'preview'
    const [formData, setFormData] = useState({ en: {}, sw: {}, common: {} });
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    
    const textareaRef = useRef(null);
    const LIMITS = { title: 70, excerpt: 160 };

    useEffect(() => { loadArticles(); }, []);

    const loadArticles = async () => {
        setLoading(true);
        if (onSync) onSync(true);
        try {
            const list = await getFilesList('src/content/blog');
            const mdFiles = list.filter(f => f.name.endsWith('.md'));
            
            const allFilesData = await Promise.all(mdFiles.map(async (file) => {
                const content = await getFileContent(file.path);
                const parts = file.name.split('.');
                const lang = parts[parts.length - 2];
                const slug = parts.slice(0, -2).join('.');
                return { ...file, lang, slug, content };
            }));

            const grouped = {};
            allFilesData.forEach(file => {
                if (!grouped[file.slug]) {
                    grouped[file.slug] = { slug: file.slug, en: null, sw: null, image: '', date: '', category: '' };
                }
                grouped[file.slug][file.lang] = file;
                if (file.lang === 'en' || !grouped[file.slug].image) {
                    grouped[file.slug].image = file.content.data.image;
                    grouped[file.slug].date = file.content.data.date;
                    grouped[file.slug].category = file.content.data.category;
                    grouped[file.slug].title = file.content.data.title;
                }
            });

            const sortedArticles = Object.values(grouped).sort((a, b) => new Date(b.date) - new Date(a.date));
            setArticles(sortedArticles);

            if (selectedArticle && !selectedArticle.isNew) {
                const updated = sortedArticles.find(a => a.slug === selectedArticle.slug);
                if (updated) setSelectedArticle(updated);
            }
        } catch (err) { 
            console.error(err);
            showNotification('Failed to load blog posts.', 'error');
        } finally { 
            setLoading(false); 
            if (onSync) onSync(false);
        }
    };

    const handleSelectArticle = (article) => {
        setPreviewUrl({ en: '', sw: '' });
        const enData = article.en?.content || { data: {}, body: '' };
        const swData = article.sw?.content || { data: {}, body: '' };

        setFormData({
            en: { title: enData.data.title || '', excerpt: enData.data.excerpt || '', body: enData.body || '', image: enData.data.image || '' },
            sw: { title: swData.data.title || '', excerpt: swData.data.excerpt || '', body: swData.body || '', image: swData.data.image || '' },
            common: {
                category: enData.data.category || swData.data.category || '',
                date: enData.data.date || swData.data.date || new Date().toISOString(),
                slug: article.slug
            }
        });
        setSelectedArticle(article);
        setEditTab(0);
        setMode('write');
    };

    const handleCreateNew = () => {
        setPreviewUrl({ en: '', sw: '' });
        setSelectedArticle({ isNew: true, slug: '' });
        setFormData({
            en: { title: '', excerpt: '', body: '', image: '' },
            sw: { title: '', excerpt: '', body: '', image: '' },
            common: { category: '', date: new Date().toISOString(), slug: '' }
        });
        setEditTab(0);
        setMode('write');
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const langKey = editTab === 0 ? 'en' : 'sw';
        const localUrl = URL.createObjectURL(file);
        setPreviewUrl(prev => ({ ...prev, [langKey]: localUrl }));

        setLoading(true);
        if (onSync) onSync(true);
        try {
            const uploadedPath = await uploadMedia(file);
            setFormData(prev => ({ 
                ...prev, 
                [langKey]: { ...prev[langKey], image: uploadedPath } 
            }));
            showNotification(`${langKey.toUpperCase()} blog image uploaded!`, 'success');
        } catch (err) {
            showNotification('Image upload failed.', 'error');
            setPreviewUrl(prev => ({ ...prev, [langKey]: '' }));
        } finally { 
            setLoading(false); 
            if (onSync) onSync(false);
        }
    };

    const handleSave = async () => {
        if (!formData.en.title || !formData.sw.title) {
            return showNotification('Both English and Swahili titles are required.', 'warning');
        }
        if (!formData.en.body || !formData.sw.body) {
            return showNotification('Both English and Swahili content bodies are required.', 'warning');
        }

        setLoading(true);
        if (onSync) onSync(true);
        try {
            const slug = formData.common.slug || formData.en.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
            
            const enSha = await saveFileContent(
                `src/content/blog/${slug}.en.md`,
                { lang: 'en', title: formData.en.title, category: formData.common.category, date: formData.common.date, image: formData.en.image, excerpt: formData.en.excerpt },
                formData.en.body,
                selectedArticle.en?.sha
            );

            const swSha = await saveFileContent(
                `src/content/blog/${slug}.sw.md`,
                { lang: 'sw', title: formData.sw.title, category: formData.common.category, date: formData.common.date, image: formData.sw.image, excerpt: formData.sw.excerpt },
                formData.sw.body,
                selectedArticle.sw?.sha
            );

            if (!selectedArticle.isNew) {
                setSelectedArticle({
                    ...selectedArticle,
                    en: { ...selectedArticle.en, sha: enSha },
                    sw: { ...selectedArticle.sw, sha: swSha }
                });
            }

            showNotification('Bilingual Article published successfully!', 'success');
            await loadArticles();
        } catch (err) { 
            console.error("Detailed Save error:", err);
            showNotification(err.message || 'Failed to publish.', 'error'); 
        } finally { 
            setLoading(false); 
            if (onSync) onSync(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        if (onSync) onSync(true);
        try {
            if (selectedArticle.en) await deleteFile(selectedArticle.en.path, selectedArticle.en.sha);
            if (selectedArticle.sw) await deleteFile(selectedArticle.sw.path, selectedArticle.sw.sha);
            setDeleteDialogOpen(false);
            setSelectedArticle(null);
            showNotification('Article pair deleted successfully.', 'success');
            await loadArticles();
        } catch (err) { 
            showNotification('Deletion failed.', 'error'); 
        } finally { 
            setLoading(false); 
            if (onSync) onSync(false);
        }
    };

    const insertFormatting = (prefix, suffix = '') => {
        const textarea = textareaRef.current.querySelector('textarea');
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selectedText = text.substring(start, end);
        const before = text.substring(0, start);
        const after = text.substring(end);
        const newText = before + prefix + selectedText + suffix + after;
        const langKey = editTab === 0 ? 'en' : 'sw';
        setFormData({ ...formData, [langKey]: { ...formData[langKey], body: newText } });
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + prefix.length, end + prefix.length);
        }, 0);
    };

    if (loading && !selectedArticle && articles.length === 0) return <Typography sx={{ p: 4 }}>Syncing Global Infrastructure...</Typography>;

    const currentContent = editTab === 0 ? formData.en : formData.sw;

    return (
        <Box>
            {!selectedArticle ? (
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5 }}>
                        <Box>
                            <Typography variant="h4" sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 800, color: '#1A5C2A' }}>Bilingual Studio</Typography>
                            <Typography sx={{ color: '#666', fontFamily: 'Outfit', mt: 1 }}>Manage synchronized English and Swahili content.</Typography>
                        </Box>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateNew} sx={{ bgcolor: '#1A5C2A', borderRadius: 0, fontWeight: 800 }}>Create Bilingual Post</Button>
                    </Box>

                    <Grid container spacing={3}>
                        {articles.map(article => (
                            <Grid item xs={12} key={article.slug}>
                                <Card sx={{ 
                                    display: 'flex', 
                                    height: 120, 
                                    borderRadius: 0, 
                                    border: '1px solid #eee', 
                                    cursor: 'pointer', 
                                    '&:hover': { borderColor: '#F7A11A', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' } 
                                }} onClick={() => handleSelectArticle(article)}>
                                    <Box sx={{ width: 180, bgcolor: '#f0f0f0', overflow: 'hidden', flexShrink: 0 }}>
                                        {article.image ? <Box component="img" src={getMediaUrl(article.image)} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}><PhotoIcon sx={{ color: '#ccc' }} /></Box>}
                                    </Box>
                                    <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <Typography sx={{ fontWeight: 800, fontFamily: '"Inknut Antiqua", serif', color: '#1A5C2A', mb: 0.5 }}>{article.title}</Typography>
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                            <Chip label="EN" size="small" icon={article.en ? <CheckCircleIcon /> : <WarningIcon />} sx={{ borderRadius: 0, bgcolor: article.en ? '#f0fdf4' : '#fef2f2', color: article.en ? '#1A5C2A' : '#dc2626', fontWeight: 900, fontSize: '0.65rem' }} />
                                            <Chip label="SW" size="small" icon={article.sw ? <CheckCircleIcon /> : <WarningIcon />} sx={{ borderRadius: 0, bgcolor: article.sw ? '#f0fdf4' : '#fef2f2', color: article.sw ? '#1A5C2A' : '#dc2626', fontWeight: 900, fontSize: '0.65rem' }} />
                                            <Typography sx={{ fontSize: '0.75rem', color: '#999', ml: 2 }}>{new Date(article.date).toLocaleDateString()}</Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ) : (
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                        <Button startIcon={<ArrowBackIcon />} onClick={() => setSelectedArticle(null)} sx={{ fontWeight: 700 }}>Back to Articles</Button>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {!selectedArticle.isNew && <Button color="error" startIcon={<DeleteIcon />} onClick={() => setDeleteDialogOpen(true)} sx={{ fontWeight: 700 }}>Delete All Versions</Button>}
                            <Button variant="contained" onClick={handleSave} disabled={loading} sx={{ bgcolor: '#1A5C2A', borderRadius: 0, fontWeight: 900, px: 4 }}>{loading ? 'Processing...' : 'Publish Both Versions'}</Button>
                        </Box>
                    </Box>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={8}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                                <Tabs value={editTab} onChange={(e, v) => setEditTab(v)} textColor="primary" indicatorColor="primary">
                                    <Tab label="English Version" sx={{ fontWeight: 800, fontFamily: 'Outfit' }} />
                                    <Tab label="Swahili Version" sx={{ fontWeight: 800, fontFamily: 'Outfit' }} />
                                </Tabs>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, bgcolor: '#f8fafc', p: 1, border: '1px solid #e2e8f0' }}>
                                <Stack direction="row" spacing={0.5}>
                                    <Tooltip title="Bold"><IconButton size="small" onClick={() => insertFormatting('**', '**')} disabled={mode === 'preview'}><FormatBoldIcon fontSize="small" /></IconButton></Tooltip>
                                    <Tooltip title="Italic"><IconButton size="small" onClick={() => insertFormatting('*', '*')} disabled={mode === 'preview'}><FormatItalicIcon fontSize="small" /></IconButton></Tooltip>
                                    <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                                    <Tooltip title="Heading 1"><IconButton size="small" onClick={() => insertFormatting('# ', '')} disabled={mode === 'preview'}><TitleIcon fontSize="small" /></IconButton></Tooltip>
                                    <Tooltip title="Heading 2"><IconButton size="small" onClick={() => insertFormatting('## ', '')} disabled={mode === 'preview'}><TitleIcon fontSize="inherit" /></IconButton></Tooltip>
                                    <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                                    <Tooltip title="Bullet List"><IconButton size="small" onClick={() => insertFormatting('* ', '')} disabled={mode === 'preview'}><FormatListBulletedIcon fontSize="small" /></IconButton></Tooltip>
                                    <Tooltip title="Numbered List"><IconButton size="small" onClick={() => insertFormatting('1. ', '')} disabled={mode === 'preview'}><FormatListNumberedIcon fontSize="small" /></IconButton></Tooltip>
                                    <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                                    <Tooltip title="Quote"><IconButton size="small" onClick={() => insertFormatting('> ', '')} disabled={mode === 'preview'}><FormatQuoteIcon fontSize="small" /></IconButton></Tooltip>
                                    <Tooltip title="Link"><IconButton size="small" onClick={() => insertFormatting('[', '](url)')} disabled={mode === 'preview'}><InsertLinkIcon fontSize="small" /></IconButton></Tooltip>
                                    <Tooltip title="Horizontal Rule"><IconButton size="small" onClick={() => insertFormatting('\n---\n', '')} disabled={mode === 'preview'}><HorizontalRuleIcon fontSize="small" /></IconButton></Tooltip>
                                </Stack>

                                <ToggleButtonGroup value={mode} exclusive onChange={(e, v) => v && setMode(v)} size="small" sx={{ bgcolor: '#fff' }}>
                                    <ToggleButton value="write" sx={{ px: 2, fontWeight: 700, borderRadius: 0 }}><EditNoteIcon sx={{ mr: 1, fontSize: 18 }} /> Write</ToggleButton>
                                    <ToggleButton value="preview" sx={{ px: 2, fontWeight: 700, borderRadius: 0 }}><VisibilityIcon sx={{ mr: 1, fontSize: 18 }} /> Preview</ToggleButton>
                                </ToggleButtonGroup>
                            </Box>

                            <Box sx={{ p: mode === 'preview' ? 4 : 0, bgcolor: mode === 'preview' ? '#fff' : 'transparent', border: mode === 'preview' ? '1px solid #eee' : 'none', minHeight: '500px' }}>
                                {mode === 'write' ? (
                                    <>
                                        <TextField fullWidth label={`${editTab === 0 ? 'English' : 'Swahili'} Title`} value={currentContent.title} onChange={e => { const langKey = editTab === 0 ? 'en' : 'sw'; setFormData({ ...formData, [langKey]: { ...formData[langKey], title: e.target.value } }); }} helperText={`${currentContent.title.length}/${LIMITS.title}`} sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                                        <TextField fullWidth label={`${editTab === 0 ? 'English' : 'Swahili'} Excerpt`} multiline rows={2} value={currentContent.excerpt} onChange={e => { const langKey = editTab === 0 ? 'en' : 'sw'; setFormData({ ...formData, [langKey]: { ...formData[langKey], excerpt: e.target.value } }); }} helperText={`${currentContent.excerpt.length}/${LIMITS.excerpt}`} sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                                        <TextField ref={textareaRef} fullWidth label={`${editTab === 0 ? 'English' : 'Swahili'} Content (Markdown)`} multiline rows={20} value={currentContent.body} onChange={e => { const langKey = editTab === 0 ? 'en' : 'sw'; setFormData({ ...formData, [langKey]: { ...formData[langKey], body: e.target.value } }); }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0, fontFamily: 'monospace', bgcolor: '#fcfdfc' } }} />
                                    </>
                                ) : (
                                    <Box className="markdown-preview" sx={{ fontFamily: 'Outfit', lineHeight: 1.8, '& h1, & h2, & h3': { fontFamily: '"Inknut Antiqua", serif', color: '#1A5C2A', mt: 4, mb: 2 }, '& img': { maxWidth: '100%', height: 'auto', border: '1px solid #eee', p: 1, my: 3 } }}>
                                        <Typography variant="h3" sx={{ mb: 4, fontWeight: 800 }}>{currentContent.title}</Typography>
                                        <ReactMarkdown>{currentContent.body}</ReactMarkdown>
                                    </Box>
                                )}
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box sx={{ p: 4, bgcolor: '#fff', border: '1px solid #eee' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 3, color: '#1A5C2A' }}>GLOBAL SETTINGS</Typography>
                                <TextField fullWidth label="Category" value={formData.common.category} onChange={e => setFormData({ ...formData, common: { ...formData.common, category: e.target.value } })} sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                                <TextField fullWidth label="Publish Date" type="datetime-local" value={new Date(formData.common.date).toISOString().slice(0, 16)} onChange={e => setFormData({ ...formData, common: { ...formData.common, date: e.target.value } })} InputLabelProps={{ shrink: true }} sx={{ mb: 4, '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                                
                                <Typography variant="caption" sx={{ fontWeight: 900, color: '#666' }}>{editTab === 0 ? 'ENGLISH' : 'SWAHILI'} THUMBNAIL</Typography>
                                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                    <TextField fullWidth size="small" value={currentContent.image} placeholder="/uploads/..." disabled sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                                    <Button component="label" sx={{ minWidth: 'auto', p: 1, bgcolor: '#F7A11A', color: '#1A5C2A' }}><CloudUploadIcon /><input type="file" hidden accept="image/*" onChange={handleImageUpload} /></Button>
                                </Box>
                                {(previewUrl[editTab === 0 ? 'en' : 'sw'] || currentContent.image) && (
                                    <Box component="img" src={previewUrl[editTab === 0 ? 'en' : 'sw'] || getMediaUrl(currentContent.image)} sx={{ mt: 2, width: '100%', border: '1px solid #ddd' }} />
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            )}

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle sx={{ fontWeight: 800 }}>Delete Article Pair?</DialogTitle>
                <DialogContent><Typography>This will permanently remove both the English and Swahili versions of this article from the website. This action cannot be undone.</Typography></DialogContent>
                <DialogActions><Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button><Button color="error" onClick={handleDelete} sx={{ fontWeight: 800 }}>Delete Permanently</Button></DialogActions>
            </Dialog>
        </Box>
    );
};

export default BlogManager;
