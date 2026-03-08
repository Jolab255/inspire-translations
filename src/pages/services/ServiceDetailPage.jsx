import { useParams, Link as RouterLink, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import SEOHead from '../../components/seo/SEOHead';
import { services } from '../../data/siteData';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';

const ServiceDetailPage = () => {
    const { slug } = useParams();
    const { language, t } = useLanguage();
    const ui = uiTranslations[language];
    const service = services.find((s) => s.id === slug);

    if (!service) return <Navigate to="/services" replace />;

    const related = services.filter((s) => s.id !== slug).slice(0, 3);

    const content = {
        en: {
            backToServices: "Back to Services",
            aboutService: "About This Service",
            included: "What's Included:",
            readyToStart: "Ready to Get Started?",
            readyDesc: `Get a free, no-obligation quote for your ${t(service.title).toLowerCase()} needs. We respond within 4 hours.`,
            requestQuote: "Request a Free Quote",
            contactUs: "Contact Us",
            whyUs: "Why Inspire Translations?",
            points: ['Certified professional linguists', 'Fast turnaround guaranteed', 'Strict confidentiality policy', '25+ language pairs available', 'ISO-quality standards'],
            otherServices: "Other Services"
        },
        sw: {
            backToServices: "Rudi kwenye Huduma",
            aboutService: "Kuhusu Huduma Hii",
            included: "Kinachojumuishwa:",
            readyToStart: "Uko Tayari Kuanza?",
            readyDesc: `Pata makadirio ya bure na yasiyo na lazima kwa mahitaji yako ya ${t(service.title).toLowerCase()}. Tunajibu ndani ya saa 4.`,
            requestQuote: "Omba Makadirio ya Bure",
            contactUs: "Wasiliana Nasi",
            whyUs: "Kwa nini Inspire Translations?",
            points: ['Wanaisimu wa kitaalamu walioidhinishwa', 'Muda wa haraka wa kukamilisha', 'Sera kali ya usiri', 'Zaidi ya jozi 25 za lugha', 'Viwango vya ubora wa ISO'],
            otherServices: "Huduma Nyingine"
        }
    };

    const c = content[language];

    return (
        <>
            <SEOHead
                title={`${t(service.title)} | Inspire Translations Tanzania`}
                description={t(service.shortDesc)}
                canonicalUrl={`https://inspiretranslations.co.tz/services/${service.id}`}
                keywords={`${t(service.title).toLowerCase()}, Tanzania, professional, ${t(service.features).join(', ')}`}
            />

            {/* Hero */}
            <Box sx={{ background: service.color === '#F7A11A' ? 'linear-gradient(135deg, #0D1B2A 0%, #2A1A08 100%)' : 'linear-gradient(135deg, #0D1B2A 0%, #0F3A1A 100%)', py: { xs: 8, md: 13 }, position: 'relative', overflow: 'hidden' }}>
                {[...Array(5)].map((_, i) => (
                    <Box key={i} sx={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', bgcolor: 'rgba(247,161,26,0.4)', top: `${20 + i * 15}%`, left: `${5 + i * 18}%`, animation: `float ${3 + i % 2}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }} />
                ))}
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Button component={RouterLink} to="/services" startIcon={<ArrowBackIcon />} sx={{ color: 'rgba(255,255,255,0.6)', mb: { xs: 2, md: 4 }, '&:hover': { color: '#F7A11A', bgcolor: 'transparent' }, boxShadow: 'none', background: 'transparent', transform: 'none' }}>
                        {c.backToServices}
                    </Button>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: { xs: 2, sm: 3 }, mb: 3 }}>
                            <Box sx={{ width: { xs: 60, sm: 80 }, height: { xs: 60, sm: 80 }, borderRadius: '16px', bgcolor: 'rgba(247,161,26,0.15)', border: '2px solid rgba(247,161,26,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: { xs: '1.8rem', sm: '2.5rem' } }}>
                                {service.icon}
                            </Box>
                            <Box>
                                <Chip label={language === 'en' ? 'Service' : 'Huduma'} sx={{ bgcolor: 'rgba(247,161,26,0.15)', color: '#F7A11A', fontFamily: 'Outfit', fontWeight: 600, mb: 1, border: '1px solid rgba(247,161,26,0.3)' }} />
                                <Typography variant="h1" sx={{ color: '#FFFFFF', fontWeight: 900, fontSize: { xs: '2rem', sm: '2.8rem', md: '3.5rem' } }}>{t(service.title)}</Typography>
                            </Box>
                        </Box>
                        <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: { xs: '1rem', md: '1.15rem' }, maxWidth: 600, lineHeight: 1.8 }}>{t(service.shortDesc)}</Typography>
                    </motion.div>
                </Container>
            </Box>

            {/* Main Content */}
            <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={7}>
                            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                                <Typography variant="h3" sx={{ color: '#1A1A2E', fontWeight: 700, mb: 3 }}>{c.aboutService}</Typography>
                                <Typography sx={{ color: '#4A4A6A', lineHeight: 1.9, mb: 4, fontSize: '1.05rem' }}>{t(service.fullDesc)}</Typography>

                                <Typography variant="h5" sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', mb: 3 }}>{c.included}</Typography>
                                <List disablePadding>
                                    {t(service.features).map((f) => (
                                        <ListItem key={f} disablePadding sx={{ mb: 1.5 }}>
                                            <ListItemIcon sx={{ minWidth: 36 }}>
                                                <CheckCircleIcon sx={{ color: service.color, fontSize: 22 }} />
                                            </ListItemIcon>
                                            <ListItemText primary={f} primaryTypographyProps={{ fontFamily: 'Inter', color: '#4A4A6A', lineHeight: 1.6 }} />
                                        </ListItem>
                                    ))}
                                </List>
                            </motion.div>
                        </Grid>

                        {/* Sidebar */}
                        <Grid item xs={12} md={5}>
                            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                                {/* Quote CTA */}
                                <Box sx={{ p: { xs: 3, md: 4 }, bgcolor: service.color === '#F7A11A' ? 'rgba(247,161,26,0.06)' : 'rgba(26,92,42,0.06)', borderRadius: 3, border: `1px solid ${service.color === '#F7A11A' ? 'rgba(247,161,26,0.2)' : 'rgba(26,92,42,0.2)'}`, mb: 3 }}>
                                    <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', fontSize: '1.2rem', mb: 1.5 }}>{c.readyToStart}</Typography>
                                    <Typography sx={{ color: '#4A4A6A', mb: 3, fontSize: '0.95rem', lineHeight: 1.7 }}>{c.readyDesc}</Typography>
                                    <Button component={RouterLink} to="/quote" variant="contained" color="primary" fullWidth size="large" endIcon={<ArrowForwardIcon />} sx={{ mb: 2 }}>
                                        {c.requestQuote}
                                    </Button>
                                    <Button component={RouterLink} to="/contact" variant="outlined" color="secondary" fullWidth>
                                        {c.contactUs}
                                    </Button>
                                </Box>

                                {/* Key facts */}
                                <Box sx={{ p: 3, bgcolor: '#F8F9FA', borderRadius: 3 }}>
                                    <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', mb: 2 }}>{c.whyUs}</Typography>
                                    {c.points.map((point) => (
                                        <Box key={point} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.2 }}>
                                            <CheckCircleIcon sx={{ color: '#F7A11A', fontSize: 18, flexShrink: 0 }} />
                                            <Typography sx={{ color: '#4A4A6A', fontSize: '0.875rem' }}>{point}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Related Services */}
            <Box sx={{ py: 8, bgcolor: '#F8F9FA' }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', mb: 4 }}>{c.otherServices}</Typography>
                    <Grid container spacing={3}>
                        {related.map((s) => (
                            <Grid item xs={12} sm={4} key={s.id}>
                                <Box component={RouterLink} to={`/services/${s.id}`} sx={{ display: 'block', p: 3, bgcolor: '#fff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', textDecoration: 'none', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 32px rgba(0,0,0,0.1)' } }}>
                                    <Typography sx={{ fontSize: '1.8rem', mb: 1 }}>{s.icon}</Typography>
                                    <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', mb: 0.5, fontSize: '0.95rem' }}>{t(s.title)}</Typography>
                                    <Typography sx={{ color: '#4A4A6A', fontSize: '0.8rem', lineHeight: 1.5 }}>{t(s.shortDesc).substring(0, 70)}...</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default ServiceDetailPage;
