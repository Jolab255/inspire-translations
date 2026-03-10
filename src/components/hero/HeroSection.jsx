import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';

// Import images
import heroWoman from '../../assets/images/Neema Prosper.png';
import flag1 from '../../assets/images/HERO_FLAG_1.png';
import flag2 from '../../assets/images/HERO_FLAG_2.png';
import flag3 from '../../assets/images/HERO_FLAG_3.png';
import flag4 from '../../assets/images/HERO_FLAG_4.png';

const servicesList = {
    en: ['Language', 'Translation', 'Interpretation', 'Localization'],
    sw: ['Lugha', 'Tafsiri', 'Ukalimani', 'Ujanibishaji']
};

const cardData = [
    {
        title: { en: 'Written Translation', sw: 'Tafsiri ya Maandishi' },
        image: flag1,
        desc: {
            en: 'Delivering culturally nuanced translation and localization that resonates with local audiences.',
            sw: 'Kutoa tafsiri na ujanibishaji unaozingatia utamaduni na unaovutia hadhira ya mahali husika.'
        },
    },
    {
        title: { en: 'Document Translation', sw: 'Tafsiri ya Nyaraka' },
        image: flag2,
        desc: {
            en: 'Accurate, certified translation for legal and technical documents.',
            sw: 'Tafsiri sahihi na iliyothibitishwa kwa nyaraka za kisheria na kiufundi.'
        },
    },
    {
        title: { en: 'Spoken Interpretation', sw: 'Ukalimani wa Mazungumzo' },
        image: flag3,
        desc: {
            en: 'Real-time interpretation services for conferences and meetings.',
            sw: 'Huduma za ukalimani wa papo hapo kwa mikutano na makongamano.'
        },
    },
    {
        title: { en: 'Software Localization', sw: 'Ujanibishaji wa Programu' },
        image: flag4,
        desc: {
            en: 'Adapting software and websites to perfectly match regional linguistic and cultural norms.',
            sw: 'Kurekebisha programu na tovuti ili ziendane kikamilifu na kanuni za lugha na utamaduni wa kikanda.'
        }
    }
];

// Animation helper
const FadeInUp = ({ children, delay = 0, threshold = 0.15 }) => {
    const { ref, inView } = useInView({ triggerOnce: false, threshold });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
};

// Animated text component for typewriter spelling effect
const TypewriterText = ({ text, sx, variant = "h2", ...props }) => {
    const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
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
                <motion.span
                    key={index}
                    variants={letterVariants}
                    style={{ display: 'inline-block', whiteSpace: 'pre' }}
                >
                    {char}
                </motion.span>
            ))}
        </Typography>
    );
};

