import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TranslateIcon from '@mui/icons-material/Translate';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Link as RouterLink } from 'react-router-dom';
import CountUp from 'react-countup';
import HeroSection from '../../components/hero/HeroSection';
import SEOHead from '../../components/seo/SEOHead';
import { services, stats, testimonials, clients, blogPosts } from '../../data/siteData';
import { uiTranslations } from '../../data/translations/ui';
import { useLanguage } from '../../contexts/LanguageContext';
import { DotLottiePlayer } from '@dotlottie/react-player';
import lottieLangTranslator from '../../assets/lottie/language translator.lottie';
import heroWoman from '../../assets/images/hero_woman_bg.png';
import aboutUsPhoto from '../../assets/images/about_us_photo.png';
import photoNeema from '../../assets/images/Neema Prosper.png';
import photoDavid from '../../assets/images/David Kazi.png';
import photoEnos from '../../assets/images/Enos Praygod.png';
import photoNdeigu from '../../assets/images/ndeigu Mafwele.png';
import arrowImg from '../../assets/images/arrows.png';
import customerCare from '../../assets/images/customer_care.png';
import ctaImage from '../../assets/images/CTA.png';

// Service Images
import serviceWritten from '../../assets/images/written_translation.png';
import serviceOnsite from '../../assets/images/onsite_interpretation.png';
import serviceRemote from '../../assets/images/remote_interpretation.png';
import serviceClasses from '../../assets/images/language_classes.png';
import serviceLogistics from '../../assets/images/conference_logistics.png';
import serviceEquipment from '../../assets/images/equipment_rental.png';

// Partner Logos
import logoCRDB from '../../assets/logos/crdb.webp';
import logoUSAID from '../../assets/logos/usaid.png';
import logoUNHCR from '../../assets/logos/unhcr.png';
import logoNECTA from '../../assets/logos/necta.png';
import logoABOK from '../../assets/logos/abok.png';
import logoChineseFood from '../../assets/logos/chinese_food.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Animation helper
const FadeInUp = ({ children, delay = 0, ...props }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Animated text component for typewriter spelling effect
const TypewriterText = ({ text, sx, variant = "h2", ...props }) => {
    const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.4 });
    const words = text.split(' ');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.04, delayChildren: 0.1 }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 25, filter: 'blur(6px)', scale: 0.85 },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            scale: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 140
            }
        }
    };

    return (
        <Typography
            component={motion.div}
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variant={variant}
            sx={{ ...sx, display: 'block' }}
            {...props}
        >
            {words.map((word, wordIndex) => (
                <Box key={wordIndex} component="span" sx={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                    {Array.from(word).map((char, charIndex) => (
                        <motion.span key={charIndex} variants={letterVariants} style={{ display: 'inline-block' }}>
                            {char}
                        </motion.span>
                    ))}
                    {wordIndex < words.length - 1 && (
                        <Box component="span" sx={{ display: 'inline-block' }}>&nbsp;</Box>
                    )}
                </Box>
            ))}
        </Typography>
    );
};

// Section title
const SectionTitle = ({ label, title, subtitle, dark = false, center = true }) => (
    <Box sx={{ textAlign: center ? 'center' : 'left', mb: 7 }}>
        {label && (
            <Chip
                label={label}
                size="small"
                sx={{
                    bgcolor: dark ? 'rgba(247,161,26,0.15)' : 'rgba(247,161,26,0.1)',
                    color: '#F7A11A',
                    fontFamily: 'Outfit',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    letterSpacing: '0.06em',
                    mb: 2,
                    border: '1px solid rgba(247,161,26,0.3)',
                }}
            />
        )}
        <Typography
            variant="h2"
            sx={{ color: dark ? '#FFFFFF' : '#1A1A2E', mb: 2, fontWeight: 800 }}
        >
            {title}
        </Typography>
        {subtitle && (
            <Typography
                variant="body1"
                sx={{ color: dark ? 'rgba(255,255,255,0.65)' : '#4A4A6A', maxWidth: 560, mx: center ? 'auto' : 0, lineHeight: 1.8 }}
            >
                {subtitle}
            </Typography>
        )}
    </Box>
);


