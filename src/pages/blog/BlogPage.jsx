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
    primary: '#0D2B14', // Deep Dark Green
    secondary: '#0D2B14',
    accent: '#F7A11A', // Boutique Yellow
    bg: '#FFFFFF',
    bgSoft: '#FBFBFB',
    text: '#0D2B14',
    textMuted: 'rgba(13, 43, 20, 0.7)'
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
                    transition: 'none',
                    position: 'relative',
                    height: '100%',
                    border: '1.5px solid #0D2B14',
                    '&:hover': {
                        boxShadow: 'none',
                        '& .card-image': { transform: 'scale(1.05)' }
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
                                bgcolor: '#0D2B14', 
                                color: '#F7A11A', 
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
                            color: COLORS.secondary
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
                                border: `1.5px solid #0D2B14`,
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
                                    color: '#0D2B14',
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
                                    bgcolor: '#0D2B14',
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
                                    <ArrowForwardIcon sx={{ color: '#F7A11A', fontSize: 14 }} />
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
        <Box sx={{ bgcolor: '#FFFFFF' }}>
            <SEOHead
                title={language === 'en' ? "Blog & Articles | Inspire Translations Tanzania" : "Blogu na Makala | Inspire Translations Tanzania"}
                description={c.heroDesc}
            />

            {/* Premium Split Hero */}
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
                    width: { xs: '100%', md: '50%' },
                    display: 'flex',
                    alignItems: 'center',
                    px: { xs: 3, sm: 6, md: 12 },
                    py: { xs: 10, sm: 12, md: 15 },
                    bgcolor: '#F7A11A',
                    zIndex: 2,
                    order: { xs: 2, md: 1 }
                }}>
                    <Box>
                        <AnimatedPreTitle text={c.heroLabel} color="#0D2B14" />
                        <TypewriterText 
                            key={`blog-hero-${language}`}
                            text={c.heroTitle}
                            variant="h1" 
                            sx={{ color: '#0D2B14', fontWeight: 900, mb: 3, fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4.2rem' }, lineHeight: 1.1, fontFamily: '"Inknut Antiqua", serif' }} 
                        />
                        <Box sx={{ width: 80, height: 4, bgcolor: '#0D2B14', mb: 4 }} />
                        <Typography sx={{ color: 'rgba(13, 43, 20, 0.8)', fontSize: { xs: '1rem', md: '1.1rem' }, maxWidth: 500, lineHeight: 1.8, fontFamily: '"Inknut Antiqua", serif', fontWeight: 500 }}>
                            {c.heroDesc}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    width: { xs: '100%', md: '50%' },
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
                            background: `url(${aboutHeroImg}) center/cover no-repeat`,
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                inset: 0,
                                background: {
                                    xs: 'linear-gradient(to top, rgba(13, 43, 20, 0.8) 0%, transparent 100%)',
                                    md: 'linear-gradient(to right, rgba(13, 43, 20, 0.2) 0%, transparent 100%)'
                                }
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
                                bgcolor: '#FFFFFF',
                                boxShadow: 'none',
                                border: '2px solid #0D2B14'
                            }}>
                                <Box sx={{ flex: 1.2, height: { xs: 300, lg: 'auto' }, overflow: 'hidden', borderRight: { lg: '2px solid #0D2B14' } }}>
                                    <Box component="img" src={imgLogistics} alt={featuredPost.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                                <Box sx={{ flex: 1, p: { xs: 4, md: 8 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography sx={{ color: '#F7A11A', bgcolor: '#0D2B14', px: 2, py: 0.5, display: 'inline-block', alignSelf: 'flex-start', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', mb: 3, fontFamily: 'Outfit' }}>
                                        {c.featured}
                                    </Typography>
                                    
                                    <TypewriterText 
                                        key={`featured-title-${language}`}
                                        text={featuredPost.title}
                                        variant="h3" 
                                        sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: { xs: '1.5rem', md: '2rem' }, color: '#0D2B14', mb: 3, lineHeight: 1.3 }} 
                                    />

                                    <Typography sx={{ color: 'rgba(13, 43, 20, 0.8)', mb: 4, lineHeight: 1.8, fontSize: '1rem', fontFamily: '"Inknut Antiqua", serif', fontWeight: 400 }}>
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
                                            border: `2px solid #0D2B14`,
                                            borderRadius: 50,
                                            overflow: 'hidden',
                                            textDecoration: 'none',
                                            transition: 'all 0.3s ease',
                                            alignSelf: 'flex-start',
                                            '&:hover': {
                                                bgcolor: 'rgba(13, 43, 20, 0.04)'
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
                                                color: '#0D2B14',
                                                fontFamily: '"Inknut Antiqua", serif',
                                                fontWeight: 700,
                                                fontSize: '0.85rem',
                                                px: 3,
                                                lineHeight: '40px',
                                                whiteSpace: 'nowrap'
                                                }}
                                                >
                                                {c.readMore}
                                                </Typography>
                                                <Box
                                                sx={{
                                                width: 40,
                                                height: 40,
                                                flexShrink: 0,
                                                bgcolor: '#0D2B14',
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
                                                <ArrowForwardIcon sx={{ color: '#F7A11A', fontSize: 20 }} />
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
                            sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: '1.8rem', color: '#0D2B14' }} 
                        />
                        <Divider sx={{ width: 60, height: 4, bgcolor: '#F7A11A', mx: 'auto', border: 'none', mt: 2 }} />
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
                                        fontWeight: 700,
                                        borderRadius: 0,
                                        bgcolor: selectedCategory === cat ? '#0D2B14' : 'transparent',
                                        color: selectedCategory === cat ? '#F7A11A' : '#0D2B14',
                                        border: `1.5px solid #0D2B14`,
                                        '&:hover': {
                                            bgcolor: selectedCategory === cat ? '#0D2B14' : 'rgba(13, 43, 20, 0.05)',
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
                                    borderRadius: 0,
                                    bgcolor: '#FFF',
                                    fontFamily: 'Inter',
                                    '& fieldset': { borderColor: '#0D2B14' },
                                    '&:hover fieldset': { borderColor: '#F7A11A' },
                                    '&.Mui-focused fieldset': { borderColor: '#0D2B14' },
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#0D2B14' }} />
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
