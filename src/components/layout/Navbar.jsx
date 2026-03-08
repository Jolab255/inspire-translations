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
import ClickAwayListener from '@mui/material/ClickAwayListener';
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
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import TranslateIcon from '@mui/icons-material/Translate';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import VideocamIcon from '@mui/icons-material/Videocam';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { services, navLinks } from '../../data/siteData';
import { uiTranslations } from '../../data/translations/ui';

// Real logo
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

// ── Services mega‑dropdown ──────────────────────────────────────────
const ServicesDropdown = ({ onClose, scrolled }) => {
    const { language, t } = useLanguage();
    const ui = uiTranslations[language];
    
    // Updated top position since top bar is removed: Toolbar height (84px) or scrolled height (70px)
    const dropdownTop = scrolled ? '70px' : '84px';

    return (
        <ClickAwayListener onClickAway={onClose}>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                    position: 'fixed',
                    top: dropdownTop,
                    left: '7.5%', 
                    width: '85%', 
                    height: '60vh', 
                    zIndex: 1200,
                    background: '#ffffff',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.15)',
                    display: 'flex',
                    overflow: 'hidden',
                    borderTop: '1px solid rgba(247,161,26,0.2)',
                    borderRadius: 0, 
                }}
            >
                {/* Left Side: Services Content */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                    {/* Sticky Header inside Dropdown */}
                    <Box sx={{ 
                        px: 4, 
                        py: 2, 
                        bgcolor: '#fff', 
                        borderBottom: '1px solid rgba(0,0,0,0.06)',
                        zIndex: 10
                    }}>
                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#1A5C2A', fontSize: '1.1rem' }}>
                            {language === 'en' ? 'Our Professional Services' : 'Huduma Zetu za Kitaalamu'}
                        </Typography>
                    </Box>

                    {/* Scrollable Grid */}
                    <Box sx={{ 
                        flex: 1, 
                        p: { xs: 2, md: 4 }, 
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': { width: '6px' },
                        '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(247,161,26,0.3)', borderRadius: '10px' }
                    }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
                            {services.map((item) => (
                                <Box
                                    key={item.id}
                                    sx={{
                                        p: 2.5,
                                        borderRadius: 0,
                                        bgcolor: '#F7A11A', // Yellow background
                                        border: '1px solid rgba(0,0,0,0.05)',
                                        transition: 'all 0.25s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                        },
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: '0.95rem', color: '#1A5C2A' }}>
                                            {t(item.title)}
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ fontSize: '0.8rem', color: '#0D2B14', fontFamily: 'Inter', mb: 2.5, lineHeight: 1.6, height: '3.2em', overflow: 'hidden', fontWeight: 500 }}>
                                        {t(item.shortDesc)}
                                    </Typography>
                                    
                                    <Box sx={{ mt: 'auto', display: 'flex' }}>
                                        <Box
                                            component={RouterLink}
                                            to={`/${language}/services/${item.id}`}
                                            onClick={onClose}
                                            sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                textDecoration: 'none',
                                                border: '1.5px solid #1A5C2A',
                                                borderRadius: '50px',
                                                overflow: 'hidden',
                                                transition: 'all 0.3s ease',
                                                '&:hover': { bgcolor: 'rgba(26, 92, 42, 0.08)' }
                                            }}
                                        >
                                            <Typography sx={{ color: '#1A5C2A', fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: '0.7rem', px: 1.5, py: 0.5 }}>
                                                {language === 'en' ? 'Read More' : 'Soma Zaidi'}
                                            </Typography>
                                            <Box sx={{ bgcolor: '#1A5C2A', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <ArrowForwardIosIcon sx={{ color: '#fff', fontSize: '10px !important' }} />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>

                {/* Right Side */}
                <Box
                    sx={{
                        width: { md: 320, lg: 400 },
                        position: 'relative',
                        display: { xs: 'none', md: 'flex' },
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        p: 5,
                        bgcolor: '#1A1A2E',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundImage: 'url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.5,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'linear-gradient(to top, rgba(26,92,42,0.95) 0%, rgba(26,26,46,0.4) 100%)',
                        }}
                    />

                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Typography sx={{ color: '#F7A11A', fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: '0.85rem', mb: 1, textTransform: 'uppercase' }}>
                            {language === 'en' ? 'Excellence in Every Word' : 'Ubora katika Kila Neno'}
                        </Typography>
                        <Typography sx={{ color: '#FFFFFF', fontFamily: '"Inknut Antiqua", serif', fontWeight: 400, fontSize: '1.3rem', mb: 3, lineHeight: 1.3 }}>
                            {language === 'en' ? 'Trusted by global organizations for precise communication.' : 'Tunaaminiwa na mashirika ya kimataifa kwa mawasiliano sahihi.'}
                        </Typography>
                        
                        <Box
                            component={RouterLink}
                            to="/quote"
                            onClick={onClose}
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                border: '2px solid #F7A11A',
                                borderRadius: '50px',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                '&:hover': { bgcolor: 'rgba(247, 161, 26, 0.04)' }
                            }}
                        >
                            <Typography sx={{ color: '#F7A11A', fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: '0.85rem', px: 3, py: 1.2 }}>
                                {ui.getAQuote}
                            </Typography>
                            <Box sx={{ bgcolor: '#F7A11A', width: 46, height: 46, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ArrowForwardIosIcon sx={{ color: '#1A5C2A', fontSize: '14px !important' }} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </motion.div>
        </ClickAwayListener>
    );
};

