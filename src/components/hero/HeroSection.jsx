import { useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import TranslateIcon from '@mui/icons-material/Translate';
import VerifiedIcon from '@mui/icons-material/Verified';
import GroupsIcon from '@mui/icons-material/Groups';
import LanguageIcon from '@mui/icons-material/Language';

// Import the video
import heroBg from '../../assets/videos/hero_bg.mp4';

// ── Floating stat card ────────────────────────────────────────────────
const FloatCard = ({ icon, value, label, delay, position }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'absolute', ...position }}
    >
        <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: delay * 0.5 }}
        >
            <Box
                sx={{
                    bgcolor: 'rgba(255,255,255,0.13)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.22)',
                    borderRadius: 3,
                    px: 2.5,
                    py: 1.6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                    minWidth: 140,
                }}
            >
                <Box
                    sx={{
                        width: 38,
                        height: 38,
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #F7A11A, #D4880E)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 4px 12px rgba(247,161,26,0.4)',
                    }}
                >
                    {icon}
                </Box>
                <Box>
                    <Typography sx={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.3rem', color: '#FFFFFF', lineHeight: 1 }}>
                        {value}
                    </Typography>
                    <Typography sx={{ fontFamily: 'Inter', fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.3, mt: 0.2 }}>
                        {label}
                    </Typography>
                </Box>
            </Box>
        </motion.div>
    </motion.div>
);

// ── Light streak decoration ───────────────────────────────────────────
const Streak = ({ top, delay, duration, opacity = 0.5 }) => (
    <Box
        sx={{
            position: 'absolute',
            top,
            left: '-20%',
            width: '55%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(247,161,26,0.8), transparent)',
            animation: `streakMove ${duration}s ${delay}s infinite linear`,
            opacity,
            pointerEvents: 'none',
        }}
    />
);

