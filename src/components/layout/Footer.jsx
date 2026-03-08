import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';

import customerCare from '../../assets/images/customer_care.png';
import arrowImg from '../../assets/images/arrows.png';
import serviceEquipment from '../../assets/images/equipment_rental.png';

const COLORS = {
    primary: '#1A5C2A',
    accent: '#F7A11A',
    white: '#FFFFFF',
};

const TypewriterText = ({ text, sx, variant = "h2", delay = 0, ...props }) => {
    const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });
    const letters = Array.from(text);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.04, delayChildren: delay || 0.1 }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 25, filter: 'blur(6px)', scale: 0.85 },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            scale: 1,
            transition: { type: "spring", damping: 12, stiffness: 140 }
        }
    };

    return (
        <Typography
            component={motion.div}
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variant={variant}
            sx={{ display: 'flex', flexWrap: 'wrap', ...sx }}
            {...props}
        >
            {letters.map((char, index) => (
                <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
                    {char}
                </motion.span>
            ))}
        </Typography>
    );
};

const Footer = () => {
    const { language } = useLanguage();
    const ui = uiTranslations[language];

    const content = {
        en: {
            tagline: "Precision. Culture. Trust.",
            contactUs: "Contact Us!",
            address: "123 Translation Ave, Dar es Salaam, Tanzania",
            hours: "Mon - Fri: 9.00am - 17.00pm",
            closed: "Weekends & Holidays: Closed",
            quickLinks: "Quick Links",
            subscribe: "Subscribe Newsletter",
            subscribeDesc: "Join our mailing list to get the latest updates, news, and insights from the world of professional translation.",
            emailLabel: "Your Email Address",
            subscribeBtn: "Subscribe",
            rights: "All Rights Reserved.",
            developedBy: "Developed by",
            privacy: "Privacy Policy",
            terms: "Terms & Conditions",
            links: [
                { label: 'About Us', path: '/about' },
                { label: 'Services', path: '/services' },
                { label: 'Our Work', path: '/projects' },
                { label: 'Blog', path: '/blog' },
                { label: 'Contact Us', path: '/contact' },
            ]
        },
        sw: {
            tagline: "Usahihi. Utamaduni. Imani.",
            contactUs: "Wasiliana Nasi!",
            address: "123 Translation Ave, Dar es Salaam, Tanzania",
            hours: "Jumatatu - Ijumaa: 3.00 Asubuhi - 11.00 Jioni",
            closed: "Wikiendi na Likizo: Tumefunga",
            quickLinks: "Viungo vya Haraka",
            subscribe: "Jisajili na Jarida Letu",
            subscribeDesc: "Jiunge na orodha yetu ya barua pepe ili kupata sasisho, habari, na maarifa ya hivi punde kutoka ulimwengu wa tafsiri ya kitaalamu.",
            emailLabel: "Anwani Yako ya Barua Pepe",
            subscribeBtn: "Jisajili",
            rights: "Haki zote zimehifadhiwa.",
            developedBy: "Imeundwa na",
            privacy: "Sera ya Faragha",
            terms: "Vigezo na Masharti",
            links: [
                { label: 'Kuhusu Sisi', path: '/about' },
                { label: 'Huduma', path: '/services' },
                { label: 'Kazi Zetu', path: '/projects' },
                { label: 'Blogu', path: '/blog' },
                { label: 'Wasiliana Nasi', path: '/contact' },
            ]
        }
    };

    const c = content[language];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const socialLinks = [
        { icon: <FacebookIcon fontSize="small" />, href: 'https://facebook.com/inspiretranslations', label: 'Facebook' },
        { icon: <LinkedInIcon fontSize="small" />, href: 'https://linkedin.com/company/inspiretranslations', label: 'LinkedIn' },
        { icon: <InstagramIcon fontSize="small" />, href: 'https://instagram.com/inspiretranslations', label: 'Instagram' },
        { icon: <YouTubeIcon fontSize="small" />, href: '#', label: 'YouTube' },
    ];

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: COLORS.primary,
                color: COLORS.white,
                pt: 8,
                pb: 6,
                position: 'relative',
                overflow: 'hidden',
                fontFamily: '"Inter", sans-serif'
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 5, gap: 3 }}>
                    <TypewriterText
                        key={`footer-tagline-${language}`}
                        text={c.tagline}
                        variant="h2"
                        sx={{
                            fontFamily: '"Inknut Antiqua", serif',
                            fontWeight: 800,
                            fontSize: { xs: '2rem', md: '2.8rem' },
                            color: COLORS.white,
                            lineHeight: 1.2,
                            textAlign: { xs: 'center', md: 'left' },
                            maxWidth: { xs: '100%', md: '800px' }
                        }}
                    />

                    <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: { xs: 'center', md: 'flex-end' } }}>
                            {socialLinks.map((s, i) => (
                                <IconButton
                                    key={i}
                                    href={s.href}
                                    target="_blank"
                                    sx={{
                                        color: COLORS.white,
                                        width: 38,
                                        height: 38,
                                        border: `1.5px solid rgba(255,255,255,0.3)`,
                                        '&:hover': {
                                            bgcolor: COLORS.accent,
                                            color: COLORS.white,
                                            borderColor: COLORS.accent,
                                            transform: 'translateY(-3px)'
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {s.icon}
                                </IconButton>
                            ))}
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.2)', mb: 8 }} />

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4, mb: 8 }}>
                    {/* Contact Card */}
                    <Card sx={{ display: 'flex', flexDirection: 'column', border: `3px solid ${COLORS.white}`, borderRadius: 0, boxShadow: 'none', background: 'transparent' }}>
                        <Typography variant="h5" sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 800, color: COLORS.primary, bgcolor: COLORS.white, textAlign: 'center', p: 1.5, fontSize: '1.2rem' }}>
                            {c.contactUs}
                        </Typography>
                        <CardContent sx={{ p: 2.5, pt: 3 }}>
                            <Box component="img" src={customerCare} sx={{ width: '100%', height: 220, objectFit: 'cover', mb: 3 }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Avatar sx={{ bgcolor: `${COLORS.accent}22`, color: COLORS.accent, width: 36, height: 36 }}>
                                        <LocationOnIcon fontSize="small" />
                                    </Avatar>
                                    <Typography variant="body2" sx={{ color: COLORS.white, fontFamily: '"Inknut Antiqua", serif' }}>{c.address}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Avatar sx={{ bgcolor: `${COLORS.accent}22`, color: COLORS.accent, width: 36, height: 36 }}>
                                        <PhoneIcon fontSize="small" />
                                    </Avatar>
                                    <Typography variant="body2" sx={{ color: COLORS.white, fontFamily: '"Inknut Antiqua", serif' }}>+255 759 704 170</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Avatar sx={{ bgcolor: `${COLORS.accent}22`, color: COLORS.accent, width: 36, height: 36 }}>
                                        <EmailIcon fontSize="small" />
                                    </Avatar>
                                    <Typography variant="body2" sx={{ color: COLORS.white, fontFamily: '"Inknut Antiqua", serif' }}>info@inspiretranslations.co.tz</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Avatar sx={{ bgcolor: `${COLORS.accent}22`, color: COLORS.accent, width: 36, height: 36 }}>
                                        <AccessTimeIcon fontSize="small" />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="body2" sx={{ color: COLORS.white, fontFamily: '"Inknut Antiqua", serif' }}>{c.hours}</Typography>
                                        <Typography variant="caption" sx={{ color: COLORS.accent, fontWeight: 600, fontFamily: '"Inknut Antiqua", serif' }}>{c.closed}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Links Card */}
                    <Card sx={{ display: 'flex', flexDirection: 'column', border: `3px solid ${COLORS.white}`, borderRadius: 0, boxShadow: 'none', background: 'transparent' }}>
                        <Typography variant="h5" sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 800, color: COLORS.primary, bgcolor: COLORS.white, textAlign: 'center', p: 1.5, fontSize: '1.2rem' }}>
                            {c.quickLinks}
                        </Typography>
                        <CardContent sx={{ p: 2.5, pt: 3 }}>
                            <Box component="img" src={arrowImg} sx={{ width: '100%', height: 220, objectFit: 'cover', mb: 3 }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {c.links.map((link) => (
                                    <Typography
                                        key={link.label}
                                        component={RouterLink}
                                        to={link.path}
                                        sx={{
                                            color: COLORS.white,
                                            textDecoration: 'none',
                                            fontSize: '0.95rem',
                                            fontFamily: '"Inknut Antiqua", serif',
                                            display: 'flex',
                                            alignItems: 'center',
                                            transition: 'all 0.2s ease',
                                            '&:hover': { color: COLORS.accent, pl: 1 }
                                        }}
                                    >
                                        <Box component="span" sx={{ mr: 1.5, color: COLORS.accent }}>›</Box>
                                        {link.label}
                                    </Typography>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Subscribe Card */}
                    <Card sx={{ display: 'flex', flexDirection: 'column', border: `3px solid ${COLORS.white}`, borderRadius: 0, boxShadow: 'none', background: 'transparent' }}>
                        <Typography variant="h5" sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 800, color: COLORS.primary, bgcolor: COLORS.white, textAlign: 'center', p: 1.5, fontSize: '1.2rem' }}>
                            {c.subscribe}
                        </Typography>
                        <CardContent sx={{ p: 2.5, pt: 3 }}>
                            <Box component="img" src={serviceEquipment} sx={{ width: '100%', height: 220, objectFit: 'cover', mb: 3 }} />
                            <Typography variant="body2" sx={{ color: COLORS.white, lineHeight: 1.8, mb: 3, fontFamily: '"Inknut Antiqua", serif' }}>
                                {c.subscribeDesc}
                            </Typography>
                            <TextField
                                label={c.emailLabel}
                                variant="outlined"
                                size="small"
                                fullWidth
                                sx={{
                                    mb: 3,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '0px',
                                        '& fieldset': { borderColor: 'rgba(255,255,255,0.5)', borderWidth: '2px' },
                                        '&:hover fieldset': { borderColor: COLORS.accent },
                                        '&.Mui-focused fieldset': { borderColor: COLORS.accent },
                                    },
                                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                                    '& .MuiInputLabel-root.Mui-focused': { color: COLORS.accent },
                                    '& .MuiOutlinedInput-input': { color: COLORS.white },
                                }}
                            />
                            <Box
                                component={motion.div}
                                whileHover="hover"
                                initial="rest"
                                animate="rest"
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    border: `2px solid ${COLORS.white}`,
                                    borderRadius: '50px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    height: '46px',
                                    bgcolor: 'transparent',
                                    '&:hover': {
                                        bgcolor: 'rgba(255,255,255,0.05)'
                                    }
                                }}
                            >
                                <Typography
                                    component={motion.span}
                                    variants={{
                                        rest: { x: 0 },
                                        hover: { x: 5 }
                                    }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                    sx={{ 
                                        color: COLORS.white, 
                                        fontFamily: '"Inknut Antiqua", serif', 
                                        fontWeight: 700, 
                                        fontSize: '0.85rem', 
                                        pl: 3, 
                                        pr: 2 
                                    }}
                                >
                                    {c.subscribeBtn}
                                </Typography>
                                <Box sx={{ 
                                    width: 46, 
                                    height: '100%', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    bgcolor: COLORS.white, 
                                    ml: 1 
                                }}>
                                    <motion.div 
                                        variants={{ 
                                            rest: { x: 0 }, 
                                            hover: { x: 5 } 
                                        }}
                                        transition={{ type: 'spring', stiffness: 600, damping: 15 }}
                                    >
                                        <ArrowForwardIcon sx={{ color: COLORS.primary, fontSize: 18 }} />
                                    </motion.div>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                <Divider sx={{ borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.2)', mb: 5 }} />

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 3, pb: 2 }}>
                    <Typography sx={{ fontSize: '0.8rem', color: COLORS.white, fontFamily: '"Inknut Antiqua", serif', textAlign: { xs: 'center', lg: 'left' } }}>
                        Copyright © 2026 <Box component="span" sx={{ color: COLORS.accent, fontWeight: 700 }}>Inspire Translations</Box>. {c.rights}
                        <Box component="span" sx={{ ml: 1, opacity: 0.8 }}>|</Box>
                        <Box component="span" sx={{ ml: 1 }}>
                            {c.developedBy} <Box component="a" href="https://wa.me/255765929374" target="_blank" rel="noopener" sx={{ color: COLORS.accent, textDecoration: 'none', fontWeight: 700 }}>Jolab</Box>
                        </Box>
                    </Typography>

                    <Box sx={{ display: 'flex', gap: { xs: 2, md: 4 } }}>
                        {[
                            { text: c.privacy, path: '/privacy-policy' },
                            { text: c.terms, path: '/terms' }
                        ].map((item) => (
                            <Typography key={item.text} component={RouterLink} to={item.path} sx={{ color: COLORS.white, fontSize: '0.85rem', fontFamily: '"Inknut Antiqua", serif', textDecoration: 'none', '&:hover': { color: COLORS.accent } }}>
                                {item.text}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Container>

            <Fab
                size="medium"
                onClick={scrollToTop}
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    bgcolor: COLORS.accent,
                    color: COLORS.white,
                    zIndex: 1000,
                    '&:hover': { bgcolor: COLORS.primary, transform: 'scale(1.1) translateY(-5px)' },
                    transition: 'all 0.3s ease'
                }}
            >
                <KeyboardArrowUpIcon />
            </Fab>
        </Box>
    );
};

export default Footer;