// ── Logo component ───────────────────────────────────────────────────
const Logo = ({ height = 56 }) => {
    const { language } = useLanguage();
    return (
        <Box
            component={RouterLink}
            to={`/${language}`}
            sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                mr: 4,
                mt: 0,
                flexShrink: 0,
                p: 0,
                bgcolor: 'white',
                borderRadius: 0,
                transition: 'all 0.3s ease',
            }}
        >
            <Box
                component="img"
                src={logoImg}
                alt="Inspire Translations"
                sx={{
                    height,
                    minWidth: 160,
                    maxWidth: 240,
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                }}
            />
        </Box>
    );
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
            setScrolled(window.scrollY > 70);
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

    const isActive = (path) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

    return (
        <>
            <Box sx={{
                position: 'fixed',
                top: 0,
                zIndex: 1100,
                width: '100%',
                bgcolor: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.35s ease-in-out',
            }}>
                {/* ── Main AppBar ── */}
                <AppBar position="relative" elevation={0} sx={{ bgcolor: 'transparent', color: scrolled ? '#1A1A2E' : '#FFFFFF', overflow: 'visible' }}>
                    <Toolbar disableGutters sx={{ maxWidth: 1280, width: '100%', mx: 'auto', px: { xs: 2, md: 4 }, py: 0.5, minHeight: { xs: 70, md: 84 }, overflow: 'visible' }}>
                        <Logo height={70} />
                        <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 0, flexGrow: 1, justifyContent: 'center', overflow: 'visible' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: scrolled ? 'rgba(26, 92, 42, 0.08)' : 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', border: scrolled ? '1px solid rgba(26, 92, 42, 0.15)' : '1px solid rgba(255,255,255,0.15)', borderRadius: '100px', px: 1.5, py: 0.5, transition: 'all 0.35s ease' }}>
                                {navLinks.map((item) => (
                                    <Box key={item.path} sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                        <Button
                                            onClick={item.path === '/services' ? () => setServicesDropOpen(!servicesDropOpen) : undefined}
                                            component={item.path === '/services' ? 'button' : RouterLink}
                                            to={item.path === '/services' ? undefined : `/${language}${item.path === '/' ? '' : item.path}`}
                                            startIcon={isActive(item.path) ? <Box sx={{ color: '#F7A11A', display: 'flex', fontSize: 19 }}>{navIcons[item.path]}</Box> : null}
                                            endIcon={item.path === '/services' ? <ExpandMoreIcon sx={{ fontSize: '16px !important', ml: -0.5, opacity: 0.5, transition: 'transform 0.25s', transform: servicesDropOpen ? 'rotate(180deg)' : 'none' }} /> : null}
                                            sx={{
                                                color: scrolled ? (isActive(item.path) ? '#F7A11A' : '#1A5C2A') : '#FFFFFF',
                                                fontWeight: isActive(item.path) ? 700 : 500,
                                                fontFamily: '"Inknut Antiqua", serif',
                                                fontSize: '0.75rem',
                                                letterSpacing: '0.01em',
                                                px: 2, py: 1, borderRadius: '50px', textTransform: 'none',
                                                '&:hover': { color: '#F7A11A', bgcolor: scrolled ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.1)' },
                                                ...(isActive(item.path) && { bgcolor: scrolled ? 'rgba(247,161,26,0.08)' : 'rgba(255,255,255,0.12)' }),
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
                                    border: scrolled ? '1px solid #1A5C2A' : '1px solid #FFFFFF', 
                                    borderRadius: '50px', 
                                    overflow: 'hidden', 
                                    transition: 'all 0.35s ease', 
                                    '&:hover': { bgcolor: scrolled ? 'rgba(26, 92, 42, 0.04)' : 'rgba(255,255,255,0.1)' } 
                                }}
                            >
                                <Typography sx={{ color: scrolled ? '#1A5C2A' : '#FFFFFF', fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: '0.75rem', px: 2.5, py: 1 }}>
                                    {ui.getAQuote}
                                </Typography>
                                <Box sx={{ bgcolor: '#F7A11A', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <RequestQuoteIcon sx={{ color: '#1A5C2A', fontSize: 18 }} />
                                </Box>
                            </Box>

                            {/* Desktop Language Toggle */}
                            <Button 
                                onClick={toggleLanguage} 
                                size="small" 
                                sx={{ 
                                    minWidth: 'auto', 
                                    ml: 1.5,
                                    color: scrolled ? '#1A5C2A' : '#FFFFFF', 
                                    fontFamily: 'Outfit', 
                                    fontWeight: 700, 
                                    fontSize: '0.8rem', 
                                    px: 1.5,
                                    py: 0.6,
                                    borderRadius: '50px',
                                    border: scrolled ? '1.5px solid #1A5C2A' : '1.5px solid #FFFFFF',
                                    transition: 'all 0.3s ease',
                                    '&:hover': { 
                                        color: '#F7A11A', 
                                        borderColor: '#F7A11A', 
                                        bgcolor: 'transparent' 
                                    } 
                                }}
                            >
                                {language === 'en' ? 'SW' : 'EN'}
                            </Button>
                        </Box>

                        <Box sx={{ display: { xs: 'flex', lg: 'none' }, alignItems: 'center', gap: 1, ml: 'auto' }}>
                            <Button component={RouterLink} to={`/${language}/quote`} size="small" variant="contained" sx={{ background: 'linear-gradient(135deg, #F7A11A, #D4880E)', color: '#fff', fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, px: 2, fontSize: '0.7rem', borderRadius: 50 }}>{ui.quote}</Button>
                            
                            {/* Mobile Language Toggle */}
                            <Button 
                                onClick={toggleLanguage} 
                                size="small" 
                                sx={{ 
                                    minWidth: 'auto', 
                                    color: scrolled ? '#1A1A2E' : '#FFFFFF', 
                                    fontFamily: 'Outfit', 
                                    fontWeight: 700, 
                                    fontSize: '0.75rem', 
                                    px: 1,
                                    '&:hover': { bgcolor: 'transparent', color: '#F7A11A' } 
                                }}
                            >
                                {language === 'en' ? 'SW' : 'EN'}
                            </Button>

                            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: scrolled ? '#1A1A2E' : '#FFFFFF', bgcolor: scrolled ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.1)', borderRadius: 2 }}><MenuIcon /></IconButton>
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
