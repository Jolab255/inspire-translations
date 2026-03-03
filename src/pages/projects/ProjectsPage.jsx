import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BusinessIcon from '@mui/icons-material/Business';
import LanguageIcon from '@mui/icons-material/Language';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SEOHead from '../../components/seo/SEOHead';

const FadeInUp = ({ children, delay = 0 }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
            {children}
        </motion.div>
    );
};

const projects = [
    { id: 1, title: 'UN Women Annual Conference', client: 'UN Women Tanzania', type: 'Conference Interpretation', languages: 'English ↔ Swahili ↔ French', industry: 'International Org', color: '#F7A11A', emoji: '🏛️' },
    { id: 2, title: 'Legal Contract Package', client: 'East African Development Bank', type: 'Written Translation', languages: 'English ↔ French ↔ Arabic', industry: 'Finance & Legal', color: '#1A5C2A', emoji: '📄' },
    { id: 3, title: 'Corporate Language Training', client: 'NMB Bank Tanzania', type: 'Language Classes', languages: 'Business English & Swahili', industry: 'Banking', color: '#F7A11A', emoji: '📚' },
    { id: 4, title: 'ARSO Standards Conference', client: 'African Org. for Standardization', type: 'Conference Interpretation + Equipment', languages: 'English ↔ French ↔ Arabic', industry: 'Standards Body', color: '#1A5C2A', emoji: '🎙️' },
    { id: 5, title: 'Government Document Translation', client: 'Tanzania Revenue Authority', type: 'Written Translation', languages: 'Swahili ↔ English', industry: 'Government', color: '#F7A11A', emoji: '🏦' },
    { id: 6, title: 'GIZ Tanzania Program Materials', client: 'GIZ Tanzania', type: 'Written Translation', languages: 'German ↔ English ↔ Swahili', industry: 'Development', color: '#1A5C2A', emoji: '🤝' },
];

const ProjectsPage = () => (
    <>
        <SEOHead
            title="Our Projects | Inspire Translations Tanzania"
            description="Explore Inspire Translations' portfolio of translation, interpretation, and language training projects across Tanzania and East Africa."
            canonicalUrl="https://inspiretranslations.co.tz/projects"
        />
        <Box sx={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2E40 60%, #0F3A1A 100%)', py: { xs: 10, md: 13 }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            {[...Array(5)].map((_, i) => <Box key={i} sx={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', bgcolor: 'rgba(247,161,26,0.4)', top: `${15 + i * 12}%`, left: `${8 + i * 18}%`, animation: `float ${3 + i % 2}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }} />)}
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                    <Chip label="Our Work" sx={{ bgcolor: 'rgba(247,161,26,0.15)', color: '#F7A11A', border: '1px solid rgba(247,161,26,0.3)', fontFamily: 'Outfit', fontWeight: 600, mb: 3 }} />
                    <Typography variant="h1" sx={{ color: '#FFFFFF', fontWeight: 900, mb: 3 }}>
                        Projects & <Box component="span" sx={{ color: '#F7A11A' }}>Portfolio</Box>
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                        A track record of excellence across international organizations, government bodies, and corporate clients.
                    </Typography>
                </motion.div>
            </Container>
        </Box>

        <Box sx={{ py: 12, bgcolor: '#F8F9FA' }}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    {projects.map((p, i) => (
                        <Grid item xs={12} md={6} key={p.id}>
                            <FadeInUp delay={i * 0.08}>
                                <Card sx={{
                                    height: '100%', border: '1px solid rgba(0,0,0,0.07)', position: 'relative', overflow: 'hidden',
                                    '&::before': { content: '""', position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, background: p.color === '#F7A11A' ? 'linear-gradient(180deg,#F7A11A,#D4880E)' : 'linear-gradient(180deg,#1A5C2A,#2A7A3B)' }
                                }}>
                                    <CardContent sx={{ py: 3.5, pl: 4.5 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5, mb: 2 }}>
                                            <Box sx={{ width: 56, height: 56, borderRadius: 2, bgcolor: p.color === '#F7A11A' ? 'rgba(247,161,26,0.1)' : 'rgba(26,92,42,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', flexShrink: 0 }}>
                                                {p.emoji}
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', fontSize: '1.05rem', lineHeight: 1.3, mb: 0.5 }}>{p.title}</Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                                                    <BusinessIcon sx={{ fontSize: 14, color: '#9E9E9E' }} />
                                                    <Typography sx={{ color: '#9E9E9E', fontSize: '0.8rem', fontFamily: 'Inter' }}>{p.client}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                                            <Chip label={p.type} size="small" sx={{ bgcolor: p.color === '#F7A11A' ? 'rgba(247,161,26,0.1)' : 'rgba(26,92,42,0.1)', color: p.color, fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.7rem' }} />
                                            <Chip icon={<LanguageIcon sx={{ fontSize: '14px !important' }} />} label={p.languages} size="small" sx={{ bgcolor: 'rgba(0,0,0,0.04)', color: '#4A4A6A', fontFamily: 'Inter', fontSize: '0.72rem' }} />
                                            <Chip label={p.industry} size="small" variant="outlined" sx={{ borderColor: 'rgba(0,0,0,0.1)', color: '#9E9E9E', fontFamily: 'Inter', fontSize: '0.7rem' }} />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </FadeInUp>
                        </Grid>
                    ))}
                </Grid>
                <FadeInUp delay={0.5}>
                    <Box sx={{ textAlign: 'center', mt: 8, p: 6, bgcolor: '#fff', borderRadius: 4, border: '1px solid rgba(0,0,0,0.06)' }}>
                        <Typography variant="h4" sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', mb: 2 }}>Ready to Start Your Project?</Typography>
                        <Typography sx={{ color: '#4A4A6A', mb: 4, maxWidth: 500, mx: 'auto' }}>Join our growing list of satisfied clients across East Africa and beyond.</Typography>
                        <Button component={RouterLink} to="/quote" variant="contained" color="primary" size="large" endIcon={<ArrowForwardIcon />} sx={{ px: 5 }}>Get a Free Quote</Button>
                    </Box>
                </FadeInUp>
            </Container>
        </Box>
    </>
);

export default ProjectsPage;
