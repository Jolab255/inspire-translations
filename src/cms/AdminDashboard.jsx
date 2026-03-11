import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import BlogManager from './collections/BlogManager';
import ProjectsManager from './collections/ProjectsManager';
import GalleryManager from './collections/GalleryManager';
import ServicesManager from './collections/ServicesManager';
import { getDeploymentStatus } from './githubApi';
import CircleIcon from '@mui/icons-material/Circle';
import SyncIcon from '@mui/icons-material/Sync';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [authChecking, setAuthChecking] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);
    const [deployStatus, setDeployStatus] = useState(null);

    // Sync auth state
    useEffect(() => {
        const token = sessionStorage.getItem('github_cms_token');
        if (token) {
            setUser({ loggedIn: true });
        }
        setAuthChecking(false);
    }, []);

    // Monitor Deployment Status
    useEffect(() => {
        if (!user) return;

        const checkStatus = async () => {
            const status = await getDeploymentStatus();
            setDeployStatus(status);
        };

        checkStatus();
        const interval = setInterval(checkStatus, 15000); // Check every 15s
        return () => clearInterval(interval);
    }, [user]);

    // Derive active tab from URL path
    const getActiveTab = () => {
        const path = location.pathname;
        if (path.includes('/projects')) return 'projects';
        if (path.includes('/gallery')) return 'gallery';
        if (path.includes('/services')) return 'services';
        return 'blog'; // Default
    };

    const activeTab = getActiveTab();

    const handleTabChange = (tabId) => {
        navigate(`/admin/${tabId}`);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('github_cms_token');
        setUser(null);
        navigate('/admin');
    };

    const getStatusUI = () => {
        if (!deployStatus) return null;
        
        const isBuilding = deployStatus.status === 'in_progress' || deployStatus.status === 'queued';
        const isSuccess = deployStatus.conclusion === 'success';
        const isFailure = deployStatus.conclusion === 'failure' || deployStatus.conclusion === 'cancelled';

        let label = "Live";
        let color = "#22c55e"; // Success green
        let icon = <CircleIcon sx={{ fontSize: 10 }} />;

        if (isBuilding) {
            label = "Building...";
            color = "#f59e0b"; // Warning orange
            icon = <SyncIcon sx={{ fontSize: 14, animation: 'spin 2s linear infinite', '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } } }} />;
        } else if (isFailure) {
            label = "Build Failed";
            color = "#ef4444"; // Error red
        }

        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, bgcolor: `${color}10`, borderRadius: '50px', border: `1px solid ${color}30` }}>
                <Box sx={{ color: color, display: 'flex' }}>{icon}</Box>
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, color: color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {label}
                </Typography>
            </Box>
        );
    };

    if (authChecking) return null;

    if (!user) {
        return <AdminLogin onLogin={(userData) => setUser(userData)} />;
    }

    return (
        <Box sx={{ 
            display: 'flex', 
            minHeight: '100vh', 
            bgcolor: '#f8fafc', 
            width: '100vw', 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            zIndex: 1200,
            overflow: 'hidden'
        }}>
            {/* Global Progress Bar */}
            {isSyncing && (
                <LinearProgress 
                    sx={{ 
                        position: 'fixed', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        zIndex: 2000,
                        bgcolor: 'rgba(247, 161, 26, 0.1)',
                        '& .MuiLinearProgress-bar': { bgcolor: '#F7A11A' }
                    }} 
                />
            )}

            {/* Sidebar */}
            <Box sx={{ width: 260, bgcolor: '#FFFFFF', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                <Box sx={{ p: 3, borderBottom: '3px solid #F7A11A', bgcolor: '#1A5C2A' }}>
                    <Typography sx={{ color: '#FFF', fontFamily: '"Inknut Antiqua", serif', fontWeight: 800, fontSize: '1.1rem', mb: 2 }}>
                        INSPIRE CMS
                    </Typography>
                    {getStatusUI()}
                </Box>
                
                <List sx={{ mt: 2, px: 1 }}>
                    {[
                        { text: 'Blog Posts', id: 'blog' },
                        { text: 'Projects Hub', id: 'projects' },
                        { text: 'Media Gallery', id: 'gallery' },
                        { text: 'Services', id: 'services' }
                    ].map((item) => (
                        <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton 
                                selected={activeTab === item.id}
                                onClick={() => handleTabChange(item.id)}
                                sx={{ 
                                    borderRadius: '8px',
                                    py: 1.5,
                                    '&.Mui-selected': {
                                        bgcolor: 'rgba(26, 92, 42, 0.08)',
                                        '&:hover': { bgcolor: 'rgba(26, 92, 42, 0.12)' }
                                    }
                                }}
                            >
                                <ListItemText 
                                    primary={item.text} 
                                    sx={{ 
                                        '& .MuiTypography-root': { 
                                            fontFamily: 'Outfit', 
                                            fontWeight: activeTab === item.id ? 800 : 500,
                                            color: activeTab === item.id ? '#1A5C2A' : '#64748b',
                                            fontSize: '0.95rem'
                                        } 
                                    }} 
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ mt: 'auto', p: 2, borderTop: '1px solid #f1f5f9' }}>
                    <Button 
                        fullWidth 
                        onClick={handleLogout} 
                        sx={{ 
                            color: '#ef4444', 
                            fontWeight: 700, 
                            fontFamily: 'Outfit',
                            justifyContent: 'flex-start',
                            px: 2,
                            '&:hover': { bgcolor: '#fef2f2' }
                        }}
                    >
                        Secure Logout
                    </Button>
                </Box>
            </Box>

            {/* Main Content Area */}
            <Box sx={{ flexGrow: 1, height: '100vh', overflowY: 'auto', p: { xs: 3, md: 6 } }}>
                <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
                    {activeTab === 'blog' && <BlogManager onSync={setIsSyncing} />}
                    {activeTab === 'projects' && <ProjectsManager onSync={setIsSyncing} />}
                    {activeTab === 'gallery' && <GalleryManager onSync={setIsSyncing} />}
                    {activeTab === 'services' && <ServicesManager onSync={setIsSyncing} />}
                </Box>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
