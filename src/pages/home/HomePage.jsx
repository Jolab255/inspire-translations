import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link as RouterLink } from 'react-router-dom';
import CountUp from 'react-countup';
import HeroSection from '../../components/hero/HeroSection';
import SEOHead from '../../components/seo/SEOHead';
import { services, stats, testimonials, clients, blogPosts } from '../../data/siteData';
import { DotLottiePlayer } from '@dotlottie/react-player';
import lottieLangTranslator from '../../assets/lottie/language translator.lottie';
import heroWoman from '../../assets/images/hero_woman_bg.png';
import aboutUsPhoto from '../../assets/images/about_us_photo.png';

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
    const letters = Array.from(text);

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
            sx={{ ...sx, display: 'inline-block' }}
            {...props}
        >
            {letters.map((char, index) => (
                <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
                    {char}
                </motion.span>
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

// ---- SERVICES SECTION ----
const ServicesSection = () => {
    const { ref: arrowRef, inView } = useInView({ triggerOnce: false, threshold: 0.6 });
    return (
        <Box sx={{ pt: { xs: 6, md: 8 }, pb: { xs: 10, md: 12 }, minHeight: '60vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #1A5C2A 0%, #0D2B14 100%)' }}>
            <Container maxWidth="lg">
                <FadeInUp>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 8 }}>
                        {/* Animated arrow label */}
                        <Box ref={arrowRef} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2, overflow: 'hidden' }}>
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
                                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.15em', color: '#F7A11A', textTransform: 'uppercase' }}>
                                    What We Do
                                </Typography>
                            </Box>
                        </Box>

                        {/* Main Heading & Underline */}
                        <Box>
                            <TypewriterText
                                text="Breaking Language Barriers, Connecting Worlds"
                                variant="h2"
                                sx={{
                                    fontFamily: '"Inknut Antiqua", serif',
                                    color: '#FFFFFF',
                                    fontWeight: 700,
                                    fontSize: { xs: '1.8rem', md: '2.4rem' },
                                    lineHeight: 1.2,
                                    maxWidth: { xs: '100%', md: 650 }, // Reduced width on desktop so it doesn't hit the white box
                                    mb: 3
                                }}
                            />
                            <Box sx={{ width: 60, height: 4, bgcolor: '#F7A11A' }} />
                        </Box>
                    </Box>
                </FadeInUp>
                <Grid container spacing={3}>
                    {services.map((service, i) => (
                        <Grid item xs={12} sm={6} md={4} key={service.id}>
                            <FadeInUp delay={i * 0.08}>
                                <Card
                                    component={RouterLink}
                                    to={`/services/${service.id}`}
                                    sx={{
                                        height: '100%',
                                        minHeight: 260,
                                        textDecoration: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        border: '1px solid rgba(0,0,0,0.06)',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        background: '#fff',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0, left: 0, right: 0,
                                            height: 4,
                                            background: service.color === '#F7A11A'
                                                ? 'linear-gradient(90deg, #F7A11A, #F9B84A)'
                                                : 'linear-gradient(90deg, #1A5C2A, #2A7A3B)',
                                            transform: 'scaleX(0)',
                                            transformOrigin: 'left',
                                            transition: 'transform 0.4s ease',
                                        },
                                        '&:hover::before': { transform: 'scaleX(1)' },
                                    }}
                                >
                                    <CardContent sx={{ p: 3.5, flexGrow: 1 }}>
                                        <Box
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: '16px',
                                                bgcolor: service.color === '#F7A11A' ? 'rgba(247,161,26,0.1)' : 'rgba(26,92,42,0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.8rem',
                                                mb: 2.5,
                                                transition: 'transform 0.3s ease',
                                                '.MuiCard-root:hover &': { transform: 'scale(1.1) rotate(5deg)' },
                                            }}
                                        >
                                            {service.icon}
                                        </Box>
                                        <Typography
                                            variant="h5"
                                            sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', mb: 1.5, fontSize: '1.1rem' }}
                                        >
                                            {service.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#4A4A6A', lineHeight: 1.7, mb: 2.5 }}>
                                            {service.shortDesc}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                                color: service.color,
                                                fontFamily: 'Outfit',
                                                fontWeight: 600,
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            Learn More <ArrowForwardIcon sx={{ fontSize: 16 }} />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </FadeInUp>
                        </Grid>
                    ))}
                </Grid>
                <FadeInUp delay={0.4}>
                    <Box sx={{ textAlign: 'center', mt: 6 }}>
                        <Button
                            component={RouterLink}
                            to="/services"
                            variant="outlined"
                            size="large"
                            color="secondary"
                            endIcon={<ArrowForwardIcon />}
                            sx={{ px: 4, borderWidth: 2 }}
                        >
                            View All Services
                        </Button>
                    </Box>
                </FadeInUp>
            </Container>
        </Box>
    );
};

