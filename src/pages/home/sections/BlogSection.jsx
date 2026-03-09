import React, { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { uiTranslations } from '../../../data/translations/ui';
import { getAllPosts } from '../../../utils/blogLoader';
import { FadeInUp, TypewriterText } from '../../../components/common/Animations';

// Blog Placeholder Images
import serviceWritten from '../../../assets/images/written_translation.png';
import serviceLogistics from '../../../assets/images/conference_logistics.png';
import serviceEquipment from '../../../assets/images/equipment_rental.png';

const BlogSection = () => {
    const { ref: headerRef, inView } = useInView({ triggerOnce: false, threshold: 0.4 });
    const { language, t } = useLanguage();
    const ui = uiTranslations[language];
    const blogImages = [serviceWritten, serviceLogistics, serviceEquipment];

    const blogPosts = useMemo(() => {
        const all = getAllPosts(language);
        // Ensure we always have 3 for the layout if any exist
        return all.slice(0, 3);
    }, [language]);

    if (!blogPosts || blogPosts.length === 0) return null;

    return (
        <Box sx={{ pt: 10, pb: 15, bgcolor: '#F7A11A' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 10, textAlign: 'left' }}>
                    <FadeInUp>
                        {/* Animated arrow label */}
                        <Box ref={headerRef} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5, overflow: 'hidden' }}>
                            <Box sx={{
                                height: 2, bgcolor: '#0D2B14',
                                width: inView ? 32 : 0,
                                transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
                            }} />
                            <Box sx={{
                                display: 'flex', alignItems: 'center',
                                transform: inView ? 'translateX(0) scale(1)' : 'translateX(-20px) scale(0.6)',
                                opacity: inView ? 1 : 0,
                                transition: 'opacity 0.4s ease 0.45s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.45s',
                            }}>
                                <ArrowForwardIcon sx={{ color: '#0D2B14', fontSize: 18 }} />
                            </Box>
                            <Box sx={{
                                transform: inView ? 'translateY(0)' : 'translateY(8px)',
                                opacity: inView ? 1 : 0,
                                transition: 'opacity 0.4s ease 0.6s, transform 0.4s ease 0.6s',
                            }}>
                                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#0D2B14', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                                    {ui.latestInsights}
                                </Typography>
                            </Box>
                        </Box>

                        <TypewriterText
                            key={`blog-title-${language}`}
                            text={ui.fromOurBlog}
                            variant="h2"
                            sx={{ fontFamily: '"Inknut Antiqua", serif', color: '#0D2B14', fontWeight: 800, fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }, mb: 3, maxWidth: '700px', lineHeight: 1.2 }}
                        />
                        <Box sx={{ width: 60, height: 4, bgcolor: '#0D2B14' }} />
                    </FadeInUp>
                </Box>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                    borderTop: '1.5px solid #0D2B14',
                    borderBottom: '1.5px solid #0D2B14',
                    bgcolor: '#F7A11A'
                }}>
                    {blogPosts.slice(0, 3).map((post, i) => (
                        <Box
                            key={post.id}
                            sx={{
                                borderRight: {
                                    xs: 'none',
                                    md: i === 2 ? 'none' : '1.5px solid #0D2B14'
                                },
                                borderBottom: {
                                    xs: i === 2 ? 'none' : '1.5px solid #0D2B14',
                                    md: 'none'
                                }
                            }}
                        >
                            <FadeInUp delay={i * 0.1}>
                                <Box sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    bgcolor: '#F7A11A'
                                }}>
                                    <Box
                                        component="img"
                                        src={blogImages[i % blogImages.length]}
                                        alt={t(post.title)}
                                        sx={{
                                            width: '100%',
                                            height: { xs: 220, md: 280 },
                                            objectFit: 'cover'
                                        }}
                                    />

                                    <Box sx={{ p: { xs: 3, md: 4 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                            <CalendarTodayIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />
                                            <Typography sx={{
                                                fontFamily: 'Inter',
                                                fontSize: '0.85rem',
                                                color: '#FFFFFF',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                                fontWeight: 600
                                            }}>
                                                {new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'sw-TZ', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </Typography>
                                        </Box>

                                        <Typography sx={{
                                            fontFamily: 'Outfit',
                                            fontWeight: 800,
                                            color: '#0D2B14',
                                            fontSize: '1.25rem',
                                            lineHeight: 1.3,
                                            mb: 2,
                                            height: '2.6em',
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical'
                                        }}>
                                            {t(post.title)}
                                        </Typography>

                                        <Typography sx={{
                                            fontFamily: 'Inter',
                                            color: '#0D2B14',
                                            fontSize: '0.92rem',
                                            lineHeight: 1.6,
                                            mb: 4,
                                            flexGrow: 1,
                                            opacity: 0.95
                                        }}>
                                            {t(post.excerpt)}
                                        </Typography>

                                        <Box
                                            component={motion(RouterLink)}
                                            whileHover="hover"
                                            initial="rest"
                                            animate="rest"
                                            to={`/${language}/blog/${post.slug}`}
                                            sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                border: '2px solid #0D2B14',
                                                borderRadius: 50,
                                                overflow: 'hidden',
                                                textDecoration: 'none',
                                                transition: 'all 0.3s ease',
                                                alignSelf: 'flex-start',
                                                '&:hover': {
                                                    bgcolor: 'rgba(13, 43, 20, 0.08)'
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
                                                    fontSize: '0.8rem',
                                                    px: 3,
                                                    lineHeight: '44px',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {ui.readMore}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    width: 44,
                                                    height: 44,
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
                                                        hover: { x: 8 }
                                                    }}
                                                    transition={{ type: 'spring', stiffness: 600, damping: 15 }}
                                                >
                                                    <ArrowForwardIcon sx={{ color: '#FFFFFF', fontSize: 18 }} />
                                                </motion.div>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </FadeInUp>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default BlogSection;