// ── Main Hero ─────────────────────────────────────────────────────────
const HeroSection = () => {
    const controls = useAnimation();
    const videoRef = useRef(null);
    const { scrollY } = useScroll();

    // Parallax: video scales up subtly as user scrolls
    const videoScale = useTransform(scrollY, [0, 600], [1, 1.12]);
    const contentY = useTransform(scrollY, [0, 400], [0, 60]);
    const overlayOp = useTransform(scrollY, [0, 500], [0.62, 0.85]);

    useEffect(() => {
        controls.start('visible');
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.75;
        }
    }, [controls]);

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100vh',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            {/* ── Background video ── */}
            <motion.div
                style={{ scale: videoScale, position: 'absolute', inset: 0, transformOrigin: 'center center' }}
            >
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                >
                    <source src={heroBg} type="video/mp4" />
                </video>
            </motion.div>

            {/* ── Layered overlays ── */}
            {/* Primary dark overlay with parallax opacity */}
            <motion.div
                style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(13,27,42,0.88) 0%, rgba(15,58,26,0.72) 100%)',
                    opacity: overlayOp,
                }}
            />
            {/* Gradient fade bottom */}
            <Box
                sx={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: '35%',
                    background: 'linear-gradient(0deg, rgba(13,27,42,0.95) 0%, transparent 100%)',
                    pointerEvents: 'none',
                }}
            />
            {/* Left vignette */}
            <Box
                sx={{
                    position: 'absolute', top: 0, left: 0, bottom: 0,
                    width: '40%',
                    background: 'linear-gradient(90deg, rgba(13,27,42,0.6) 0%, transparent 100%)',
                    pointerEvents: 'none',
                }}
            />

            {/* ── Light streaks ── */}
            <Streak top="18%" delay={0} duration={9} opacity={0.55} />
            <Streak top="42%" delay={3} duration={12} opacity={0.4} />
            <Streak top="70%" delay={6} duration={10} opacity={0.5} />

            {/* ── Floating stat cards (desktop) ── */}
            <FloatCard
                icon={<VerifiedIcon sx={{ color: '#fff', fontSize: 20 }} />}
                value="98%"
                label="Client Satisfaction"
                delay={0.9}
                position={{ right: { xs: 16, lg: '6%' }, top: { xs: 'auto', lg: '22%' } }}
            />
            <FloatCard
                icon={<LanguageIcon sx={{ color: '#fff', fontSize: 20 }} />}
                value="25+"
                label="Language Pairs"
                delay={1.1}
                position={{ right: { xs: 16, lg: '4%' }, top: { xs: 'auto', lg: '42%' } }}
            />
            <FloatCard
                icon={<GroupsIcon sx={{ color: '#fff', fontSize: 20 }} />}
                value="500+"
                label="Happy Clients"
                delay={1.3}
                position={{ right: { xs: 16, lg: '8%' }, top: { xs: 'auto', lg: '62%' } }}
            />

            {/* ── Main content ── */}
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pt: { xs: 10, md: 2 }, pb: { xs: 14, md: 4 } }}>
                <motion.div style={{ y: contentY }}>
                    <Grid container>
                        <Grid item xs={12} md={8} lg={7}>
                            <motion.div variants={containerVariants} initial="hidden" animate={controls}>

                                {/* Badge */}
                                <motion.div variants={itemVariants}>
                                    <Chip
                                        icon={<TranslateIcon sx={{ fontSize: '0.9rem !important', color: '#F7A11A !important' }} />}
                                        label="Tanzania's Premier Language Partner"
                                        sx={{
                                            bgcolor: 'rgba(247,161,26,0.15)',
                                            backdropFilter: 'blur(8px)',
                                            color: '#F7A11A',
                                            border: '1px solid rgba(247,161,26,0.4)',
                                            fontFamily: 'Outfit',
                                            fontWeight: 600,
                                            fontSize: '0.78rem',
                                            height: 34,
                                            mb: 3.5,
                                            letterSpacing: '0.02em',
                                        }}
                                    />
                                </motion.div>

                                {/* Headline */}
                                <motion.div variants={itemVariants}>
                                    <Typography
                                        component="h1"
                                        sx={{
                                            fontFamily: 'Outfit',
                                            fontWeight: 900,
                                            fontSize: 'clamp(2.6rem, 6vw, 5rem)',
                                            lineHeight: 1.05,
                                            color: '#FFFFFF',
                                            mb: 0.5,
                                            textShadow: '0 2px 24px rgba(0,0,0,0.4)',
                                        }}
                                    >
                                        We Speak
                                    </Typography>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <Typography
                                        component="p"
                                        sx={{
                                            fontFamily: 'Outfit',
                                            fontWeight: 900,
                                            fontSize: 'clamp(2.6rem, 6vw, 5rem)',
                                            lineHeight: 1.05,
                                            background: 'linear-gradient(90deg, #F7A11A 0%, #FFD580 60%, #F7A11A 100%)',
                                            backgroundSize: '200% auto',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            animation: 'shimmerGold 4s linear infinite',
                                            mb: 3,
                                            textShadow: 'none',
                                        }}
                                    >
                                        Your Language.
                                    </Typography>
                                </motion.div>

                                {/* Tagline */}
                                <motion.div variants={itemVariants}>
                                    <Typography
                                        sx={{
                                            color: 'rgba(255,255,255,0.55)',
                                            fontSize: '1.05rem',
                                            fontFamily: 'Inter',
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase',
                                            mb: 1.5,
                                        }}
                                    >
                                        Precision · Culture · Trust
                                    </Typography>
                                </motion.div>

                                {/* Sub-description */}
                                <motion.div variants={itemVariants}>
                                    <Typography
                                        sx={{
                                            color: 'rgba(255,255,255,0.72)',
                                            fontSize: '1.08rem',
                                            lineHeight: 1.85,
                                            maxWidth: 520,
                                            mb: 4.5,
                                            fontFamily: 'Inter',
                                            fontWeight: 300,
                                        }}
                                    >
                                        Expert document translation, real-time conference interpretation, immersive language classes, and full-service
                                        event logistics — delivered with unmatched precision across East Africa and beyond.
                                    </Typography>
                                </motion.div>

                                {/* CTA Buttons */}
                                <motion.div variants={itemVariants}>
                                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                                        <Button
                                            component={RouterLink}
                                            to="/quote"
                                            variant="contained"
                                            size="large"
                                            endIcon={<ArrowForwardIcon />}
                                            sx={{
                                                background: 'linear-gradient(135deg, #F7A11A 0%, #D4880E 100%)',
                                                color: '#fff',
                                                fontFamily: 'Outfit',
                                                fontWeight: 700,
                                                fontSize: '1rem',
                                                px: 4,
                                                py: 1.6,
                                                borderRadius: 50,
                                                boxShadow: '0 8px 32px rgba(247,161,26,0.45)',
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #D4880E 0%, #F7A11A 100%)',
                                                    boxShadow: '0 12px 48px rgba(247,161,26,0.55)',
                                                    transform: 'translateY(-3px)',
                                                },
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            Get a Free Quote
                                        </Button>

                                        <Button
                                            component={RouterLink}
                                            to="/services"
                                            variant="outlined"
                                            size="large"
                                            startIcon={<PlayCircleOutlineIcon />}
                                            sx={{
                                                color: '#FFFFFF',
                                                borderColor: 'rgba(255,255,255,0.4)',
                                                backdropFilter: 'blur(8px)',
                                                bgcolor: 'rgba(255,255,255,0.06)',
                                                fontFamily: 'Outfit',
                                                fontWeight: 600,
                                                fontSize: '1rem',
                                                px: 3.5,
                                                py: 1.5,
                                                borderRadius: 50,
                                                '&:hover': {
                                                    bgcolor: 'rgba(255,255,255,0.12)',
                                                    borderColor: '#F7A11A',
                                                    color: '#F7A11A',
                                                    transform: 'translateY(-3px)',
                                                },
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            Our Services
                                        </Button>
                                    </Box>
                                </motion.div>

                                {/* Trust signals */}
                                <motion.div variants={itemVariants}>
                                    <Box
                                        sx={{
                                            mt: 5,
                                            pt: 4,
                                            borderTop: '1px solid rgba(255,255,255,0.12)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 4,
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        {[
                                            { val: '10+', label: 'Years Experience' },
                                            { val: '25+', label: 'Language Pairs' },
                                            { val: '98%', label: 'Client Satisfaction' },
                                        ].map((stat) => (
                                            <Box key={stat.label}>
                                                <Typography
                                                    sx={{
                                                        fontFamily: 'Outfit',
                                                        fontWeight: 900,
                                                        fontSize: '2rem',
                                                        color: '#F7A11A',
                                                        lineHeight: 1,
                                                        textShadow: '0 0 20px rgba(247,161,26,0.4)',
                                                    }}
                                                >
                                                    {stat.val}
                                                </Typography>
                                                <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', fontFamily: 'Inter', mt: 0.25, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                                    {stat.label}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </motion.div>
                            </motion.div>
                        </Grid>
                    </Grid>
                </motion.div>
            </Container>

            {/* ── Scroll indicator ── */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                style={{
                    position: 'absolute',
                    bottom: 32,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                }}
            >
                <Box sx={{ width: 1, height: 40, bgcolor: 'rgba(255,255,255,0.35)', borderRadius: 1, mx: 'auto' }} />
                <KeyboardArrowDownIcon sx={{ color: 'rgba(255,255,255,0.45)', fontSize: 28 }} />
            </motion.div>
        </Box>
    );
};

export default HeroSection;