// ---- PURPOSE (WHITE) SECTION ----
const PurposeWhiteSection = () => {
    const { ref: arrowRef, inView } = useInView({ triggerOnce: false, threshold: 0.6 });
    const { language, t } = useLanguage();
    const ui = uiTranslations[language];

    return (
        <Box sx={{ pt: { xs: 8, md: 11 }, pb: { xs: 10, md: 22 }, bgcolor: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, bgcolor: '#1A5C2A' }} />
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
                            {/* Animated arrow label */}
                            <Box ref={arrowRef} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1, overflow: 'hidden' }}>
                                {/* Expanding line */}
                                <Box sx={{
                                    height: 2, bgcolor: '#F7A11A',
                                    width: inView ? 32 : 0,
                                    transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
                                }} />
                                {/* Arrow icon slides + bounces in */}
                                <Box sx={{
                                    display: 'flex', alignItems: 'center',
                                    transform: inView ? 'translateX(0) scale(1)' : 'translateX(-20px) scale(0.6)',
                                    opacity: inView ? 1 : 0,
                                    transition: 'opacity 0.4s ease 0.45s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.45s',
                                }}>
                                    <ArrowForwardIcon sx={{ color: '#F7A11A', fontSize: 18 }} />
                                </Box>
                                {/* Label fades up */}
                                <Box sx={{
                                    transform: inView ? 'translateY(0)' : 'translateY(8px)',
                                    opacity: inView ? 1 : 0,
                                    transition: 'opacity 0.4s ease 0.6s, transform 0.4s ease 0.6s',
                                }}>
                                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#F7A11A', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                        {ui.ourPurpose}
                                    </Typography>
                                </Box>
                            </Box>

                            <TypewriterText
                                key={`purpose-title-${language}`}
                                text={ui.whyWeExist}
                                variant="h2"
                                sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.6rem' }, color: '#0D2B14', lineHeight: 1.15, mb: 3 }}
                            />
                            <Box sx={{ width: 56, height: 4, bgcolor: '#F7A11A', mb: 3 }} />
                            <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 400, fontSize: { xs: '0.85rem', md: '0.95rem' }, lineHeight: { xs: 1.8, md: 2 }, color: '#444', mb: 2 }}>
                                {language === 'en' ? 'Across Tanzania and East Africa, language has always been both a bridge and a barrier in boardrooms, courtrooms, clinics, and conferences. When language fails, opportunities are lost, rights go unheard, and connections fall short.' : 'Kote Tanzania na Afrika Mashariki, lugha imekuwa daraja na kizuizi katika vyumba vya mikutano, mahakama, kliniki, na makongamano. Wakati lugha inaposhindwa, fursa hupotea, haki hazisikiki, na miunganisho hupungua.'}
                            </Typography>
                            <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 400, fontSize: { xs: '0.85rem', md: '0.95rem' }, lineHeight: { xs: 1.8, md: 2 }, color: '#444', mb: 4 }}>
                                {language === 'en' ? 'Inspire Translations was founded to change this reality connecting people, organizations, and ideas across language lines with accuracy, integrity, and deep cultural sensitivity.' : 'Inspire Translations ilianzishwa ili kubadilisha hali hii kwa kuunganisha watu, mashirika, na mawazo kupitia mistari ya lugha kwa usahihi, uadilifu, na unyeti wa kina wa kitamaduni.'}
                            </Typography>
                            <Box
                                component={motion(RouterLink)}
                                whileHover="hover"
                                initial="rest"
                                animate="rest"
                                to="/about"
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    border: '2px solid #1A5C2A',
                                    borderRadius: 50,
                                    overflow: 'hidden',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#1A5C2A',
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
                                        fontSize: '0.85rem',
                                        px: 2.5,
                                        lineHeight: '46px',
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
                                        width: 46,
                                        height: 46,
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

