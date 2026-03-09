import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SEOHead from '../../components/seo/SEOHead';
import { getAllPosts } from '../../utils/blogLoader';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';
import { FadeInUp, AnimatedPreTitle, TypewriterText } from '../../components/common/Animations';
import CTASection from '../../components/common/CTASection';

// Brand Assets for Blog
import aboutHeroImg from '../../assets/images/about_us_hero.png';
import imgWritten from '../../assets/images/written_translation.png';
import imgInterpretation from '../../assets/images/onsite_interpretation.png';
import imgLogistics from '../../assets/images/conference_logistics.png';

const COLORS = {
    primary: '#1A5C2A',
    secondary: '#0D2B14',
    accent: '#F7A11A',
    bg: '#FFFFFF',
    bgSoft: '#FBFBFB',
    text: '#1A1A2E',
    textMuted: '#4A4A6A'
};

const BlogCard = ({ post, language, index }) => {
    const images = [imgWritten, imgInterpretation, imgLogistics];
    const postImage = images[index % images.length];

    return (
        <FadeInUp delay={index * 0.1}>
            <Box
                component={RouterLink}
                to={`/${language}/blog/${post.slug}`}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    bgcolor: COLORS.bg,
                    transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                    position: 'relative',
                    height: '100%',
                    border: '1px solid rgba(0,0,0,0.05)',
                    '&:hover': {
                        transform: 'translateY(-8px)',
                        '& .card-image': { transform: 'scale(1.05)' },
                        '& .card-title': { color: COLORS.primary }
                    }
                }}
            >
                <Box sx={{ position: 'relative', height: 240, overflow: 'hidden' }}>
                    <Box
                        className="card-image"
                        component="img"
                        src={postImage}
                        alt={post.title}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.6s ease'
                        }}
                    />
                    <Box sx={{ position: 'absolute', top: 20, left: 20 }}>
                        <Chip 
                            label={post.category} 
                            size="small" 
                            sx={{ 
                                bgcolor: COLORS.accent, 
                                color: COLORS.secondary, 
                                fontWeight: 700, 
                                fontFamily: 'Outfit',
                                borderRadius: 0
                            }} 
                        />
                    </Box>
                </Box>

                <Box sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarTodayIcon sx={{ fontSize: 14, color: COLORS.accent }} />
                            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: COLORS.textMuted, textTransform: 'uppercase' }}>
                                {new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'sw-TZ', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTimeIcon sx={{ fontSize: 14, color: COLORS.accent }} />
                            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: COLORS.textMuted, textTransform: 'uppercase' }}>
                                {post.readTime}
                            </Typography>
                        </Box>
                    </Box>

                    <Typography
                        className="card-title"
                        variant="h5"
                        sx={{
                            fontFamily: '"Inknut Antiqua", serif',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            mb: 2,
                            lineHeight: 1.4,
                            color: COLORS.secondary,
                            transition: 'color 0.3s ease'
                        }}
                    >
                        {post.title}
                    </Typography>

                    <Typography sx={{ color: COLORS.textMuted, fontSize: '0.9rem', lineHeight: 1.7, mb: 3, fontFamily: '"Inknut Antiqua", serif' }}>
                        {post.excerpt.length > 120 ? post.excerpt.substring(0, 120) + '...' : post.excerpt}
                    </Typography>

                    <Box sx={{ mt: 'auto' }}>
                        <Box
                            component={motion.div}
                            whileHover="hover"
                            initial="rest"
                            animate="rest"
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                border: `1.5px solid ${COLORS.primary}`,
                                borderRadius: 50,
                                overflow: 'hidden',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <Typography
                                component={motion.span}
                                variants={{
                                    rest: { x: 0 },
                                    hover: { x: 5 }
                                }}
                                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                sx={{
                                    color: COLORS.primary,
                                    fontFamily: '"Inknut Antiqua", serif',
                                    fontWeight: 700,
                                    fontSize: '0.7rem',
                                    px: 2,
                                    lineHeight: '36px',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {language === 'en' ? 'Read Article' : 'Soma Makala'}
                            </Typography>
                            <Box
                                sx={{
                                    width: 36,
                                    height: 36,
                                    flexShrink: 0,
                                    bgcolor: COLORS.primary,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <motion.div
                                    variants={{
                                        rest: { x: 0 },
                                        hover: { x: 5 }
                                    }}
                                    transition={{ type: 'spring', stiffness: 600, damping: 15 }}
                                >
                                    <ArrowForwardIcon sx={{ color: '#FFFFFF', fontSize: 14 }} />
                                </motion.div>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </FadeInUp>
    );
};

const BlogPage = () => {
    const { language, t } = useLanguage();
    const ui = uiTranslations[language];
    const allPosts = useMemo(() => getAllPosts(language), [language]);
    const featuredPost = allPosts[0];
    
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = useMemo(() => {
        const cats = new Set(allPosts.map(post => post.category));
        return ['All', ...Array.from(cats)];
    }, [allPosts]);

    const filteredPosts = useMemo(() => {
        let posts = allPosts;
        if (selectedCategory !== 'All') {
            posts = posts.filter(p => p.category === selectedCategory);
        }
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            posts = posts.filter(p => 
                p.title.toLowerCase().includes(query) || 
                p.excerpt.toLowerCase().includes(query)
            );
        }
        return posts;
    }, [allPosts, selectedCategory, searchQuery]);

    // If no search/filter is active, remaining posts are everything after featured
    // Otherwise, show all filtered posts (and hide the featured hero entirely if searching)
    const isFiltering = searchQuery !== '' || selectedCategory !== 'All';
    const displayFeatured = featuredPost && !isFiltering;
    const remainingPosts = isFiltering ? filteredPosts : allPosts.slice(1);

    const content = {
        en: {
            heroLabel: "Industry Insights",
            heroTitle: "Linguistic Excellence",
            heroDesc: "Deep dives into the art of translation, the evolution of interpretation, and regional language trends shaping East Africa.",
            featured: "Latest Article",
            readMore: "Read More",
        },
        sw: {
            heroLabel: "Maarifa ya Kiwanda",
            heroTitle: "Ubora wa Kilugha",
            heroDesc: "Uchambuzi wa kina wa sanaa ya tafsiri, mageuzi ya ukalimani, na mienendo ya lugha ya kikanda inayounda Afrika Mashariki.",
            featured: "Makala ya Karibuni",
            readMore: "Soma Zaidi",
        }
    };

    const c = content[language];

    return (
        <Box sx={{ bgcolor: COLORS.bgSoft }}>
            <SEOHead
                title={language === 'en' ? "Blog & Articles | Inspire Translations Tanzania" : "Blogu na Makala | Inspire Translations Tanzania"}
                description={c.heroDesc}
            />

            {/* Premium Split Hero */}
            <Box sx={{
                minHeight: { xs: 'auto', md: '60vh' },
                display: 'flex',
                alignItems: 'stretch',
                flexDirection: { xs: 'column', md: 'row' },
                background: COLORS.secondary,
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Box sx={{
                    width: { xs: '100%', md: '50%' },
                    display: 'flex',
                    alignItems: 'center',
                    px: { xs: 3, sm: 6, md: 12 },
                    py: { xs: 10, sm: 12, md: 15 },
                    bgcolor: COLORS.secondary,
                    zIndex: 2
                }}>
                    <Box>
                        <AnimatedPreTitle text={c.heroLabel} color={COLORS.accent} />
                        <TypewriterText 
                            key={`blog-hero-${language}`}
                            text={c.heroTitle}
                            variant="h1" 
                            sx={{ color: '#FFFFFF', fontWeight: 900, mb: 3, fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4rem' }, lineHeight: 1.1, fontFamily: '"Inknut Antiqua", serif' }} 
                        />
                        <Box sx={{ width: 80, height: 4, bgcolor: COLORS.accent, mb: 4 }} />
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: '1rem', md: '1.1rem' }, maxWidth: 500, lineHeight: 1.8, fontFamily: '"Inknut Antiqua", serif' }}>
                            {c.heroDesc}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    width: { xs: '100%', md: '50%' },
                    minHeight: { xs: '300px', md: 'auto' },
                    position: 'relative'
                }}>
                    <Box 
                        sx={{ 
                            width: '100%', 
                            height: '100%', 
                            background: `url(${aboutHeroImg}) center/cover no-repeat`,
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to right, #0D2B14 0%, transparent 100%)',
                                display: { xs: 'none', md: 'block' }
                            }
                        }} 
                    />
                </Box>
            </Box>

            {/* Featured Post Section */}
            {displayFeatured && (
                <Box sx={{ mt: -8, position: 'relative', zIndex: 5, mb: 10 }}>
                    <Container maxWidth="lg">
                        <FadeInUp>
                            <Box sx={{ 
                                display: 'flex', 
                                flexDirection: { xs: 'column', lg: 'row' }, 
                                bgcolor: COLORS.bg,
                                boxShadow: '0 40px 100px rgba(0,0,0,0.12)',
                                border: '1px solid rgba(0,0,0,0.05)'
                            }}>
                                <Box sx={{ flex: 1.2, height: { xs: 300, lg: 'auto' }, overflow: 'hidden' }}>
                                    <Box component="img" src={imgLogistics} alt={featuredPost.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                                <Box sx={{ flex: 1, p: { xs: 4, md: 8 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography sx={{ color: COLORS.accent, fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', mb: 2, fontFamily: 'Outfit' }}>
                                        {c.featured}
                                    </Typography>
                                    
                                    <TypewriterText 
                                        key={`featured-title-${language}`}
                                        text={featuredPost.title}
                                        variant="h3" 
                                        sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: { xs: '1.5rem', md: '2rem' }, color: COLORS.secondary, mb: 3, lineHeight: 1.3 }} 
                                    />

                                    <Typography sx={{ color: COLORS.textMuted, mb: 4, lineHeight: 1.8, fontSize: '1rem', fontFamily: '"Inknut Antiqua", serif', fontWeight: 400 }}>
                                        {featuredPost.excerpt}
                                    </Typography>

                                    {/* Signature Pill Arrow Button */}
                                    <Box
                                        component={motion(RouterLink)}
                                        whileHover="hover"
                                        initial="rest"
                                        animate="rest"
                                        to={`/${language}/blog/${featuredPost.slug}`}
                                        sx={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            border: `2px solid ${COLORS.primary}`,
                                            borderRadius: 50,
                                            overflow: 'hidden',
                                            textDecoration: 'none',
                                            transition: 'all 0.3s ease',
                                            alignSelf: 'flex-start',
                                            '&:hover': {
                                                borderColor: COLORS.primary,
                                                bgcolor: 'rgba(26, 92, 42, 0.04)'
                                            }
                                        }}
                                    >
                                        <Typography
                                            component={motion.span}
                                            variants={{
                                                rest: { x: 0 },
                                                hover: { x: 5 }
                                            }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                            sx={{
                                                color: COLORS.primary,
                                                fontFamily: '"Inknut Antiqua", serif',
                                                fontWeight: 700,
                                                fontSize: '0.85rem',
                                                px: 3,
                                                lineHeight: '36px',
                                                whiteSpace: 'nowrap'
                                                }}
                                                >
                                                {c.readMore}
                                                </Typography>
                                                <Box
                                                sx={{
                                                width: 36,
                                                height: 36,
                                                flexShrink: 0,
                                                bgcolor: COLORS.primary,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                                }}
                                                >                                            <motion.div
                                                variants={{
                                                    rest: { x: 0 },
                                                    hover: { x: 8 }
                                                }}
                                                transition={{ type: 'spring', stiffness: 600, damping: 15 }}
                                            >
                                                <ArrowForwardIcon sx={{ color: '#FFFFFF', fontSize: 20 }} />
                                            </motion.div>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </FadeInUp>
                    </Container>
                </Box>
            )}

            {/* Article Grid and Filters */}
            <Box sx={{ pt: 4, pb: 10 }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <TypewriterText 
                            key={`more-insights-${language}`}
                            text={language === 'en' ? 'More Insights' : 'Maelezo Zaidi'}
                            variant="h2"
                            sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: '1.8rem', color: COLORS.secondary }} 
                        />
                        <Divider sx={{ width: 60, height: 4, bgcolor: COLORS.accent, mx: 'auto', border: 'none', mt: 2 }} />
                    </Box>

                    {/* Filters & Search */}
                    <Box sx={{ mb: 6, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                            {categories.map((cat) => (
                                <Chip
                                    key={cat}
                                    label={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    sx={{
                                        fontFamily: 'Outfit',
                                        fontWeight: 600,
                                        bgcolor: selectedCategory === cat ? COLORS.primary : 'transparent',
                                        color: selectedCategory === cat ? '#FFF' : COLORS.textMuted,
                                        border: `1px solid ${selectedCategory === cat ? COLORS.primary : 'rgba(0,0,0,0.1)'}`,
                                        '&:hover': {
                                            bgcolor: selectedCategory === cat ? COLORS.primary : 'rgba(0,0,0,0.05)',
                                        }
                                    }}
                                />
                            ))}
                        </Box>
                        
                        <TextField
                            placeholder={language === 'en' ? 'Search articles...' : 'Tafuta makala...'}
                            variant="outlined"
                            size="small"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{
                                width: { xs: '100%', md: 300 },
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 50,
                                    bgcolor: '#FFF',
                                    fontFamily: 'Inter',
                                    '& fieldset': { borderColor: 'rgba(0,0,0,0.1)' },
                                    '&:hover fieldset': { borderColor: COLORS.accent },
                                    '&.Mui-focused fieldset': { borderColor: COLORS.primary },
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: COLORS.textMuted }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <Box sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                        gap: 4
                    }}>
                        {remainingPosts.length > 0 ? remainingPosts.map((post, i) => (
                            <BlogCard key={post.slug} post={post} language={language} index={i + 1} />
                        )) : (
                            <Typography sx={{ gridColumn: '1 / -1', textAlign: 'center', color: COLORS.textMuted, py: 4, fontFamily: 'Outfit' }}>
                                {language === 'en' ? 'No articles found matching your criteria.' : 'Hakuna makala yaliyopatikana kwa vigezo vyako.'}
                            </Typography>
                        )}
                    </Box>
                </Container>
            </Box>
            <CTASection />
        </Box>
    );
};

export default BlogPage;
