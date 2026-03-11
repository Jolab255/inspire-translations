import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';

// Icons
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PhotoIcon from '@mui/icons-material/Photo';

import { getFileContent, saveJsonContent, uploadMedia } from '../githubApi';

const GalleryManager = () => {
    const [galleryData, setGalleryData] = useState({ items: [] });
    const [fileSha, setFileSha] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({ title_en: '', title_sw: '', category_en: '', category_sw: '', src: '' });

    const GALLERY_PATH = 'src/content/gallery.json';

    useEffect(() => { loadGallery(); }, []);

    const loadGallery = async () => {
        setLoading(true);
        try {
            const content = await getFileContent(GALLERY_PATH);
            // getFileContent for JSON returns parsed object in .data or string in .body
            // Our helper handles frontmatter normally, let's parse body if data is empty
            const data = content.data && content.data.items ? content.data : JSON.parse(content.body);
            setGalleryData(data);
            setFileSha(content.sha);
        } catch (err) {
            console.error("Error loading gallery:", err);
        } finally { setLoading(false); }
    };

    const handleOpenEdit = (item = null) => {
        if (item) {
            setSelectedItem(item);
            setFormData({ ...item });
        } else {
            setSelectedItem(null);
            setFormData({ id: Date.now(), title_en: '', title_sw: '', category_en: '', category_sw: '', src: '' });
        }
        setEditDialogOpen(true);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setLoading(true);
        try {
            const uploadedPath = await uploadMedia(file);
            setFormData({ ...formData, src: uploadedPath });
        } catch (err) {
            setSaveStatus({ type: 'error', message: 'Image upload failed.' });
        } finally { setLoading(false); }
    };

    const handleSaveItem = async () => {
        setLoading(true);
        try {
            let newItems;
            if (selectedItem) {
                newItems = galleryData.items.map(item => item.id === selectedItem.id ? formData : item);
            } else {
                newItems = [...galleryData.items, formData];
            }

            const newData = { items: newItems };
            await saveJsonContent(GALLERY_PATH, newData, fileSha, `Gallery Update: ${formData.title_en}`);
            
            setGalleryData(newData);
            setEditDialogOpen(false);
            setSaveStatus({ type: 'success', message: 'Gallery updated successfully!' });
            loadGallery(); // Refresh SHA
        } catch (err) {
            setSaveStatus({ type: 'error', message: 'Save failed.' });
        } finally { setLoading(false); }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            const newItems = galleryData.items.filter(item => item.id !== selectedItem.id);
            const newData = { items: newItems };
            await saveJsonContent(GALLERY_PATH, newData, fileSha, `Gallery Delete: ${selectedItem.title_en}`);
            
            setGalleryData(newData);
            setDeleteDialogOpen(false);
            setSaveStatus({ type: 'success', message: 'Item removed successfully!' });
            loadGallery(); // Refresh SHA
        } catch (err) {
            setSaveStatus({ type: 'error', message: 'Delete failed.' });
        } finally { setLoading(false); }
    };

    if (loading && galleryData.items.length === 0) return <Typography sx={{ p: 4 }}>Syncing Gallery Infrastructure...</Typography>;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 800, color: '#1A5C2A' }}>Media Gallery</Typography>
                    <Typography sx={{ color: '#666', fontFamily: 'Outfit', mt: 1 }}>Manage showcased event photos and project captures.</Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenEdit()} sx={{ bgcolor: '#1A5C2A', borderRadius: 0, fontWeight: 800 }}>Add Media</Button>
            </Box>

            {saveStatus && <Alert severity={saveStatus.type} sx={{ mb: 4, borderRadius: 0 }}>{saveStatus.message}</Alert>}

            <Grid container spacing={2}>
                {galleryData.items.map(item => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <Card sx={{ borderRadius: 0, border: '1px solid #eee', position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', '&:hover .overlay': { opacity: 1, pointerEvents: 'auto' } }}>
                            <Box sx={{ height: 200, bgcolor: '#f0f0f0', overflow: 'hidden' }}>
                                <Box component="img" src={item.src} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </Box>
                            <Box sx={{ p: 2, flexGrow: 1 }}>
                                <Typography sx={{ fontWeight: 800, fontSize: '0.85rem', color: '#1A5C2A', mb: 0.5 }}>{item.title_en}</Typography>
                                <Typography sx={{ fontSize: '0.7rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.category_en}</Typography>
                            </Box>
                            
                            {/* Hover Actions */}
                            <Box className="overlay" sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(13, 43, 20, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, opacity: 0, transition: 'opacity 0.2s', pointerEvents: 'none' }}>
                                <IconButton sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }} onClick={() => handleOpenEdit(item)}><EditIcon /></IconButton>
                                <IconButton sx={{ color: '#ff4444', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }} onClick={() => { setSelectedItem(item); setDeleteDialogOpen(true); }}><DeleteIcon /></IconButton>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Edit/Add Dialog */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 800 }}>{selectedItem ? 'Edit Media' : 'Add New Media'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField fullWidth label="Title (English)" value={formData.title_en} onChange={e => setFormData({ ...formData, title_en: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                            <TextField fullWidth label="Title (Swahili)" value={formData.title_sw} onChange={e => setFormData({ ...formData, title_sw: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField fullWidth label="Category (English)" value={formData.category_en} onChange={e => setFormData({ ...formData, category_en: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                            <TextField fullWidth label="Category (Swahili)" value={formData.category_sw} onChange={e => setFormData({ ...formData, category_sw: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                        </Box>
                        
                        <Divider />
                        
                        <Box>
                            <Typography variant="caption" sx={{ fontWeight: 900, color: '#666', mb: 1, display: 'block' }}>MEDIA FILE</Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <TextField fullWidth size="small" value={formData.src} placeholder="/assets/images/..." disabled sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                                <Button component="label" sx={{ minWidth: 'auto', p: 1, bgcolor: '#F7A11A', color: '#1A5C2A' }}><CloudUploadIcon /><input type="file" hidden accept="image/*" onChange={handleImageUpload} /></Button>
                            </Box>
                            {formData.src && <Box component="img" src={formData.src} sx={{ mt: 2, width: '100%', height: 200, objectFit: 'cover', border: '1px solid #ddd' }} />}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveItem} disabled={loading || !formData.src} sx={{ bgcolor: '#1A5C2A', borderRadius: 0, fontWeight: 800 }}>Save Changes</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle sx={{ fontWeight: 800 }}>Remove from Gallery?</DialogTitle>
                <DialogContent><Typography>Are you sure you want to remove this item from the gallery? This will update the website immediately after publishing.</Typography></DialogContent>
                <DialogActions><Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button><Button color="error" onClick={handleDelete} sx={{ fontWeight: 800 }}>Remove Item</Button></DialogActions>
            </Dialog>
        </Box>
    );
};

export default GalleryManager;
