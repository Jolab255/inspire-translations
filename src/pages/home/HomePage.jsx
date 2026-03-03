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
const ServicesSection = () => (
    <Box sx={{ py: 12, bgcolor: '#FFFFFF' }}>
        <Container maxWidth="lg">
            <FadeInUp>
                <SectionTitle
                    label="What We Offer"
                    title="Comprehensive Language Services"
                    subtitle="Professional language solutions tailored for individuals, businesses, and organizations across East Africa and beyond."
                />
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

// ---- STATS SECTION ----
const StatsSection = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
    return (
        <Box
            ref={ref}
            sx={{
                py: 10,
                background: 'linear-gradient(135deg, #F7A11A 0%, #D4880E 100%)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,0,0,0.1) 0%, transparent 50%)',
                },
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={4} justifyContent="center">
                    {stats.map((stat, i) => (
                        <Grid item xs={6} md={3} key={stat.label}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                            >
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography sx={{ fontSize: '2.5rem', mb: 0.5 }}>{stat.icon}</Typography>
                                    <Typography
                                        sx={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: { xs: '2.5rem', md: '3.5rem' }, color: '#fff', lineHeight: 1 }}
                                    >
                                        {inView ? <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} /> : `0${stat.suffix}`}
                                    </Typography>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', fontFamily: 'Outfit', fontWeight: 500, mt: 0.5 }}>
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
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
        <Box
            sx={{
                py: 12,
                background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2E40 60%, #0F3A1A 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background decoration */}
            <Box sx={{ position: 'absolute', top: '10%', right: '-5%', width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(247,161,26,0.1)', pointerEvents: 'none' }} />
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <FadeInUp>
                    <SectionTitle
                        label="Why Choose Us"
                        title="Your Trusted Language Partner"
                        subtitle="We combine linguistic expertise with cutting-edge technology to deliver world-class language services."
                        dark
                    />
                </FadeInUp>
                <Grid container spacing={3}>
                    {reasons.map((r, i) => (
                        <Grid item xs={12} sm={6} md={4} key={r.title}>
                            <FadeInUp delay={i * 0.08}>
                                <Box
                                    sx={{
                                        p: 3.5,
                                        borderRadius: 3,
                                        bgcolor: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        height: '100%',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(247,161,26,0.07)',
                                            borderColor: 'rgba(247,161,26,0.25)',
                                            transform: 'translateY(-4px)',
                                        },
                                    }}
                                >
                                    <Typography sx={{ fontSize: '2.2rem', mb: 2 }}>{r.icon}</Typography>
                                    <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#F7A11A', mb: 1.5, fontSize: '1.05rem' }}>
                                        {r.title}
                                    </Typography>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                        {r.desc}
                                    </Typography>
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
        <StatsSection />
        <ServicesSection />
        <WhyUsSection />
        <ClientsSection />
        <TestimonialsSection />
        <BlogSection />
        <CTASection />
    </>
);

export default HomePage;
