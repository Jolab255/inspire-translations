import React from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { uiTranslations } from '../../../data/translations/ui';
import { FadeInUp, TypewriterText, AnimatedPreTitle } from '../../../components/common/Animations';
import aboutUsPhoto from '../../../assets/images/about_us_photo.png';

const PurposeWhiteSection = () => {
    const { language } = useLanguage();
    const ui = uiTranslations[language];

    return (
        <Box sx={{ pt: { xs: 8, md: 11 }, pb: { xs: 10, md: 22 }, bgcolor: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, bgcolor: '#0D2B14' }} />
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 6, md: 9 }, alignItems: 'center' }}>

                    {/* Left — Photo */}
                    <Box sx={{ flex: '0 0 auto', width: { xs: '100%', md: '42%' } }}>
                        <FadeInUp>
                            <Box sx={{ position: 'relative' }}>
                                <Box sx={{ position: 'absolute', top: { xs: -8, md: -12 }, left: { xs: -8, md: -12 }, width: { xs: 40, md: 60 }, height: { xs: 40, md: 60 }, border: '4px solid #F7A11A', borderRight: 'none', borderBottom: 'none', zIndex: 1 }} />
                                <Box sx={{ position: 'absolute', bottom: { xs: -8, md: -12 }, right: { xs: -8, md: -12 }, width: { xs: 40, md: 60 }, height: { xs: 40, md: 60 }, border: '4px solid #1A5C2A', borderLeft: 'none', borderTop: 'none', zIndex: 1 }} />
                                <Box component="img" src={aboutUsPhoto} alt="Inspire Translations" sx={{ width: '100%', maxHeight: { xs: 400, md: 520 }, objectFit: 'cover', objectPosition: 'top center', display: 'block', mixBlendMode: 'multiply', filter: 'contrast(1.05)' }} />
                            </Box>
                        </FadeInUp>
                    </Box>

                    {/* Right — Text */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <FadeInUp delay={0.15}>
                            <AnimatedPreTitle text={ui.ourPurpose} color="#F7A11A" triggerOnce={false} />

                            <TypewriterText
                                key={`purpose-title-${language}`}
                                text={ui.whyWeExist}
                                variant="h2"
                                sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.6rem' }, color: '#0D2B14', lineHeight: 1.15, mb: 3 }}
                            />
                            <Box sx={{ width: 56, height: 4, bgcolor: '#F7A11A', mb: 3 }} />
                            <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 400, fontSize: { xs: '0.85rem', md: '0.95rem' }, lineHeight: { xs: 1.8, md: 2 }, color: '#444', mb: 2 }}>
                                {ui.purposeDesc1}
                            </Typography>
                            <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 400, fontSize: { xs: '0.85rem', md: '0.95rem' }, lineHeight: { xs: 1.8, md: 2 }, color: '#444', mb: 4 }}>
                                {ui.purposeDesc2}
                            </Typography>
                            <Box
                                component={motion(RouterLink)}
                                whileHover="hover"
                                initial="rest"
                                animate="rest"
                                to={`/${language}/about`}
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    border: '1.5px solid #1A5C2A',
                                    borderRadius: 50,
                                    overflow: 'hidden',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#0D2B14',
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
                                        color: '#0D2B14',
                                        fontFamily: '"Inknut Antiqua", serif',
                                        fontWeight: 700,
                                        fontSize: '0.85rem',
                                        px: 2.5,
                                        lineHeight: '36px',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {ui.moreAboutUs}
                                </Typography>
                                <Box
                                    className="pill-arrow-w"
                                    component={motion.div}
                                    variants={{
                                        rest: { x: 0 },
                                        hover: { x: 0 }
                                    }}
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
                                            hover: { x: 8 }
                                        }}
                                        transition={{ type: 'spring', stiffness: 600, damping: 15 }}
                                    >
                                        <ArrowForwardIcon sx={{ color: '#FFFFFF', fontSize: 18 }} />
                                    </motion.div>
                                </Box>
                            </Box>
                        </FadeInUp>
                    </Box>

                </Box>
            </Container>
        </Box>
    );
};

export default PurposeWhiteSection;
