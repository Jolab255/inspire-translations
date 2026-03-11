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
import BusinessIcon from '@mui/icons-material/Business';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import TitleIcon from '@mui/icons-material/Title';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

import ReactMarkdown from 'react-markdown';
import { getFilesList, getFileContent, saveFileContent, uploadMedia, deleteFile } from '../githubApi';

const ProjectsManager = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [editTab, setEditTab] = useState(0); // 0 = EN, 1 = SW
    const [mode, setMode] = useState('write'); // 'write' or 'preview'
    const [formData, setFormData] = useState({ en: {}, sw: {}, common: {} });
    const [saveStatus, setSaveStatus] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    
    const textareaRef = useRef(null);
    const LIMITS = { title: 60, desc: 120 };

    useEffect(() => { loadProjects(); }, []);

    const loadProjects = async () => {
        setLoading(true);
        try {
            const list = await getFilesList('src/content/projects');
            console.log("Projects found on GitHub:", list.length);
            const mdFiles = list.filter(f => f.name.endsWith('.md'));
            
            const allFilesData = await Promise.all(mdFiles.map(async (file) => {
                try {
                    const content = await getFileContent(file.path);
                    const parts = file.name.split('.');
                    const lang = parts[parts.length - 2];
                    const slug = parts.slice(0, -2).join('.');
                    return { ...file, lang, slug, content };
                } catch (e) {
                    console.error(`Error loading ${file.name}:`, e);
                    return null;
                }
            }));

            const validFiles = allFilesData.filter(f => f !== null);
            const grouped = {};
            validFiles.forEach(file => {
                if (!grouped[file.slug]) {
                    grouped[file.slug] = { slug: file.slug, en: null, sw: null, image: '', client: '', year: '', type: '', title: '' };
                }
                grouped[file.slug][file.lang] = file;
                if (file.lang === 'en' || !grouped[file.slug].image) {
                    grouped[file.slug].image = file.content.data.img;
                    grouped[file.slug].client = file.content.data.client;
                    grouped[file.slug].year = file.content.data.year;
                    grouped[file.slug].type = file.content.data.type;
                    grouped[file.slug].title = file.content.data.title;
                }
            });

            setProjects(Object.values(grouped).sort((a, b) => b.year - a.year));
        } catch (err) { 
            console.error("Critical Error loading projects:", err);
        } finally { setLoading(false); }
    };

    const handleSelectProject = (project) => {
        const enData = project.en?.content || { data: {}, body: '' };
        const swData = project.sw?.content || { data: {}, body: '' };

        setFormData({
            en: { title: enData.data.title || '', desc: enData.data.desc || '', fullDesc: enData.data.fullDesc || '' },
            sw: { title: swData.data.title || '', desc: swData.data.desc || '', fullDesc: swData.data.fullDesc || '' },
            common: {
                type: enData.data.type || swData.data.type || 'translation',
                client: enData.data.client || swData.data.client || '',
                place: enData.data.place || swData.data.place || '',
                year: enData.data.year || swData.data.year || new Date().getFullYear().toString(),
                img: enData.data.img || swData.data.img || '',
                slug: project.slug
            }
        });
        setSelectedProject(project);
        setEditTab(0);
        setMode('write');
        setSaveStatus(null);
    };

    const handleCreateNew = () => {
        setSelectedProject({ isNew: true, slug: '' });
        setFormData({
            en: { title: '', desc: '', fullDesc: '' },
            sw: { title: '', desc: '', fullDesc: '' },
            common: { type: 'translation', client: '', place: '', year: new Date().getFullYear().toString(), img: '', slug: '' }
        });
        setEditTab(0);
        setMode('write');
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setLoading(true);
        try {
            const uploadedPath = await uploadMedia(file);
            setFormData(prev => ({ ...prev, common: { ...prev.common, img: uploadedPath } }));
            setSaveStatus({ type: 'success', message: 'Project image uploaded successfully!' });
        } catch (err) {
            setSaveStatus({ type: 'error', message: 'Image upload failed.' });
        } finally { setLoading(false); }
    };

    const handleSave = async () => {
        if (!formData.en.title || !formData.sw.title) {
            return setSaveStatus({ type: 'error', message: 'Both English and Swahili titles are required.' });
        }

        setLoading(true);
        setSaveStatus(null);
        try {
            const slug = formData.common.slug || formData.en.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
            
            const commonData = {
                type: formData.common.type,
                client: formData.common.client,
                place: formData.common.place,
                year: formData.common.year,
                img: formData.common.img
            };

            await saveFileContent(
                `src/content/projects/${slug}.en.md`,
                { lang: 'en', ...commonData, title: formData.en.title, desc: formData.en.desc, fullDesc: formData.en.fullDesc },
                '',
                selectedProject.en?.sha
            );

            await saveFileContent(
                `src/content/projects/${slug}.sw.md`,
                { lang: 'sw', ...commonData, title: formData.sw.title, desc: formData.sw.desc, fullDesc: formData.sw.fullDesc },
                '',
                selectedProject.sw?.sha
            );

            setSaveStatus({ type: 'success', message: 'Bilingual Project published successfully!' });
            loadProjects();
        } catch (err) { 
            console.error(err);
            setSaveStatus({ type: 'error', message: 'Failed to publish. Check GitHub permissions.' }); 
        } finally { setLoading(false); }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            if (selectedProject.en) await deleteFile(selectedProject.en.path, selectedProject.en.sha);
            if (selectedProject.sw) await deleteFile(selectedProject.sw.path, selectedProject.sw.sha);
            setDeleteDialogOpen(false);
            setSelectedProject(null);
            loadProjects();
        } catch (err) { setSaveStatus({ type: 'error', message: 'Deletion failed.' }); } finally { setLoading(false); }
    };

    const insertFormatting = (prefix, suffix = '') => {
        const textarea = textareaRef.current.querySelector('textarea');
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const selectedText = text.substring(start, end);
        const after = text.substring(end);
        const newText = before + prefix + selectedText + suffix + after;
        const langKey = editTab === 0 ? 'en' : 'sw';
        setFormData({ ...formData, [langKey]: { ...formData[langKey], fullDesc: newText } });
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + prefix.length, end + prefix.length);
        }, 0);
    };

    if (loading && !selectedProject && projects.length === 0) return <Typography sx={{ p: 4 }}>Syncing Project Infrastructure...</Typography>;

    const currentContent = editTab === 0 ? formData.en : formData.sw;

    return (
        <Box>
            {!selectedProject ? (
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5 }}>
                        <Box>
                            <Typography variant="h4" sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 800, color: '#1A5C2A' }}>Project Hub</Typography>
                            <Typography sx={{ color: '#666', fontFamily: 'Outfit', mt: 1 }}>Manage your portfolio across all languages.</Typography>
                        </Box>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateNew} sx={{ bgcolor: '#1A5C2A', borderRadius: 0, fontWeight: 800 }}>Add New Project</Button>
                    </Box>

                    {projects.length === 0 && !loading && (
                        <Alert severity="info" sx={{ borderRadius: 0 }}>No projects found in the GitHub repository. Click 'Add New Project' to start your portfolio.</Alert>
                    )}

                    <Grid container spacing={3}>
                        {projects.map(project => (
                            <Grid item xs={12} key={project.slug}>
                                <Card sx={{ 
                                    display: 'flex', 
                                    height: 140, 
                                    borderRadius: 0, 
                                    border: '1px solid #eee', 
                                    cursor: 'pointer', 
                                    '&:hover': { borderColor: '#F7A11A', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' } 
                                }} onClick={() => handleSelectProject(project)}>
                                    <Box sx={{ width: 220, bgcolor: '#f0f0f0', overflow: 'hidden', flexShrink: 0 }}>
                                        {project.image ? <Box component="img" src={project.image} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}><PhotoIcon sx={{ color: '#ccc' }} /></Box>}
                                    </Box>
                                    <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <Typography sx={{ fontWeight: 800, fontFamily: '"Inknut Antiqua", serif', color: '#1A5C2A', mb: 0.5, fontSize: '1.1rem' }}>{project.title}</Typography>
                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1.5 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#666' }}><BusinessIcon sx={{ fontSize: 16 }} /><Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>{project.client}</Typography></Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#666' }}><CalendarTodayIcon sx={{ fontSize: 16 }} /><Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>{project.year}</Typography></Box>
                                            <Chip label={(project.type || '').toUpperCase()} size="small" sx={{ borderRadius: 0, height: 20, fontSize: '0.6rem', fontWeight: 800, bgcolor: '#f8fafc', color: '#1A5C2A' }} />
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Chip label="EN" size="small" icon={project.en ? <CheckCircleIcon /> : <WarningIcon />} sx={{ borderRadius: 0, bgcolor: project.en ? '#f0fdf4' : '#fef2f2', color: project.en ? '#1A5C2A' : '#dc2626', fontWeight: 900, fontSize: '0.6rem' }} />
                                            <Chip label="SW" size="small" icon={project.sw ? <CheckCircleIcon /> : <WarningIcon />} sx={{ borderRadius: 0, bgcolor: project.sw ? '#f0fdf4' : '#fef2f2', color: project.sw ? '#1A5C2A' : '#dc2626', fontWeight: 900, fontSize: '0.6rem' }} />
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
                        <Button startIcon={<ArrowBackIcon />} onClick={() => setSelectedProject(null)} sx={{ fontWeight: 700 }}>Back to Hub</Button>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {!selectedProject.isNew && <Button color="error" startIcon={<DeleteIcon />} onClick={() => setDeleteDialogOpen(true)} sx={{ fontWeight: 700 }}>Remove Project</Button>}
                            <Button variant="contained" onClick={handleSave} disabled={loading} sx={{ bgcolor: '#1A5C2A', borderRadius: 0, fontWeight: 900, px: 4 }}>{loading ? 'Processing...' : 'Publish Project'}</Button>
                        </Box>
                    </Box>

                    {saveStatus && <Alert severity={saveStatus.type} sx={{ mb: 4, borderRadius: 0, fontWeight: 700 }}>{saveStatus.message}</Alert>}

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={8}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                                <Tabs value={editTab} onChange={(e, v) => setEditTab(v)} textColor="primary" indicatorColor="primary">
                                    <Tab label="English Version" sx={{ fontWeight: 800, fontFamily: 'Outfit' }} />
                                    <Tab label="Swahili Version" sx={{ fontWeight: 800, fontFamily: 'Outfit' }} />
                                </Tabs>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                                <ToggleButtonGroup value={mode} exclusive onChange={(e, v) => v && setMode(v)} size="small" sx={{ bgcolor: '#fff' }}>
                                    <ToggleButton value="write" sx={{ px: 2, fontWeight: 700, borderRadius: 0 }}><EditNoteIcon sx={{ mr: 1, fontSize: 18 }} /> Write</ToggleButton>
                                    <ToggleButton value="preview" sx={{ px: 2, fontWeight: 700, borderRadius: 0 }}><VisibilityIcon sx={{ mr: 1, fontSize: 18 }} /> Preview</ToggleButton>
                                </ToggleButtonGroup>
                            </Box>

                            {mode === 'write' && (
                                <Box sx={{ display: 'flex', gap: 0.5, mb: 2, bgcolor: '#f8fafc', p: 1, border: '1px solid #e2e8f0' }}>
                                    <Tooltip title="Bold"><IconButton size="small" onClick={() => insertFormatting('**', '**')}><FormatBoldIcon fontSize="small" /></IconButton></Tooltip>
                                    <Tooltip title="Italic"><IconButton size="small" onClick={() => insertFormatting('*', '*')}><FormatItalicIcon fontSize="small" /></IconButton></Tooltip>
                                    <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                                    <Tooltip title="Heading 2"><IconButton size="small" onClick={() => insertFormatting('## ', '')}><TitleIcon fontSize="small" /></IconButton></Tooltip>
                                    <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                                    <Tooltip title="Bullet List"><IconButton size="small" onClick={() => insertFormatting('* ', '')}><FormatListBulletedIcon fontSize="small" /></IconButton></Tooltip>
                                    <Tooltip title="Numbered List"><IconButton size="small" onClick={() => insertFormatting('1. ', '')}><FormatListNumberedIcon fontSize="small" /></IconButton></Tooltip>
                                    <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                                    <Tooltip title="Quote"><IconButton size="small" onClick={() => insertFormatting('> ', '')}><FormatQuoteIcon fontSize="small" /></IconButton></Tooltip>
                                    <Tooltip title="Link"><IconButton size="small" onClick={() => insertFormatting('[', '](url)')}><InsertLinkIcon fontSize="small" /></IconButton></Tooltip>
                                </Box>
                            )}

                            <Box sx={{ p: mode === 'preview' ? 4 : 0, bgcolor: mode === 'preview' ? '#fff' : 'transparent', border: mode === 'preview' ? '1px solid #eee' : 'none', minHeight: '500px' }}>
                                {mode === 'write' ? (
                                    <>
                                        <TextField fullWidth label="Project Title" value={currentContent.title} onChange={e => { const langKey = editTab === 0 ? 'en' : 'sw'; setFormData({ ...formData, [langKey]: { ...formData[langKey], title: e.target.value } }); }} helperText={`${currentContent.title.length}/${LIMITS.title}`} sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                                        <TextField fullWidth label="Short Summary" multiline rows={2} value={currentContent.desc} onChange={e => { const langKey = editTab === 0 ? 'en' : 'sw'; setFormData({ ...formData, [langKey]: { ...formData[langKey], desc: e.target.value } }); }} helperText={`${(currentContent.desc || '').length}/${LIMITS.desc}`} sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                                        <TextField ref={textareaRef} fullWidth label="Full Case Study (Markdown)" multiline rows={15} value={currentContent.fullDesc} onChange={e => { const langKey = editTab === 0 ? 'en' : 'sw'; setFormData({ ...formData, [langKey]: { ...formData[langKey], fullDesc: e.target.value } }); }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0, fontFamily: 'monospace', bgcolor: '#fcfdfc' } }} />
                                    </>
                                ) : (
                                    <Box className="markdown-preview" sx={{ fontFamily: 'Outfit', lineHeight: 1.8, '& h2': { fontFamily: '"Inknut Antiqua", serif', color: '#1A5C2A', mt: 4, mb: 2 } }}>
                                        <Typography variant="h3" sx={{ mb: 2, fontWeight: 800, fontFamily: '"Inknut Antiqua", serif' }}>{currentContent.title}</Typography>
                                        <Typography variant="subtitle1" sx={{ mb: 4, fontStyle: 'italic', color: '#666' }}>{currentContent.desc}</Typography>
                                        <ReactMarkdown>{currentContent.fullDesc}</ReactMarkdown>
                                    </Box>
                                )}
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box sx={{ p: 4, bgcolor: '#fff', border: '1px solid #eee' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 3, color: '#1A5C2A' }}>PROJECT LOGISTICS</Typography>
                                <TextField fullWidth select label="Service Type" value={formData.common.type} onChange={e => setFormData({ ...formData, common: { ...formData.common, type: e.target.value } })} SelectProps={{ native: true }} sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 0 } }}><option value="translation">Written Translation</option><option value="interpretation">Interpretation</option></TextField>
                                <TextField fullWidth label="Client Name" value={formData.common.client} onChange={e => setFormData({ ...formData, common: { ...formData.common, client: e.target.value } })} sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                                <TextField fullWidth label="Operational Location" value={formData.common.place} onChange={e => setFormData({ ...formData, common: { ...formData.common, place: e.target.value } })} sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                                <TextField fullWidth label="Project Year" value={formData.common.year} onChange={e => setFormData({ ...formData, common: { ...formData.common, year: e.target.value } })} sx={{ mb: 4, '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                                <Divider sx={{ mb: 4 }} />
                                <Typography variant="caption" sx={{ fontWeight: 900, color: '#666' }}>PROJECT VISUAL</Typography>
                                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                    <TextField fullWidth size="small" value={formData.common.img} placeholder="/uploads/..." disabled sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                                    <Button component="label" sx={{ minWidth: 'auto', p: 1, bgcolor: '#F7A11A', color: '#1A5C2A' }}><CloudUploadIcon /><input type="file" hidden accept="image/*" onChange={handleImageUpload} /></Button>
                                </Box>
                                {formData.common.img && <Box component="img" src={formData.common.img} sx={{ mt: 2, width: '100%', border: '1px solid #ddd' }} />}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            )}

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}><DialogTitle sx={{ fontWeight: 800 }}>Delete Project Record?</DialogTitle><DialogContent><Typography>This will remove this project from your portfolio in all languages. This action is permanent.</Typography></DialogContent><DialogActions><Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button><Button color="error" onClick={handleDelete} sx={{ fontWeight: 800 }}>Delete Permanently</Button></DialogActions></Dialog>
        </Box>
    );
};

export default ProjectsManager;
