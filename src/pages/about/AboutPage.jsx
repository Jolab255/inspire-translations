import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FlagIcon from '@mui/icons-material/Flag';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link as RouterLink } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';

import aboutHeroImg from '../../assets/images/about_us_hero.png';
import imgPrecision from '../../assets/images/written_translation.png';
import imgTrust from '../../assets/images/onsite_interpretation.png';
import imgRespect from '../../assets/images/language_classes.png';
import imgExcellence from '../../assets/images/conference_logistics.png';

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

// Animated Pre-Title with Sliding Line and Arrow
const AnimatedPreTitle = ({ text, color = '#F7A11A', align = 'flex-start' }) => {
    const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.6 });
    return (
        <Box ref={ref} sx={{ display: 'flex', alignItems: 'center', justifyContent: align, mb: 1, overflow: 'hidden' }}>
            <Box sx={{
                height: 2, bgcolor: color,
                width: inView ? 32 : 0,
                transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
            }} />
            <Box sx={{
                display: 'flex', alignItems: 'center',
                transform: inView ? 'translateX(0) scale(1)' : 'translateX(-20px) scale(0.6)',
                opacity: inView ? 1 : 0,
                transition: 'opacity 0.4s ease 0.45s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.45s',
                ml: 1
            }}>
                <ArrowForwardIcon sx={{ color: color, fontSize: 18 }} />
            </Box>
            <Box sx={{
                transform: inView ? 'translateY(0)' : 'translateY(8px)',
                opacity: inView ? 1 : 0,
                transition: 'opacity 0.4s ease 0.6s, transform 0.4s ease 0.6s',
                ml: 1
            }}>
                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: color, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {text}
                </Typography>
            </Box>
        </Box>
    );
};

const team = [
    { name: 'Sarah Matete', role: 'Chief Executive Officer', initials: 'SM', color: '#F7A11A', bio: 'Over 15 years in language services. Expert in East African linguistic consulting and international conference management.' },
    { name: 'David Mwanga', role: 'Head of Translation', initials: 'DM', color: '#1A5C2A', bio: 'Certified translator in 8 language pairs. Specialist in legal and technical translation with ISO qualification.' },
    { name: 'Fatuma Hassan', role: 'Operations Manager', initials: 'FH', color: '#F7A11A', bio: 'Manages project workflows and client relations. Ensures every project is delivered on time and to specification.' },
    { name: 'James Kimaro', role: 'Lead Interpreter', initials: 'JK', color: '#1A5C2A', bio: 'UN-trained conference interpreter specializing in simultaneous interpretation for international organizations.' },
];

const values = [
    { img: imgPrecision, title: 'Precision', desc: 'Every word matters. We deliver translations with exact accuracy, preserving meaning, tone, and intent.' },
    { img: imgTrust, title: 'Trust', desc: 'Confidentiality and reliability are the foundation of every client relationship we build.' },
    { img: imgRespect, title: 'Cultural Respect', desc: 'We honor the cultures behind every language, ensuring communication that resonates authentically.' },
    { img: imgExcellence, title: 'Excellence', desc: 'We hold ourselves to the highest professional standards in every project we undertake.' },
];