const HeroSection = () => {
    const { language, t } = useLanguage();
    const ui = uiTranslations[language];
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance logic
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
        }, 6500);

        return () => clearInterval(timer);
    }, []);

    const content = {
        en: {
            seamless: "Seamless",
            africa: "Services in Africa.",
            explore: "Explore Services",
            profSol: "Professional Solutions",
            profDesc: "Connecting people and businesses through award-winning translation and interpretation services globally.",
        },
        sw: {
            seamless: "Huduma ya",
            africa: "Bora Afrika.",
            explore: "Gundua Huduma",
            profSol: "Suluhu za Kitaalamu",
            profDesc: "Kuunganisha watu na biashara kupitia huduma za tafsiri na ukalimani zilizoshinda tuzo duniani kote.",
        }
    };

    const c = content[language];

    return (
        <Box sx={{ position: 'relative', width: '100%', zIndex: 10 }}>
            {/* The main hero area */}
            <Box
                sx={{
                    position: 'relative',
                    minHeight: { xs: 'auto', md: '100vh' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#F7A11A',
                    pt: { xs: 14, md: 16 },
                    pb: { xs: 8, md: 0 },
                    overflow: 'hidden'
                }}
            >
                {/* ── Premium Decorative Glows ── */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '-10%',
                        right: '-5%',
                        width: '40%',
                        height: '60%',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                        zIndex: 1,
                        pointerEvents: 'none',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '-10%',
                        left: '-5%',
                        width: '30%',
                        height: '50%',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                        zIndex: 1,
                        pointerEvents: 'none',
                    }}
                />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Box sx={{ width: '100%', pointerEvents: 'none' }}>
                        <Typography
                            component="h1"
                            sx={{
                                position: 'relative',
                                zIndex: 1,
                                fontFamily: '"Inknut Antiqua", serif',
                                fontWeight: 400,
                                fontSize: { xs: '1.6rem', sm: '2.4rem', md: '3.2rem', lg: '4rem' },
                                lineHeight: 1.1,
                                color: '#0D2B14',
                                textAlign: 'left',
                            }}
                        >
                            {c.seamless}{' '}
                            <Box component="span" sx={{ display: 'inline-block', color: '#FFFFFF', minWidth: { xs: '120px', sm: '200px' } }}>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={currentIndex + language}
                                        initial={{ rotateX: 90, opacity: 0 }}
                                        animate={{ rotateX: 0, opacity: 1 }}
                                        exit={{ rotateX: -90, opacity: 0 }}
                                        transition={{ duration: 0.5, type: 'tween', ease: 'easeInOut' }}
                                        style={{ display: 'inline-block', transformOrigin: 'center center' }}
                                    >
                                        {servicesList[language][currentIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </Box>
                            <br />
                            <Box component="span" sx={{ display: 'inline-block', ml: { xs: 2, sm: 6, md: 36, lg: 52 } }}>
                                {c.africa}
                            </Box>
                        </Typography>

                        {/* ── Side-by-Side Content Area ── */}
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'flex-start', mt: { xs: 6, md: 6 }, gap: { xs: 4, md: 6 } }}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    mt: { md: -10 },
                                    width: '100%',
                                    maxWidth: { xs: '100%', md: '360px' },
                                    minHeight: { xs: 'auto', md: '500px' },
                                    bgcolor: '#FFFFFF',
                                    zIndex: 10,
                                    borderRadius: 0,
                                    pointerEvents: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textDecoration: 'none',
                                    border: 'none',
                                    overflow: 'visible',
                                    boxShadow: '0 40px 100px rgba(13, 43, 20, 0.12)',
                                }}
                            >
                                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'visible' }}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentIndex + language}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            variants={{
                                                animate: { transition: { staggerChildren: 0.1 } }
                                            }}
                                            style={{ display: 'flex', flexDirection: 'column', overflow: 'visible' }}
                                        >
                                            <Typography
                                                component={motion.h5}
                                                variants={{
                                                    initial: { opacity: 0, y: 10 },
                                                    animate: { opacity: 1, y: 0 },
                                                    exit: { opacity: 0, y: -10 }
                                                }}
                                                variant="h5"
                                                sx={{
                                                    fontFamily: '"Inknut Antiqua", serif',
                                                    fontWeight: 700,
                                                    color: '#0D2B14',
                                                    bgcolor: '#FFFFFF',
                                                    textAlign: 'center',
                                                    p: 1.5,
                                                    width: '100%',
                                                    fontSize: '1.2rem',
                                                    lineHeight: 1.3,
                                                    zIndex: 2
                                                }}
                                            >
                                                {t(cardData[currentIndex].title)}
                                            </Typography>

                                            <Box sx={{ p: { xs: 2, sm: 3 }, display: 'flex', flexDirection: 'column', pt: 3, bgcolor: '#FFFFFF', overflow: 'visible' }}>
                                                <Box
                                                    component={motion.div}
                                                    variants={{
                                                        initial: { opacity: 0, scale: 0.95 },
                                                        animate: { opacity: 1, scale: 1 },
                                                        exit: { opacity: 0, scale: 1.05 }
                                                    }}
                                                    sx={{ overflow: 'visible', mb: 3 }}
                                                >
                                                    <Box
                                                        component="img"
                                                        src={cardData[currentIndex].image}
                                                        alt={t(cardData[currentIndex].title)}
                                                        sx={{
                                                            width: '125%',
                                                            ml: '-12.5%',
                                                            height: { xs: 140, sm: 180 },
                                                            objectFit: 'cover',
                                                            borderRadius: 0,
                                                            zIndex: 20,
                                                            position: 'relative'
                                                        }}
                                                    />
                                                </Box>

                                                <Typography
                                                    component={motion.p}
                                                    variants={{
                                                        initial: { opacity: 0, x: -10 },
                                                        animate: { opacity: 1, x: 0 },
                                                        exit: { opacity: 0, x: 10 }
                                                    }}
                                                    variant="body2"
                                                    sx={{
                                                        fontFamily: '"Inknut Antiqua", serif',
                                                        color: '#4A4A4A',
                                                        lineHeight: 1.8,
                                                        mb: 4,
                                                        fontSize: '0.9rem',
                                                        textAlign: 'left'
                                                    }}
                                                >
                                                    {t(cardData[currentIndex].desc)}
                                                </Typography>
                                            </Box>
                                        </motion.div>
                                    </AnimatePresence>
                                </Box>

                                {/* Static Button: stays constant */}
                                <Box sx={{ p: 3, pt: 0, mt: 'auto', display: 'flex', justifyContent: 'center' }}>
                                    <Box
                                        component={motion(RouterLink)}
                                        whileHover="hover"
                                        initial="rest"
                                        animate="rest"
                                        to={`/${language}/services`}
                                        sx={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            border: '2px solid #0D2B14',
                                            borderRadius: 50,
                                            overflow: 'hidden',
                                            textDecoration: 'none',
                                            transition: 'all 0.3s ease',
                                            cursor: 'pointer',
                                            '&:hover': { bgcolor: 'rgba(13, 43, 20, 0.04)' }
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
                                                px: 2.5,
                                                lineHeight: '40px',
                                                whiteSpace: 'nowrap',
                                                textTransform: 'none',
                                                letterSpacing: '0.05em'
                                            }}
                                        >
                                            {c.explore}
                                        </Typography>
                                        <Box
                                            sx={{
                                                width: 40,
                                                height: 40,
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
                                                <ArrowForwardIcon sx={{ color: '#FFFFFF', fontSize: 16 }} />
                                            </motion.div>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Right Box Area */}
                            <Box
                                sx={{
                                    flex: { md: 1.5, lg: 2 },
                                    position: 'relative',
                                    mt: { md: 5 },
                                    width: '100%',
                                    height: { xs: 'auto', md: '260px' },
                                    bgcolor: '#FFFFFF',
                                    zIndex: 2,
                                    display: 'flex',
                                    flexDirection: { xs: 'column', md: 'row' },
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    px: { xs: 3, sm: 4, md: 6 },
                                    py: { xs: 5, md: 0 },
                                    borderRadius: 0,
                                    boxShadow: '0 30px 60px rgba(13, 43, 20, 0.12)',
                                    pointerEvents: 'auto'
                                }}
                            >
                                {/* Left: Text Content inside Box */}
                                <Box sx={{ flex: 2, color: '#0D2B14', pr: { md: 1 } }}>
                                    <FadeInUp>
                                        <TypewriterText
                                            key={`prof-sol-${language}`}
                                            text={c.profSol}
                                            variant="h4"
                                            sx={{
                                                fontFamily: '"Inknut Antiqua", serif',
                                                fontWeight: 700,
                                                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.8rem' },
                                                mb: 1.5,
                                                lineHeight: 1.2,
                                                whiteSpace: 'nowrap'
                                            }}
                                        />
                                    </FadeInUp>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontFamily: '"Inknut Antiqua", serif',
                                            fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' },
                                            lineHeight: 1.5,
                                            opacity: 0.95,
                                            mb: 3
                                        }}
                                    >
                                        {c.profDesc}
                                    </Typography>

                                    {/* Get a Quote Button — Pill Arrow Style */}
                                    <Box
                                        component={motion(RouterLink)}
                                        whileHover="hover"
                                        initial="rest"
                                        animate="rest"
                                        to={`/${language}/contact`}
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
                                                fontSize: '0.8rem',
                                                px: 2.5,
                                                lineHeight: '40px',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {ui.getAQuote}
                                        </Typography>
                                        <Box
                                            className="pill-arrow-w"
                                            component={motion.div}
                                            variants={{
                                                rest: { x: 0 },
                                                hover: { x: 0 }
                                            }}
                                            sx={{
                                                width: 40,
                                                height: 40,
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
                                                <ArrowForwardIcon sx={{ color: '#FFFFFF', fontSize: 16 }} />
                                            </motion.div>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Right: Overflowing Person Image */}
                                <Box
                                    sx={{
                                        position: 'relative',
                                        flex: 1,
                                        height: '100%',
                                        display: { xs: 'none', md: 'flex' },
                                        justifyContent: 'center',
                                        alignItems: 'flex-end'
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={heroWoman}
                                        alt="Professional Liaison"
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: { md: -60 }, // Nudged further right
                                            height: '135%',
                                            width: 'auto',
                                            objectFit: 'contain',
                                            pointerEvents: 'none',
                                            zIndex: 3
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default HeroSection;
