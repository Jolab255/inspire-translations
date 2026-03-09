import React from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { uiTranslations } from '../../../data/translations/ui';
import { FadeInUp, TypewriterText, AnimatedPreTitle } from '../../../components/common/Animations';
import heroWoman from '../../../assets/images/hero_woman_bg.png';

const WhatWeDoSection = () => {
    const { language } = useLanguage();
    const ui = uiTranslations[language];

    return (
        <Box sx={{ py: { xs: 12, md: 12 }, minHeight: { xs: 'auto', md: 400 }, display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #F7A11A 0%, #D4880E 100%)', position: 'relative' }}>

            {/* Content */}
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 6 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 4, md: 5 }, alignItems: 'center' }}>

                    {/* Left — Content */}
                    <Box sx={{ flex: 1.3, display: 'flex', order: { xs: 2, md: 1 } }}>

                        <Box>
                            <FadeInUp>
                                <AnimatedPreTitle text={ui.whatWeDo} color="#0D2B14" triggerOnce={false} />

                                <TypewriterText
                                    key={`what-we-do-title-${language}`}
                                    text={ui.bridgingGap}
                                    variant="h2"
                                    sx={{ fontFamily: '"Inknut Antiqua", serif', color: '#0D2B14', fontWeight: 700, fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.6rem' }, lineHeight: 1.15, mb: 3 }}
                                />
                                <Box sx={{ width: 56, height: 4, bgcolor: '#0D2B14', mb: 3 }} />
                                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 400, color: '#0D2B14', fontSize: { xs: '0.85rem', md: '0.95rem' }, lineHeight: { xs: 1.8, md: 2 }, mb: 4 }}>
                                    {ui.whatWeDoDesc}
                                </Typography>
                                <Box
                                    component={motion(RouterLink)}
                                    whileHover="hover"
                                    initial="rest"
                                    animate="rest"
                                    to={`/${language}/services`}
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        border: '1.5px solid #0D2B14',
                                        borderRadius: 50,
                                        overflow: 'hidden',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: '#0D2B14',
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
                                            px: 2.5,
                                            lineHeight: '36px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {ui.seeOurServices}
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

                    {/* Right — Photo and White Box List */}
                    <Box sx={{ flex: 1, minWidth: { md: 450 }, order: { xs: 1, md: 2 }, width: '100%', position: 'relative' }}>
                        {/* Woman Image — Absolute on mobile to overflow above */}
                        <Box sx={{
                            position: 'absolute',
                            top: { xs: -140, md: -270 },
                            right: { xs: '-10%', md: '0%' },
                            width: { xs: '90%', sm: '70%', md: '500px' },
                            zIndex: 5,
                            pointerEvents: 'none'
                        }}>
                            <FadeInUp delay={0.15}>
                                <Box
                                    component="img"
                                    src={heroWoman}
                                    alt="What We Do"
                                    sx={{
                                        width: '100%',
                                        display: 'block',
                                        mixBlendMode: 'multiply',
                                        filter: 'contrast(1.05)',
                                        transform: { xs: 'translateX(30px)', md: 'none' }
                                    }}
                                />
                            </FadeInUp>
                        </Box>

                        {/* White Box — Relative on mobile to maintain section height */}
                        <Box sx={{
                            position: 'relative',
                            zIndex: 10,
                            mt: { xs: 12, md: 0 },
                            width: '100%'
                        }}>
                            <FadeInUp delay={0.3}>
                                <Box sx={{
                                    bgcolor: '#FFFFFF',
                                    border: '1px solid rgba(0,0,0,0.08)',
                                    borderTop: '4px solid #F7A11A',
                                    borderRadius: 0,
                                    p: { xs: 4, md: 5 },
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                                }}>
                                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: '1.2rem', color: '#0D2B14', mb: 3 }}>
                                        {ui.howWeDeliver}
                                    </Typography>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                        {[
                                            { title: ui.strategicCollab, desc: ui.strategicCollabDesc },
                                            { title: ui.preciseComm, desc: ui.preciseCommDesc },
                                            { title: ui.seamlessPartnerships, desc: ui.seamlessPartnershipsDesc },
                                            { title: ui.globalOperations, desc: ui.globalOperationsDesc }
                                        ].map((item, i) => (
                                            <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                                <Box sx={{ mt: 0.5 }}>
                                                    <CheckCircleIcon sx={{ color: '#F7A11A', fontSize: 20 }} />
                                                </Box>
                                                <Box>
                                                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#0D2B14', fontSize: '0.95rem', mb: 0.5 }}>
                                                        {item.title}
                                                    </Typography>
                                                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 400, color: '#444', fontSize: '0.9rem', lineHeight: 1.6 }}>
                                                        {item.desc}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </FadeInUp>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default WhatWeDoSection;
