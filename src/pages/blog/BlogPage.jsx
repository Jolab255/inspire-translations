import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SEOHead from '../../components/seo/SEOHead';
import { getAllPosts } from '../../utils/blogLoader';
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

const bgColors = [
    'linear-gradient(135deg, #F7A11A, #D4880E)',
    'linear-gradient(135deg, #1A5C2A, #2A7A3B)',
    'linear-gradient(135deg, #0D1B2A, #1A2E40)',
];
const emojis = ['📰', '🌍', '🎙️'];

const BlogPage = () => {
    const { language } = useLanguage();
    const ui = uiTranslations[language];
    const blogPosts = getAllPosts(language);

    const content = {
        en: {
            heroLabel: "Blog & Insights",
            heroTitle: <>Language <Box component="span" sx={{ color: '#F7A11A' }}>Insights</Box></>,
            heroDesc: "Expert articles on translation, interpretation, and cross-cultural communication.",
        },
        sw: {
            heroLabel: "Blogu na Maarifa",
            heroTitle: <>Maarifa ya <Box component="span" sx={{ color: '#F7A11A' }}>Lugha</Box></>,
            heroDesc: "Makala ya kitaalamu kuhusu tafsiri, ukalimani, na mawasiliano ya tamaduni mbalimbali.",
        }
    };

    const c = content[language];

    return (
        <>
            <SEOHead
                title={language === 'en' ? "Blog & Articles | Inspire Translations Tanzania" : "Blogu na Makala | Inspire Translations Tanzania"}
                description={c.heroDesc}
            />
            {/* Hero */}
            <Box sx={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2E40 60%, #0F3A1A 100%)', py: { xs: 10, md: 13 }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                {[...Array(5)].map((_, i) => <Box key={i} sx={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', bgcolor: 'rgba(247,161,26,0.4)', top: `${15 + i * 12}%`, left: `${8 + i * 15}%`, animation: `float ${3 + i % 2}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }} />)}
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <Chip label={c.heroLabel} sx={{ bgcolor: 'rgba(247,161,26,0.15)', color: '#F7A11A', border: '1px solid rgba(247,161,26,0.3)', fontFamily: 'Outfit', fontWeight: 600, mb: 3 }} />
                        <Typography variant="h1" sx={{ color: '#FFFFFF', fontWeight: 900, mb: 3, fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' } }}>
                            {c.heroTitle}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8 }}>
                            {c.heroDesc}
                        </Typography>
                    </motion.div>
                </Container>
            </Box>

            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F8F9FA' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {blogPosts.map((post, i) => (
                            <Grid item xs={12} md={4} key={post.slug}>
                                <FadeInUp delay={i * 0.1}>
                                    <Card component={RouterLink} to={`/${language}/blog/${post.slug}`} sx={{ textDecoration: 'none', height: '100%', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column' }}>
                                        {post.image ? (
                                            <Box
                                                sx={{
                                                    height: 200,
                                                    width: '100%',
                                                    backgroundImage: `url(${post.image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    flexShrink: 0
                                                }}
                                            />
                                        ) : (
                                            <Box sx={{ height: 200, background: bgColors[i % 3], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', flexShrink: 0 }}>
                                                {emojis[i % 3]}
                                            </Box>
                                        )}
                                        <CardContent sx={{ p: { xs: 3, sm: 3.5 }, flexGrow: 1 }}>
                                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                                <Chip label={post.category} size="small" sx={{ bgcolor: 'rgba(247,161,26,0.1)', color: '#F7A11A', fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.7rem' }} />
                                            </Box>
                                            <Typography variant="h6" sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', mb: 1.5, lineHeight: 1.4, fontSize: '1.15rem' }}>{post.title}</Typography>
                                            <Typography variant="body2" sx={{ color: '#4A4A6A', lineHeight: 1.7, mb: 2.5 }}>{post.excerpt.substring(0, 130)}...</Typography>
                                            <Typography sx={{ fontSize: '0.8rem', color: '#9E9E9E', borderTop: '1px solid rgba(0,0,0,0.06)', pt: 2, mt: 'auto' }}>
                                                {post.readTime} · {new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'sw-TZ', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </FadeInUp>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default BlogPage;
