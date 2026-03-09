import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { uiTranslations } from '../../../data/translations/ui';
import { FadeInUp, TypewriterText } from '../../../components/common/Animations';

// Partner Logos
import logoCRDB from '../../../assets/logos/crdb.webp';
import logoUSAID from '../../../assets/logos/usaid.png';
import logoUNHCR from '../../../assets/logos/unhcr.png';
import logoNECTA from '../../../assets/logos/necta.png';
import logoABOK from '../../../assets/logos/abok.png';
import logoChineseFood from '../../../assets/logos/chinese_food.png';

const ClientsSection = () => {
    const { ref: arrowRef, inView } = useInView({ triggerOnce: false, threshold: 0.4 });
    const { language } = useLanguage();
    const ui = uiTranslations[language];

    const gridItems = [
        { image: logoCRDB, label: 'CRDB Bank' },
        { image: logoUNHCR, label: 'UNHCR' },
        { image: logoUSAID, label: 'USAID' },
        { image: logoNECTA, label: 'NECTA' },
        { image: logoABOK, label: 'ABOK' },
        { image: logoChineseFood, label: 'Chinese Food' }
    ];

    return (
        <Box sx={{ pt: 12, pb: 4, minHeight: { xs: 'auto', md: '60vh' }, bgcolor: '#FFFFFF', display: 'flex', alignItems: 'center' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 10, textAlign: 'left' }}>
                    <FadeInUp>
                        {/* Animated arrow label */}
                        <Box ref={arrowRef} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5, overflow: 'hidden' }}>
                            <Box sx={{
                                height: 2, bgcolor: '#F7A11A',
                                width: inView ? 32 : 0,
                                transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
                            }} />
                            <Box sx={{
                                display: 'flex', alignItems: 'center',
                                transform: inView ? 'translateX(0) scale(1)' : 'translateX(-20px) scale(0.6)',
                                opacity: inView ? 1 : 0,
                                transition: 'opacity 0.4s ease 0.45s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.45s',
                            }}>
                                <ArrowForwardIcon sx={{ color: '#F7A11A', fontSize: 18 }} />
                            </Box>
                            <Box sx={{
                                transform: inView ? 'translateY(0)' : 'translateY(8px)',
                                opacity: inView ? 1 : 0,
                                transition: 'opacity 0.4s ease 0.6s, transform 0.4s ease 0.6s',
                            }}>
                                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#F7A11A', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                                    {ui.partnerCollective}
                                </Typography>
                            </Box>
                        </Box>

                        <TypewriterText
                            key={`clients-title-${language}`}
                            text={ui.strategicAlliances}
                            variant="h2"
                            sx={{ fontFamily: '"Inknut Antiqua", serif', color: '#0D2B14', fontWeight: 800, fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }, mb: 3, maxWidth: '700px', lineHeight: 1.2 }}
                        />
                        <Box sx={{ width: 60, height: 4, bgcolor: '#F7A11A' }} />
                    </FadeInUp>
                </Box>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                    border: '1.5px solid #1A5C2A',
                    p: { xs: 2, md: 4 },
                    bgcolor: '#FFFFFF',
                }}>
                    {gridItems.map((item, i) => (
                        <Box
                            key={i}
                            sx={{
                                p: { xs: 4, md: 6 },
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRight: {
                                    xs: 'none',
                                    sm: (i + 1) % 2 === 0 ? 'none' : '1.5px solid #1A5C2A',
                                    md: (i + 1) % 3 === 0 ? 'none' : '1.5px solid #1A5C2A'
                                },
                                borderBottom: {
                                    xs: (i + 1) === gridItems.length ? 'none' : '1.5px solid #1A5C2A',
                                    sm: i >= 4 ? 'none' : '1.5px solid #1A5C2A',
                                    md: i >= 3 ? 'none' : '1.5px solid #1A5C2A'
                                }
                            }}
                        >
                            <FadeInUp delay={i * 0.1}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center'
                                }}>
                                    <Box
                                        component="img"
                                        src={item.image}
                                        alt={item.label}
                                        sx={{
                                            maxHeight: { xs: 40, md: 65 },
                                            maxWidth: '100%',
                                            mb: 2
                                        }}
                                    />

                                    <Typography sx={{
                                        fontFamily: 'Outfit',
                                        fontWeight: 800,
                                        fontSize: '0.95rem',
                                        color: '#1A5C2A',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        {item.label}
                                    </Typography>
                                </Box>
                            </FadeInUp>
                        </Box>
                    ))}
                </Box>

                <FadeInUp delay={0.6}>
                    <Box sx={{ mt: 6, textAlign: 'center' }}>
                        <Box
                            component={motion(RouterLink)}
                            whileHover="hover"
                            initial="rest"
                            animate="rest"
                            to={`/${language}/contact`}
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                border: '1.5px solid #1A5C2A',
                                borderRadius: 50,
                                overflow: 'hidden',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                '&:hover': {
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
                                    color: '#1A5C2A',
                                    fontFamily: '"Inknut Antiqua", serif',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    px: 4,
                                    lineHeight: '36px',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {ui.beOurPartner}
                            </Typography>
                            <Box
                                sx={{
                                    width: 36,
                                    height: 36,
                                    flexShrink: 0,
                                    bgcolor: '#1A5C2A',
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
                                    <ArrowForwardIcon sx={{ color: '#FFFFFF', fontSize: 22 }} />
                                </motion.div>
                            </Box>
                        </Box>
                    </Box>
                </FadeInUp>
            </Container>
        </Box>
    );
};

export default ClientsSection;