// ---- WHAT WE DO SECTION ----
const WhatWeDoSection = () => {
    const { ref: arrowRef, inView } = useInView({ triggerOnce: false, threshold: 0.6 });
    const { language } = useLanguage();
    const ui = uiTranslations[language];

    return (
        <Box sx={{ py: { xs: 8, md: 12 }, minHeight: { xs: 'auto', md: 400 }, display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #F7A11A 0%, #D4880E 100%)', position: 'relative' }}>

            {/* Content */}
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 6 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 4, md: 5 }, alignItems: 'center' }}>

                    {/* Left — Content */}
                    <Box sx={{ flex: 1.3, display: 'flex', order: { xs: 2, md: 1 } }}>

                        <Box>
                            <FadeInUp>
                                {/* Animated arrow label */}
                                <Box ref={arrowRef} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5, overflow: 'hidden' }}>
                                    {/* Expanding line */}
                                    <Box sx={{
                                        height: 2, bgcolor: '#0D2B14',
                                        width: inView ? 32 : 0,
                                        transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
                                    }} />
                                    {/* Arrow icon slides + bounces in */}
                                    <Box sx={{
                                        display: 'flex', alignItems: 'center',
                                        transform: inView ? 'translateX(0) scale(1)' : 'translateX(-20px) scale(0.6)',
                                        opacity: inView ? 1 : 0,
                                        transition: 'opacity 0.4s ease 0.45s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.45s',
                                    }}>
                                        <ArrowForwardIcon sx={{ color: '#0D2B14', fontSize: 18 }} />
                                    </Box>
                                    {/* Label fades up */}
                                    <Box sx={{
                                        transform: inView ? 'translateY(0)' : 'translateY(8px)',
                                        opacity: inView ? 1 : 0,
                                        transition: 'opacity 0.4s ease 0.6s, transform 0.4s ease 0.6s',
                                    }}>
                                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#0D2B14', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                                            {ui.whatWeDo}
                                        </Typography>
                                    </Box>
                                </Box>

                                <TypewriterText
                                    key={`what-we-do-title-${language}`}
                                    text={ui.bridgingGap}
                                    variant="h2"
                                    sx={{ fontFamily: '"Inknut Antiqua", serif', color: '#0D2B14', fontWeight: 700, fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.6rem' }, lineHeight: 1.15, mb: 3 }}
                                />
                                <Box sx={{ width: 56, height: 4, bgcolor: '#0D2B14', mb: 3 }} />
                                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 400, color: '#0D2B14', fontSize: { xs: '0.85rem', md: '0.95rem' }, lineHeight: { xs: 1.8, md: 2 }, mb: 4 }}>
                                    {language === 'en' ? 'We collaborate with businesses, NGOs, and legal professionals to deliver precise, culturally resonant communication solutions. We lay the foundation for seamless cross-border partnerships and impactful global operations.' : 'Tunashirikiana na biashara, NGOs, na wataalamu wa kisheria ili kutoa suluhu sahihi za mawasiliano zinazozingatia utamaduni. Tunaweka msingi wa ushirikiano usio na mshono wa kuvuka mipaka na uendeshaji wenye matokeo duniani kote.'}
                                </Typography>
                                <Box
                                    component={motion(RouterLink)}
                                    whileHover="hover"
                                    initial="rest"
                                    animate="rest"
                                    to="/services"
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        border: '2px solid #0D2B14',
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
                                            lineHeight: '46px',
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
                                            width: 46,
                                            height: 46,
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
                    <Box sx={{ flex: 1, minWidth: { md: 450 }, order: { xs: 1, md: 2 } }}>
                        <Box sx={{
                            position: 'absolute',
                            top: { xs: -150, md: -270 },
                            right: { xs: '-5%', md: '0%' },
                            width: { xs: '110%', md: '500px' },
                            zIndex: 10,
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
                                        pointerEvents: 'none'
                                    }}
                                />
                            </FadeInUp>

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



