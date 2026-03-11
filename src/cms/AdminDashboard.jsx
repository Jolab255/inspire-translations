import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AdminLogin from './AdminLogin';
import BlogManager from './collections/BlogManager';
import ProjectsManager from './collections/ProjectsManager';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('blog');

    useEffect(() => {
        const token = sessionStorage.getItem('github_cms_token');
        if (token) {
            // Assume valid for now; the API calls will fail if it's not
            setUser({ loggedIn: true });
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('github_cms_token');
        setUser(null);
    };

    if (!user) {
        return <AdminLogin onLogin={(userData) => setUser(userData)} />;
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc', width: '100vw', position: 'absolute', top: 0, left: 0, zIndex: 9999 }}>
            {/* Sidebar */}
            <Box sx={{ width: 250, bgcolor: '#FFFFFF', borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 3, borderBottom: '3px solid #F7A11A', bgcolor: '#1A5C2A' }}>
                    <Typography sx={{ color: '#FFF', fontFamily: '"Inknut Antiqua", serif', fontWeight: 700 }}>
                        INSPIRE CMS
                    </Typography>
                </Box>
                
                <List sx={{ mt: 2 }}>
                    {['Blog Posts', 'Projects', 'Gallery'].map((text, index) => {
                        const id = text.toLowerCase().split(' ')[0];
                        return (
                            <ListItem key={text} disablePadding>
                                <ListItemButton 
                                    selected={activeTab === id}
                                    onClick={() => setActiveTab(id)}
                                    sx={{ 
                                        borderLeft: activeTab === id ? '4px solid #1A5C2A' : '4px solid transparent',
                                        bgcolor: activeTab === id ? 'rgba(247, 161, 26, 0.1)' : 'transparent',
                                    }}
                                >
                                    <ListItemText 
                                        primary={text} 
                                        sx={{ 
                                            '& .MuiTypography-root': { 
                                                fontFamily: 'Outfit', 
                                                fontWeight: activeTab === id ? 700 : 500,
                                                color: activeTab === id ? '#1A5C2A' : '#666'
                                            } 
                                        }} 
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>

                <Box sx={{ mt: 'auto', p: 2 }}>
                    <ListItemButton onClick={handleLogout} sx={{ borderRadius: 1 }}>
                        <ListItemText primary="Logout" sx={{ '& .MuiTypography-root': { fontFamily: 'Outfit', color: '#d32f2f', fontWeight: 700 } }} />
                    </ListItemButton>
                </Box>
            </Box>

            {/* Main Content Area */}
            <Box sx={{ flexGrow: 1, p: 5, overflowY: 'auto' }}>
                {activeTab === 'blog' && <BlogManager />}
                {activeTab === 'projects' && <ProjectsManager />}
                {activeTab === 'gallery' && <Typography>Gallery Manager (Coming Soon)</Typography>}
            </Box>
        </Box>
    );
};

export default AdminDashboard;
