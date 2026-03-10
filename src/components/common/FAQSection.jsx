import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';
import { FadeInUp, TypewriterText } from './Animations';
import customerCare from '../../assets/images/customer_care.png';

const FAQSection = () => {
    const { ref: faqRef, inView } = useInView({ triggerOnce: false, threshold: 0.3 });
    const { language } = useLanguage();
    const ui = uiTranslations[language];

    const faqData = [
        { q: ui.faq1Q, a: ui.faq1A },
        { q: ui.faq2Q, a: ui.faq2A },
        { q: ui.faq3Q, a: ui.faq3A },
        { q: ui.faq4Q, a: ui.faq4A },
        { q: ui.faq5Q, a: ui.faq5A }
    ];

    return (
        <Box sx={{ pt: { xs: 10, md: 15 }, pb: { xs: 4, md: 6 }, bgcolor: '#FFFFFF' }}>
            <Container maxWidth="lg">
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
                    gap: { xs: 6, md: 10 }
                }}>
                    {/* Left side: FAQ Content (7 Columns) */}
                    <Box sx={{ gridColumn: { md: 'span 7' } }}>
                        <FadeInUp>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 6 }}>
                                {/* Animated arrow label */}
                                <Box ref={faqRef} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2, overflow: 'hidden' }}>
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
                                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#0D2B14', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                            {ui.quickAnswers}
                                        </Typography>
                                    </Box>
                                </Box>

                                <TypewriterText
                                    key={`faq-title-${language}`}
                                    text={ui.faqTitle}
                                    variant="h2"
                                    sx={{
                                        fontFamily: '"Inknut Antiqua", serif',
                                        color: '#0D2B14',
                                        fontWeight: 800,
                                        fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' },
                                        mb: 4,
                                        lineHeight: 1.2
                                    }}
                                />
                                <Typography sx={{
                                    fontFamily: '"Inknut Antiqua", serif',
                                    color: '#555555',
                                    lineHeight: 1.8,
                                    fontSize: '0.9rem',
                                    fontWeight: 400,
                                    maxWidth: '600px',
                                    mb: 2
                                }}>
                                    {ui.faqDesc}
                                </Typography>
                            </Box>

                            <Box sx={{ mt: 2 }}>
                                {faqData.map((faq, i) => (
                                    <Accordion
                                        key={i}
                                        sx={{
                                            bgcolor: '#FFFFFF !important',
                                            mb: 1.5,
                                            borderRadius: '0px !important',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                            border: '1.5px solid #0D2B14',
                                            '&:before': { display: 'none' }
                                        }}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={{ color: '#F7A11A', fontSize: 24 }} />}
                                            sx={{ px: { xs: 2, sm: 4 }, py: 0.5, minHeight: '48px !important', '& .MuiAccordionSummary-content': { my: '8px !important' } }}
                                        >
                                            <Typography sx={{
                                                fontFamily: 'Outfit',
                                                fontWeight: 700,
                                                color: '#0D2B14 !important',
                                                fontSize: { xs: '0.95rem', md: '1.05rem' }
                                            }}>
                                                {faq.q}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ px: { xs: 2, sm: 4 }, pb: 2, bgcolor: '#FFFFFF', borderTop: '1px solid rgba(13, 43, 20, 0.1)' }}>
                                            <Typography sx={{
                                                fontFamily: 'Inter',
                                                color: '#0D2B14',
                                                opacity: 0.8,
                                                lineHeight: 1.7,
                                                fontSize: '0.95rem',
                                                pt: 1.5
                                            }}>
                                                {faq.a}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Box>
                        </FadeInUp>
                    </Box>

                    {/* Right side: Unified CTA Box */}
                    <Box sx={{ gridColumn: { md: 'span 5' } }}>
                        <FadeInUp delay={0.2}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 0,
                                overflow: 'hidden',
                                boxShadow: '0 30px 60px rgba(0,0,0,0.08)',
                                border: '1px solid #EEEEEE'
                            }}>
                                <Box sx={{
                                    bgcolor: '#FBFBFB',
                                    borderBottom: '1px solid #EEEEEE',
                                    overflow: 'hidden'
                                }}>
                                    <Box
                                        component="img"
                                        src={customerCare}
                                        alt="Customer Care"
                                        sx={{
                                            width: '100%',
                                            height: { xs: 300, sm: 350, md: 450 },
                                            objectFit: 'cover',
                                            display: 'block'
                                        }}
                                    />
                                </Box>

                                <Box sx={{
                                    p: { xs: 3, sm: 4, md: 5 },
                                    bgcolor: '#F7A11A',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start'
                                }}>
                                    <Typography sx={{
                                        fontFamily: '"Inknut Antiqua", serif',
                                        fontWeight: 700,
                                        color: '#0D2B14',
                                        fontSize: { xs: '1.2rem', md: '1.5rem' },
                                        mb: 2,
                                        lineHeight: 1.3
                                    }}>
                                        {ui.haveMoreQuestions}
                                    </Typography>
                                    <Typography sx={{
                                        fontFamily: '"Inknut Antiqua", serif',
                                        color: '#0D2B14',
                                        fontSize: '0.95rem',
                                        lineHeight: 1.8,
                                        mb: 5,
                                        fontWeight: 400
                                    }}>
                                        {ui.contactUsDesc}
                                    </Typography>

                                    <Box
                                        component={motion(RouterLink)}
                                        whileHover="hover"
                                        initial="rest"
                                        animate="rest"
                                        to={`/${language}/contact`}
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
                                            {ui.contactUs}
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
                                </Box>
                            </Box>
                        </FadeInUp>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default FAQSection;