// ---- WHAT WE OFFER SECTION ----
const WhatWeOfferSection = () => {
    const { ref: arrowRef, inView } = useInView({ triggerOnce: false, threshold: 0.6 });
    const { language, t } = useLanguage();
    const ui = uiTranslations[language];

    return (
        <Box sx={{ pt: 2, pb: 12, background: 'linear-gradient(90deg, #1A5C2A 0%, #0F3A1A 100%)', position: 'relative' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 8, textAlign: 'left' }}>
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
                                    {ui.whatWeOffer}
                                </Typography>
                            </Box>
                        </Box>

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
                                    to={`/services/${service.id}`}
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
                                                        lineHeight: '40px',
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
                                                        width: 40,
                                                        height: 40,
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
                            component={RouterLink}
                            to="/services"
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
                                    lineHeight: '56px',
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
                                    width: 56,
                                    height: 56,
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

// ---- TESTIMONIALS SECTION ----
const TestimonialsSection = () => {
    const [index, setIndex] = useState(0);
    const { ref: headerRef, inView } = useInView({ triggerOnce: false, threshold: 0.4 });
    const { language, t: translate } = useLanguage();
    const ui = uiTranslations[language];

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 10000);
        return () => clearInterval(timer);
    }, []);

    const t = testimonials[index];
    const testimonialImages = [photoNeema, photoDavid, photoEnos, photoNdeigu];

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <Box sx={{ pt: 6, pb: 10, bgcolor: '#FFFFFF', position: 'relative', overflow: 'visible' }}>
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

                <Box sx={{ position: 'relative', height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>

                    {/* Green Box */}
                    <Box sx={{
                        position: 'absolute',
                        left: '10%',
                        width: '50%',
                        height: '35vh',
                        bgcolor: '#1A5C2A',
                        top: '31vh',
                        zIndex: 10,
                        boxShadow: '0 25px 70px rgba(0,0,0,0.22)',
                        overflow: 'hidden'
                    }}>
                        <AnimatePresence mode="wait">
                            <Box
                                key={index}
                                component={motion.div}
                                initial={{ opacity: 0, rotateX: -90 }}
                                animate={{ opacity: 1, rotateX: 0 }}
                                exit={{ opacity: 0, rotateX: 90 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: { xs: 4, md: 5 } }}
                            >
                                <FormatQuoteIcon sx={{ fontSize: 40, color: 'rgba(247, 161, 26, 0.4)', mb: 2 }} />
                                <Typography sx={{
                                    fontFamily: 'Inter',
                                    fontSize: '0.95rem',
                                    fontWeight: 200,
                                    color: '#FFFFFF',
                                    lineHeight: 1.6,
                                    mb: 3
                                }}>
                                    "{translate(t.quote)}"
                                </Typography>
                                <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', pt: 2 }}>
                                    <Typography sx={{
                                        fontFamily: 'Outfit',
                                        fontWeight: 700,
                                        fontSize: '0.75rem',
                                        color: '#F7A11A',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.15em'
                                    }}>
                                        {translate(t.role)} · {t.organization}
                                    </Typography>
                                </Box>
                            </Box>
                        </AnimatePresence>
                    </Box>

                    {/* Yellow Card */}
                    <Box sx={{
                        width: '55%',
                        height: '55vh',
                        bgcolor: '#F7A11A',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        p: 5,
                        position: 'relative',
                        boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
                        zIndex: 2
                    }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Typography sx={{
                                    fontFamily: '"Inknut Antiqua", serif',
                                    fontWeight: 800,
                                    fontSize: '1.5rem',
                                    color: '#0D2B14',
                                    zIndex: 10,
                                    lineHeight: 1.2
                                }}>
                                    {t.name}
                                </Typography>
                            </motion.div>
                        </AnimatePresence>
                    </Box>

                    <AnimatePresence mode="wait">
                        <Box
                            key={index}
                            component={motion.img}
                            src={testimonialImages[index % testimonialImages.length]}
                            alt={t.name}
                            initial={{ opacity: 0, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, filter: 'blur(10px)' }}
                            transition={{ duration: 0.8 }}
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: '64%',
                                transform: 'translateX(-50%)',
                                width: 'auto',
                                height: '85vh',
                                zIndex: 5,
                                pointerEvents: 'none',
                                objectFit: 'contain'
                            }}
                        />
                    </AnimatePresence>

                    <IconButton
                        onClick={handlePrev}
                        sx={{
                            position: 'absolute',
                            left: { xs: -10, md: -100 },
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 90,
                            height: 90,
                            zIndex: 30,
                            bgcolor: 'transparent',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' }
                        }}
                    >
                        <Box
                            component="img"
                            src={arrowImg}
                            sx={{ width: 50, transform: 'rotate(180deg)', opacity: 1 }}
                        />
                    </IconButton>

                    <IconButton
                        onClick={handleNext}
                        sx={{
                            position: 'absolute',
                            right: { xs: -10, md: -100 },
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 80,
                            height: 80,
                            zIndex: 30,
                            bgcolor: 'transparent',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' }
                        }}
                    >
                        <Box
                            component="img"
                            src={arrowImg}
                            sx={{ width: 50, opacity: 1 }}
                        />
                    </IconButton>
                </Box>
            </Container>
        </Box>
    );
};

