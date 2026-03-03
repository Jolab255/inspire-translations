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
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link as RouterLink } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';

const FadeInUp = ({ children, delay = 0 }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
            {children}
        </motion.div>
    );
};

const team = [
    { name: 'Sarah Matete', role: 'Chief Executive Officer', initials: 'SM', color: '#F7A11A', bio: 'Over 15 years in language services. Expert in East African linguistic consulting and international conference management.' },
    { name: 'David Mwanga', role: 'Head of Translation', initials: 'DM', color: '#1A5C2A', bio: 'Certified translator in 8 language pairs. Specialist in legal and technical translation with ISO qualification.' },
    { name: 'Fatuma Hassan', role: 'Operations Manager', initials: 'FH', color: '#F7A11A', bio: 'Manages project workflows and client relations. Ensures every project is delivered on time and to specification.' },
    { name: 'James Kimaro', role: 'Lead Interpreter', initials: 'JK', color: '#1A5C2A', bio: 'UN-trained conference interpreter specializing in simultaneous interpretation for international organizations.' },
];

const values = [
    { emoji: '🎯', title: 'Precision', desc: 'Every word matters. We deliver translations with exact accuracy, preserving meaning, tone, and intent.' },
    { emoji: '🤝', title: 'Trust', desc: 'Confidentiality and reliability are the foundation of every client relationship we build.' },
    { emoji: '🌍', title: 'Cultural Respect', desc: 'We honor the cultures behind every language, ensuring communication that resonates authentically.' },
    { emoji: '⚡', title: 'Excellence', desc: 'We hold ourselves to the highest professional standards in every project we undertake.' },
];