const AboutPage = () => {
    const { language } = useLanguage();

    const content = {
        en: {
            heroTitle: <>We Are <br /><Box component="span" sx={{ color: '#F7A11A' }}>Inspire Translations</Box></>,
            heroDesc: "Bridging language barriers with precision, cultural insight, and unwavering professionalism across East Africa and the world.",
            moreBtn: "More About Us"
        },
        sw: {
            heroTitle: <>Sisi Ni <br /><Box component="span" sx={{ color: '#F7A11A' }}>Inspire Translations</Box></>,
            heroDesc: "Kuondoa vizuizi vya lugha kwa usahihi, uelewa wa kitamaduni, na weledi usioyumba kote Afrika Mashariki na duniani.",
            moreBtn: "Zaidi Kuhusu Sisi"
        }
    };

    return (
        <>
            <SEOHead
                title="About Inspire Translations | Our Story, Mission & Team"
                description="Learn about Inspire Translations — Tanzania's trusted language services company. Discover our story, mission, vision, and the expert team behind our work."
                canonicalUrl="https://inspiretranslations.co.tz/about"
            />

            {/* Page Hero - Split Layout */}
            <Box sx={{
                minHeight: { xs: 'auto', md: '75vh' },
                display: 'flex',
                alignItems: 'stretch',
                flexDirection: { xs: 'column', md: 'row' },
                background: 'linear-gradient(135deg, #1A5C2A 0%, #0D2B14 100%)',
                position: 'relative'
            }}>
                {/* Left Content (60%) */}
                <Box sx={{
                    width: { xs: '100%', md: '60%' },
                    display: 'flex',
                    alignItems: 'center',
                    px: { xs: 4, sm: 8, md: 12 },
                    py: { xs: 16, md: 20 },
                    position: 'relative',
                    zIndex: 2
                }}>
                    <Box>
                        <Typography variant="h1" sx={{ color: '#FFFFFF', fontWeight: 900, mb: 3, fontSize: { xs: '2.5rem', md: '4rem' }, lineHeight: 1.1 }}>
                            {content[language].heroTitle}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: 600, lineHeight: 1.8, mb: 4 }}>
                            {content[language].heroDesc}
                        </Typography>
                        <Box
                            component="a"
                            href="#story"
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                border: '2px solid #F7A11A',
                                borderRadius: 50,
                                overflow: 'hidden',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    // No color changes on hover, only animation
                                }
                            }}
                        >
                            <Typography
                                component="span"
                                sx={{
                                    color: '#F7A11A',
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
                                {content[language].moreBtn}
                            </Typography>
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    flexShrink: 0,
                                    bgcolor: '#F7A11A',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Box>
                                    <ArrowForwardIcon sx={{ color: '#1A5C2A', fontSize: 16 }} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Right Image (40%) */}
                <Box sx={{
                    width: { xs: '100%', md: '40%' },
                    minHeight: { xs: '400px', md: 'auto' },
                    position: 'relative',
                    boxShadow: '-10px 0 30px rgba(0,0,0,0.2)',
                    overflow: 'hidden',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3))',
                        zIndex: 2
                    }
                }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            background: `url(${aboutHeroImg}) center/cover no-repeat`,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 1,
                        }}
                    />
                </Box>
            </Box>

            {/* Our Story */}
            <Box id="story" sx={{ py: 12, bgcolor: '#fff' }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'left', mb: 6 }}>
                        <AnimatedPreTitle text="Our Story" color="#F7A11A" />
                        <TypewriterText
                            text="Born from a Passion for Language"
                            variant="h2"
                            sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: { xs: '2rem', md: '2.6rem' }, color: '#0D2B14', lineHeight: 1.15, mb: 3 }}
                        />
                        <Box sx={{ width: 56, height: 4, bgcolor: '#F7A11A', mb: 3 }} />
                    </Box>

                    <Box sx={{
                        bgcolor: '#F7A11A',
                        borderRadius: 0,
                        p: { xs: 3, md: 5, lg: 6 },
                        mb: 8,
                        position: 'relative',
                        boxShadow: '0 20px 40px rgba(247,161,26,0.15)',
                    }}>
                        <Typography sx={{ color: '#0D2B14', fontFamily: '"Inknut Antiqua", serif', fontSize: { xs: '1rem', md: '1.05rem' }, lineHeight: 1.8, mb: 2.5, fontWeight: 500 }}>
                            Inspire Translations was founded with a simple but powerful belief: that effective communication across languages and cultures is a fundamental right for every individual and organization.
                        </Typography>
                        <Typography sx={{ color: '#0D2B14', fontFamily: '"Inknut Antiqua", serif', fontSize: { xs: '1rem', md: '1.05rem' }, lineHeight: 1.8, mb: 2.5, fontWeight: 500 }}>
                            Starting as a small team of passionate linguists in Dar es Salaam, we have grown into one of Tanzania's most trusted language services companies, serving international organizations, government agencies, multinational corporations, and SMEs alike.
                        </Typography>
                        <Typography sx={{ color: '#0D2B14', fontFamily: '"Inknut Antiqua", serif', fontSize: { xs: '1rem', md: '1.05rem' }, lineHeight: 1.8, mb: 3.5, fontWeight: 500 }}>
                            Today, our network of certified translators, interpreters, and language instructors covers 25+ language pairs, with a proven track record of excellence and client satisfaction.
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ width: 40, height: 3, bgcolor: '#0D2B14' }} />
                            <Box>
                                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#0D2B14', fontSize: '1.05rem' }}>
                                    Dr. Willson John
                                </Typography>
                                <Typography sx={{ fontFamily: 'Outfit', fontWeight: 600, color: '#0D2B14', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8 }}>
                                    Founder
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

                    <Box sx={{ mt: 10, mb: 0 }}>
                        <Box sx={{ textAlign: 'left', mb: 8 }}>
                            <AnimatedPreTitle text="Our Purpose" color="#1A5C2A" align="flex-start" />
                            <TypewriterText
                                text="Mission and Vision"
                                variant="h2"
                                sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: { xs: '2rem', md: '2.6rem' }, color: '#0D2B14', lineHeight: 1.15, mb: 3 }}
                            />
                            <Box sx={{ width: 56, height: 4, bgcolor: '#1A5C2A' }} />
                        </Box>
            <Box sx={{
                py: 12,
                position: 'relative',
                background: `url(${aboutHeroImg}) center/cover no-repeat fixed`,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    bgcolor: 'rgba(13, 43, 20, 0.92)',
                    zIndex: 1
                }
            }}>
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Box sx={{ textAlign: 'left', mb: 8 }}>
                        <AnimatedPreTitle text="Our Purpose" color="#F7A11A" align="flex-start" />
                        <TypewriterText
                            text="Mission and Vision"
                            variant="h2"
                            sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: { xs: '2rem', md: '2.6rem' }, color: '#FFFFFF', lineHeight: 1.15, mb: 3 }}
                        />
                        <Box sx={{ width: 56, height: 4, bgcolor: '#F7A11A' }} />
                    </Box>

                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: { xs: 4, md: 8 } }}>
                            {[
                                { icon: <TrackChangesIcon sx={{ fontSize: 36, color: '#fff' }} />, title: 'Our Mission', desc: 'To deliver exceptional language services that empower clients to communicate effectively and respectfully across all cultures.', iconBg: '#1A5C2A', align: 'left' },
                                { icon: <VisibilityIcon sx={{ fontSize: 36, color: '#fff' }} />, title: 'Our Vision', desc: 'To be East Africa\'s foremost language services provider, fostering global connections through precision and cultural intelligence.', iconBg: '#F7A11A', align: 'left' },
                            ].map((item, index) => (
                                <Box key={item.title} sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: { xs: 4, md: 8 } }}>
                        {[
                            { icon: <TrackChangesIcon sx={{ fontSize: 36, color: '#fff' }} />, title: 'Our Mission', desc: 'To deliver exceptional language services that empower clients to communicate effectively and respectfully across all cultures.', iconBg: '#1A5C2A', align: 'left' },
                            { icon: <VisibilityIcon sx={{ fontSize: 36, color: '#fff' }} />, title: 'Our Vision', desc: 'To be East Africa\'s foremost language services provider, fostering global connections through precision and cultural intelligence.', iconBg: '#F7A11A', align: 'left' },
                        ].map((item, index) => (
                            <Box key={item.title} sx={{ display: 'flex' }}>
                                <Box sx={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    pt: 6, pb: 4, px: { xs: 3, md: 5 },
                                    borderRadius: 0,
                                    bgcolor: '#fff',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                                    height: '100%',
                                    position: 'relative',
                                    textAlign: { xs: 'center', md: item.align },
                                    mt: { xs: 5, md: 6 }
                                }}>
                                    {/* Half-in, half-out overlapping icon */}
                                    <Box sx={{
                                        width: '100%',
                                        position: 'absolute',
                                        top: -45,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        '@media (min-width: 900px)': {
                                            left: item.align === 'left' ? 40 : 'auto',
                                            right: item.align === 'right' ? 40 : 'auto',
                                            transform: 'none'
                                        },
                                        width: 90,
                                        height: 90,
                                        borderRadius: 0,
                                        bgcolor: item.iconBg,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        pt: 6, pb: 4, px: { xs: 3, md: 5 },
                                        borderRadius: 0,
                                        bgcolor: 'transparent',
                                        border: '2px solid #0D2B14',
                                        boxShadow: 'none',
                                        height: '100%',
                                        position: 'relative',
                                        textAlign: { xs: 'center', md: item.align },
                                        mt: { xs: 5, md: 6 }
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: `0 12px 24px ${item.iconBg}40`,
                                        border: '4px solid #fff'
                                    }}>
                                        {/* Half-in, half-out overlapping icon */}
                                        <Box sx={{
                                            position: 'absolute',
                                            top: -45,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            '@media (min-width: 900px)': {
                                                left: item.align === 'left' ? 40 : 'auto',
                                                right: item.align === 'right' ? 40 : 'auto',
                                                transform: 'none'
                                            },
                                            width: 90,
                                            height: 90,
                                            borderRadius: 0,
                                            bgcolor: item.iconBg,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: `0 12px 24px ${item.iconBg}40`,
                                            border: '4px solid #0D2B14'
                                        }}>
                                            {item.icon}
                                        </Box>
                                        {item.icon}
                                    </Box>

                                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 800, fontSize: { xs: '1.25rem', md: '1.6rem' }, color: '#0D2B14', mb: 2.5 }}>
                                            {item.title}
                                        </Typography>
                                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', color: '#0D2B14', lineHeight: 1.8, fontSize: { xs: '0.9rem', md: '1.1rem' }, flexGrow: 1 }}>
                                            {item.desc}
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 800, fontSize: { xs: '1.25rem', md: '1.6rem' }, color: '#0D2B14', mb: 2.5 }}>
                                        {item.title}
                                    </Typography>
                                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', color: '#0D2B14', lineHeight: 1.8, fontSize: { xs: '0.9rem', md: '1.1rem' }, flexGrow: 1 }}>
                                        {item.desc}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* Our Values */}
            <Box sx={{ position: 'relative', pt: 8, pb: 14, minHeight: '100vh' }}>
                {/* Background Split Layer */}
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60vh', bgcolor: '#FFFFFF', zIndex: 0 }} />
                <Box sx={{ position: 'absolute', top: '60vh', bottom: 0, left: 0, right: 0, minHeight: '40vh', bgcolor: '#1A5C2A', zIndex: 0 }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ textAlign: 'left', mb: 7 }}>
                        <AnimatedPreTitle text="Our Values" color="#F7A11A" align="flex-start" />
                        <TypewriterText
                            text="What Drives Us"
                            variant="h2"
                            sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: { xs: '2rem', md: '2.6rem' }, color: '#0D2B14', lineHeight: 1.15, mb: 2 }}
                        />
                        <Box sx={{ width: 56, height: 4, bgcolor: '#F7A11A', mb: 3 }} />
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 4 }}>
                        {values.map((v, i) => (
                            <Box key={v.title} sx={{ textAlign: 'left', border: '3px solid #FFFFFF', p: { xs: 2, md: 3 } }}>
                                <Box
                                    component="img"
                                    src={v.img}
                                    alt={v.title}
                                    sx={{ width: '100%', height: 260, objectFit: 'cover', mb: 3, filter: 'contrast(1.1)' }}
                                />
                                <Typography sx={{ fontFamily: 'Outfit', fontWeight: 800, color: '#F7A11A', fontSize: '1.2rem', mb: 1, letterSpacing: '0.05em' }}>
                                    0{i + 1} /
                                </Typography>
                                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#FFFFFF', mb: 1.5, fontSize: '1.2rem', lineHeight: 1.3 }}>
                                    {v.title}
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                                    {v.desc}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* Team */}
            <Box sx={{ py: 12, bgcolor: '#fff' }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 7 }}>
                        <AnimatedPreTitle text="Our Team" color="#1A5C2A" align="center" />
                        <TypewriterText
                            text="Meet the Experts"
                            variant="h2"
                            sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: { xs: '2rem', md: '2.6rem' }, color: '#0D2B14', lineHeight: 1.15, mb: 2 }}
                        />
                        <Box sx={{ width: 56, height: 4, bgcolor: '#1A5C2A', mx: 'auto', mb: 3 }} />
                        <Typography sx={{ color: '#4A4A6A', maxWidth: 480, mx: 'auto', mt: 2, lineHeight: 1.8 }}>
                            Our diverse team of certified linguists, interpreters, and language professionals.
                        </Typography>
                    </Box>
                    <Grid container spacing={4}>
                        {team.map((member, i) => (
                            <Grid item xs={12} sm={6} md={3} key={member.name}>
                                <Box sx={{ textAlign: 'center', p: 3, bgcolor: '#F8F9FA', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 16px 40px rgba(0,0,0,0.1)' } }}>
                                    <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: member.color, fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.4rem', boxShadow: `0 8px 24px ${member.color}40` }}>
                                        {member.initials}
                                    </Avatar>
                                    <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', fontSize: '1rem', mb: 0.5 }}>{member.name}</Typography>
                                    <Typography sx={{ color: member.color, fontSize: '0.8rem', fontFamily: 'Outfit', fontWeight: 600, mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{member.role}</Typography>
                                    <Divider sx={{ mb: 1.5 }} />
                                    <Typography sx={{ color: '#4A4A6A', fontSize: '0.85rem', lineHeight: 1.7 }}>{member.bio}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* CTA */}
            <Box sx={{ py: 8, background: 'linear-gradient(135deg, #F7A11A 0%, #D4880E 100%)', textAlign: 'center' }}>
                <Container maxWidth="md">
                    <Typography variant="h3" sx={{ color: '#fff', fontWeight: 800, mb: 2 }}>Ready to Work With Us?</Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.85)', mb: 4, lineHeight: 1.8 }}>
                        Let's discuss how Inspire Translations can support your language needs.
                    </Typography>
                    <Button component={RouterLink} to="/contact" variant="contained" size="large" sx={{ bgcolor: '#fff', color: '#F7A11A', fontWeight: 700, px: 5, '&:hover': { bgcolor: 'rgba(255,255,255,0.9)', transform: 'translateY(-2px)' }, boxShadow: 'none' }} endIcon={<ArrowForwardIcon />}>
                        Contact Us Today
                    </Button>
                </Container>
            </Box>
        </>
    );
};

export default AboutPage;
