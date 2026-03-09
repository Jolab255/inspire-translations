import React from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { uiTranslations } from '../../../data/translations/ui';
import { services } from '../../../data/siteData';
import { FadeInUp, TypewriterText, AnimatedPreTitle } from '../../../components/common/Animations';
import heroWoman from '../../../assets/images/hero_woman_bg.png';

// Service Images
import serviceWritten from '../../../assets/images/written_translation.png';
import serviceOnsite from '../../../assets/images/onsite_interpretation.png';
import serviceRemote from '../../../assets/images/remote_interpretation.png';
import serviceClasses from '../../../assets/images/language_classes.png';
import serviceLogistics from '../../../assets/images/conference_logistics.png';
import serviceEquipment from '../../../assets/images/equipment_rental.png';

const WhatWeOfferSection = () => {
    const { language, t } = useLanguage();
    const ui = uiTranslations[language];

    return (
        <Box sx={{ pt: 2, pb: 12, background: 'linear-gradient(90deg, #1A5C2A 0%, #0F3A1A 100%)', position: 'relative' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 8, textAlign: 'left' }}>
                    <FadeInUp>
                        <AnimatedPreTitle text={ui.whatWeOffer} color="#F7A11A" triggerOnce={false} />

                        <TypewriterText
                            key={`what-we-offer-title-${language}`}
                            text={ui.comprehensiveSolutions}
                            variant="h2"
                            sx={{ fontFamily: '"Inknut Antiqua", serif', color: '#FFFFFF', fontWeight: 800, fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }, mb: 3, maxWidth: '600px', lineHeight: 1.2 }}
                        />
                        <Box sx={{ width: 60, height: 4, bgcolor: '#F7A11A' }} />
                    </FadeInUp>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 4 }}>
                    {services.map((service, i) => (
                        <Box key={service.id} sx={{ display: 'flex' }}>
                            <FadeInUp delay={i * 0.08} style={{ width: '100%', height: '100%' }}>
                                <Card
                                    component={RouterLink}
                                    to={`/${language}/services/${service.id}`}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        textDecoration: 'none',
                                        border: '3px solid #FFFFFF',
                                        borderRadius: 0,
                                        boxShadow: 'none',
                                        overflow: 'hidden',
                                        background: 'transparent',
                                        transition: 'none',
                                        '&:hover': {
                                            transform: 'none',
                                            boxShadow: 'none',
                                            bgcolor: 'transparent'
                                        }
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontFamily: '"Inknut Antiqua", serif',
                                            fontWeight: 700,
                                            color: '#1A5C2A',
                                            bgcolor: '#FFFFFF',
                                            textAlign: 'center',
                                            p: 1.5,
                                            width: '100%',
                                            fontSize: '1.1rem',
                                            lineHeight: 1.3
                                        }}
                                    >
                                        {t(service.title)}
                                    </Typography>

                                    <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, flexGrow: 1, display: 'flex', flexDirection: 'column', pt: 3 }}>
                                        <Box
                                            component="img"
                                            src={
                                                service.id === 'written-translation' ? serviceWritten :
                                                    service.id === 'onsite-interpretation' ? serviceOnsite :
                                                        service.id === 'remote-interpretation' ? serviceRemote :
                                                            service.id === 'language-classes' ? serviceClasses :
                                                                service.id === 'conference-logistics' ? serviceLogistics :
                                                                    service.id === 'equipment-rental' ? serviceEquipment :
                                                                        service.image || heroWoman
                                            }
                                            alt={t(service.title)}
                                            sx={{
                                                width: '100%',
                                                height: { xs: 180, sm: 220 },
                                                objectFit: 'cover',
                                                borderRadius: 0,
                                                mb: 3,
                                            }}
                                        />

                                        <Typography variant="body2" sx={{ fontFamily: '"Inknut Antiqua", serif', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.8, mb: 4, flexGrow: 1, fontSize: '0.9rem', textAlign: 'left' }}>
                                            {t(service.fullDesc) || t(service.shortDesc)}
                                        </Typography>

                                        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'center' }}>
                                            <Box
                                                component={motion.div}
                                                whileHover="hover"
                                                initial="rest"
                                                animate="rest"
                                                sx={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    border: '2px solid #FFFFFF',
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
                                                        color: '#FFFFFF',
                                                        fontFamily: '"Inknut Antiqua", serif',
                                                        fontWeight: 700,
                                                        fontSize: '0.8rem',
                                                        px: 2.5,
                                                        lineHeight: '44px',
                                                        whiteSpace: 'nowrap',
                                                        textTransform: 'none',
                                                        letterSpacing: '0.05em'
                                                    }}
                                                >
                                                    {ui.readMore}
                                                </Typography>
                                                <Box
                                                    component={motion.div}
                                                    variants={{
                                                        rest: { x: 0 },
                                                        hover: { x: 0 }
                                                    }}
                                                    sx={{
                                                        width: 44,
                                                        height: 44,
                                                        flexShrink: 0,
                                                        bgcolor: '#FFFFFF',
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
                                                        <ArrowForwardIcon sx={{ color: '#1A5C2A', fontSize: 16 }} />
                                                    </motion.div>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </FadeInUp>
                        </Box>
                    ))}
                </Box>

                <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
                    <FadeInUp delay={0.2}>
                        <Box
                            component={motion(RouterLink)}
                            to={`/${language}/services`}
                            whileHover="hover"
                            initial="rest"
                            animate="rest"
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                border: '2px solid #FFFFFF',
                                borderRadius: 50,
                                overflow: 'hidden',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.05)'
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
                                    color: '#FFFFFF',
                                    fontFamily: '"Inknut Antiqua", serif',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    px: { xs: 3, sm: 4 },
                                    lineHeight: '44px',
                                    whiteSpace: 'nowrap',
                                    textTransform: 'none',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                {ui.seeAllServices}
                            </Typography>
                            <Box
                                component={motion.div}
                                variants={{
                                    rest: { x: 0 },
                                    hover: { x: 0 }
                                }}
                                sx={{
                                    width: 44,
                                    height: 44,
                                    flexShrink: 0,
                                    bgcolor: '#FFFFFF',
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
                                    <ArrowForwardIcon sx={{ color: '#1A5C2A', fontSize: 20 }} />
                                </motion.div>
                            </Box>
                        </Box>
                    </FadeInUp>
                </Box>
            </Container >
        </Box >
    );
};

export default WhatWeOfferSection;
