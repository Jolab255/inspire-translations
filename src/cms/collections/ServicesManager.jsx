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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

// Icons
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { getFileContent, saveJsonContent, uploadMedia } from '../githubApi';
import { useNotification } from '../NotificationContext';

const ServicesManager = ({ onSync }) => {
    const { showNotification } = useNotification();
    const [servicesData, setServicesData] = useState({ services: [] });
    const [fileSha, setFileSha] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editTab, setEditTab] = useState(0); // 0 = EN, 1 = SW, 2 = Settings

    const [formData, setFormData] = useState({
        id: '',
        title: { en: '', sw: '' },
        shortDesc: { en: '', sw: '' },
        fullDesc: { en: '', sw: '' },
        icon: '',
        img: '',
        color: '#F7A11A',
        features: { en: [], sw: [] }
    });

    const [newFeature, setNewFeature] = useState({ en: '', sw: '' });

    const SERVICES_PATH = 'src/content/services.json';

    useEffect(() => { loadServices(); }, []);

    const loadServices = async () => {
        setLoading(true);
        if (onSync) onSync(true);
        try {
            const content = await getFileContent(SERVICES_PATH);
            let data;
            
            // If content.data exists and has services, use it (from frontmatter)
            if (content.data && content.data.services) {
                data = content.data;
            } else {
                // Otherwise try to parse the body (raw JSON)
                try {
                    data = JSON.parse(content.body);
                } catch (e) {
                    console.error("JSON Parse error:", e);
                    data = { services: [] };
                }
            }
            
            setServicesData(data);
            setFileSha(content.sha);

            // Update selected item if we're currently editing
            if (selectedItem) {
                const updated = data.services.find(s => s.id === selectedItem.id);
                if (updated) setSelectedItem(updated);
            }
        } catch (err) {
            console.error("Error loading services from GitHub:", err);
            showNotification('Failed to load services infrastructure.', 'error');
            setServicesData({ services: [] });
        } finally { 
            setLoading(false); 
            if (onSync) onSync(false);
        }
    };

    const handleOpenEdit = (item = null) => {
        if (item) {
            setSelectedItem(item);
            setFormData({ ...item });
        } else {
            setSelectedItem(null);
            setFormData({
                id: '',
                title: { en: '', sw: '' },
                shortDesc: { en: '', sw: '' },
                fullDesc: { en: '', sw: '' },
                icon: '',
                img: '',
                color: '#F7A11A',
                features: { en: [], sw: [] }
            });
        }
        setEditTab(0);
        setEditDialogOpen(true);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setLoading(true);
        if (onSync) onSync(true);
        try {
            const uploadedPath = await uploadMedia(file);
            setFormData({ ...formData, img: uploadedPath });
            showNotification('Service image uploaded successfully!', 'success');
        } catch (err) {
            showNotification('Image upload failed. Please try again.', 'error');
        } finally { 
            setLoading(false); 
            if (onSync) onSync(false);
        }
    };

    const handleAddFeature = () => {
        if (!newFeature.en.trim() || !newFeature.sw.trim()) return;
        setFormData({
            ...formData,
            features: {
                en: [...formData.features.en, newFeature.en.trim()],
                sw: [...formData.features.sw, newFeature.sw.trim()]
            }
        });
        setNewFeature({ en: '', sw: '' });
    };

    const handleRemoveFeature = (index) => {
        setFormData({
            ...formData,
            features: {
                en: formData.features.en.filter((_, i) => i !== index),
                sw: formData.features.sw.filter((_, i) => i !== index)
            }
        });
    };

    const handleSaveService = async () => {
        let finalFormData = { ...formData };
        
        // Auto-generate ID if empty (for new services)
        if (!finalFormData.id && finalFormData.title.en) {
            finalFormData.id = finalFormData.title.en.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
        }

        if (!finalFormData.id) {
            showNotification('Service ID or English Title is required.', 'warning');
            return;
        }

        setLoading(true);
        if (onSync) onSync(true);
        try {
            let newServices;
            if (selectedItem) {
                newServices = servicesData.services.map(s => s.id === selectedItem.id ? finalFormData : s);
            } else {
                newServices = [...servicesData.services, finalFormData];
            }

            const newData = { services: newServices };
            await saveJsonContent(SERVICES_PATH, newData, fileSha, `Services Update: ${finalFormData.title.en}`);
            
            setServicesData(newData);
            setEditDialogOpen(false);
            showNotification('Services updated successfully! Changes will be live in a few minutes.', 'success');
            loadServices();
        } catch (err) {
            console.error("Save error:", err);
            showNotification('Save failed. Please check your connection or authentication.', 'error');
        } finally { 
            setLoading(false); 
            if (onSync) onSync(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        if (onSync) onSync(true);
        try {
            const newServices = servicesData.services.filter(s => s.id !== selectedItem.id);
            const newData = { services: newServices };
            await saveJsonContent(SERVICES_PATH, newData, fileSha, `Services Delete: ${selectedItem.title.en}`);
            
            setServicesData(newData);
            setDeleteDialogOpen(false);
            showNotification('Service removed successfully.', 'success');
            loadServices();
        } catch (err) {
            showNotification('Delete failed. Please try again.', 'error');
        } finally { 
            setLoading(false); 
            if (onSync) onSync(false);
        }
    };

    if (loading && servicesData.services.length === 0) return <Typography sx={{ p: 4 }}>Syncing Services Infrastructure...</Typography>;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 800, color: '#1A5C2A' }}>Service Management</Typography>
                    <Typography sx={{ color: '#666', fontFamily: 'Outfit', mt: 1 }}>Manage bilingual service offerings and features.</Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenEdit()} sx={{ bgcolor: '#1A5C2A', borderRadius: 0, fontWeight: 800 }}>Add Service</Button>
            </Box>

            <Grid container spacing={3}>
                {servicesData.services.map(service => (
                    <Grid item xs={12} md={6} key={service.id}>
                        <Card sx={{ borderRadius: 0, border: '1px solid #eee', p: 3, position: 'relative' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <Typography sx={{ fontSize: '1.5rem' }}>{service.icon}</Typography>
                                        <Typography sx={{ fontWeight: 800, color: '#1A5C2A', fontFamily: '"Inknut Antiqua", serif' }}>{service.title.en}</Typography>
                                    </Box>
                                    <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 2 }}>ID: {service.id}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton size="small" onClick={() => handleOpenEdit(service)}><EditIcon fontSize="small" /></IconButton>
                                    <IconButton size="small" color="error" onClick={() => { setSelectedItem(service); setDeleteDialogOpen(true); }}><DeleteIcon fontSize="small" /></IconButton>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                {service.img && <Box component="img" src={service.img} sx={{ width: 80, height: 60, objectFit: 'cover', border: '1px solid #eee' }} />}
                                <Typography sx={{ fontSize: '0.85rem', color: '#666', height: '3.6em', overflow: 'hidden', flex: 1 }}>{service.shortDesc.en}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {service.features.en.map((f, idx) => (
                                    <Chip key={idx} label={f} size="small" sx={{ fontSize: '0.65rem', height: 20, borderRadius: 0 }} />
                                ))}
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle sx={{ fontWeight: 800 }}>{selectedItem ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                        <Tabs value={editTab} onChange={(e, v) => setEditTab(v)}>
                            <Tab label="English" />
                            <Tab label="Swahili" />
                            <Tab label="Settings" icon={<SettingsIcon />} iconPosition="start" />
                        </Tabs>
                    </Box>

                    {editTab === 0 && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <TextField fullWidth label="Title (EN)" value={formData.title.en} onChange={e => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })} />
                            <TextField fullWidth label="Short Description (EN)" multiline rows={2} value={formData.shortDesc.en} onChange={e => setFormData({ ...formData, shortDesc: { ...formData.shortDesc, en: e.target.value } })} />
                            <TextField fullWidth label="Full Description (EN)" multiline rows={4} value={formData.fullDesc.en} onChange={e => setFormData({ ...formData, fullDesc: { ...formData.fullDesc, en: e.target.value } })} />
                        </Box>
                    )}

                    {editTab === 1 && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <TextField fullWidth label="Title (SW)" value={formData.title.sw} onChange={e => setFormData({ ...formData, title: { ...formData.title, sw: e.target.value } })} />
                            <TextField fullWidth label="Short Description (SW)" multiline rows={2} value={formData.shortDesc.sw} onChange={e => setFormData({ ...formData, shortDesc: { ...formData.shortDesc, sw: e.target.value } })} />
                            <TextField fullWidth label="Full Description (SW)" multiline rows={4} value={formData.fullDesc.sw} onChange={e => setFormData({ ...formData, fullDesc: { ...formData.fullDesc, sw: e.target.value } })} />
                        </Box>
                    )}

                    {editTab === 2 && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <TextField fullWidth label="Service ID (unique slug)" value={formData.id} onChange={e => setFormData({ ...formData, id: e.target.value })} disabled={!!selectedItem} helperText="Example: written-translation" />
                            
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField label="Icon Emoji" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} />
                                <TextField label="Brand Color" type="color" value={formData.color} onChange={e => setFormData({ ...formData, color: e.target.value })} fullWidth />
                            </Box>

                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 900, color: '#666', display: 'block', mb: 1 }}>SERVICE IMAGE</Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <TextField fullWidth size="small" value={formData.img} placeholder="/assets/images/..." disabled />
                                    <Button component="label" sx={{ minWidth: 'auto', p: 1, bgcolor: '#F7A11A', color: '#1A5C2A' }}><CloudUploadIcon /><input type="file" hidden accept="image/*" onChange={handleImageUpload} /></Button>
                                </Box>
                                {formData.img && <Box component="img" src={formData.img} sx={{ mt: 2, width: '100%', height: 120, objectFit: 'cover', border: '1px solid #eee' }} />}
                            </Box>
                            
                            <Divider />
                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>FEATURES (Synchronized Pairs)</Typography>
                            
                            <Stack direction="row" spacing={2}>
                                <TextField label="Feature EN" value={newFeature.en} onChange={e => setNewFeature({ ...newFeature, en: e.target.value })} size="small" fullWidth />
                                <TextField label="Feature SW" value={newFeature.sw} onChange={e => setNewFeature({ ...newFeature, sw: e.target.value })} size="small" fullWidth />
                                <Button onClick={handleAddFeature} variant="outlined" sx={{ borderRadius: 0 }}><AddIcon /></Button>
                            </Stack>

                            <Box sx={{ mt: 2 }}>
                                {formData.features.en.map((f, idx) => (
                                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #f1f5f9' }}>
                                        <Typography sx={{ fontSize: '0.85rem' }}>{f} / {formData.features.sw[idx]}</Typography>
                                        <IconButton size="small" color="error" onClick={() => handleRemoveFeature(idx)}><DeleteIcon fontSize="inherit" /></IconButton>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveService} disabled={loading} sx={{ bgcolor: '#1A5C2A', borderRadius: 0, fontWeight: 800 }}>Save Service</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle sx={{ fontWeight: 800 }}>Remove Service?</DialogTitle>
                <DialogContent><Typography>Are you sure you want to remove this service from the list? This cannot be undone.</Typography></DialogContent>
                <DialogActions><Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button><Button color="error" onClick={handleDelete} sx={{ fontWeight: 800 }}>Delete Permanently</Button></DialogActions>
            </Dialog>
        </Box>
    );
};

export default ServicesManager;
