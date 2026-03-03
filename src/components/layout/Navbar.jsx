import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../../data/siteData';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 80 });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setDrawerOpen(false);
    }, [location]);

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Top bar */}
            <Box
                sx={{
                    bgcolor: '#1A5C2A',
                    color: '#fff',
                    py: 0.5,
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: 4,
                    fontSize: '0.8rem',
                }}
            >
                <PhoneIcon sx={{ fontSize: 14, mr: 0.5 }} />
                <Typography variant="caption" sx={{ mr: 3 }}>+255 000 000 000</Typography>
                <Typography variant="caption">info@inspiretranslations.co.tz</Typography>
            </Box>

            {/* Main Navbar */}
            <AppBar
                position="sticky"
                sx={{
                    bgcolor: scrolled ? 'rgba(255,255,255,0.97)' : '#FFFFFF',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    color: '#1A1A2E',
                    boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.1)' : '0 1px 4px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    top: 0,
                }}
            >
                <Toolbar sx={{ maxWidth: 1280, width: '100%', mx: 'auto', px: { xs: 2, md: 4 }, py: 1 }}>
                    {/* Logo */}
                    <Box
                        component={RouterLink}
                        to="/"
                        sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexGrow: 1 }}
                    >
                        <Box
                            sx={{
                                width: 42,
                                height: 42,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #F7A11A, #D4880E)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 1.5,
                                boxShadow: '0 4px 12px rgba(247,161,26,0.3)',
                            }}
                        >
                            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', fontFamily: 'Outfit' }}>IT</Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: 'Outfit',
                                    fontWeight: 800,
                                    fontSize: '1.1rem',
                                    color: '#1A1A2E',
                                    lineHeight: 1.1,
                                }}
                            >
                                INSPIRE
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'Outfit',
                                    fontWeight: 500,
                                    fontSize: '0.7rem',
                                    color: '#F7A11A',
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                TRANSLATIONS
                            </Typography>
                        </Box>
                    </Box>

                    {/* Desktop Nav */}
                    <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 0.5 }}>
                        {navLinks.map((link) => (
                            <Box key={link.label} sx={{ position: 'relative' }}>
                                <Button
                                    component={link.children ? 'button' : RouterLink}
                                    to={link.children ? undefined : link.path}
                                    onClick={link.children ? () => setServicesOpen(!servicesOpen) : undefined}
                                    sx={{
                                        color: isActive(link.path) ? '#F7A11A' : '#1A1A2E',
                                        fontWeight: isActive(link.path) ? 700 : 500,
                                        fontSize: '0.9rem',
                                        px: 1.5,
                                        py: 1,
                                        borderRadius: 2,
                                        '&:hover': { color: '#F7A11A', bgcolor: 'rgba(247,161,26,0.06)', transform: 'none' },
                                        boxShadow: 'none',
                                        background: 'transparent',
                                        transition: 'color 0.2s ease',
                                    }}
                                    endIcon={link.children ? <ExpandMoreIcon sx={{ fontSize: 16 }} /> : null}
                                >
                                    {link.label}
                                </Button>
                                {/* Dropdown for Services */}
                                {link.children && servicesOpen && (
                                    <AnimatePresence>
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.2 }}
                                            style={{
                                                position: 'absolute',
                                                top: '110%',
                                                left: 0,
                                                zIndex: 1000,
                                                background: '#fff',
                                                borderRadius: 12,
                                                boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                                                minWidth: 240,
                                                padding: '8px 0',
                                                border: '1px solid rgba(247,161,26,0.15)',
                                            }}
                                        >
                                            {link.children.map((child) => (
                                                <Box
                                                    key={child.label}
                                                    component={RouterLink}
                                                    to={child.path}
                                                    onClick={() => setServicesOpen(false)}
                                                    sx={{
                                                        display: 'block',
                                                        px: 2.5,
                                                        py: 1,
                                                        color: '#1A1A2E',
                                                        textDecoration: 'none',
                                                        fontSize: '0.875rem',
                                                        fontFamily: 'Outfit',
                                                        fontWeight: 500,
                                                        transition: 'all 0.2s',
                                                        '&:hover': { color: '#F7A11A', bgcolor: 'rgba(247,161,26,0.06)', pl: 3 },
                                                    }}
                                                >
                                                    {child.label}
                                                </Box>
                                            ))}
                                        </motion.div>
                                    </AnimatePresence>
                                )}
                            </Box>
                        ))}
                        <Button
                            component={RouterLink}
                            to="/quote"
                            variant="contained"
                            color="primary"
                            sx={{ ml: 2, px: 3, py: 1, fontSize: '0.875rem' }}
                        >
                            Get a Quote
                        </Button>
                    </Box>

                    {/* Mobile hamburger */}
                    <IconButton
                        sx={{ display: { xs: 'flex', lg: 'none' }, color: '#1A1A2E' }}
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{ sx: { width: 300, bgcolor: '#FFFFFF' } }}
            >
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                    <Typography sx={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.1rem', color: '#F7A11A' }}>
                        INSPIRE TRANSLATIONS
                    </Typography>
                    <IconButton onClick={() => setDrawerOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <List sx={{ px: 1, pt: 2 }}>
                    {navLinks.map((link) => (
                        <Box key={link.label}>
                            <ListItem
                                button
                                component={link.children ? 'div' : RouterLink}
                                to={link.children ? undefined : link.path}
                                onClick={link.children ? () => setServicesOpen(!servicesOpen) : undefined}
                                sx={{
                                    borderRadius: 2,
                                    mb: 0.5,
                                    color: isActive(link.path) ? '#F7A11A' : '#1A1A2E',
                                    '&:hover': { bgcolor: 'rgba(247,161,26,0.08)' },
                                }}
                            >
                                <ListItemText
                                    primary={link.label}
                                    primaryTypographyProps={{ fontFamily: 'Outfit', fontWeight: isActive(link.path) ? 700 : 500 }}
                                />
                                {link.children && (servicesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
                            </ListItem>
                            {link.children && (
                                <Collapse in={servicesOpen}>
                                    <List disablePadding sx={{ pl: 2 }}>
                                        {link.children.map((child) => (
                                            <ListItem
                                                key={child.label}
                                                button
                                                component={RouterLink}
                                                to={child.path}
                                                sx={{ borderRadius: 2, '&:hover': { bgcolor: 'rgba(247,161,26,0.06)' } }}
                                            >
                                                <ListItemText
                                                    primary={child.label}
                                                    primaryTypographyProps={{ fontSize: '0.875rem', fontFamily: 'Outfit', color: '#4A4A6A' }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </Box>
                    ))}
                    <Box sx={{ px: 2, pt: 2 }}>
                        <Button
                            component={RouterLink}
                            to="/quote"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                        >
                            Get a Quote
                        </Button>
                    </Box>
                </List>
            </Drawer>
        </>
    );
};

export default Navbar;
