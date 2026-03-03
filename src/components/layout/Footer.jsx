import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import { motion } from 'framer-motion';
import { services } from '../../data/siteData';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <FacebookIcon />, href: '#', label: 'Facebook' },
        { icon: <LinkedInIcon />, href: '#', label: 'LinkedIn' },
        { icon: <InstagramIcon />, href: '#', label: 'Instagram' },
        { icon: <YouTubeIcon />, href: '#', label: 'YouTube' },
    ];

    const quickLinks = [
        { label: 'Home', path: '/' },
        { label: 'About Us', path: '/about' },
        { label: 'Services', path: '/services' },
        { label: 'Projects', path: '/projects' },
        { label: 'Gallery', path: '/gallery' },
        { label: 'Blog', path: '/blog' },
        { label: 'Contact Us', path: '/contact' },
        { label: 'Privacy Policy', path: '/privacy-policy' },
        { label: 'Terms of Service', path: '/terms' },
    ];

    return (
        <Box
            component="footer"
            sx={{
                background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2E40 60%, #0F3A1A 100%)',
                color: '#fff',
                pt: 8,
                pb: 3,
                mt: 'auto',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    {/* Brand column */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #F7A11A, #D4880E)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mr: 1.5,
                                    boxShadow: '0 4px 16px rgba(247,161,26,0.3)',
                                }}
                            >
                                <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem', fontFamily: 'Outfit' }}>IT</Typography>
                            </Box>
                            <Box>
                                <Typography sx={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.2rem', color: '#FFFFFF', lineHeight: 1.1 }}>
                                    INSPIRE TRANSLATIONS
                                </Typography>
                                <Typography sx={{ fontSize: '0.7rem', color: '#F7A11A', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                                    We Speak Your Language
                                </Typography>
                            </Box>
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, mb: 3, maxWidth: 320 }}
                        >
                            Inspire Translations is Tanzania's premier language services provider — delivering precision translation,
                            interpretation, and language solutions that bridge cultures and connect the world.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {socialLinks.map((s) => (
                                <motion.div key={s.label} whileHover={{ scale: 1.15, y: -2 }}>
                                    <IconButton
                                        href={s.href}
                                        aria-label={s.label}
                                        sx={{
                                            bgcolor: 'rgba(255,255,255,0.08)',
                                            color: '#F7A11A',
                                            '&:hover': { bgcolor: '#F7A11A', color: '#fff' },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        {s.icon}
                                    </IconButton>
                                </motion.div>
                            ))}
                        </Box>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={6} md={2}>
                        <Typography
                            sx={{ fontFamily: 'Outfit', fontWeight: 700, mb: 3, color: '#F7A11A', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                        >
                            Quick Links
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {quickLinks.map((link) => (
                                <Box
                                    key={link.label}
                                    component={RouterLink}
                                    to={link.path}
                                    sx={{
                                        color: 'rgba(255,255,255,0.65)',
                                        textDecoration: 'none',
                                        fontSize: '0.875rem',
                                        fontFamily: 'Inter',
                                        transition: 'all 0.2s ease',
                                        '&:hover': { color: '#F7A11A', pl: 0.5 },
                                    }}
                                >
                                    › {link.label}
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    {/* Services */}
                    <Grid item xs={6} md={2}>
                        <Typography
                            sx={{ fontFamily: 'Outfit', fontWeight: 700, mb: 3, color: '#F7A11A', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                        >
                            Services
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {services.map((s) => (
                                <Box
                                    key={s.id}
                                    component={RouterLink}
                                    to={`/services/${s.id}`}
                                    sx={{
                                        color: 'rgba(255,255,255,0.65)',
                                        textDecoration: 'none',
                                        fontSize: '0.875rem',
                                        fontFamily: 'Inter',
                                        transition: 'all 0.2s ease',
                                        '&:hover': { color: '#F7A11A', pl: 0.5 },
                                    }}
                                >
                                    › {s.title}
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    {/* Contact */}
                    <Grid item xs={12} md={4}>
                        <Typography
                            sx={{ fontFamily: 'Outfit', fontWeight: 700, mb: 3, color: '#F7A11A', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                        >
                            Get In Touch
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                            {[
                                { icon: <LocationOnIcon sx={{ fontSize: 18 }} />, text: 'Dar es Salaam, Tanzania' },
                                { icon: <PhoneIcon sx={{ fontSize: 18 }} />, text: '+255 000 000 000 (WhatsApp)' },
                                { icon: <EmailIcon sx={{ fontSize: 18 }} />, text: 'info@inspiretranslations.co.tz' },
                            ].map((item) => (
                                <Box key={item.text} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Box sx={{ color: '#F7A11A', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                                        {item.icon}
                                    </Box>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', fontFamily: 'Inter' }}>
                                        {item.text}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                        {/* Newsletter */}
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', mb: 1.5, fontFamily: 'Outfit', fontWeight: 600 }}>
                            Subscribe to our newsletter
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                placeholder="Your email address"
                                size="small"
                                variant="outlined"
                                sx={{
                                    flex: 1,
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'rgba(255,255,255,0.08)',
                                        borderRadius: 2,
                                        color: '#fff',
                                        '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                                        '&:hover fieldset': { borderColor: '#F7A11A' },
                                        '&.Mui-focused fieldset': { borderColor: '#F7A11A' },
                                    },
                                    input: { color: '#fff', '&::placeholder': { color: 'rgba(255,255,255,0.4)' } },
                                }}
                            />
                            <IconButton
                                sx={{
                                    bgcolor: '#F7A11A',
                                    borderRadius: 2,
                                    px: 1.5,
                                    '&:hover': { bgcolor: '#D4880E', transform: 'scale(1.05)' },
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <SendIcon sx={{ color: '#fff', fontSize: 20 }} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

                {/* Bottom bar */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 1,
                    }}
                >
                    <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', fontFamily: 'Inter' }}>
                        © {currentYear} Inspire Translations. All Rights Reserved.
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', fontFamily: 'Inter' }}>
                        Bridging Cultures. Inspiring Connection.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
