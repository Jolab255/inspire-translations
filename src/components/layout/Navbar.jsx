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
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';

// MUI Icons — filled style (Facebook-like: solid, recognisable)
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';          // filled
import InfoIcon from '@mui/icons-material/Info';          // filled
import BuildIcon from '@mui/icons-material/Build';         // filled — services
import WorkIcon from '@mui/icons-material/Work';          // filled — projects
import CollectionsIcon from '@mui/icons-material/Collections';   // filled
import ArticleIcon from '@mui/icons-material/Article';       // filled
import ContactMailIcon from '@mui/icons-material/ContactMail';   // filled
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';    // filled phone
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TranslateIcon from '@mui/icons-material/Translate';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import VideocamIcon from '@mui/icons-material/Videocam';      // filled
import SchoolIcon from '@mui/icons-material/School';        // filled
import EventIcon from '@mui/icons-material/Event';         // filled
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';   // filled
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';  // filled
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { motion, AnimatePresence } from 'framer-motion';

// Real logo
import logoImg from '../../assets/logos/Inspire_Translations_Logo.png';

// Service dropdown items — filled icons
const serviceItems = [
    { label: 'Written Translation', path: '/services/written-translation', icon: <TranslateIcon sx={{ fontSize: 18 }} />, color: '#F7A11A' },
    { label: 'On-Site Interpretation', path: '/services/onsite-interpretation', icon: <RecordVoiceOverIcon sx={{ fontSize: 18 }} />, color: '#1A5C2A' },
    { label: 'Remote Interpretation', path: '/services/remote-interpretation', icon: <VideocamIcon sx={{ fontSize: 18 }} />, color: '#F7A11A' },
    { label: 'Language Classes', path: '/services/language-classes', icon: <SchoolIcon sx={{ fontSize: 18 }} />, color: '#1A5C2A' },
    { label: 'Conference Logistics', path: '/services/conference-logistics', icon: <EventIcon sx={{ fontSize: 18 }} />, color: '#F7A11A' },
    { label: 'Equipment Rental', path: '/services/equipment-rental', icon: <HeadsetMicIcon sx={{ fontSize: 18 }} />, color: '#1A5C2A' },
];

// Main nav items — filled Facebook-style icons (only shown when active)
const mainNavItems = [
    { label: 'Home', path: '/', icon: <HomeIcon sx={{ fontSize: 19 }} /> },
    { label: 'Services', path: '/services', icon: <BuildIcon sx={{ fontSize: 19 }} />, children: serviceItems },
    { label: 'About Us', path: '/about', icon: <InfoIcon sx={{ fontSize: 19 }} /> },
    { label: 'Projects', path: '/projects', icon: <WorkIcon sx={{ fontSize: 19 }} /> },
    { label: 'Gallery', path: '/gallery', icon: <CollectionsIcon sx={{ fontSize: 19 }} /> },
    { label: 'Blog', path: '/blog', icon: <ArticleIcon sx={{ fontSize: 19 }} /> },
    { label: 'Contact', path: '/contact', icon: <ContactMailIcon sx={{ fontSize: 19 }} /> },
];

// ── Logo using real PNG ───────────────────────────────────────────────
const Logo = ({ height = 56, white = false }) => (
    <Box
        component={RouterLink}
        to="/"
        sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', mr: 4, flexShrink: 0 }}
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
                filter: white ? 'brightness(0) invert(1)' : 'none',
            }}
        />
    </Box>
);

