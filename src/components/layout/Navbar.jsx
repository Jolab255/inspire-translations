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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Portal } from '@mui/material';

// MUI Icons
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import WorkIcon from '@mui/icons-material/Work';
import CollectionsIcon from '@mui/icons-material/Collections';
import ArticleIcon from '@mui/icons-material/Article';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TranslateIcon from '@mui/icons-material/Translate';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import VideocamIcon from '@mui/icons-material/Videocam';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

import { AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { services, navLinks } from '../../data/siteData';
import { uiTranslations } from '../../data/translations/ui';

import NavbarLogo from './NavbarLogo';
import ServicesDropdown from './ServicesDropdown';
import logoImg from '../../assets/logos/Inspire_Translations_Logo.png';

// Service icons mapping
const serviceIcons = {
    'written-translation': <TranslateIcon sx={{ fontSize: 18 }} />,
    'onsite-interpretation': <RecordVoiceOverIcon sx={{ fontSize: 18 }} />,
    'remote-interpretation': <VideocamIcon sx={{ fontSize: 18 }} />,
    'language-classes': <SchoolIcon sx={{ fontSize: 18 }} />,
    'conference-logistics': <EventIcon sx={{ fontSize: 18 }} />,
    'equipment-rental': <HeadsetMicIcon sx={{ fontSize: 18 }} />,
};

const navIcons = {
    '/': <HomeIcon sx={{ fontSize: 19 }} />,
    '/services': <BuildIcon sx={{ fontSize: 19 }} />,
    '/about': <InfoIcon sx={{ fontSize: 19 }} />,
    '/projects': <WorkIcon sx={{ fontSize: 19 }} />,
    '/gallery': <CollectionsIcon sx={{ fontSize: 19 }} />,
    '/blog': <ArticleIcon sx={{ fontSize: 19 }} />,
    '/contact': <ContactMailIcon sx={{ fontSize: 19 }} />,
};

// ── Main Navbar ──
const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [servicesDropOpen, setServicesDropOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { language, toggleLanguage, t } = useLanguage();
    const ui = uiTranslations[language];
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mega menu is open
    useEffect(() => {
        if (servicesDropOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [servicesDropOpen]);

    useEffect(() => {
        setDrawerOpen(false);
        setServicesDropOpen(false);
    }, [location]);

    const isActive = (path) => {
        // Strip language prefix (e.g., /en/about -> /about)
        const currentPath = location.pathname.replace(/^\/(en|sw)/, '') || '/';
        if (path === '/') return currentPath === '/';
        return currentPath.startsWith(path);
    };

    return (
        <>
            <Box sx={{
                position: 'fixed',
                top: 0,
                zIndex: 1100,
                width: '100%',
                bgcolor: scrolled ? 'rgba(255,255,255,0.98)' : '#0D2B14',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.1)' : 'none',
                transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease',
            }}>
                {/* ── Main AppBar ── */}
                <AppBar position="static" elevation={0} sx={{ bgcolor: 'transparent', color: scrolled ? '#0D2B14' : '#FFFFFF', transition: 'color 0.4s ease' }}>
                    <Toolbar disableGutters sx={{ 
                        maxWidth: 1280, 
                        width: '100%', 
                        mx: 'auto', 
                        px: { xs: 1.5, sm: 2, md: 4 }, 
                        height: { xs: 70, md: 90 }, // Fixed heights to prevent squeezing
                        minHeight: { xs: 70, md: 90 }, 
                        overflow: 'visible' 
                    }}>
                        <NavbarLogo height={64} scrolled={scrolled} />
                        <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 0, flexGrow: 1, justifyContent: 'center', overflow: 'visible' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: scrolled ? 'rgba(13, 43, 20, 0.08)' : 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: scrolled ? '1px solid rgba(13, 43, 20, 0.15)' : '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '100px', px: 1.5, py: 0.5, transition: 'all 0.35s ease' }}>
                                {navLinks.map((item) => (
                                    <Box key={item.path} sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                        <Button
                                            onClick={item.path === '/services' ? () => setServicesDropOpen(!servicesDropOpen) : undefined}
                                            component={item.path === '/services' ? 'button' : RouterLink}
                                            to={item.path === '/services' ? undefined : `/${language}${item.path === '/' ? '' : item.path}`}
                                            startIcon={isActive(item.path) ? <Box sx={{ color: scrolled ? '#0D2B14' : '#FFFFFF', display: 'flex', fontSize: 19 }}>{navIcons[item.path]}</Box> : null}
                                            endIcon={item.path === '/services' ? <ExpandMoreIcon sx={{ fontSize: '16px !important', ml: -0.5, opacity: 0.5, transition: 'transform 0.25s', transform: servicesDropOpen ? 'rotate(180deg)' : 'none', color: scrolled ? 'inherit' : '#FFFFFF' }} /> : null}
                                            sx={{
                                                color: scrolled ? '#0D2B14' : '#FFFFFF',
                                                fontWeight: isActive(item.path) ? 700 : 500,
                                                fontFamily: '"Inknut Antiqua", serif',
                                                fontSize: '0.75rem',
                                                letterSpacing: '0.01em',
                                                px: 2, py: 0.6, borderRadius: '100px', textTransform: 'none',
                                                border: isActive(item.path) 
                                                    ? (scrolled ? '1px solid #0D2B14' : '1px solid #FFFFFF')
                                                    : '1px solid transparent',
                                                bgcolor: isActive(item.path)
                                                    ? (scrolled ? 'rgba(13, 43, 20, 0.08)' : 'rgba(255, 255, 255, 0.15)')
                                                    : 'transparent',
                                                '&:hover': { 
                                                    color: scrolled ? '#0D2B14' : '#FFFFFF', 
                                                    bgcolor: scrolled ? 'rgba(13, 43, 20, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                                                    boxShadow: 'none',
                                                    transform: 'none'
                                                },
                                            }}
                                        >
                                            {t(item.label)}
                                        </Button>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 1.5, ml: 2 }}>
                            {/* Signature Pill Arrow Button */}
                            <Box 
                                component={RouterLink} 
                                to={`/${language}/quote`} 
                                sx={{ 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    textDecoration: 'none', 
                                    border: scrolled ? '1px solid #0D2B14' : '1px solid #FFFFFF', 
                                    borderRadius: '50px', 
                                    overflow: 'hidden', 
                                    transition: 'all 0.35s ease', 
                                    '&:hover': { bgcolor: scrolled ? 'rgba(13, 43, 20, 0.08)' : 'rgba(255, 255, 255, 0.1)' } 
                                }}
                            >
                                <Typography sx={{ color: scrolled ? '#0D2B14' : '#FFFFFF', fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: '0.75rem', px: 2, py: 0.6 }}>
                                    {ui.getAQuote}
                                </Typography>
                                <Box sx={{ bgcolor: '#F7A11A', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: scrolled ? '1px solid #0D2B14' : '1px solid #FFFFFF' }}>
                                    <RequestQuoteIcon sx={{ color: '#0D2B14', fontSize: 18 }} />
                                </Box>
                            </Box>

                            {/* Desktop Language Toggle */}
                            <Button 
                                onClick={toggleLanguage} 
                                size="small" 
                                sx={{ 
                                    minWidth: 'auto', 
                                    ml: 1.5,
                                    color: scrolled ? '#0D2B14' : '#FFFFFF', 
                                    fontFamily: 'Outfit', 
                                    fontWeight: 700, 
                                    fontSize: '0.8rem', 
                                    px: 1.5,
                                    py: 0.6,
                                    borderRadius: '50px',
                                    border: scrolled ? '1.5px solid #0D2B14' : '1.5px solid #FFFFFF',
                                    transition: 'all 0.3s ease',
                                    '&:hover': { 
                                        color: scrolled ? '#0D2B14' : '#FFFFFF', 
                                        borderColor: scrolled ? '#0D2B14' : '#FFFFFF', 
                                        bgcolor: scrolled ? 'rgba(13, 43, 20, 0.08)' : 'rgba(255, 255, 255, 0.1)' 
                                    } 
                                }}
                            >
                                {language === 'en' ? 'SW' : 'EN'}
                            </Button>

                            {/* Hard Link for Admin Dashboard */}
                            <Box 
                                component="a" 
                                href="/admin/" 
                                sx={{ 
                                    ml: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    border: scrolled ? '1px solid rgba(13, 43, 20, 0.2)' : '1px solid rgba(255, 255, 255, 0.3)',
                                    color: scrolled ? '#0D2B14' : '#FFFFFF',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        color: scrolled ? '#0D2B14' : '#FFFFFF',
                                        borderColor: scrolled ? '#0D2B14' : '#FFFFFF',
                                        transform: 'scale(1.1)',
                                        bgcolor: scrolled ? 'rgba(13, 43, 20, 0.08)' : 'rgba(255, 255, 255, 0.1)'
                                    }
                                }}
                                title="Admin Dashboard"
                            >
                                <WorkIcon sx={{ fontSize: 16 }} />
                            </Box>
                        </Box>

                        <Box sx={{ display: { xs: 'flex', lg: 'none' }, alignItems: 'center', gap: { xs: 0.5, sm: 1 }, ml: 'auto' }}>
                            <Button component={RouterLink} to={`/${language}/quote`} size="small" variant="contained" sx={{ background: 'linear-gradient(135deg, #F7A11A, #D4880E)', color: '#0D2B14', fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, px: { xs: 1.5, sm: 2 }, py: 0.5, minWidth: 'auto', fontSize: { xs: '0.65rem', sm: '0.7rem' }, borderRadius: 50, border: scrolled ? '1px solid #0D2B14' : '1px solid #FFFFFF' }}>{ui.quote}</Button>
                            
                            {/* Mobile Language Toggle */}
                            <Button 
                                onClick={toggleLanguage} 
                                size="small" 
                                sx={{ 
                                    minWidth: 'auto', 
                                    color: scrolled ? '#0D2B14' : '#FFFFFF', 
                                    fontFamily: 'Outfit', 
                                    fontWeight: 700, 
                                    fontSize: { xs: '0.7rem', sm: '0.75rem' }, 
                                    px: { xs: 0.5, sm: 1 },
                                    '&:hover': { bgcolor: 'transparent', color: scrolled ? '#0D2B14' : '#FFFFFF' } 
                                }}
                            >
                                {language === 'en' ? 'SW' : 'EN'}
                            </Button>

                            <IconButton onClick={() => setDrawerOpen(true)} size="small" sx={{ color: scrolled ? '#0D2B14' : '#FFFFFF', bgcolor: scrolled ? 'rgba(13, 43, 20, 0.08)' : 'rgba(255, 255, 255, 0.1)', borderRadius: 2, p: { xs: 0.5, sm: 1 } }}><MenuIcon fontSize="small" /></IconButton>
                        </Box>
                    </Toolbar>
                </AppBar >
            </Box>

            {/* Services Dropdown via Portal */}
            <AnimatePresence>
                {servicesDropOpen && (
                    <Portal>
                        <ServicesDropdown onClose={() => setServicesDropOpen(false)} scrolled={scrolled} />
                    </Portal>
                )}
            </AnimatePresence>

            {/* Mobile Drawer */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: 310, bgcolor: '#FFFFFF', borderRadius: '16px 0 0 16px' } }}>
                <Box sx={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #0F3A1A 100%)', p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box component="img" src={logoImg} alt="Inspire Translations" sx={{ height: 40, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                    <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#fff' } }}><CloseIcon /></IconButton>
                </Box >
                <List sx={{ px: 1.5, pt: 2 }}>
                    {navLinks.map((item) => (
                        <Box key={item.path}>
                            <ListItem disablePadding sx={{ mb: 0.3 }}>
                                <ListItemButton component={item.path === '/services' ? 'div' : RouterLink} to={item.path === '/services' ? undefined : `/${language}${item.path === '/' ? '' : item.path}`} onClick={item.path === '/services' ? () => setMobileServicesOpen(!mobileServicesOpen) : undefined} sx={{ borderRadius: 2.5, px: 2, py: 1.1, bgcolor: isActive(item.path) ? 'rgba(247,161,26,0.1)' : 'transparent' }}>
                                    <ListItemIcon sx={{ minWidth: 36, color: isActive(item.path) ? '#F7A11A' : '#9E9E9E' }}>{navIcons[item.path]}</ListItemIcon>
                                    <ListItemText primary={t(item.label)} primaryTypographyProps={{ fontFamily: 'Outfit', fontWeight: isActive(item.path) ? 700 : 500, fontSize: '0.95rem', color: isActive(item.path) ? '#F7A11A' : '#1A1A2E' }} />
                                    {item.path === '/services' && (mobileServicesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
                                </ListItemButton>
                            </ListItem>
                            {item.path === '/services' && (
                                <Collapse in={mobileServicesOpen}>
                                    <List disablePadding sx={{ pl: 1.5, mb: 1 }}>
                                        {services.map((child) => (
                                            <ListItem key={child.id} disablePadding>
                                                <ListItemButton component={RouterLink} to={`/${language}/services/${child.id}`} sx={{ borderRadius: 2, py: 0.8, px: 1.5 }}>
                                                    <ListItemIcon sx={{ minWidth: 30, color: child.color }}>{serviceIcons[child.id]}</ListItemIcon>
                                                    <ListItemText primary={t(child.title)} primaryTypographyProps={{ fontSize: '0.85rem', fontFamily: 'Outfit', fontWeight: 500, color: '#4A4A6A' }} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </Box>
                    ))}
                </List >
                <Divider sx={{ mx: 2 }} />
                <Box sx={{ px: 2.5, py: 3 }}>
                    <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '0.75rem', color: '#9E9E9E', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 2 }}>{language === 'en' ? 'Get in Touch' : 'Wasiliana Nasi'}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ width: 34, height: 34, borderRadius: 2, bgcolor: 'rgba(247,161,26,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PhoneIcon sx={{ fontSize: 16, color: '#F7A11A' }} /></Box>
                            <Typography sx={{ fontFamily: 'Inter', fontSize: '0.875rem', color: '#1A1A2E' }}>+255 759 704 170</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ width: 34, height: 34, borderRadius: 2, bgcolor: 'rgba(37,211,102,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><WhatsAppIcon sx={{ fontSize: 16, color: '#25D366' }} /></Box>
                            <Typography sx={{ fontFamily: 'Inter', fontSize: '0.875rem', color: '#1A1A2E' }}>{language === 'en' ? 'WhatsApp Us' : 'Tuandikie WhatsApp'}</Typography>
                        </Box>
                    </Box>
                    <Button component={RouterLink} to={`/${language}/quote`} variant="contained" fullWidth startIcon={<RequestQuoteIcon />} sx={{ mt: 3, background: 'linear-gradient(135deg, #F7A11A 0%, #D4880E 100%)', color: '#fff', fontFamily: 'Outfit', fontWeight: 700, py: 1.3, borderRadius: 50 }}>{ui.getAQuote}</Button>
                </Box>
            </Drawer >
        </>
    );
};

export default Navbar;
