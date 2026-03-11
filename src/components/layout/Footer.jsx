import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import { motion } from 'framer-motion';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';
import { services } from '../../data/siteData';
import logoImg from '../../assets/logos/Inspire_Translations_Logo.png';

const COLORS = {
    primary: '#0D2B14', // Deep Dark Green Background
    dark: '#05140A', // Even deeper for extra contrast
    accent: '#F7A11A', // Brand Orange/Gold
    text: '#FFFFFF',
    textMuted: 'rgba(255, 255, 255, 0.7)',
};

const Footer = () => {
    const { language, t } = useLanguage();
    const ui = uiTranslations[language];

    const content = {
        en: {
            newsletter: "Stay Updated",
            newsletterDesc: "Get the latest insights on global communication and regional language trends.",
            subscribeBtn: "Join",
            company: "Company",
            services: "Our Services",
            contact: "Contact",
            address: "Inspire Consulting Services, P. O. Box 45304, Dar es Salaam, TZ",
            rights: "All Rights Reserved.",
            developedBy: "Crafted by",
            privacy: "Privacy Policy",
            terms: "Terms of Service",
            links: [
                { label: 'Our Story', path: '/about' },
                { label: 'Projects', path: '/projects' },
                { label: 'Gallery', path: '/gallery' },
                { label: 'Insights Blog', path: '/blog' },
                { label: 'Get a Quote', path: '/quote' },
            ]
        },
        sw: {
            newsletter: "Pata Sasisho",
            newsletterDesc: "Pata maarifa ya hivi punde kuhusu mawasiliano ya kimataifa na mienendo ya lugha.",
            subscribeBtn: "Jiunge",
            company: "Kampuni",
            services: "Huduma Zetu",
            contact: "Mawasiliano",
            address: "Inspire Consulting Services, S. L. P. 45304, Dar es Salaam, TZ",
            rights: "Haki zote zimehifadhiwa.",
            developedBy: "Imeundwa na",
            privacy: "Sera ya Faragha",
            terms: "Vigezo vya Huduma",
            links: [
                { label: 'Habari Yetu', path: '/about' },
                { label: 'Miradi', path: '/projects' },
                { label: 'Picha', path: '/gallery' },
                { label: 'Blogu ya Maarifa', path: '/blog' },
                { label: 'Pata Makadirio', path: '/quote' },
            ]
        }
    };

    const c = content[language];

    const socialLinks = [
        { icon: <FacebookIcon />, href: 'https://facebook.com/inspiretranslations' },
        { icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/willy-elson-john-6418621a9' },
        { icon: <InstagramIcon />, href: 'https://www.instagram.com/inspire_translations/' },
        { icon: <YouTubeIcon />, href: '#' },
    ];

    const FooterLink = ({ to, label }) => (
        <Box component="li" sx={{ mb: 1.2 }}>
            <Typography 
                component={RouterLink} 
                to={`/${language}${to === '/' ? '' : to}`}
                sx={{ 
                    color: COLORS.textMuted, 
                    textDecoration: 'none', 
                    fontSize: '0.85rem',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    '&:hover': { 
                        color: COLORS.accent,
                        transform: 'translateX(6px)'
                    },
                    '&:hover .link-arrow': {
                        opacity: 1,
                        transform: 'translateX(0)'
                    }
                }}
            >
                <ArrowForwardIosIcon className="link-arrow" sx={{ fontSize: '8px', opacity: 0.5, transform: 'translateX(-4px)', transition: 'all 0.3s ease' }} />
                {label}
            </Typography>
        </Box>
    );

    return (
        <Box component="footer" sx={{ bgcolor: COLORS.primary, color: COLORS.text, pt: 10, pb: 4 }}>
            <Container maxWidth="lg">
                <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: '1.5fr 1fr 1.2fr 1.5fr' },
                    gap: { xs: 6, md: 4, lg: 8 },
                    mb: 8 
                }}>
                    {/* Brand Section */}
                    <Box>
                        <Box sx={{ mb: 3, bgcolor: '#FFFFFF', p: 1.5, display: 'inline-block', borderRadius: 0 }}>
                            <Box component="img" src={logoImg} alt="Inspire Translations" sx={{ height: 50, display: 'block' }} />
                        </Box>
                        <Typography sx={{ 
                            fontFamily: '"Inknut Antiqua", serif', 
                            fontSize: '0.85rem', 
                            lineHeight: 1.8, 
                            color: COLORS.textMuted,
                            mb: 4,
                            maxWidth: 320
                        }}>
                            {language === 'en' 
                                ? "Bridging the global language gap with precision, integrity, and cultural depth across East Africa and beyond."
                                : "Kuziba pengo la lugha duniani kwa usahihi, uadilifu, na kina cha kitamaduni kote Afrika Mashariki na kwingineko."}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {socialLinks.map((s, i) => (
                                <IconButton 
                                    key={i} 
                                    href={s.href}
                                    sx={{ 
                                        color: COLORS.text, 
                                        bgcolor: 'rgba(255,255,255,0.05)',
                                        '&:hover': { bgcolor: COLORS.accent, color: COLORS.primary } 
                                    }}
                                >
                                    {s.icon}
                                </IconButton>
                            ))}
                        </Box>
                    </Box>

                    {/* Company Links */}
                    <Box>
                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: '0.95rem', mb: 3, color: COLORS.accent, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {c.company}
                        </Typography>
                        <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                            {c.links.map((link) => (
                                <FooterLink key={link.label} to={link.path} label={link.label} />
                            ))}
                        </Box>
                    </Box>

                    {/* Scrollable Services Links */}
                    <Box>
                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: '0.95rem', mb: 3, color: COLORS.accent, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {c.services}
                        </Typography>
                        <Box 
                            component="ul" 
                            sx={{ 
                                p: 0, 
                                m: 0, 
                                listStyle: 'none', 
                                maxHeight: '240px', 
                                overflowY: 'auto',
                                pr: 1,
                                '&::-webkit-scrollbar': { width: '4px' },
                                '&::-webkit-scrollbar-track': { bgcolor: 'rgba(255,255,255,0.05)' },
                                '&::-webkit-scrollbar-thumb': { bgcolor: COLORS.accent, borderRadius: '10px' }
                            }}
                        >
                            {services.map((service) => (
                                <FooterLink 
                                    key={service.id} 
                                    to={`/services/${service.id}`} 
                                    label={t(service.title)} 
                                />
                            ))}
                        </Box>
                    </Box>

                    {/* Newsletter & Contact */}
                    <Box>
                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: '0.95rem', mb: 3, color: COLORS.accent, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {c.newsletter}
                        </Typography>
                        <Typography sx={{ color: COLORS.textMuted, fontSize: '0.85rem', mb: 3, lineHeight: 1.6 }}>
                            {c.newsletterDesc}
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="email@example.com"
                            variant="outlined"
                            size="small"
                            sx={{
                                mb: 4,
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    bgcolor: 'rgba(255,255,255,0.03)',
                                    borderRadius: '50px',
                                    pr: 0.5,
                                    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                                    '&:hover fieldset': { borderColor: COLORS.accent },
                                    '&.Mui-focused fieldset': { borderColor: COLORS.accent },
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton sx={{ bgcolor: COLORS.accent, color: COLORS.primary, '&:hover': { bgcolor: '#fff' } }}>
                                            <SendIcon sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        
                        <Box>
                            <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-start' }}>
                                <LocationOnIcon sx={{ color: COLORS.accent, fontSize: 18, mt: 0.5 }} />
                                <Typography sx={{ color: COLORS.textMuted, fontSize: '0.85rem', lineHeight: 1.5 }}>
                                    {c.address}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <PhoneIcon sx={{ color: COLORS.accent, fontSize: 18 }} />
                                <Typography sx={{ color: COLORS.textMuted, fontSize: '0.85rem' }}>
                                    +255 759 704 170
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 4 }} />

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                    <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textAlign: { xs: 'center', md: 'left' } }}>
                        © {new Date().getFullYear()} Inspire Translations. {c.rights} | {c.developedBy} <Box component="a" href="https://jolab.io" sx={{ color: COLORS.accent, textDecoration: 'none', fontWeight: 600 }}>Jolab</Box>
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <Typography component={RouterLink} to={`/${language}/privacy-policy`} sx={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.75rem', '&:hover': { color: COLORS.text } }}>
                            {c.privacy}
                        </Typography>
                        <Typography component={RouterLink} to={`/${language}/terms`} sx={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.75rem', '&:hover': { color: COLORS.text } }}>
                            {c.terms}
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
