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
import CookieIcon from '@mui/icons-material/Cookie';
import customerCare from '../../assets/images/customer_care.png';
import arrowImg from '../../assets/images/arrows.png';
import serviceEquipment from '../../assets/images/equipment_rental.png';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const COLORS = {
    primary: '#1A5C2A', // Using established brand dark green
    accent: '#F7A11A',  // Using established brand yellow
    white: '#FFFFFF',
};

// Animation helper from HomePage
const FadeInUp = ({ children, delay = 0, ...props }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            {...props}
        >
            {children}
        </motion.div>
    );
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
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 140
            }
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
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                ...sx
            }}
            {...props}
        >
            {letters.map((char, index) => (
                <motion.span
                    key={index}
                    variants={letterVariants}
                    style={{
                        display: 'inline-block',
                        whiteSpace: 'pre'
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </Typography>
    );
};

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const socialLinks = [
        { icon: <FacebookIcon fontSize="small" />, href: '#', label: 'Facebook' },
        { icon: <LinkedInIcon fontSize="small" />, href: '#', label: 'LinkedIn' },
        { icon: <InstagramIcon fontSize="small" />, href: '#', label: 'Instagram' },
        { icon: <YouTubeIcon fontSize="small" />, href: '#', label: 'YouTube' },
    ];

    const quickLinks = [
        { label: 'About Us', path: '/about' },
        { label: 'Services', path: '/services' },
        { label: 'Our Work', path: '/projects' },
        { label: 'Blog', path: '/blog' },
        { label: 'Contact Us', path: '/contact' },
    ];

    const newsPosts = [];

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
            {/* Background Illustration from Inspiration */}
            <Box
                sx={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    opacity: 0.1,
                    pointerEvents: 'none',
                    display: { xs: 'none', md: 'block' }
                }}
            >
                <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 250 L350 250 M100 250 L100 150 L200 100 L300 150 L300 250" stroke="currentColor" strokeWidth="2" />
                    <path d="M100 150 L300 150" stroke="currentColor" strokeWidth="1" />
                    <path d="M150 250 L150 200 L250 200 L250 250" stroke="currentColor" strokeWidth="2" />
                </svg>
            </Box>

            <Container maxWidth="lg">
                {/* TOP HEADER SECTION: Title Left, Social Right */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 5,
                    gap: 3
                }}>
                    <TypewriterText
                        text="Precision. Culture. Trust."
                        variant="h2"
                        sx={{
                            fontFamily: '"Inknut Antiqua", serif',
                            fontWeight: 800,
                            fontSize: { xs: '2rem', md: '2.8rem' },
                            color: COLORS.accent,
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
                                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                    }}
                                >
                                    {s.icon}
                                </IconButton>
                            ))}
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.2)', mb: 8 }} />

                {/* MAIN CONTENT: 3 Columns NEWS | CONTACT | LINKS (Equal Width) */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4, mb: 8 }}>
                    {/* Contact Us Card */}
                    <Card sx={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', border: `3px solid ${COLORS.accent}`, borderRadius: 0, boxShadow: 'none', overflow: 'hidden', background: 'transparent', transition: 'none', '&:hover': { transform: 'none', boxShadow: 'none', bgcolor: 'transparent' } }}>
                        <Typography variant="h5" sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 800, color: COLORS.primary, bgcolor: COLORS.accent, textAlign: 'center', p: 1.5, width: '100%', fontSize: '1.2rem', lineHeight: 1.3 }}>
                            Contact Us!
                        </Typography>
                        <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column', pt: 3 }}>
                            <Box component="img" src={customerCare} alt="Contact Us" sx={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 0, mb: 3 }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Avatar sx={{ bgcolor: `${COLORS.accent}22`, color: COLORS.accent, width: 36, height: 36, flexShrink: 0 }}>
                                        <LocationOnIcon fontSize="small" />
                                    </Avatar>
                                    <Typography variant="body2" sx={{ color: COLORS.white, lineHeight: 1.6, fontFamily: '"Inknut Antiqua", serif' }}>
                                        123 Translation Ave, Dar es Salaam, Tanzania
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Avatar sx={{ bgcolor: `${COLORS.accent}22`, color: COLORS.accent, width: 36, height: 36, flexShrink: 0 }}>
                                        <PhoneIcon fontSize="small" />
                                    </Avatar>
                                    <Typography variant="body2" sx={{ color: COLORS.white, fontFamily: '"Inknut Antiqua", serif' }}>
                                        +255 123 456 789
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Avatar sx={{ bgcolor: `${COLORS.accent}22`, color: COLORS.accent, width: 36, height: 36, flexShrink: 0 }}>
                                        <EmailIcon fontSize="small" />
                                    </Avatar>
                                    <Typography variant="body2" sx={{ color: COLORS.white, fontFamily: '"Inknut Antiqua", serif' }}>
                                        contact@inspiretranslations.co.tz
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Avatar sx={{ bgcolor: `${COLORS.accent}22`, color: COLORS.accent, width: 36, height: 36, flexShrink: 0 }}>
                                        <AccessTimeIcon fontSize="small" />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="body2" sx={{ color: COLORS.white, fontFamily: '"Inknut Antiqua", serif' }}>
                                            Mon - Fri: 9.00am - 17.00pm
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: COLORS.accent, letterSpacing: '0.1em', fontFamily: '"Inknut Antiqua", serif', fontWeight: 600 }}>
                                            Weekends & Holidays: Closed
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Quick Links Card */}
                    <Card sx={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', border: `3px solid ${COLORS.accent}`, borderRadius: 0, boxShadow: 'none', overflow: 'hidden', background: 'transparent', transition: 'none', '&:hover': { transform: 'none', boxShadow: 'none', bgcolor: 'transparent' } }}>
                        <Typography variant="h5" sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 800, color: COLORS.primary, bgcolor: COLORS.accent, textAlign: 'center', p: 1.5, width: '100%', fontSize: '1.2rem', lineHeight: 1.3 }}>
                            Quick Links
                        </Typography>
                        <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column', pt: 3 }}>
                            <Box component="img" src={arrowImg} alt="Quick Links" sx={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 0, mb: 3 }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {quickLinks.map((link) => (
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

                    {/* Subscribe Newsletter Card */}
                    <Card sx={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', border: `3px solid ${COLORS.accent}`, borderRadius: 0, boxShadow: 'none', overflow: 'hidden', background: 'transparent', transition: 'none', '&:hover': { transform: 'none', boxShadow: 'none', bgcolor: 'transparent' } }}>
                        <Typography variant="h5" sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 800, color: COLORS.primary, bgcolor: COLORS.accent, textAlign: 'center', p: 1.5, width: '100%', fontSize: '1.2rem', lineHeight: 1.3 }}>
                            Subscribe Newsletter
                        </Typography>
                        <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column', pt: 3 }}>
                            <Box component="img" src={serviceEquipment} alt="Newsletter" sx={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 0, mb: 3 }} />
                            <Typography variant="body2" sx={{ color: COLORS.white, lineHeight: 1.8, mb: 3, flexGrow: 1, fontFamily: '"Inknut Antiqua", serif', opacity: 0.9 }}>
                                Join our mailing list to get the latest updates, news, and insights from the world of professional translation.
                            </Typography>
                            <TextField
                                label="Your Email Address"
                                variant="outlined"
                                size="small"
                                fullWidth
                                sx={{
                                    mb: 3,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '0px',
                                        '& fieldset': {
                                            borderColor: 'rgba(255,255,255,0.5)',
                                            borderWidth: '2px',
                                            borderRadius: '0px'
                                        },
                                        '&:hover fieldset': { borderColor: COLORS.accent },
                                        '&.Mui-focused fieldset': { borderColor: COLORS.accent, borderWidth: '2.5px' },
                                    },
                                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' },
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
                                    bgcolor: 'transparent',
                                    border: `2px solid ${COLORS.accent}`,
                                    borderRadius: '50px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    height: '46px',
                                    width: 'fit-content',
                                    '&:hover': {
                                        bgcolor: 'rgba(247, 161, 26, 0.1)',
                                        boxShadow: `0 0 20px rgba(247, 161, 26, 0.2)`
                                    }
                                }}
                            >
                                <Typography
                                    component={motion.span}
                                    variants={{ rest: { x: 0 }, hover: { x: 5 } }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                    sx={{
                                        color: COLORS.white,
                                        fontFamily: '"Inknut Antiqua", serif',
                                        fontWeight: 700,
                                        fontSize: '0.85rem',
                                        pl: 3,
                                        pr: 2,
                                        whiteSpace: 'nowrap',
                                        textTransform: 'none',
                                    }}
                                >
                                    Subscribe
                                </Typography>
                                <Box
                                    sx={{
                                        width: 46,
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        bgcolor: COLORS.accent,
                                        ml: 1
                                    }}
                                >
                                    <motion.div
                                        variants={{ rest: { x: 0 }, hover: { x: 5 } }}
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

                {/* BOTTOM BAR: Legal and Meta */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 3,
                    pb: 2
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 1, borderRadius: 1.5, display: 'flex' }}>
                            <CookieIcon sx={{ fontSize: 18 }} />
                        </Box>
                        <Typography sx={{
                            fontSize: '0.8rem',
                            color: COLORS.white,
                            fontFamily: '"Inknut Antiqua", serif',
                            lineHeight: 1.6,
                            textAlign: { xs: 'center', lg: 'left' }
                        }}>
                            Copyright © 2024 <Box component="span" sx={{ color: COLORS.accent, fontWeight: 700 }}>Inspire Translations</Box>. All Rights Reserved.
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: { xs: 2, md: 4 } }}>
                        {[
                            { text: 'Privacy Policy', path: '/privacy-policy' },
                            { text: 'Terms & Conditions', path: '/terms' }
                        ].map((item) => (
                            <Typography
                                key={item.text}
                                component={RouterLink}
                                to={item.path}
                                sx={{
                                    color: COLORS.white,
                                    fontSize: '0.9rem',
                                    fontFamily: '"Inknut Antiqua", serif',
                                    textDecoration: 'none',
                                    fontWeight: 500,
                                    '&:hover': { color: COLORS.accent }
                                }}
                            >
                                {item.text}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Container>

            {/* FIXED ELEMENTS - Badge Updated */}

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
                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
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
