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
import { services } from '../../data/siteData';

const FadeInUp = ({ children, delay = 0 }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
            {children}
        </motion.div>
    );
};

const ServicesPage = () => (
    <>
        <SEOHead
            title="Language Services | Inspire Translations Tanzania"
            description="Full range of language services: written translation, on-site & remote interpretation, language classes, conference logistics, and equipment rental."
            canonicalUrl="https://inspiretranslations.co.tz/services"
            keywords="translation services, interpretation services Tanzania, language classes, conference interpretation, document translation"
        />

        {/* Hero */}
        <Box sx={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2E40 60%, #0F3A1A 100%)', py: { xs: 10, md: 14 }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            {[...Array(6)].map((_, i) => (
                <Box key={i} sx={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', bgcolor: 'rgba(247,161,26,0.4)', top: `${15 + i * 12}%`, left: `${8 + i * 15}%`, animation: `float ${3 + i % 2}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }} />
            ))}
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                    <Chip label="Our Services" sx={{ bgcolor: 'rgba(247,161,26,0.15)', color: '#F7A11A', border: '1px solid rgba(247,161,26,0.3)', fontFamily: 'Outfit', fontWeight: 600, mb: 3 }} />
                    <Typography variant="h1" sx={{ color: '#FFFFFF', fontWeight: 900, mb: 3 }}>
                        Every Language. <Box component="span" sx={{ color: '#F7A11A' }}>Every Need.</Box>
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.15rem', maxWidth: 580, mx: 'auto', lineHeight: 1.8 }}>
                        Comprehensive and professional language services tailored for individuals, businesses, and international organizations.
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
                            <FadeInUp delay={i * 0.07}>
                                <Card sx={{
                                    display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%', position: 'relative', overflow: 'hidden',
                                    '&::before': { content: '""', position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: service.color === '#F7A11A' ? 'linear-gradient(180deg,#F7A11A,#D4880E)' : 'linear-gradient(180deg,#1A5C2A,#2A7A3B)' }
                                }}>
                                    <Box sx={{ p: 3, display: 'flex', alignItems: 'flex-start', pl: 4 }}>
                                        <Box sx={{ width: 72, height: 72, borderRadius: '18px', bgcolor: service.color === '#F7A11A' ? 'rgba(247,161,26,0.1)' : 'rgba(26,92,42,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0, transition: 'transform 0.3s', '.MuiCard-root:hover &': { transform: 'rotate(8deg) scale(1.1)' } }}>
                                            {service.icon}
                                        </Box>
                                    </Box>
                                    <CardContent sx={{ flex: 1, py: 3, pr: 3 }}>
                                        <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', fontSize: '1.15rem', mb: 1 }}>{service.title}</Typography>
                                        <Typography sx={{ color: '#4A4A6A', lineHeight: 1.7, fontSize: '0.9rem', mb: 2 }}>{service.fullDesc.substring(0, 160)}...</Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 2.5 }}>
                                            {service.features.slice(0, 3).map((f) => (
                                                <Chip key={f} label={f} size="small" sx={{ bgcolor: service.color === '#F7A11A' ? 'rgba(247,161,26,0.1)' : 'rgba(26,92,42,0.1)', color: service.color, fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.7rem' }} />
                                            ))}
                                        </Box>
                                        <Button component={RouterLink} to={`/services/${service.id}`} size="small" endIcon={<ArrowForwardIcon />}
                                            sx={{ color: service.color, fontFamily: 'Outfit', fontWeight: 600, p: 0, '&:hover': { bgcolor: 'transparent', gap: 1 }, boxShadow: 'none', background: 'transparent', transform: 'none', '&:hover': { transform: 'none', boxShadow: 'none' } }}>
                                            Learn More
                                        </Button>
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
                        <Typography variant="h2" sx={{ color: '#1A1A2E', fontWeight: 800, mb: 2 }}>How It Works</Typography>
                        <Typography sx={{ color: '#4A4A6A', maxWidth: 500, mx: 'auto', lineHeight: 1.8 }}>Simple, transparent, and efficient — from request to delivery.</Typography>
                    </Box>
                </FadeInUp>
                <Grid container spacing={3}>
                    {[
                        { step: '01', title: 'Submit Request', desc: 'Send us your project details via our quote form or email. We respond within 4 hours.', icon: '📤' },
                        { step: '02', title: 'Get a Quote', desc: 'Receive a transparent, competitive quote tailored to your specific requirements.', icon: '💬' },
                        { step: '03', title: 'We Get to Work', desc: 'Our expert linguists begin work, with regular progress updates for larger projects.', icon: '⚙️' },
                        { step: '04', title: 'Review & Deliver', desc: 'After thorough quality checks, your completed work is delivered on time, every time.', icon: '✅' },
                    ].map((step, i) => (
                        <Grid item xs={12} sm={6} md={3} key={step.step}>
                            <FadeInUp delay={i * 0.1}>
                                <Box sx={{ textAlign: 'center', p: 3.5, bgcolor: '#fff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', height: '100%', position: 'relative', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 16px 48px rgba(0,0,0,0.1)' } }}>
                                    <Typography sx={{ fontSize: '2.2rem', mb: 1.5 }}>{step.icon}</Typography>
                                    <Typography sx={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '2.5rem', color: 'rgba(247,161,26,0.15)', lineHeight: 1, mb: 1 }}>{step.step}</Typography>
                                    <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', mb: 1.5 }}>{step.title}</Typography>
                                    <Typography sx={{ color: '#4A4A6A', fontSize: '0.875rem', lineHeight: 1.7 }}>{step.desc}</Typography>
                                </Box>
                            </FadeInUp>
                        </Grid>
                    ))}
                </Grid>
                <FadeInUp delay={0.4}>
                    <Box sx={{ textAlign: 'center', mt: 6 }}>
                        <Button component={RouterLink} to="/quote" variant="contained" color="primary" size="large" endIcon={<ArrowForwardIcon />} sx={{ px: 5 }}>
                            Request a Quote Now
                        </Button>
                    </Box>
                </FadeInUp>
            </Container>
        </Box>
    </>
);

export default ServicesPage;
