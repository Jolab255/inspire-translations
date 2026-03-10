import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { useLanguage } from '../../../contexts/LanguageContext';
import { uiTranslations } from '../../../data/translations/ui';
import { testimonials } from '../../../data/siteData';
import { FadeInUp, TypewriterText } from '../../../components/common/Animations';

// Testimonial Photos
import photoNeema from '../../../assets/images/Neema Prosper.png';
import photoDavid from '../../../assets/images/David Kazi.png';
import photoEnos from '../../../assets/images/Enos Praygod.png';
import photoNdeigu from '../../../assets/images/ndeigu Mafwele.png';
import arrowImg from '../../../assets/images/arrows.png';

const TestimonialsSection = () => {
    const [index, setIndex] = useState(0);
    const { ref: headerRef, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
    const { language, t: translate } = useLanguage();
    const ui = uiTranslations[language];

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 10000);
        return () => clearInterval(timer);
    }, []);

    const testimonial = testimonials[index];
    const testimonialImages = [photoNeema, photoDavid, photoEnos, photoNdeigu];

    const handleNext = () => setIndex((prev) => (prev + 1) % testimonials.length);
    const handlePrev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    if (!testimonial) return null;

    return (
        <Box sx={{ pt: 6, pb: 15, bgcolor: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 4, textAlign: 'left' }}>
                    <FadeInUp>
                        {/* Animated arrow label */}
                        <Box ref={headerRef} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5, overflow: 'hidden' }}>
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
                                    {ui.voiceOfTrust}
                                </Typography>
                            </Box>
                        </Box>
                        <TypewriterText
                            key={`testimonials-title-${language}`}
                            text={ui.clientTestimonials}
                            variant="h2"
                            sx={{ fontFamily: '"Inknut Antiqua", serif', color: '#0D2B14', fontWeight: 800, fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }, mb: 3, maxWidth: '700px', lineHeight: 1.2 }}
                        />
                        <Box sx={{ width: 60, height: 4, bgcolor: '#F7A11A' }} />
                    </FadeInUp>
                </Box>

                <Box sx={{ position: 'relative', height: { xs: 'auto', md: '600px' }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    
                    {/* Visual Container */}
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', position: 'relative' }}>
                        
                        {/* Text Content Area */}
                        <Box sx={{ 
                            width: { xs: '100%', md: '60%' }, 
                            bgcolor: '#FFFFFF', 
                            p: { xs: 4, md: 6 }, 
                            zIndex: 10,
                            border: '2px solid #0D2B14',
                            boxShadow: '0 20px 50px rgba(13, 43, 20, 0.1)'
                        }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <FormatQuoteIcon sx={{ fontSize: 40, color: '#F7A11A', mb: 2 }} />
                                    <Typography sx={{ color: '#0D2B14', fontSize: '1.1rem', fontStyle: 'italic', mb: 4, lineHeight: 1.7, fontWeight: 500 }}>
                                        "{translate(testimonial.quote)}"
                                    </Typography>
                                    <Box sx={{ borderTop: '1px solid rgba(13, 43, 20, 0.1)', pt: 2 }}>
                                        <Typography sx={{ color: '#F7A11A', fontWeight: 700, fontSize: '1rem', mb: 0.5 }}>
                                            {testimonial.name}
                                        </Typography>
                                        <Typography sx={{ color: '#0D2B14', opacity: 0.6, fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700 }}>
                                            {translate(testimonial.role)} · {testimonial.organization}
                                        </Typography>
                                    </Box>
                                </motion.div>
                            </AnimatePresence>
                        </Box>

                        {/* Image Area */}
                        <Box sx={{ 
                            width: { xs: '100%', md: '50%' }, 
                            height: { xs: '300px', md: '500px' }, 
                            bgcolor: '#F7A11A',
                            ml: { md: -10 },
                            mt: { xs: -2, md: 0 },
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            position: 'relative',
                            overflow: 'visible'
                        }}>
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={index}
                                    src={testimonialImages[index % testimonialImages.length]}
                                    alt={testimonial.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5 }}
                                    style={{
                                        height: '120%',
                                        width: 'auto',
                                        objectFit: 'contain',
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        zIndex: 15
                                    }}
                                />
                            </AnimatePresence>
                        </Box>
                    </Box>

                    {/* Controls */}
                    <Box sx={{ display: 'flex', gap: 2, mt: 6, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                        <IconButton onClick={handlePrev} sx={{ border: '2px solid #0D2B14', color: '#0D2B14', '&:hover': { bgcolor: 'rgba(13, 43, 20, 0.05)' } }}>
                            <ArrowForwardIcon sx={{ transform: 'rotate(180deg)' }} />
                        </IconButton>
                        <IconButton onClick={handleNext} sx={{ border: '2px solid #0D2B14', color: '#0D2B14', '&:hover': { bgcolor: 'rgba(13, 43, 20, 0.05)' } }}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default TestimonialsSection;
