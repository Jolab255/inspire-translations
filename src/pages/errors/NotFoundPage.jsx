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
                    background: '#F7A11A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    py: 8,
                }}
            >
                {/* Decorative Elements */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '10%',
                        right: '10%',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                        zIndex: 0
                    }}
                />

                <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
                    <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                        {/* Animated 404 */}
                        <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>
                            <Typography
                                sx={{
                                    fontFamily: 'Outfit',
                                    fontWeight: 900,
                                    fontSize: 'clamp(6rem, 20vw, 12rem)',
                                    lineHeight: 1,
                                    color: '#0D2B14',
                                    mb: 2,
                                    letterSpacing: '-0.02em',
                                    textShadow: '10px 10px 0px rgba(255,255,255,0.2)'
                                }}
                            >
                                404
                            </Typography>
                        </motion.div>

                        <Typography variant="h3" sx={{ color: '#0D2B14', fontFamily: '"Inknut Antiqua", serif', fontWeight: 800, mb: 2, fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' } }}>
                            {c.subtitle}
                        </Typography>
                        <Typography sx={{ color: 'rgba(13, 43, 20, 0.8)', mb: 6, lineHeight: 1.8, fontSize: '1.1rem', px: 2, fontFamily: '"Inknut Antiqua", serif', fontWeight: 500 }}>
                            {c.desc}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap', px: 2 }}>
                            {/* Signature Pill Arrow Button */}
                            <Box
                                component={motion(RouterLink)}
                                whileHover="hover"
                                initial="rest"
                                animate="rest"
                                to={`/${language}`}
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    border: '2.5px solid #0D2B14',
                                    borderRadius: 50,
                                    overflow: 'hidden',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    bgcolor: '#0D2B14',
                                    cursor: 'pointer',
                                    '&:hover': { bgcolor: '#000' }
                                }}
                            >
                                <Typography
                                    component={motion.span}
                                    variants={{ rest: { x: 0 }, hover: { x: 5 } }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                    sx={{
                                        color: '#FFFFFF',
                                        fontFamily: 'Outfit',
                                        fontWeight: 800,
                                        fontSize: '0.9rem',
                                        px: 4,
                                        lineHeight: '48px',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {c.backHome}
                                </Typography>
                                <Box sx={{ 
                                    width: 48, 
                                    height: 48, 
                                    bgcolor: 'rgba(255,255,255,0.1)', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    borderLeft: '1px solid rgba(255,255,255,0.2)'
                                }}>
                                    <motion.div 
                                        variants={{ rest: { x: 0 }, hover: { x: 8 } }}
                                        transition={{ type: 'spring', stiffness: 600, damping: 15 }}
                                    >
                                        <HomeIcon sx={{ color: '#F7A11A', fontSize: 22 }} />
                                    </motion.div>
                                </Box>
                            </Box>

                            <Button 
                                component={RouterLink} 
                                to={`/${language}/contact`} 
                                variant="outlined" 
                                size="large" 
                                startIcon={<ContactSupportIcon />}
                                sx={{ 
                                    color: '#0D2B14', 
                                    borderColor: '#0D2B14', 
                                    borderWidth: '2.5px',
                                    px: 5, 
                                    height: '52px',
                                    borderRadius: 0,
                                    fontFamily: 'Outfit',
                                    fontWeight: 800,
                                    width: { xs: '100%', sm: 'auto' }, 
                                    '&:hover': { borderColor: '#0D2B14', borderWidth: '2.5px', bgcolor: 'rgba(13, 43, 20, 0.05)' } 
                                }}
                            >
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
