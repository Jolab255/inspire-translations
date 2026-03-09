import React from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';
import { FadeInUp, TypewriterText, AnimatedPreTitle } from './Animations';
import ctaImage from '../../assets/images/CTA.png';

const CTASection = () => {
    const { language } = useLanguage();
    const ui = uiTranslations[language];

    return (
        <Box sx={{ 
            pt: { xs: 4, md: 6 }, 
            pb: { xs: 8, md: 12 }, 
            bgcolor: '#FFFFFF', 
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Decorative Element */}
            <Box sx={{ 
                position: 'absolute', 
                top: '10%', 
                right: '-5%', 
                width: '40%', 
                height: '80%', 
                bgcolor: 'rgba(26, 92, 42, 0.03)', 
                borderRadius: '50%', 
                filter: 'blur(100px)',
                zIndex: 0
            }} />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    gap: { xs: 4, md: 0 }
                }}>
                    {/* Left side: Styled Image with Frame */}
                    <Box sx={{ 
                        flex: { xs: '1', md: '0 0 42%' }, 
                        position: 'relative',
                        zIndex: 2
                    }}>
                        <FadeInUp>
                            <Box sx={{ position: 'relative' }}>
                                {/* Decorative Gold Frame */}
                                <Box sx={{ 
                                    position: 'absolute', 
                                    top: -15, 
                                    left: -15, 
                                    right: 15, 
                                    bottom: 15, 
                                    border: '2px solid #F7A11A',
                                    zIndex: 0,
                                    display: { xs: 'none', sm: 'block' }
                                }} />
                                
                                <Box
                                    component="img"
                                    src={ctaImage}
                                    alt="Join our community"
                                    sx={{
                                        width: '100%',
                                        height: { xs: '300px', md: '420px' },
                                        objectFit: 'cover',
                                        display: 'block',
                                        position: 'relative',
                                        zIndex: 1,
                                        boxShadow: '20px 20px 60px rgba(0,0,0,0.15)'
                                    }}
                                />
                                
                                {/* Floating Badge */}
                                <Box sx={{
                                    position: 'absolute',
                                    bottom: 20,
                                    right: -20,
                                    bgcolor: '#F7A11A',
                                    p: 2,
                                    display: { xs: 'none', lg: 'block' },
                                    zIndex: 3,
                                    boxShadow: '0 10px 30px rgba(247,161,26,0.3)'
                                }}>
                                    <Typography sx={{ color: '#1A5C2A', fontWeight: 900, fontSize: '1.2rem', fontFamily: 'Outfit', lineHeight: 1 }}>
                                        25+
                                    </Typography>
                                    <Typography sx={{ color: '#1A5C2A', fontWeight: 700, fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                        Languages
                                    </Typography>
                                </Box>
                            </Box>
                        </FadeInUp>
                    </Box>

                    {/* Right side: Floating Content Card */}
                    <Box sx={{ 
                        flex: 1,
                        ml: { md: -4 },
                        zIndex: 10,
                        width: '100%'
                    }}>
                        <FadeInUp delay={0.2}>
                            <Box sx={{ 
                                bgcolor: '#1A5C2A',
                                p: { xs: 4, sm: 5, md: 6, lg: 7 },
                                color: '#FFFFFF',
                                boxShadow: '0 40px 100px rgba(0,0,0,0.2)',
                                position: 'relative'
                            }}>
                                {/* Subtle Brand Watermark */}
                                <Typography sx={{ 
                                    position: 'absolute', 
                                    top: 15, 
                                    right: 30, 
                                    fontSize: '4rem', 
                                    fontWeight: 900, 
                                    color: 'rgba(255,255,255,0.03)', 
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                    fontFamily: 'Outfit'
                                }}>
                                    INSPIRE
                                </Typography>

                                <AnimatedPreTitle text={ui.joinCommunity} color="#F7A11A" />
                                
                                <TypewriterText 
                                    key={`cta-title-${language}`}
                                    text={ui.stayConnected}
                                    variant="h2"
                                    sx={{ 
                                        fontFamily: '"Inknut Antiqua", serif', 
                                        fontWeight: 700, 
                                        fontSize: { xs: '1.6rem', sm: '2rem', md: '2.4rem' }, 
                                        mb: 2,
                                        lineHeight: 1.2,
                                        color: '#FFFFFF'
                                    }}
                                />
                                
                                <Box sx={{ width: 50, height: 4, bgcolor: '#F7A11A', mb: 3 }} />
                                
                                <Typography sx={{
                                    fontFamily: '"Inknut Antiqua", serif',
                                    fontWeight: 400,
                                    color: 'rgba(255,255,255,0.85)',
                                    fontSize: { xs: '0.85rem', md: '0.95rem' },
                                    lineHeight: 1.8,
                                    mb: 4,
                                    maxWidth: '540px'
                                }}>
                                    {ui.stayConnectedDesc}
                                </Typography>

                                {/* Signature Pill Arrow Button - Standard Version */}
                                <Box
                                    component={motion(RouterLink)}
                                    whileHover="hover"
                                    initial="rest"
                                    animate="rest"
                                    to={`/${language}/contact`}
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        border: '2px solid #F7A11A',
                                        borderRadius: 50,
                                        overflow: 'hidden',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(247, 161, 26, 0.08)'
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
                                            color: '#F7A11A',
                                            fontFamily: '"Inknut Antiqua", serif',
                                            fontWeight: 700,
                                            fontSize: '0.85rem',
                                            px: 3,
                                            lineHeight: '32px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {ui.requestDemo}
                                    </Typography>
                                    <Box
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            flexShrink: 0,
                                            bgcolor: '#F7A11A',
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
                                            <ArrowForwardIcon sx={{ color: '#1A5C2A', fontSize: 24 }} />
                                        </motion.div>
                                    </Box>
                                </Box>
                            </Box>
                        </FadeInUp>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default CTASection;