const AboutPage = () => (
    <>
        <SEOHead
            title="About Inspire Translations | Our Story, Mission & Team"
            description="Learn about Inspire Translations — Tanzania's trusted language services company. Discover our story, mission, vision, and the expert team behind our work."
            canonicalUrl="https://inspiretranslations.co.tz/about"
        />

        {/* Page Hero */}
        <Box sx={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2E40 60%, #0F3A1A 100%)', py: { xs: 10, md: 14 }, position: 'relative', overflow: 'hidden' }}>
            {[...Array(6)].map((_, i) => (
                <Box key={i} sx={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', bgcolor: 'rgba(247,161,26,0.4)', top: `${15 + i * 15}%`, left: `${10 + i * 13}%`, animation: `float ${3 + i % 2}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }} />
            ))}
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                    <Chip label="About Us" sx={{ bgcolor: 'rgba(247,161,26,0.15)', color: '#F7A11A', border: '1px solid rgba(247,161,26,0.3)', fontFamily: 'Outfit', fontWeight: 600, mb: 3 }} />
                    <Typography variant="h1" sx={{ color: '#FFFFFF', fontWeight: 900, mb: 3 }}>
                        We Are <Box component="span" sx={{ color: '#F7A11A' }}>Inspire Translations</Box>
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: 600, mx: 'auto', lineHeight: 1.8 }}>
                        Bridging language barriers with precision, cultural insight, and unwavering professionalism across East Africa and the world.
                    </Typography>
                </motion.div>
            </Container>
        </Box>

        {/* Our Story */}
        <Box sx={{ py: 12, bgcolor: '#fff' }}>
            <Container maxWidth="lg">
                <Grid container spacing={8} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <FadeInUp>
                            <Chip label="Our Story" sx={{ bgcolor: 'rgba(247,161,26,0.1)', color: '#F7A11A', fontFamily: 'Outfit', fontWeight: 600, mb: 2, border: '1px solid rgba(247,161,26,0.2)' }} />
                            <Typography variant="h2" sx={{ color: '#1A1A2E', fontWeight: 800, mb: 3 }}>
                                Born from a Passion for Language
                            </Typography>
                            <Typography sx={{ color: '#4A4A6A', lineHeight: 1.9, mb: 3 }}>
                                Inspire Translations was founded with a simple but powerful belief: that effective communication across languages and cultures is a fundamental right for every individual and organization.
                            </Typography>
                            <Typography sx={{ color: '#4A4A6A', lineHeight: 1.9, mb: 3 }}>
                                Starting as a small team of passionate linguists in Dar es Salaam, we have grown into one of Tanzania's most trusted language services companies, serving international organizations, government agencies, multinational corporations, and SMEs alike.
                            </Typography>
                            <Typography sx={{ color: '#4A4A6A', lineHeight: 1.9 }}>
                                Today, our network of certified translators, interpreters, and language instructors covers 25+ language pairs, with a proven track record of excellence and client satisfaction.
                            </Typography>
                        </FadeInUp>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FadeInUp delay={0.2}>
                            <Grid container spacing={2}>
                                {[
                                    { icon: <VisibilityIcon sx={{ fontSize: 32, color: '#F7A11A' }} />, title: 'Our Vision', desc: 'To be East Africa\'s foremost language services provider, fostering global connections through precision and cultural intelligence.', bg: 'rgba(247,161,26,0.06)', border: 'rgba(247,161,26,0.2)' },
                                    { icon: <FlagIcon sx={{ fontSize: 32, color: '#1A5C2A' }} />, title: 'Our Mission', desc: 'To deliver exceptional language services that empower clients to communicate effectively and respectfully across all cultures.', bg: 'rgba(26,92,42,0.06)', border: 'rgba(26,92,42,0.2)' },
                                ].map((item) => (
                                    <Grid item xs={12} key={item.title}>
                                        <Box sx={{ p: 3.5, borderRadius: 3, bgcolor: item.bg, border: `1px solid ${item.border}` }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                                                {item.icon}
                                                <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.15rem', color: '#1A1A2E' }}>{item.title}</Typography>
                                            </Box>
                                            <Typography sx={{ color: '#4A4A6A', lineHeight: 1.8 }}>{item.desc}</Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </FadeInUp>
                    </Grid>
                </Grid>
            </Container>
        </Box>

        {/* Our Values */}
        <Box sx={{ py: 10, bgcolor: '#F8F9FA' }}>
            <Container maxWidth="lg">
                <FadeInUp><Box sx={{ textAlign: 'center', mb: 7 }}>
                    <Chip label="Our Values" sx={{ bgcolor: 'rgba(247,161,26,0.1)', color: '#F7A11A', fontFamily: 'Outfit', fontWeight: 600, mb: 2, border: '1px solid rgba(247,161,26,0.2)' }} />
                    <Typography variant="h2" sx={{ color: '#1A1A2E', fontWeight: 800 }}>What Drives Us</Typography>
                </Box></FadeInUp>
                <Grid container spacing={3}>
                    {values.map((v, i) => (
                        <Grid item xs={12} sm={6} md={3} key={v.title}>
                            <FadeInUp delay={i * 0.1}>
                                <Box sx={{ textAlign: 'center', p: 4, bgcolor: '#fff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 16px 48px rgba(0,0,0,0.1)' } }}>
                                    <Typography sx={{ fontSize: '2.5rem', mb: 2 }}>{v.emoji}</Typography>
                                    <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', mb: 1.5, fontSize: '1.1rem' }}>{v.title}</Typography>
                                    <Typography sx={{ color: '#4A4A6A', fontSize: '0.9rem', lineHeight: 1.7 }}>{v.desc}</Typography>
                                </Box>
                            </FadeInUp>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>

        {/* Team */}
        <Box sx={{ py: 12, bgcolor: '#fff' }}>
            <Container maxWidth="lg">
                <FadeInUp><Box sx={{ textAlign: 'center', mb: 7 }}>
                    <Chip label="Our Team" sx={{ bgcolor: 'rgba(26,92,42,0.1)', color: '#1A5C2A', fontFamily: 'Outfit', fontWeight: 600, mb: 2, border: '1px solid rgba(26,92,42,0.2)' }} />
                    <Typography variant="h2" sx={{ color: '#1A1A2E', fontWeight: 800 }}>Meet the Experts</Typography>
                    <Typography sx={{ color: '#4A4A6A', maxWidth: 480, mx: 'auto', mt: 2, lineHeight: 1.8 }}>
                        Our diverse team of certified linguists, interpreters, and language professionals.
                    </Typography>
                </Box></FadeInUp>
                <Grid container spacing={4}>
                    {team.map((member, i) => (
                        <Grid item xs={12} sm={6} md={3} key={member.name}>
                            <FadeInUp delay={i * 0.1}>
                                <Box sx={{ textAlign: 'center', p: 3, bgcolor: '#F8F9FA', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 16px 40px rgba(0,0,0,0.1)' } }}>
                                    <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: member.color, fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.4rem', boxShadow: `0 8px 24px ${member.color}40` }}>
                                        {member.initials}
                                    </Avatar>
                                    <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', fontSize: '1rem', mb: 0.5 }}>{member.name}</Typography>
                                    <Typography sx={{ color: member.color, fontSize: '0.8rem', fontFamily: 'Outfit', fontWeight: 600, mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{member.role}</Typography>
                                    <Divider sx={{ mb: 1.5 }} />
                                    <Typography sx={{ color: '#4A4A6A', fontSize: '0.85rem', lineHeight: 1.7 }}>{member.bio}</Typography>
                                </Box>
                            </FadeInUp>
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

export default AboutPage;