// ── Services mega‑dropdown ──────────────────────────────────────────
const ServicesDropdown = ({ onClose }) => (
    <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
            position: 'fixed', // Use fixed to position relative to viewport
            top: '110px', // Below the navbar
            left: '20%', // 20% gap on left
            width: '60%', // 60% width
            zIndex: 1200,
            background: '#ffffff',
            borderRadius: 24,
            boxShadow: '0 40px 100px rgba(0,0,0,0.15)',
            padding: 0,
            border: '1px solid rgba(247,161,26,0.12)',
            display: 'flex',
            overflow: 'hidden',
        }}
    >
        {/* Left Side: Services List */}
        <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2, pb: 1.5, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <Typography sx={{ fontFamily: 'Outfit', fontWeight: 600, color: '#1A1A2E', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Our Language Services
                </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                {serviceItems.map((item) => (
                    <Box
                        key={item.label}
                        component={RouterLink}
                        to={item.path}
                        onClick={onClose}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            p: 1.5,
                            borderRadius: 3,
                            textDecoration: 'none',
                            transition: 'all 0.25s ease',
                            '&:hover': {
                                bgcolor: 'rgba(247,161,26,0.06)',
                                transform: 'translateX(4px)',
                                '& .service-icon-box': { bgcolor: '#F7A11A', '& svg': { color: '#fff !important' } },
                            },
                        }}
                    >
                        <Box
                            className="service-icon-box"
                            sx={{
                                width: 44,
                                height: 44,
                                borderRadius: '12px',
                                bgcolor: 'rgba(247,161,26,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                transition: 'all 0.3s ease',
                                '& svg': { color: '#F7A11A', fontSize: 22 },
                            }}
                        >
                            {item.icon}
                        </Box>
                        <Box>
                            <Typography
                                className="service-label"
                                sx={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.95rem', color: '#1A1A2E', transition: 'color 0.2s', lineHeight: 1.2, mb: 0.5 }}
                            >
                                {item.label}
                            </Typography>
                            <Typography sx={{ fontSize: '0.75rem', color: '#6A6A8A', fontFamily: 'Outfit', fontWeight: 400, lineHeight: 1 }}>
                                Professional · Tanzania
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>

        {/* Right Side: Image & CTA Block */}
        <Box
            sx={{
                width: 320,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                p: 4,
                bgcolor: '#1A1A2E',
                overflow: 'hidden',
            }}
        >
            {/* Background Image */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: 'url("https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.4,
                    transition: 'transform 0.5s ease',
                    '&:hover': { transform: 'scale(1.05)' }
                }}
            />
            {/* Gradient Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to top, rgba(26,26,46,0.95) 0%, rgba(26,26,46,0.2) 100%)',
                }}
            />

            {/* Content atop image */}
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography sx={{ color: '#F7A11A', fontFamily: 'Outfit', fontWeight: 300, fontSize: '0.85rem', letterSpacing: '0.1em', mb: 1, textTransform: 'uppercase' }}>
                    Global Reach
                </Typography>
                <Typography sx={{ color: '#FFFFFF', fontFamily: 'Outfit', fontWeight: 400, fontSize: '1.4rem', mb: 2, lineHeight: 1.2 }}>
                    Inspiring global communication through expert translations.
                </Typography>
                <Button
                    component={RouterLink}
                    to="/contact"
                    onClick={onClose}
                    endIcon={<ArrowForwardIosIcon sx={{ fontSize: '12px !important' }} />}
                    sx={{
                        color: '#1A1A2E',
                        bgcolor: '#F7A11A',
                        fontFamily: 'Outfit',
                        fontWeight: 500,
                        fontSize: '0.85rem',
                        px: 3,
                        py: 1.2,
                        borderRadius: 50,
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#fff' },
                        transition: 'all 0.3s ease',
                    }}
                >
                    Get Inspired
                </Button>
            </Box>
        </Box>
    </motion.div>
);

// ── Main Navbar component ─────────────────────────────────────────────
const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [servicesDropOpen, setServicesDropOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 70);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setDrawerOpen(false);
        setServicesDropOpen(false);
    }, [location]);

    const isActive = (path) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

    return (
        <>
            {/* ── Top bar ───────────────────────────────────────────── */}
            <Box sx={{ background: 'linear-gradient(90deg, #1A5C2A 0%, #0F3A1A 100%)', py: 0.65, display: { xs: 'none', md: 'block' } }}>
                <Box sx={{ maxWidth: 1280, mx: 'auto', px: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    {/* Left: phone + email */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                        {[
                            { icon: <LocalPhoneIcon sx={{ fontSize: 13, color: '#4ADE80' }} />, text: '+255 000 000 000' },
                            { icon: <EmailIcon sx={{ fontSize: 13, color: '#F7A11A' }} />, text: 'info@inspiretranslations.co.tz' },
                        ].map((item, i) => (
                            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.7, pr: 2.5, mr: i === 0 ? 2.5 : 0, borderRight: i === 0 ? '1px solid rgba(255,255,255,0.18)' : 'none' }}>
                                {item.icon}
                                <Typography sx={{ fontSize: '0.77rem', fontFamily: 'Inter', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.01em' }}>
                                    {item.text}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Right: ONE horizontal row — hours · separator · Available */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTimeFilledIcon sx={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }} />
                        <Typography sx={{ fontSize: '0.77rem', fontFamily: 'Inter', color: 'rgba(255,255,255,0.72)', whiteSpace: 'nowrap' }}>
                            Mon – Fri &nbsp;·&nbsp; 8:00 AM – 5:00 PM EAT
                        </Typography>
                        <Box sx={{ width: 1, height: 12, bgcolor: 'rgba(255,255,255,0.22)', mx: 0.5 }} />
                        <FiberManualRecordIcon sx={{ fontSize: 8, color: '#4ADE80', animation: 'pulseGlow 2s infinite' }} />
                        <Typography sx={{ fontSize: '0.77rem', fontFamily: 'Outfit', fontWeight: 600, color: '#4ADE80', whiteSpace: 'nowrap', letterSpacing: '0.04em' }}>
                            Available
                        </Typography>
                    </Box>

                </Box>
            </Box>

            {/* ── Main AppBar ───────────────────────────────────────── */}
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    bgcolor: scrolled ? 'rgba(255,255,255,0.97)' : '#FFFFFF',
                    backdropFilter: scrolled ? 'blur(24px)' : 'none',
                    borderBottom: scrolled ? 'none' : '1px solid rgba(0,0,0,0.06)',
                    boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.10)' : 'none',
                    transition: 'all 0.35s ease',
                    color: '#1A1A2E',
                    top: 0,
                    overflow: 'visible',  // let tabs extend below
                    zIndex: 1100,
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        maxWidth: 1280,
                        width: '100%',
                        mx: 'auto',
                        px: { xs: 2, md: 4 },
                        py: 0.5,
                        minHeight: { xs: 70, md: 84 },
                        overflow: 'visible',
                    }}
                >
                    {/* ── Logo ── */}
                    <Logo height={70} />

                    {/* ── Desktop Nav Items ── */}
                    <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'stretch', gap: 0.3, flexGrow: 1, overflow: 'visible' }}>
                        {mainNavItems.map((item) => (
                            <Box
                                key={item.label}
                                sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}
                                onMouseEnter={() => item.children && setServicesDropOpen(true)}
                                onMouseLeave={() => item.children && setServicesDropOpen(false)}
                            >
                                <Button
                                    component={item.children ? 'button' : RouterLink}
                                    to={item.children ? undefined : item.path}
                                    startIcon={
                                        isActive(item.path) ? (
                                            <Box sx={{ color: '#F7A11A', display: 'flex', fontSize: 19 }}>
                                                {item.icon}
                                            </Box>
                                        ) : null
                                    }
                                    endIcon={
                                        item.children
                                            ? <ExpandMoreIcon sx={{ fontSize: '16px !important', ml: -0.5, opacity: 0.5, transition: 'transform 0.25s', transform: servicesDropOpen ? 'rotate(180deg)' : 'none' }} />
                                            : null
                                    }
                                    sx={{
                                        color: isActive(item.path) ? '#F7A11A' : '#1A1A2E',
                                        fontWeight: isActive(item.path) ? 700 : 500,
                                        fontFamily: '"Roboto Mono", "Space Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                                        fontSize: '0.85rem',
                                        letterSpacing: '0.01em',
                                        px: 2.5, // slightly more padding for a "pill" look
                                        py: 1,
                                        borderRadius: '50px', // Pill shape
                                        textTransform: 'none',
                                        position: 'relative',
                                        zIndex: 2,
                                        bgcolor: 'transparent',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            color: '#F7A11A',
                                            bgcolor: 'rgba(247,161,26,0.08)',
                                            border: '1px solid rgba(247,161,26,0.15)',
                                            transform: 'translateY(-2px) scale(1.02)',
                                            boxShadow: '0 4px 12px rgba(247,161,26,0.1)',
                                        },
                                        // Active state pill border/background
                                        ...(isActive(item.path) && {
                                            bgcolor: 'rgba(247,161,26,0.1)',
                                            border: '1px solid rgba(247,161,26,0.2)',
                                        }),
                                    }}
                                >
                                    {item.label}
                                </Button>

                                {/* Services Dropdown */}
                                {
                                    item.children && (
                                        <AnimatePresence>
                                            {servicesDropOpen && (
                                                <ServicesDropdown onClose={() => setServicesDropOpen(false)} />
                                            )}
                                        </AnimatePresence>
                                    )
                                }
                            </Box>
                        ))}
                    </Box>

                    {/* ── Desktop Right Actions ── */}
                    <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 1.5, ml: 2 }}>
                        <Tooltip title="Call Us" arrow>
                            <IconButton
                                href="tel:+255000000000"
                                size="small"
                                sx={{
                                    bgcolor: 'rgba(247,161,26,0.08)',
                                    color: '#F7A11A',
                                    '&:hover': { bgcolor: '#F7A11A', color: '#fff', transform: 'scale(1.1)' },
                                    transition: 'all 0.25s ease',
                                }}
                            >
                                <PhoneIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="WhatsApp" arrow>
                            <IconButton
                                href="https://wa.me/255000000000"
                                target="_blank"
                                size="small"
                                sx={{
                                    bgcolor: 'rgba(37,211,102,0.1)',
                                    color: '#25D366',
                                    '&:hover': { bgcolor: '#25D366', color: '#fff', transform: 'scale(1.1)' },
                                    transition: 'all 0.25s ease',
                                }}
                            >
                                <WhatsAppIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                        </Tooltip>
                        <Button
                            component={RouterLink}
                            to="/quote"
                            variant="contained"
                            startIcon={<RequestQuoteIcon sx={{ fontSize: '18px !important' }} />}
                            sx={{
                                background: 'linear-gradient(135deg, #F7A11A 0%, #D4880E 100%)',
                                color: '#fff',
                                fontFamily: '"Roboto Mono", "Space Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                                fontWeight: 700,
                                fontSize: '0.85rem',
                                px: 2.5,
                                py: 1,
                                borderRadius: 50,
                                boxShadow: '0 4px 16px rgba(247,161,26,0.35)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #D4880E 0%, #F7A11A 100%)',
                                    boxShadow: '0 8px 24px rgba(247,161,26,0.45)',
                                    transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.25s ease',
                            }}
                        >
                            Get a Quote
                        </Button>
                    </Box>

                    {/* ── Mobile hamburger ── */}
                    <Box sx={{ display: { xs: 'flex', lg: 'none' }, alignItems: 'center', gap: 1, ml: 'auto' }}>
                        <Button
                            component={RouterLink}
                            to="/quote"
                            size="small"
                            variant="contained"
                            sx={{ background: 'linear-gradient(135deg, #F7A11A, #D4880E)', color: '#fff', fontFamily: '"Roboto Mono", "Space Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace', fontWeight: 700, px: 2, fontSize: '0.8rem', borderRadius: 50 }}
                        >
                            Quote
                        </Button>
                        <IconButton
                            onClick={() => setDrawerOpen(true)}
                            sx={{ color: '#1A1A2E', bgcolor: 'rgba(0,0,0,0.04)', borderRadius: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar >

            {/* ── Mobile Drawer ───────────────────────────────────────── */}
            < Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: {
                        width: 310,
                        bgcolor: '#FFFFFF',
                        borderRadius: '16px 0 0 16px',
                    },
                }}
            >
                {/* Drawer header */}
                < Box sx={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #0F3A1A 100%)', p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box
                        component="img"
                        src={logoImg}
                        alt="Inspire Translations"
                        sx={{ height: 40, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                    />
                    <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                        <CloseIcon />
                    </IconButton>
                </Box >

                {/* Mobile nav list */}
                < List sx={{ px: 1.5, pt: 2 }}>
                    {
                        mainNavItems.map((item) => (
                            <Box key={item.label}>
                                <ListItem disablePadding sx={{ mb: 0.3 }}>
                                    <ListItemButton
                                        component={item.children ? 'div' : RouterLink}
                                        to={item.children ? undefined : item.path}
                                        onClick={item.children ? () => setMobileServicesOpen(!mobileServicesOpen) : undefined}
                                        sx={{
                                            borderRadius: 2.5,
                                            px: 2,
                                            py: 1.1,
                                            bgcolor: isActive(item.path) ? 'rgba(247,161,26,0.1)' : 'transparent',
                                            '&:hover': { bgcolor: 'rgba(247,161,26,0.08)' },
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 36,
                                                color: isActive(item.path) ? '#F7A11A' : '#9E9E9E',
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                fontFamily: 'Outfit',
                                                fontWeight: isActive(item.path) ? 700 : 500,
                                                fontSize: '0.95rem',
                                                color: isActive(item.path) ? '#F7A11A' : '#1A1A2E',
                                            }}
                                        />
                                        {item.children && (mobileServicesOpen
                                            ? <ExpandLessIcon sx={{ color: '#9E9E9E', fontSize: 18 }} />
                                            : <ExpandMoreIcon sx={{ color: '#9E9E9E', fontSize: 18 }} />
                                        )}
                                    </ListItemButton>
                                </ListItem>

                                {/* Services sub-menu */}
                                {item.children && (
                                    <Collapse in={mobileServicesOpen}>
                                        <List disablePadding sx={{ pl: 1.5, mb: 1 }}>
                                            {item.children.map((child) => (
                                                <ListItem key={child.label} disablePadding>
                                                    <ListItemButton
                                                        component={RouterLink}
                                                        to={child.path}
                                                        sx={{ borderRadius: 2, py: 0.8, px: 1.5, '&:hover': { bgcolor: 'rgba(247,161,26,0.06)' } }}
                                                    >
                                                        <ListItemIcon sx={{ minWidth: 30, color: child.color }}>
                                                            {child.icon}
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={child.label}
                                                            primaryTypographyProps={{ fontSize: '0.85rem', fontFamily: 'Outfit', fontWeight: 500, color: '#4A4A6A' }}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                )}
                            </Box>
                        ))
                    }
                </List >

                <Divider sx={{ mx: 2 }} />

                {/* Drawer contact section */}
                <Box sx={{ px: 2.5, py: 3 }}>
                    <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '0.75rem', color: '#9E9E9E', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 2 }}>
                        Get in Touch
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ width: 34, height: 34, borderRadius: 2, bgcolor: 'rgba(247,161,26,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <PhoneIcon sx={{ fontSize: 16, color: '#F7A11A' }} />
                            </Box>
                            <Typography sx={{ fontFamily: 'Inter', fontSize: '0.875rem', color: '#1A1A2E' }}>+255 000 000 000</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ width: 34, height: 34, borderRadius: 2, bgcolor: 'rgba(37,211,102,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <WhatsAppIcon sx={{ fontSize: 16, color: '#25D366' }} />
                            </Box>
                            <Typography sx={{ fontFamily: 'Inter', fontSize: '0.875rem', color: '#1A1A2E' }}>WhatsApp Us</Typography>
                        </Box>
                    </Box>
                    <Button
                        component={RouterLink}
                        to="/quote"
                        variant="contained"
                        fullWidth
                        startIcon={<RequestQuoteIcon />}
                        sx={{
                            mt: 3,
                            background: 'linear-gradient(135deg, #F7A11A 0%, #D4880E 100%)',
                            color: '#fff',
                            fontFamily: 'Outfit',
                            fontWeight: 700,
                            py: 1.3,
                            borderRadius: 50,
                            boxShadow: '0 4px 16px rgba(247,161,26,0.3)',
                        }}
                    >
                        Request a Free Quote
                    </Button>
                </Box>
            </Drawer >
        </>
    );
};

export default Navbar;
