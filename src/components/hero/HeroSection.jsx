import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import VerifiedIcon from '@mui/icons-material/Verified';
import GroupsIcon from '@mui/icons-material/Groups';
import LanguageIcon from '@mui/icons-material/Language';
import TranslateIcon from '@mui/icons-material/Translate';

// Import the video
import heroBg from '../../assets/videos/hero_bg.mp4';
import heroWoman from '../../assets/images/hero_woman_bg.png';



// ── Main Hero ─────────────────────────────────────────────────────────
const KEYWORDS = [
    "Translation",
    "Interpretation",
    "Localization",
    "Language Classes",
    "Event Logistics",
];

const HeroSection = () => {
    const videoRef = useRef(null);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(120);

    useEffect(() => {
        let timer = setTimeout(() => {
            handleType();
        }, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed]);

    const handleType = () => {
        const i = loopNum % KEYWORDS.length;
        const fullText = KEYWORDS[i];

        setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

        if (!isDeleting && text === fullText) {
            setTimeout(() => setIsDeleting(true), 1500); // Pause before deleting
            setTypingSpeed(50); // Delete faster
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setTypingSpeed(120); // Type normal speed
        }
    };

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '85vh',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            {/* ── Background video ── */}
            <Box
                sx={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
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
            </Box>

            {/* ── Main content ── */}
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pt: { xs: 8, md: 2 }, pb: { xs: 10, md: 2 } }}>
                <Grid container>
                    <Grid item xs={12} md={8} lg={7}>
                        {/* Headline & Typewriter (Stable Height) */}
                        <Box sx={{ minHeight: { xs: 110, md: 170 }, mb: 4 }}>
                            <Typography
                                component="h1"
                                sx={{
                                    fontFamily: '"Playfair Display", serif',
                                    fontWeight: 700,
                                    fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)',
                                    lineHeight: 1.05,
                                    color: '#FFFFFF',
                                    mb: 0.5,
                                    textShadow: '0 2px 24px rgba(0,0,0,0.4)',
                                }}
                            >
                                Seamless <span style={{ color: '#F7A11A' }}>{text}</span>
                                <span style={{ borderRight: '3px solid #F7A11A', animation: 'blink 1s step-end infinite' }}>&nbsp;</span>
                            </Typography>

                            <Typography
                                component="div"
                                sx={{
                                    fontFamily: '"Playfair Display", serif',
                                    fontWeight: 700,
                                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                    lineHeight: 1.05,
                                    color: '#FFFFFF',
                                    textShadow: '0 2px 24px rgba(0,0,0,0.4)',
                                }}
                            >
                                Services in Africa.
                            </Typography>
                        </Box>

                        {/* Tagline */}
                        <Typography
                            sx={{
                                color: '#F7A11A',
                                fontSize: '1.05rem',
                                fontFamily: 'Inter',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                mb: 1.5,
                                fontWeight: 600,
                            }}
                        >
                            <span style={{ color: '#FFFFFF' }}>Accurate</span> · <span style={{ color: '#FFFFFF' }}>Reliable</span> · <span style={{ color: '#FFFFFF' }}>Native Experts</span>
                        </Typography>

                        {/* Sub-description */}
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
                            We provide expert document translation, professional conference interpretation, and local language classes in Tanzania and across East Africa. Communicate with confidence and clarity.
                        </Typography>

                        {/* CTA Buttons */}
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

                    </Grid>
                </Grid>
            </Container>

            {/* ── Hero Woman Image (Right Side) ── */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'absolute',
                    right: { md: -40, lg: 0 },
                    bottom: 0,
                    width: { md: '46%', lg: '44%' },
                    maxHeight: '90%',
                    overflow: 'hidden',
                    zIndex: 1200,
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'flex-end',
                }}
            >
                {/* Soft golden glow beneath the figure */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '5%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60%',
                        height: 80,
                        background: 'radial-gradient(ellipse at center, rgba(247,161,26,0.35) 0%, transparent 70%)',
                        filter: 'blur(20px)',
                        zIndex: 1,
                    }}
                />
                <Box
                    component="img"
                    src={heroWoman}
                    alt="Professional translator"
                    sx={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        mixBlendMode: 'screen',
                        filter: 'drop-shadow(0 0 40px rgba(247,161,26,0.2))',
                        animation: 'heroFadeIn 1.2s ease-out forwards',
                        opacity: 0,
                        '@keyframes heroFadeIn': {
                            from: { opacity: 0, transform: 'translateY(20px)' },
                            to: { opacity: 1, transform: 'translateY(0)' },
                        },
                    }}
                />
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 32,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1.5,
                }}
            >
                <Box sx={{ width: 1, height: 40, bgcolor: 'rgba(255,255,255,0.35)', borderRadius: 1 }} />
                <KeyboardArrowDownIcon sx={{ color: 'rgba(255,255,255,0.45)', fontSize: 28 }} />
            </Box>
        </Box>
    );
};

export default HeroSection;