// ---- CLIENT LOGOS ----
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
                    border: '2px solid #1A5C2A',
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
                                    sm: (i + 1) % 2 === 0 ? 'none' : '2px solid #1A5C2A',
                                    md: (i + 1) % 3 === 0 ? 'none' : '2px solid #1A5C2A'
                                },
                                borderBottom: {
                                    xs: (i + 1) === gridItems.length ? 'none' : '2px solid #1A5C2A',
                                    sm: i >= 4 ? 'none' : '2px solid #1A5C2A',
                                    md: i >= 3 ? 'none' : '2px solid #1A5C2A'
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
                            to="/contact"
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                border: '2px solid #1A5C2A',
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
                                    lineHeight: '54px',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {ui.beOurPartner}
                            </Typography>
                            <Box
                                sx={{
                                    width: 54,
                                    height: 54,
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

// ---- BLOG PREVIEW ----
const BlogSection = () => {
    const { ref: headerRef, inView } = useInView({ triggerOnce: false, threshold: 0.4 });
    const { language, t } = useLanguage();
    const ui = uiTranslations[language];
    const blogImages = [serviceWritten, serviceLogistics, serviceEquipment];

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
                    borderTop: '2px solid #0D2B14',
                    borderBottom: '2px solid #0D2B14',
                    bgcolor: '#F7A11A'
                }}>
                    {blogPosts.slice(0, 3).map((post, i) => (
                        <Box
                            key={post.id}
                            sx={{
                                borderRight: {
                                    xs: 'none',
                                    md: i === 2 ? 'none' : '2px solid #0D2B14'
                                },
                                borderBottom: {
                                    xs: i === 2 ? 'none' : '2px solid #0D2B14',
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
                                            to={`/blog/${post.slug}`}
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



// ---- FAQ SECTION ----
const FAQSection = () => {
    const { ref: faqRef, inView } = useInView({ triggerOnce: false, threshold: 0.3 });
    const { language } = useLanguage();
    const ui = uiTranslations[language];

    const faqData = [
        {
            q: language === 'en' ? "1. What core language services does Inspire Translations provide?" : "1. Je, ni huduma gani kuu za lugha ambazo Inspire Translations hutoa?",
            a: language === 'en' ? "We provide professional written translation, simultaneous and consecutive interpretation, language classes, and full-scale conference logistics including equipment rental." : "Tunatoa tafsiri ya kitaalamu ya maandishi, ukalimani wa papo hapo na mfululizo, madarasa ya lugha, na uratibu kamili wa mikutano ikijumuisha kukodisha vifaa."
        },
        {
            q: language === 'en' ? "2. How do you ensure the accuracy of sensitive documents?" : "2. Je, mnahakikishaje usahihi wa nyaraka nyeti?",
            a: language === 'en' ? "We work with certified linguists and subject-matter experts who understand the legal, medical, and technical nuances of both the source and target languages." : "Tunafanya kazi na wanaisimu walioidhinishwa na wataalamu wa nyanja husika wanaoelewa nuances za kisheria, matibabu, na kiufundi za lugha asilia na lugha lengwa."
        },
        {
            q: language === 'en' ? "3. Do you offer remote interpretation for virtual events?" : "3. Je, mnatoa ukalimani wa masafa kwa hafla za mtandaoni?",
            a: language === 'en' ? "Yes, we specialize in Remote Simultaneous Interpretation (RSI), allowing your international meetings to run seamlessly across different time zones and platforms." : "Ndiyo, tunabobea katika Ukalimani wa Papo hapo wa Masafa (RSI), tukiruhusu mikutano yako ya kimataifa kuendeshwa bila mshono katika kanda za muda na majukwaa tofauti."
        },
        {
            q: language === 'en' ? "4. How can my organization partner with you?" : "4. Je, shirika langu linawezaje kushirikiana nanyi?",
            a: language === 'en' ? "You can reach out through our contact page to set up a consultation. We offer dedicated account management for long-term partners and large-scale projects." : "Unaweza kuwasiliana nasi kupitia ukurasa wetu wa mawasiliano ili kupanga ushauri. Tunatoa usimamizi maalum wa akaunti kwa washirika wa muda mrefu na miradi mikubwa."
        },
        {
            q: language === 'en' ? "5. Why is cultural sensitivity so important in your work?" : "5. Kwa nini unyeti wa kitamaduni ni muhimu sana katika kazi yenu?",
            a: language === 'en' ? "Translation is more than just words; it's about context. We ensure that idioms, cultural norms, and professional etiquette are preserved so your message resonates correctly." : "Tafsiri ni zaidi ya maneno tu; ni kuhusu muktadha. Tunahakikisha kuwa misemo, kanuni za kitamaduni, na adabu za kitaalamu zinahifadhiwa ili ujumbe wako upate mwitikio sahihi."
        }
    ];

    return (
        <Box sx={{ py: { xs: 10, md: 15 }, bgcolor: '#FFFFFF' }}>
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
                                    fontFamily: 'Inter',
                                    color: '#555555',
                                    lineHeight: 1.8,
                                    fontSize: '1.0rem',
                                    fontWeight: 200,
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
                                            bgcolor: '#1A5C2A !important',
                                            mb: 2,
                                            borderRadius: '12px !important',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                            border: 'none',
                                            '&:before': { display: 'none' }
                                        }}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={{ color: '#F7A11A', fontSize: 28 }} />}
                                            sx={{ px: { xs: 2, sm: 4 }, py: 1.5 }}
                                        >
                                            <Typography sx={{
                                                fontFamily: 'Outfit',
                                                fontWeight: 700,
                                                color: '#FFFFFF !important',
                                                fontSize: { xs: '1rem', md: '1.15rem' }
                                            }}>
                                                {faq.q}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ px: { xs: 2, sm: 4 }, pb: 4, bgcolor: '#FFFFFF', border: '1px solid #1A5C2A', borderTop: 'none', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
                                            <Typography sx={{
                                                fontFamily: 'Inter',
                                                color: '#1A5C2A',
                                                lineHeight: 1.8,
                                                fontSize: '1rem',
                                                pt: 2
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
                                        to="/contact"
                                        sx={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            border: '2px solid #0D2B14',
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
                                                lineHeight: '46px',
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
                                                width: 46,
                                                height: 46,
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

// ---- CTA SECTION ----
const CTASection = () => {
    const { ref: sectionRef, inView } = useInView({ triggerOnce: false, threshold: 0.3 });
    const { language } = useLanguage();
    const ui = uiTranslations[language];

    return (
        <Box sx={{ py: { xs: 8, md: 15 }, bgcolor: '#FFFFFF' }}>
            <Container maxWidth="lg">
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
                    gap: { xs: 4, md: 8 },
                    alignItems: 'stretch'
                }}>
                    {/* Left side: Photo */}
                    <Box sx={{ gridColumn: { md: 'span 5' } }}>
                        <FadeInUp style={{ height: '100%' }}>
                            <Box
                                component="img"
                                src={ctaImage}
                                alt="Join our community"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    maxHeight: { xs: 300, sm: 400, md: 'none' },
                                    objectFit: 'cover',
                                    display: 'block'
                                }}
                            />
                        </FadeInUp>
                    </Box>

                    {/* Right side: Content */}
                    <Box sx={{
                        gridColumn: { md: 'span 7' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        p: { xs: 4, sm: 6, md: 10 },
                        bgcolor: '#1A5C2A',
                        color: '#FFFFFF'
                    }}>
                        <FadeInUp delay={0.1}>
                            <Box ref={sectionRef} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2, overflow: 'hidden' }}>
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
                                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#F7A11A', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                        {ui.joinCommunity}
                                    </Typography>
                                </Box>
                            </Box>

                            <Typography sx={{
                                fontFamily: '"Inknut Antiqua", serif',
                                fontWeight: 700,
                                color: '#FFFFFF',
                                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' },
                                mb: 3,
                                lineHeight: 1.15
                            }}>
                                {ui.stayConnected}
                            </Typography>
                            <Box sx={{ width: 60, height: 4, bgcolor: '#F7A11A', mb: 4 }} />
                            <Typography sx={{
                                fontFamily: '"Inknut Antiqua", serif',
                                fontWeight: 400,
                                color: 'rgba(255,255,255,0.85)',
                                fontSize: '0.95rem',
                                lineHeight: 1.9,
                                mb: 6,
                                maxWidth: '95%'
                            }}>
                                {ui.stayConnectedDesc}
                            </Typography>

                            <Box
                                component={motion.a}
                                whileHover="hover"
                                initial="rest"
                                animate="rest"
                                href="/contact"
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    border: '2px solid #F7A11A',
                                    borderRadius: 50,
                                    overflow: 'hidden',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        bgcolor: 'rgba(247, 161, 26, 0.04)'
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
                                        px: 4,
                                        lineHeight: '56px',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {ui.requestDemo}
                                </Typography>
                                <Box
                                    className="pill-arrow-w"
                                    component={motion.div}
                                    variants={{
                                        rest: { x: 0 },
                                        hover: { x: 0 }
                                    }}
                                    sx={{
                                        width: 56,
                                        height: 56,
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
                        </FadeInUp>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

// ---- HOME PAGE ----
const HomePage = () => {
    const { language } = useLanguage();
    
    return (
        <>
            <SEOHead />
            <HeroSection />
            <PurposeWhiteSection />
            <WhatWeDoSection />
            <WhatWeOfferSection />

            <ClientsSection />
            <TestimonialsSection />
            <BlogSection />
            <FAQSection />
            <CTASection />
        </>
    );
};

export default HomePage;