// ---- PURPOSE (WHITE) SECTION ----
const PurposeWhiteSection = () => {
    const { ref: arrowRef, inView } = useInView({ triggerOnce: false, threshold: 0.6 });
    return (
        <Box sx={{ pt: { xs: 8, md: 11 }, pb: { xs: 14, md: 22 }, bgcolor: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, bgcolor: '#1A5C2A' }} />
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 6, md: 9 }, alignItems: 'center' }}>

                    {/* Left — Photo */}
                    <Box sx={{ flex: '0 0 auto', width: { xs: '100%', md: '42%' } }}>
                        <FadeInUp>
                            <Box sx={{ position: 'relative' }}>
                                <Box sx={{ position: 'absolute', top: -12, left: -12, width: 60, height: 60, border: '4px solid #F7A11A', borderRight: 'none', borderBottom: 'none', zIndex: 1 }} />
                                <Box sx={{ position: 'absolute', bottom: -12, right: -12, width: 60, height: 60, border: '4px solid #1A5C2A', borderLeft: 'none', borderTop: 'none', zIndex: 1 }} />
                                <Box component="img" src={aboutUsPhoto} alt="Inspire Translations" sx={{ width: '100%', maxHeight: 520, objectFit: 'cover', objectPosition: 'top center', display: 'block', mixBlendMode: 'multiply', filter: 'contrast(1.05)' }} />
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
                                        Our Purpose
                                    </Typography>
                                </Box>
                            </Box>

                            <TypewriterText
                                text="Why We Exist"
                                variant="h2"
                                sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: { xs: '2rem', md: '2.6rem' }, color: '#0D2B14', lineHeight: 1.15, mb: 3 }}
                            />
                            <Box sx={{ width: 56, height: 4, bgcolor: '#F7A11A', mb: 3 }} />
                            <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 400, fontSize: '0.95rem', lineHeight: 2, color: '#444', mb: 2 }}>
                                Across Tanzania and East Africa, language has always been both a bridge and a barrier in boardrooms, courtrooms, clinics, and conferences. When language fails, opportunities are lost, rights go unheard, and connections fall short.
                            </Typography>
                            <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 400, fontSize: '0.95rem', lineHeight: 2, color: '#444', mb: 4 }}>
                                Inspire Translations was founded to change this reality connecting people, organizations, and ideas across language lines with accuracy, integrity, and deep cultural sensitivity.
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
                                    More About Us
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
    return (
        <Box sx={{ py: { xs: 8, md: 12 }, minHeight: 400, display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #F7A11A 0%, #D4880E 100%)', position: 'relative' }}>

            {/* Content */}
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 6 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 5 }, alignItems: 'center' }}>

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
                                            What We Do
                                        </Typography>
                                    </Box>
                                </Box>

                                <TypewriterText
                                    text="Bridging the Gap Through Expert Language Services"
                                    variant="h2"
                                    sx={{ fontFamily: '"Inknut Antiqua", serif', color: '#0D2B14', fontWeight: 700, fontSize: { xs: '2rem', md: '2.6rem' }, lineHeight: 1.15, mb: 3 }}
                                />
                                <Box sx={{ width: 56, height: 4, bgcolor: '#0D2B14', mb: 3 }} />
                                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 400, color: '#0D2B14', fontSize: '0.95rem', lineHeight: 2, mb: 4 }}>
                                    We collaborate with businesses, NGOs, and legal professionals to deliver precise, culturally resonant communication solutions. We lay the foundation for seamless cross-border partnerships and impactful global operations.
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
                                        See Our Services
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
                        {/* 
                          Using absolute positioning breaks BOTH the image and the list out of the flex constraints
                          so they don't stretch the section height. Building them in a single absolute container 
                          makes the white box perfectly touch the bottom of the image and overlap the next section.
                        */}
                        <Box sx={{
                            position: 'absolute',
                            top: { xs: -150, md: -270 }, // Aggressively pull UPWARD
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
                                        display: 'block', // Ensures no gap below the image
                                        mixBlendMode: 'multiply',
                                        filter: 'contrast(1.05)',
                                        pointerEvents: 'none' // Only disable pointer events on the image itself
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
                                    // Removed mt here so it perfectly touches the image
                                }}>
                                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: '1.2rem', color: '#0D2B14', mb: 3 }}>
                                        How we deliver impact:
                                    </Typography>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                        {[
                                            { title: "Strategic Collaboration", desc: "Partnering closely with businesses, NGOs, and legal professionals." },
                                            { title: "Precise Communication", desc: "Delivering language solutions that are strictly accurate and culturally resonant." },
                                            { title: "Seamless Partnerships", desc: "Laying the foundation for smooth, cross-border relationships." },
                                            { title: "Global Operations", desc: "Empowering impactful operations on an international scale." }
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




// ---- WHY CHOOSE US ----
const WhyUsSection = () => {
    const reasons = [
        { icon: '🎓', title: 'Expert Linguists', desc: 'All our translators and interpreters are certified professionals with deep subject-matter expertise in legal, medical, business, and technical fields.' },
        { icon: '⚡', title: 'Fast Turnaround', desc: 'We understand the urgency of business. Our streamlined processes ensure swift delivery without compromising quality.' },
        { icon: '🔒', title: 'Confidentiality', desc: 'All documents and conversations are handled with strict confidentiality under signed NDAs. Your information is always secure with us.' },
        { icon: '🌍', title: 'Cultural Sensitivity', desc: 'Language is more than words. We ensure every translation respects the cultural context, idioms, and nuances of the target audience.' },
        { icon: '📞', title: 'Dedicated Support', desc: '24/7 client support team ready to assist at every stage of your project, from initial quote to final delivery.' },
        { icon: '✅', title: 'Quality Guaranteed', desc: 'Every project undergoes rigorous quality assurance with multiple review stages before delivery.' },
    ];
    return (
        <Box sx={{ py: 12, background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2E40 60%, #0F3A1A 100%)', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', top: '10%', right: '-5%', width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(247,161,26,0.1)', pointerEvents: 'none' }} />
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <FadeInUp>
                    <SectionTitle label="Why Choose Us" title="Your Trusted Language Partner" subtitle="We combine linguistic expertise with cutting-edge technology to deliver world-class language services." dark />
                </FadeInUp>
                <Grid container spacing={3}>
                    {reasons.map((r, i) => (
                        <Grid item xs={12} sm={6} md={4} key={r.title}>
                            <FadeInUp delay={i * 0.08}>
                                <Box sx={{ p: 3.5, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', height: '100%', transition: 'all 0.3s ease', '&:hover': { bgcolor: 'rgba(247,161,26,0.07)', borderColor: 'rgba(247,161,26,0.25)', transform: 'translateY(-4px)' } }}>
                                    <Typography sx={{ fontSize: '2.2rem', mb: 2 }}>{r.icon}</Typography>
                                    <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#F7A11A', mb: 1.5, fontSize: '1.05rem' }}>{r.title}</Typography>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.7 }}>{r.desc}</Typography>
                                </Box>
                            </FadeInUp>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};


// ---- TESTIMONIALS ----
const TestimonialsSection = () => (
    <Box sx={{ py: 12, bgcolor: '#F8F9FA' }}>
        <Container maxWidth="lg">
            <FadeInUp>
                <SectionTitle
                    label="Testimonials"
                    title="What Our Clients Say"
                    subtitle="Hear from organizations that trust Inspire Translations for their language needs."
                />
            </FadeInUp>
            <Grid container spacing={4}>
                {testimonials.map((t, i) => (
                    <Grid item xs={12} md={4} key={t.id}>
                        <FadeInUp delay={i * 0.1}>
                            <Card
                                sx={{
                                    height: '100%',
                                    p: 1,
                                    border: '1px solid rgba(0,0,0,0.06)',
                                    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                                    position: 'relative',
                                    overflow: 'visible',
                                }}
                            >
                                <CardContent sx={{ p: 3.5 }}>
                                    <FormatQuoteIcon sx={{ fontSize: 48, color: 'rgba(247,161,26,0.2)', mb: 1, display: 'block' }} />
                                    <Box sx={{ display: 'flex', mb: 2 }}>
                                        {Array(t.rating).fill(0).map((_, idx) => (
                                            <StarIcon key={idx} sx={{ color: '#F7A11A', fontSize: 18 }} />
                                        ))}
                                    </Box>
                                    <Typography sx={{ color: '#4A4A6A', lineHeight: 1.8, mb: 3, fontStyle: 'italic', fontSize: '0.95rem' }}>
                                        "{t.quote}"
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar sx={{ bgcolor: '#1A5C2A', fontFamily: 'Outfit', fontWeight: 700, width: 44, height: 44 }}>
                                            {t.avatar}
                                        </Avatar>
                                        <Box>
                                            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '0.95rem', color: '#1A1A2E' }}>
                                                {t.name}
                                            </Typography>
                                            <Typography sx={{ fontSize: '0.8rem', color: '#4A4A6A' }}>
                                                {t.role} · {t.organization}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </FadeInUp>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </Box>
);

// ---- CLIENT LOGOS ----
const ClientsSection = () => (
    <Box sx={{ py: 7, bgcolor: '#FFFFFF', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <Container maxWidth="lg">
            <FadeInUp>
                <Typography sx={{ textAlign: 'center', fontFamily: 'Outfit', fontWeight: 600, color: '#9E9E9E', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', mb: 4 }}>
                    Trusted by leading organizations
                </Typography>
            </FadeInUp>
            <Box sx={{ overflow: 'hidden', position: 'relative' }}>
                <motion.div
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap' }}
                >
                    {[...clients, ...clients].map((client, i) => (
                        <Typography
                            key={i}
                            sx={{
                                fontFamily: 'Outfit',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                color: '#9E9E9E',
                                flexShrink: 0,
                                transition: 'color 0.3s',
                                '&:hover': { color: '#F7A11A' },
                            }}
                        >
                            {client}
                        </Typography>
                    ))}
                </motion.div>
            </Box>
        </Container>
    </Box>
);

// ---- BLOG PREVIEW ----
const BlogSection = () => (
    <Box sx={{ py: 12, bgcolor: '#F8F9FA' }}>
        <Container maxWidth="lg">
            <FadeInUp>
                <SectionTitle
                    label="Latest Insights"
                    title="From Our Blog"
                    subtitle="Expert articles on translation, language learning, and global communication."
                />
            </FadeInUp>
            <Grid container spacing={4}>
                {blogPosts.map((post, i) => (
                    <Grid item xs={12} md={4} key={post.id}>
                        <FadeInUp delay={i * 0.1}>
                            <Card
                                component={RouterLink}
                                to={`/blog/${post.slug}`}
                                sx={{ textDecoration: 'none', height: '100%', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
                            >
                                <Box
                                    sx={{
                                        height: 180,
                                        background: i % 2 === 0
                                            ? 'linear-gradient(135deg, #F7A11A, #D4880E)'
                                            : 'linear-gradient(135deg, #1A5C2A, #2A7A3B)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '3rem',
                                    }}
                                >
                                    {i === 0 ? '📰' : i === 1 ? '🌍' : '🎙️'}
                                </Box>
                                <CardContent sx={{ p: 3 }}>
                                    <Chip label={post.category} size="small" sx={{ bgcolor: 'rgba(247,161,26,0.1)', color: '#F7A11A', fontFamily: 'Outfit', fontWeight: 600, mb: 2, fontSize: '0.7rem' }} />
                                    <Typography variant="h6" sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', mb: 1.5, fontSize: '1rem', lineHeight: 1.4 }}>
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#4A4A6A', lineHeight: 1.7, mb: 2 }}>
                                        {post.excerpt.substring(0, 120)}...
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.8rem', color: '#9E9E9E', fontFamily: 'Inter' }}>
                                        {post.readTime} · {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </FadeInUp>
                    </Grid>
                ))}
            </Grid>
            <FadeInUp delay={0.3}>
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                    <Button component={RouterLink} to="/blog" variant="outlined" color="secondary" size="large" endIcon={<ArrowForwardIcon />} sx={{ px: 4, borderWidth: 2 }}>
                        Read All Articles
                    </Button>
                </Box>
            </FadeInUp>
        </Container>
    </Box>
);

// ---- CTA BANNER ----
const CTASection = () => (
    <FadeInUp>
        <Box
            sx={{
                py: 10,
                background: 'linear-gradient(135deg, #1A5C2A 0%, #2A7A3B 100%)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%', left: '-10%',
                    width: '120%', height: '200%',
                    backgroundImage: 'radial-gradient(ellipse at center, rgba(247,161,26,0.12) 0%, transparent 70%)',
                },
            }}
        >
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h2" sx={{ color: '#FFFFFF', fontFamily: 'Outfit', fontWeight: 800, mb: 2 }}>
                    Ready to Break Language Barriers?
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 5, lineHeight: 1.8, fontSize: '1.1rem' }}>
                    Get a free quote within 24 hours. Our team is ready to help you communicate with precision and confidence across any language.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                        component={RouterLink}
                        to="/quote"
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: '#F7A11A',
                            color: '#fff',
                            px: 5,
                            py: 1.8,
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            boxShadow: '0 8px 30px rgba(247,161,26,0.4)',
                            '&:hover': { bgcolor: '#D4880E' },
                        }}
                    >
                        Get a Free Quote
                    </Button>
                    <Button
                        component={RouterLink}
                        to="/contact"
                        variant="outlined"
                        size="large"
                        sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)', px: 5, py: 1.8, fontSize: '1.1rem', '&:hover': { borderColor: '#F7A11A', color: '#F7A11A', bgcolor: 'transparent' } }}
                    >
                        Contact Us
                    </Button>
                </Box>
            </Container>
        </Box>
    </FadeInUp>
);

// ---- HOME PAGE ----
const HomePage = () => (
    <>
        <SEOHead
            title="Inspire Translations | Professional Translation & Interpretation Services Tanzania"
            description="Tanzania's premier language services company. Expert translation, interpretation, language classes, and conference logistics. Serving East Africa and beyond."
            canonicalUrl="https://inspiretranslations.co.tz"
            keywords="translation services Tanzania, interpretation Dar es Salaam, language services East Africa, conference interpretation Tanzania"
        />
        <HeroSection />
        <PurposeWhiteSection />
        <WhatWeDoSection />
        <ServicesSection />
        <WhyUsSection />
        <ClientsSection />
        <TestimonialsSection />
        <BlogSection />
        <CTASection />
    </>
);

export default HomePage;
