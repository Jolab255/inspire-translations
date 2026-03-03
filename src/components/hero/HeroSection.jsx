import { useRef, useEffect } from 'react';
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
import TranslateIcon from '@mui/icons-material/Translate';
import { services } from '../../data/siteData';

// Card images from unsplash with proper dimensions
const heroCards = [
    { title: 'Written Translation', sub: 'Legal · Business · Technical', bg: 'linear-gradient(135deg,#1A5C2A,#2A7A3B)', icon: '📄' },
    { title: 'Conference Interpretation', sub: 'On-site · Real-time', bg: 'linear-gradient(135deg,#F7A11A,#D4880E)', icon: '🎙️' },
    { title: 'Language Classes', sub: 'Corporate · Individual', bg: 'linear-gradient(135deg,#0D1B2A,#1A2E40)', icon: '📚' },
    { title: 'Remote Interpretation', sub: 'Zoom · Teams · Phone', bg: 'linear-gradient(135deg,#1A5C2A,#0F3A1A)', icon: '💻' },
    { title: 'Equipment Rental', sub: 'Booths · Headsets · AV', bg: 'linear-gradient(135deg,#D4880E,#F7A11A)', icon: '🎧' },
    { title: 'Event Logistics', sub: 'Full Conference Support', bg: 'linear-gradient(135deg,#1A2E40,#2A4A60)', icon: '🏛️' },
    { title: 'Document Certification', sub: 'Notarized · Official', bg: 'linear-gradient(135deg,#0F3A1A,#1A5C2A)', icon: '✅' },
    { title: 'Subtitling & Captioning', sub: 'Video · Film · Media', bg: 'linear-gradient(135deg,#2A3A4A,#1A2E40)', icon: '🎬' },
    { title: 'Swahili Classes', sub: 'East Africa · Business', bg: 'linear-gradient(135deg,#F7A11A,#1A5C2A)', icon: '🌍' },
];

// Split cards into 3 columns
const col1 = heroCards.slice(0, 3);
const col2 = heroCards.slice(3, 6);
const col3 = heroCards.slice(6, 9);

const HeroCard = ({ card }) => (
    <Box
        sx={{
            background: card.bg,
            borderRadius: 3,
            p: 2.5,
            minHeight: 140,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0,
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            cursor: 'default',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
            },
        }}
    >
        {/* Background icon */}
        <Typography sx={{ position: 'absolute', top: 12, right: 12, fontSize: '2rem', opacity: 0.25 }}>
            {card.icon}
        </Typography>
        {/* Gradient overlay */}
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography sx={{ color: '#F7A11A', fontSize: '1.35rem', mb: 0.25 }}>{card.icon}</Typography>
            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#fff', fontSize: '0.95rem', lineHeight: 1.3 }}>
                {card.title}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.75rem', fontFamily: 'Inter' }}>
                {card.sub}
            </Typography>
        </Box>
    </Box>
);

// Animated scrolling column
const ScrollingColumn = ({ cards, direction = 1, speed = 30 }) => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1200], [0, direction * speed * 8]);

    return (
        <motion.div style={{ y, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[...cards, ...cards].map((card, i) => (
                <HeroCard key={`${card.title}-${i}`} card={card} />
            ))}
        </motion.div>
    );
};

// Animated glowing streak
const LightStreak = ({ delay, duration, top, opacity }) => (
    <Box
        sx={{
            position: 'absolute',
            top,
            left: '-30%',
            width: '60%',
            height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(247,161,26,0.6), transparent)',
            borderRadius: 1,
            animation: `streakMove ${duration}s ${delay}s infinite linear`,
            opacity,
        }}
    />
);

