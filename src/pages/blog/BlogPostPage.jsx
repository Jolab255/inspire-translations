import { useParams, Navigate, Link as RouterLink } from 'react-router-dom';
import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import SEOHead from '../../components/seo/SEOHead';
import { getPostBySlug } from '../../utils/blogLoader';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';
import { FadeInUp, TypewriterText, AnimatedPreTitle } from '../../components/common/Animations';
import CTASection from '../../components/common/CTASection';

// Service Images for fallback
import imgLogistics from '../../assets/images/conference_logistics.png';

const COLORS = {
    primary: '#0D2B14', // Deep Dark Green
    secondary: '#0D2B14',
    accent: '#F7A11A', // Boutique Yellow
    text: '#0D2B14',
    textMuted: 'rgba(13, 43, 20, 0.7)',
    bgSoft: '#FBFBFB'
};

const BlogPostPage = () => {
    const { slug } = useParams();
    const { language } = useLanguage();
    const ui = uiTranslations[language];
    const [copied, setCopied] = useState(false);
    
    const post = getPostBySlug(slug, language);

    // Resolve post image - directly use string path from CMS or static public path
    const postImage = post?.image || imgLogistics;

    if (!post) return <Navigate to={`/${language}/blog`} replace />;

    const currentUrl = `https://inspiretranslations.co.tz/${language}/blog/${post.slug}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const content = {
        en: {
            back: "Return to Insights",
            getQuote: "Request a Consultation",
            share: "Share Insight",
            readTime: "Minutes Read"
        },
        sw: {
            back: "Rudi kwenye Maarifa",
            getQuote: "Omba Ushauri",
            share: "Shiriki Maarifa",
            readTime: "Dakika za Kusoma"
        }
    };

    const c = content[language];

    return (
        <Box sx={{ bgcolor: '#FFFFFF' }}>
            <SEOHead
                title={`${post.title} | Inspire Translations`}
                description={post.excerpt}
                canonicalUrl={currentUrl}
            />

            {/* Split Hero Design */}
            <Box sx={{
                minHeight: { xs: 'auto', md: '65vh' },
                display: 'flex',
                alignItems: 'stretch',
                flexDirection: { xs: 'column', md: 'row' },
                background: '#F7A11A',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Box sx={{
                    width: { xs: '100%', md: '55%' },
                    display: 'flex',
                    alignItems: 'center',
                    px: { xs: 3, sm: 6, md: 12 },
                    py: { xs: 18, sm: 22, md: 26 },
                    zIndex: 2,
                    bgcolor: '#F7A11A',
                    order: { xs: 2, md: 1 }
                }}>
                    <Box>
                        <AnimatedPreTitle text={post.category} color="#0D2B14" />
                        <TypewriterText 
                            key={`post-hero-${language}-${post.slug}`}
                            text={post.title}
                            variant="h1" 
                            sx={{ color: '#0D2B14', fontWeight: 900, mb: 3, fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' }, lineHeight: 1.1, fontFamily: '"Inknut Antiqua", serif' }} 
                        />
                        <Box sx={{ width: 80, height: 4, bgcolor: '#0D2B14', mb: 4 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, color: 'rgba(13, 43, 20, 0.8)' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CalendarTodayIcon sx={{ fontSize: 16, color: '#0D2B14' }} />
                                <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: 'Outfit' }}>
                                    {new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'sw-TZ', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AccessTimeIcon sx={{ fontSize: 16, color: '#0D2B14' }} />
                                <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: 'Outfit' }}>
                                    {post.readTime} {c.readTime}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    width: { xs: '100%', md: '45%' },
                    height: { xs: '300px', md: 'auto' },
                    position: 'relative',
                    order: { xs: 1, md: 2 },
                    borderLeft: { md: '2px solid #0D2B14' }
                }}>
                    <Box 
                        sx={{ 
                            width: '100%', 
                            height: '100%', 
                            minHeight: '100%',
                            background: `url(${postImage}) center/cover no-repeat`,
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                inset: 0,
                                background: {
                                    xs: 'linear-gradient(to top, rgba(13, 43, 20, 0.8) 0%, transparent 100%)',
                                    md: 'rgba(13, 43, 20, 0.15)'
                                }
                            }
                        }} 
                    />
                </Box>
            </Box>

            {/* Article Content Area */}
            <Container maxWidth="lg" sx={{ mt: { xs: 4, md: -8 }, position: 'relative', zIndex: 10, pb: 15 }}>
                <Grid container spacing={8} justifyContent="center">
                    <Grid item xs={12} lg={9}>
                        <Box sx={{ 
                            bgcolor: '#FFFFFF', 
                            p: { xs: 4, md: 8, lg: 10 },
                            boxShadow: 'none',
                            border: `2px solid #0D2B14`
                        }}>
                            <FadeInUp delay={0.2}>
                                <Box sx={{ 
                                    color: COLORS.secondary, 
                                    lineHeight: 2, 
                                    fontSize: { xs: '1.05rem', md: '1.2rem' },
                                    fontFamily: 'Outfit, sans-serif', 
                                    '& p': { mb: 4, fontWeight: 400 },
                                    '& h2': { 
                                        fontFamily: '"Inknut Antiqua", serif', 
                                        fontSize: { xs: '1.6rem', md: '2.2rem' }, 
                                        mt: 8, mb: 4, 
                                        color: COLORS.secondary,
                                        fontWeight: 700,
                                        lineHeight: 1.3
                                    },
                                    '& h3': { 
                                        fontFamily: '"Inknut Antiqua", serif', 
                                        fontSize: { xs: '1.3rem', md: '1.6rem' }, 
                                        mt: 6, mb: 3, 
                                        color: COLORS.secondary,
                                        fontWeight: 700
                                    },
                                    '& ul, & ol': { mb: 4, pl: 4 },
                                    '& li': { mb: 2 },
                                    '& blockquote': { 
                                        my: 8, 
                                        p: { xs: 4, md: 8 }, 
                                        borderLeft: `8px solid #F7A11A`, 
                                        bgcolor: 'rgba(13, 43, 20, 0.02)', 
                                        position: 'relative',
                                        '& p': { 
                                            m: 0,
                                            fontFamily: '"Inknut Antiqua", serif', 
                                            fontStyle: 'italic', 
                                            color: COLORS.secondary, 
                                            fontSize: { xs: '1.2rem', md: '1.5rem' }, 
                                            fontWeight: 400, 
                                            lineHeight: 1.6 
                                        }
                                    },
                                    '& img': { 
                                        maxWidth: '100%', 
                                        height: 'auto', 
                                        my: 6,
                                        border: '1px solid #0D2B14'
                                    },
                                    '& strong': { fontWeight: 700, color: '#0D2B14' }
                                }}>
                                    <ReactMarkdown>{post.body}</ReactMarkdown>
                                </Box>

                                {/* Post Footer: Sharing & Actions */}
                                <Box sx={{ mt: 12, pt: 8, borderTop: '1px solid rgba(13, 43, 20, 0.1)', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                                        <Typography sx={{ fontFamily: 'Outfit', fontWeight: 800, color: COLORS.secondary, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            {c.share}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1.5 }}>
                                            <IconButton component="a" href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(post.title)}`} target="_blank" sx={{ color: '#0D2B14', bgcolor: 'rgba(13, 43, 20, 0.05)', '&:hover': { bgcolor: '#0D2B14', color: '#F7A11A' } }}>
                                                <LinkedInIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton component="a" href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + currentUrl)}`} target="_blank" sx={{ color: '#0D2B14', bgcolor: 'rgba(13, 43, 20, 0.05)', '&:hover': { bgcolor: '#0D2B14', color: '#F7A11A' } }}>
                                                <WhatsAppIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton onClick={handleCopy} sx={{ color: '#0D2B14', bgcolor: 'rgba(13, 43, 20, 0.05)', '&:hover': { bgcolor: '#0D2B14', color: '#F7A11A' } }}>
                                                {copied ? <CheckIcon fontSize="small" color="success" /> : <ContentCopyIcon fontSize="small" />}
                                            </IconButton>
                                        </Box>
                                    </Box>

                                    <Box
                                        component={motion(RouterLink)}
                                        whileHover="hover"
                                        initial="rest"
                                        animate="rest"
                                        to={`/${language}/quote`}
                                        sx={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            border: `2.5px solid #0D2B14`,
                                            borderRadius: 50,
                                            overflow: 'hidden',
                                            textDecoration: 'none',
                                            transition: 'all 0.3s ease',
                                            '&:hover': { bgcolor: 'rgba(13, 43, 20, 0.04)' }
                                        }}
                                    >
                                        <Typography
                                            component={motion.span}
                                            variants={{ rest: { x: 0 }, hover: { x: 5 } }}
                                            sx={{
                                                color: '#0D2B14',
                                                fontFamily: '"Inknut Antiqua", serif',
                                                fontWeight: 700,
                                                fontSize: '0.85rem',
                                                px: 4,
                                                lineHeight: '44px',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {c.getQuote}
                                        </Typography>
                                        <Box sx={{ width: 44, height: 44, bgcolor: '#0D2B14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <motion.div variants={{ rest: { x: 0 }, hover: { x: 8 } }}>
                                                <ArrowForwardIcon sx={{ color: '#F7A11A', fontSize: 20 }} />
                                            </motion.div>
                                        </Box>
                                    </Box>
                                </Box>
                            </FadeInUp>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <CTASection />
        </Box>
    );
};

export default BlogPostPage;
