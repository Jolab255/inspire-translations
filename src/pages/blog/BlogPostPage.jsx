import { useParams, Navigate, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import SEOHead from '../../components/seo/SEOHead';
import { blogPosts } from '../../data/siteData';

const bgColors = [
    'linear-gradient(135deg, #F7A11A, #D4880E)',
    'linear-gradient(135deg, #1A5C2A, #2A7A3B)',
    'linear-gradient(135deg, #0D1B2A, #2A4A60)',
];

const BlogPostPage = () => {
    const { slug } = useParams();
    const postIndex = blogPosts.findIndex((p) => p.slug === slug);
    const post = blogPosts[postIndex];

    if (!post) return <Navigate to="/blog" replace />;

    return (
        <>
            <SEOHead
                title={`${post.title} | Inspire Translations Blog`}
                description={post.excerpt}
                canonicalUrl={`https://inspiretranslations.co.tz/blog/${post.slug}`}
            />
            <Box sx={{ background: bgColors[postIndex % 3], py: { xs: 10, md: 13 }, position: 'relative', overflow: 'hidden' }}>
                {[...Array(5)].map((_, i) => <Box key={i} sx={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.3)', top: `${15 + i * 15}%`, left: `${8 + i * 18}%`, animation: `float ${3 + i}s ease-in-out infinite` }} />)}
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <Button component={RouterLink} to="/blog" startIcon={<ArrowBackIcon />} sx={{ color: 'rgba(255,255,255,0.7)', mb: 4, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2, px: 2, '&:hover': { bgcolor: 'rgba(255,255,255,0.15)', transform: 'none' }, boxShadow: 'none' }}>
                            Back to Blog
                        </Button>
                        <Chip label={post.category} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', fontFamily: 'Outfit', fontWeight: 600, mb: 3, border: '1px solid rgba(255,255,255,0.3)' }} />
                        <Typography variant="h1" sx={{ color: '#FFFFFF', fontWeight: 900, mb: 3 }}>{post.title}</Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                            {post.readTime} · {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </Typography>
                    </motion.div>
                </Container>
            </Box>

            <Box sx={{ py: 10, bgcolor: '#fff' }}>
                <Container maxWidth="md">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Typography sx={{ color: '#4A4A6A', lineHeight: 2, fontSize: '1.1rem', mb: 4 }}>
                            {post.excerpt}
                        </Typography>
                        {[
                            'Language services have never been more critical in today\'s interconnected world. Businesses operating across borders require not just translation of words, but a deep understanding of cultural nuance, regional dialects, and industry-specific terminology.',
                            'At Inspire Translations, we believe that every word carries meaning, and every translation carries responsibility. Our team of certified professionals approaches each project with the precision of a linguist and the cultural sensitivity of a native speaker.',
                            'Whether you are a multinational corporation expanding into East African markets, an international NGO delivering programs in Swahili, or a legal firm requiring certified document translation — the quality of your language services partner can make or break your success.',
                        ].map((para, i) => (
                            <Typography key={i} sx={{ color: '#4A4A6A', lineHeight: 2, fontSize: '1.05rem', mb: 3 }}>
                                {para}
                            </Typography>
                        ))}

                        <Box sx={{ my: 5, p: 4, borderLeft: '4px solid #F7A11A', bgcolor: 'rgba(247,161,26,0.05)', borderRadius: '0 12px 12px 0' }}>
                            <Typography sx={{ fontFamily: 'Outfit', fontStyle: 'italic', color: '#1A1A2E', fontSize: '1.2rem', fontWeight: 600, lineHeight: 1.7 }}>
                                "Precision in language is not just about grammar — it's about preserving intent, meaning, and cultural respect across every word."
                            </Typography>
                        </Box>

                        <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid rgba(0,0,0,0.08)', display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Button component={RouterLink} to="/quote" variant="contained" color="primary" size="large">Get a Free Quote</Button>
                            <Button component={RouterLink} to="/blog" variant="outlined" color="secondary" size="large" startIcon={<ArrowBackIcon />}>All Articles</Button>
                        </Box>
                    </motion.div>
                </Container>
            </Box>
        </>
    );
};

export default BlogPostPage;