const HeroSection = () => {
    const controls = useAnimation();

    useEffect(() => {
        controls.start('visible');
    }, [controls]);

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    };

    const headlines = ['We Speak', 'Your Language.'];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2E40 50%, #0F3A1A 100%)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                pt: { xs: 10, md: 4 },
                pb: { xs: 6, md: 0 },
            }}
        >
            {/* Animated light streaks */}
            {[
                { delay: 0, duration: 8, top: '15%', opacity: 0.7 },
                { delay: 2.5, duration: 11, top: '40%', opacity: 0.5 },
                { delay: 5, duration: 9, top: '65%', opacity: 0.6 },
                { delay: 1.5, duration: 13, top: '85%', opacity: 0.4 },
            ].map((s, i) => (
                <LightStreak key={i} {...s} />
            ))}

            {/* Floating particles */}
            {[...Array(12)].map((_, i) => (
                <Box
                    key={i}
                    sx={{
                        position: 'absolute',
                        width: i % 3 === 0 ? 6 : 4,
                        height: i % 3 === 0 ? 6 : 4,
                        borderRadius: '50%',
                        bgcolor: i % 2 === 0 ? 'rgba(247,161,26,0.4)' : 'rgba(26,92,42,0.4)',
                        top: `${10 + i * 7}%`,
                        left: `${5 + i * 6}%`,
                        animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
                        animationDelay: `${i * 0.4}s`,
                    }}
                />
            ))}

            {/* Green arc decoration */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-5%',
                    width: 600,
                    height: 600,
                    borderRadius: '50%',
                    border: '1px solid rgba(26,92,42,0.2)',
                    pointerEvents: 'none',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: '-30%',
                    right: '-10%',
                    width: 800,
                    height: 800,
                    borderRadius: '50%',
                    border: '1px solid rgba(247,161,26,0.08)',
                    pointerEvents: 'none',
                }}
            />

            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
                    {/* Left content */}
                    <Grid item xs={12} md={6}>
                        <motion.div variants={containerVariants} initial="hidden" animate={controls}>
                            <motion.div variants={itemVariants}>
                                <Chip
                                    icon={<TranslateIcon sx={{ fontSize: '1rem !important', color: '#F7A11A !important' }} />}
                                    label="Tanzania's Premier Language Services"
                                    sx={{
                                        bgcolor: 'rgba(247,161,26,0.12)',
                                        color: '#F7A11A',
                                        border: '1px solid rgba(247,161,26,0.3)',
                                        fontFamily: 'Outfit',
                                        fontWeight: 600,
                                        fontSize: '0.8rem',
                                        mb: 3,
                                        height: 36,
                                    }}
                                />
                            </motion.div>

                            {headlines.map((line, i) => (
                                <motion.div key={i} variants={itemVariants}>
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            color: i === 0 ? '#FFFFFF' : '#F7A11A',
                                            fontFamily: 'Outfit',
                                            fontWeight: 900,
                                            lineHeight: 1.05,
                                            mb: i === headlines.length - 1 ? 3 : 0,
                                        }}
                                    >
                                        {line}
                                    </Typography>
                                </motion.div>
                            ))}

                            <motion.div variants={itemVariants}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ color: 'rgba(255,255,255,0.7)', mb: 2, fontFamily: 'Inter', fontWeight: 300, fontSize: '1.15rem', lineHeight: 1.6 }}
                                >
                                    Precision. Culture. Trust.
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ color: 'rgba(255,255,255,0.6)', mb: 4, maxWidth: 480, lineHeight: 1.8 }}
                                >
                                    From expert document translation and conference interpretation to language training and event logistics
                                    — we bridge language barriers with unmatched professionalism across East Africa and beyond.
                                </Typography>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                    <Button
                                        component={RouterLink}
                                        to="/quote"
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className="pulse-glow"
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{ px: 4, py: 1.5, fontSize: '1rem', fontWeight: 700 }}
                                    >
                                        Get a Quote
                                    </Button>
                                    <Button
                                        component={RouterLink}
                                        to="/services"
                                        variant="outlined"
                                        size="large"
                                        sx={{
                                            color: '#fff',
                                            borderColor: 'rgba(255,255,255,0.35)',
                                            px: 4,
                                            py: 1.5,
                                            fontSize: '1rem',
                                            '&:hover': {
                                                borderColor: '#F7A11A',
                                                color: '#F7A11A',
                                                bgcolor: 'rgba(247,161,26,0.06)',
                                                transform: 'translateY(-2px)',
                                            },
                                        }}
                                    >
                                        Our Services
                                    </Button>
                                </Box>
                            </motion.div>

                            {/* Stats mini bar */}
                            <motion.div variants={itemVariants}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 4,
                                        mt: 6,
                                        pt: 3,
                                        borderTop: '1px solid rgba(255,255,255,0.1)',
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
                                                sx={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.8rem', color: '#F7A11A', lineHeight: 1 }}
                                            >
                                                {stat.val}
                                            </Typography>
                                            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontFamily: 'Inter', mt: 0.3 }}>
                                                {stat.label}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </motion.div>
                        </motion.div>
                    </Grid>

                    {/* Right: Three scrolling card columns */}
                    <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Box
                            sx={{
                                height: 540,
                                overflow: 'hidden',
                                display: 'flex',
                                gap: 2,
                                position: 'relative',
                                borderRadius: 4,
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0, left: 0, right: 0,
                                    height: 100,
                                    background: 'linear-gradient(180deg, #0D1B2A 0%, transparent 100%)',
                                    zIndex: 2,
                                    pointerEvents: 'none',
                                },
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: 0, left: 0, right: 0,
                                    height: 100,
                                    background: 'linear-gradient(0deg, #0F3A1A 0%, transparent 100%)',
                                    zIndex: 2,
                                    pointerEvents: 'none',
                                },
                            }}
                        >
                            <ScrollingColumn cards={col1} direction={-1} speed={25} />
                            <ScrollingColumn cards={col2} direction={1} speed={20} />
                            <ScrollingColumn cards={col3} direction={-1} speed={30} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)' }}
            >
                <KeyboardArrowDownIcon sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 36 }} />
            </motion.div>
        </Box>
    );
};

export default HeroSection;
