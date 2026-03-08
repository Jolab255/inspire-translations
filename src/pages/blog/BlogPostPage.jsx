import { useParams, Navigate, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import SEOHead from '../../components/seo/SEOHead';
import { getPostBySlug, getAllPosts } from '../../utils/blogLoader';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';

const bgColors = [
    'linear-gradient(135deg, #F7A11A, #D4880E)',
    'linear-gradient(135deg, #1A5C2A, #2A7A3B)',
    'linear-gradient(135deg, #0D1B2A, #2A4A60)',
];

const BlogPostPage = () => {
    const { slug } = useParams();
    const { language } = useLanguage();
    const ui = uiTranslations[language];
    
    const post = getPostBySlug(slug, language);
    // Find index for background color
    const allPosts = getAllPosts(language);
    const postIndex = allPosts.findIndex(p => p.slug === slug);

    if (!post) return <Navigate to={`/${language}/blog`} replace />;

    const content = {
        en: {
            back: "Back to Blog",
            getQuote: "Get a Free Quote",
            allArticles: "All Articles",
        },
        sw: {
            back: "Rudi kwenye Blogu",
            getQuote: "Omba Makadirio ya Bure",
            allArticles: "Makala Zote",
        }
    };

    const c = content[language];

    return (
        <>
            <SEOHead
                title={`${post.title} | Inspire Translations Blog`}
                description={post.excerpt}
                canonicalUrl={`https://inspiretranslations.co.tz/${language}/blog/${post.slug}`}
            />
            <Box sx={{ background: bgColors[postIndex === -1 ? 0 : postIndex % 3], py: { xs: 8, md: 13 }, position: 'relative', overflow: 'hidden' }}>
                {[...Array(5)].map((_, i) => <Box key={i} sx={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.3)', top: `${15 + i * 15}%`, left: `${8 + i * 18}%`, animation: `float ${3 + i}s ease-in-out infinite` }} />)}
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <Button component={RouterLink} to={`/${language}/blog`} startIcon={<ArrowBackIcon />} sx={{ color: 'rgba(255,255,255,0.7)', mb: 4, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2, px: 2, '&:hover': { bgcolor: 'rgba(255,255,255,0.15)', transform: 'none' }, boxShadow: 'none' }}>
                            {c.back}
                        </Button>
                        <Chip label={post.category} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', fontFamily: 'Outfit', fontWeight: 600, mb: 3, border: '1px solid rgba(255,255,255,0.3)' }} />
                        <Typography variant="h1" sx={{ color: '#FFFFFF', fontWeight: 900, mb: 3, fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' } }}>{post.title}</Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                            {post.readTime} · {new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'sw-TZ', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </Typography>
                    </motion.div>
                </Container>
            </Box>

            <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
                <Container maxWidth="md">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Box sx={{ 
                            color: '#4A4A6A', 
                            lineHeight: { xs: 1.8, md: 2 }, 
                            fontSize: { xs: '1rem', md: '1.05rem' },
                            '& p': { mb: 3 },
                            '& blockquote': { 
                                my: 5, 
                                p: { xs: 3, md: 4 }, 
                                borderLeft: '4px solid #F7A11A', 
                                bgcolor: 'rgba(247,161,26,0.05)', 
                                borderRadius: '0 12px 12px 0',
                                '& p': { 
                                    m: 0,
                                    fontFamily: 'Outfit', 
                                    fontStyle: 'italic', 
                                    color: '#1A1A2E', 
                                    fontSize: { xs: '1.1rem', md: '1.2rem' }, 
                                    fontWeight: 600, 
                                    lineHeight: 1.7 
                                }
                            }
                        }}>
                            <ReactMarkdown>{post.body}</ReactMarkdown>
                        </Box>

                        <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid rgba(0,0,0,0.08)', display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Button component={RouterLink} to={`/${language}/quote`} variant="contained" color="primary" size="large">{c.getQuote}</Button>
                            <Button component={RouterLink} to={`/${language}/blog`} variant="outlined" color="secondary" size="large" startIcon={<ArrowBackIcon />}>{c.allArticles}</Button>
                        </Box>
                    </motion.div>
                </Container>
            </Box>
        </>
    );
};

export default BlogPostPage;
