import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SEOHead from '../../components/seo/SEOHead';
import CTASection from '../../components/common/CTASection';
import FAQSection from '../../components/common/FAQSection';
import { services } from '../../data/siteData';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';

const FadeInUp = ({ children, delay = 0 }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
            {children}
        </motion.div>
    );
};

const ServicesPage = () => {
    const { language, t } = useLanguage();
    const ui = uiTranslations[language];

    const content = {
        en: {
            heroLabel: "Our Services",
            heroTitle: <>Professional <Box component="span" sx={{ color: '#F7A11A' }}>Language Solutions</Box></>,
            heroDesc: "We provide high-quality language services tailored for various industries, ensuring clarity, accuracy, and cultural relevance.",
            learnMore: "Learn More",
            howItWorks: "How It Works",
            howItWorksDesc: "Simple, transparent, and efficient — from request to delivery.",
            requestQuote: "Request a Quote Now",
            steps: [
                { step: '01', title: 'Submit Request', desc: 'Send us your project details via our quote form or email. We respond within 4 hours.', icon: '📤' },
                { step: '02', title: 'Get a Quote', desc: 'Receive a transparent, competitive quote tailored to your specific requirements.', icon: '💬' },
                { step: '03', title: 'We Get to Work', desc: 'Our expert linguists begin work, with regular progress updates for larger projects.', icon: '⚙️' },
                { step: '04', title: 'Review & Deliver', desc: 'After thorough quality checks, your completed work is delivered on time, every time.', icon: '✅' },
            ]
        },
        sw: {
            heroLabel: "Huduma Zetu",
            heroTitle: <>Suluhu za <Box component="span" sx={{ color: '#F7A11A' }}>Lugha za Kitaalamu</Box></>,
            heroDesc: "Tunatoa huduma bora za lugha zilizoboreshwa kwa sekta mbalimbali, tukihakikisha uwazi, usahihi, na uhusiano wa kitamaduni.",
            learnMore: "Soma Zaidi",
            howItWorks: "Jinsi Inavyofanya Kazi",
            howItWorksDesc: "Rahisi, wazi, na yenye ufanisi — kuanzia ombi hadi utoaji.",
            requestQuote: "Omba Makadirio Sasa",
            steps: [
                { step: '01', title: 'Tuma Ombi', desc: 'Tutumie maelezo ya mradi wako kupitia fomu yetu ya nukuu au barua pepe. Tunajibu ndani ya saa 4.', icon: '📤' },
                { step: '02', title: 'Pata Makadirio', desc: 'Pokea makadirio ya wazi na ya ushindani yaliyoboreshwa kulingana na mahitaji yako maalum.', icon: '💬' },
                { step: '03', title: 'Tunaanza Kazi', desc: 'Wanaisimu wetu wataalamu wanaanza kazi, tukiwa na sasisho za mara kwa mara za maendeleo kwa miradi mikubwa.', icon: '⚙️' },
                { step: '04', title: 'Kagua na Pokea', desc: 'Baada ya ukaguzi wa kina wa ubora, kazi yako iliyokamilishwa inatolewa kwa wakati, kila wakati.', icon: '✅' },
            ]
        }
    };

    const c = content[language];

    return (
        <>
            <SEOHead
                title={language === 'en' ? "Language Services | Inspire Translations Tanzania" : "Huduma za Lugha | Inspire Translations Tanzania"}
                description={c.heroDesc}
            />

            {/* Hero */}
            <Box sx={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2E40 60%, #0F3A1A 100%)', py: { xs: 10, md: 14 }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                {[...Array(6)].map((_, i) => (
                    <Box key={i} sx={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', bgcolor: 'rgba(247,161,26,0.4)', top: `${15 + i * 12}%`, left: `${8 + i * 15}%`, animation: `float ${3 + i % 2}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }} />
                ))}
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <Chip label={c.heroLabel} sx={{ bgcolor: 'rgba(247,161,26,0.15)', color: '#F7A11A', border: '1px solid rgba(247,161,26,0.3)', fontFamily: 'Outfit', fontWeight: 600, mb: 3 }} />
                        <Typography variant="h1" sx={{ color: '#FFFFFF', fontWeight: 900, mb: 3, fontFamily: '"Inknut Antiqua", serif', fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
                            {c.heroTitle}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.15rem', maxWidth: 580, mx: 'auto', lineHeight: 1.8, fontFamily: '"Inknut Antiqua", serif' }}>
                            {c.heroDesc}
                        </Typography>
                    </motion.div>
                </Container>
            </Box>

            {/* Services Grid */}
            <Box sx={{ py: 12, bgcolor: '#fff' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {services.map((service, i) => (
                            <Grid item xs={12} md={6} key={service.id}>
                                <FadeInUp delay={i * 0.05}>
                                    <Card sx={{
                                        display: 'flex', flexDirection: 'column', border: '3px solid #F7A11A', borderRadius: 0, boxShadow: 'none', height: '100%', position: 'relative', overflow: 'hidden', bgcolor: '#fff'
                                    }}>
                                        <CardContent sx={{ flex: 1, p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                                <Box sx={{ width: 60, height: 60, borderRadius: 0, bgcolor: 'rgba(247,161,26,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
                                                    {service.icon}
                                                </Box>
                                                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#1A5C2A', fontSize: '1.25rem', lineHeight: 1.3 }}>
                                                    {t(service.title)}
                                                </Typography>
                                            </Box>
                                            
                                            <Typography sx={{ color: '#4A4A6A', lineHeight: 1.8, fontSize: '0.95rem', mb: 4, fontFamily: '"Inknut Antiqua", serif', flexGrow: 1 }}>
                                                {t(service.shortDesc)}
                                            </Typography>

                                            {/* Signature Pill Arrow Button */}
                                            <Box sx={{ display: 'flex' }}>
                                                <Box
                                                    component={motion(RouterLink)}
                                                    whileHover="hover"
                                                    initial="rest"
                                                    animate="rest"
                                                    to={`/${language}/services/${service.id}`}
                                                    sx={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        border: '2px solid #1A5C2A',
                                                        borderRadius: 50,
                                                        overflow: 'hidden',
                                                        textDecoration: 'none',
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': { bgcolor: 'rgba(26, 92, 42, 0.04)' }
                                                    }}
                                                >
                                                    <Typography
                                                        component={motion.span}
                                                        variants={{ rest: { x: 0 }, hover: { x: 5 } }}
                                                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                                        sx={{
                                                            color: '#1A5C2A',
                                                            fontFamily: '"Inknut Antiqua", serif',
                                                            fontWeight: 700,
                                                            fontSize: '0.8rem',
                                                            px: 2.5,
                                                            lineHeight: '36px',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                    >
                                                        {c.learnMore}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            width: 36,
                                                            height: 36,
                                                            flexShrink: 0,
                                                            bgcolor: '#1A5C2A',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <motion.div
                                                            variants={{ rest: { x: 0 }, hover: { x: 8 } }}
                                                            transition={{ type: 'spring', stiffness: 600, damping: 15 }}
                                                        >
                                                            <ArrowForwardIcon sx={{ color: '#FFFFFF', fontSize: 18 }} />
                                                        </motion.div>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </FadeInUp>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Process Banner */}
            <Box sx={{ py: 10, bgcolor: '#F8F9FA' }}>
                <Container maxWidth="lg">
                    <FadeInUp>
                        <Box sx={{ textAlign: 'center', mb: 7 }}>
                            <Typography variant="h2" sx={{ color: '#1A1A2E', fontWeight: 800, mb: 2, fontFamily: '"Inknut Antiqua", serif' }}>{c.howItWorks}</Typography>
                            <Typography sx={{ color: '#4A4A6A', maxWidth: 500, mx: 'auto', lineHeight: 1.8, fontFamily: '"Inknut Antiqua", serif' }}>{c.howItWorksDesc}</Typography>
                        </Box>
                    </FadeInUp>
                    <Grid container spacing={3}>
                        {c.steps.map((step, i) => (
                            <Grid item xs={12} sm={6} md={3} key={step.step}>
                                <FadeInUp delay={i * 0.1}>
                                    <Box sx={{ textAlign: 'center', p: 3.5, bgcolor: '#fff', borderRadius: 0, border: '1px solid rgba(0,0,0,0.06)', borderTop: '4px solid #F7A11A', height: '100%', position: 'relative', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 16px 48px rgba(0,0,0,0.1)' } }}>
                                        <Typography sx={{ fontSize: '2.2rem', mb: 1.5 }}>{step.icon}</Typography>
                                        <Typography sx={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '2.5rem', color: 'rgba(247,161,26,0.15)', lineHeight: 1, mb: 1 }}>{step.step}</Typography>
                                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#1A1A2E', mb: 1.5 }}>{step.title}</Typography>
                                        <Typography sx={{ color: '#4A4A6A', fontSize: '0.875rem', lineHeight: 1.7, fontFamily: '"Inknut Antiqua", serif' }}>{step.desc}</Typography>
                                    </Box>
                                </FadeInUp>
                            </Grid>
                        ))}
                    </Grid>
                    <FadeInUp delay={0.4}>
                        <Box sx={{ textAlign: 'center', mt: 6 }}>
                            <Box
                                component={motion(RouterLink)}
                                whileHover="hover"
                                initial="rest"
                                animate="rest"
                                to={`/${language}/quote`}
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    border: '2px solid #F7A11A',
                                    borderRadius: 50,
                                    overflow: 'hidden',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    '&:hover': { bgcolor: 'rgba(247, 161, 26, 0.04)' }
                                }}
                            >
                                <Typography
                                    component={motion.span}
                                    variants={{ rest: { x: 0 }, hover: { x: 5 } }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                    sx={{
                                        color: '#F7A11A',
                                        fontFamily: '"Inknut Antiqua", serif',
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        px: 4,
                                        lineHeight: '36px',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {c.requestQuote}
                                </Typography>
                                <Box
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        flexShrink: 0,
                                        bgcolor: '#F7A11A',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <motion.div
                                        variants={{ rest: { x: 0 }, hover: { x: 8 } }}
                                        transition={{ type: 'spring', stiffness: 600, damping: 15 }}
                                    >
                                        <ArrowForwardIcon sx={{ color: '#1A5C2A', fontSize: 24 }} />
                                    </motion.div>
                                </Box>
                            </Box>
                        </Box>
                    </FadeInUp>
                </Container>
            </Box>
            <FAQSection />
            <CTASection />
        </>
    );
};

export default ServicesPage;
