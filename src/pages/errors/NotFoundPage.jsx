import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import HomeIcon from '@mui/icons-material/Home';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import SEOHead from '../../components/seo/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';

const NotFoundPage = () => {
    const { language } = useLanguage();
    const ui = uiTranslations[language];

    const content = {
        en: {
            title: "Page Not Found",
            subtitle: "Lost in Translation?",
            desc: "The page you're looking for doesn't exist or may have been moved. Let's get you back on track.",
            backHome: "Back to Home",
            contactUs: "Contact Us"
        },
        sw: {
            title: "Ukurasa Haupatikani",
            subtitle: "Umekosa Tafsiri?",
            desc: "Ukurasa unaoutafuta haupo au unaweza kuwa umehamishwa. Tukusaidie kurudi kwenye njia sahihi.",
            backHome: "Rudi Nyumbani",
            contactUs: "Wasiliana Nasi"
        }
    };

    const c = content[language];

    return (
        <>
            <SEOHead title={`${c.title} | Inspire Translations`} description={c.desc} />
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2E40 60%, #0F3A1A 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    py: 8,
                }}
            >
                {/* Floating particles */}
                {[...Array(10)].map((_, i) => (
                    <Box key={i} sx={{ position: 'absolute', width: i % 2 === 0 ? 5 : 3, height: i % 2 === 0 ? 5 : 3, borderRadius: '50%', bgcolor: i % 2 === 0 ? 'rgba(247,161,26,0.4)' : 'rgba(26,92,42,0.4)', top: `${10 + i * 9}%`, left: `${5 + i * 9}%`, animation: `float ${3 + i % 3}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }} />
                ))}

                <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
                    <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                        {/* Animated 404 */}
                        <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}>
                            <Typography
                                sx={{
                                    fontFamily: 'Outfit',
                                    fontWeight: 900,
                                    fontSize: 'clamp(6rem, 20vw, 10rem)',
                                    lineHeight: 1,
                                    background: 'linear-gradient(135deg, #F7A11A 0%, rgba(247,161,26,0.3) 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    mb: 2,
                                }}
                            >
                                404
                            </Typography>
                        </motion.div>

                        <Typography sx={{ fontSize: '3rem', mb: 2 }}>🌍</Typography>

                        <Typography variant="h3" sx={{ color: '#FFFFFF', fontFamily: 'Outfit', fontWeight: 800, mb: 2, fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' } }}>
                            {c.subtitle}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.65)', mb: 5, lineHeight: 1.8, fontSize: '1.05rem', px: 2 }}>
                            {c.desc}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', px: 2 }}>
                            <Button component={RouterLink} to={`/${language}`} variant="contained" color="primary" size="large" startIcon={<HomeIcon />} sx={{ px: 4, width: { xs: '100%', sm: 'auto' } }}>
                                {c.backHome}
                            </Button>
                            <Button component={RouterLink} to={`/${language}/contact`} variant="outlined" size="large" startIcon={<ContactSupportIcon />}
                                sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.35)', px: 4, width: { xs: '100%', sm: 'auto' }, '&:hover': { borderColor: '#F7A11A', color: '#F7A11A', bgcolor: 'rgba(247,161,26,0.06)' } }}>
                                {c.contactUs}
                            </Button>
                        </Box>
                    </motion.div>
                </Container>
            </Box>
        </>
    );
};

export default NotFoundPage;
