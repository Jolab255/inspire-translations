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
import GroupsIcon from '@mui/icons-material/Groups';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link as RouterLink } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';

import aboutHeroImg from '../../assets/images/about_us_hero.png';
import imgPrecision from '../../assets/images/written_translation.png';
import imgTrust from '../../assets/images/onsite_interpretation.png';
import imgRespect from '../../assets/images/language_classes.png';
import imgExcellence from '../../assets/images/conference_logistics.png';

// Team Images
import photoNeema from '../../assets/images/Neema Prosper.png';
import photoDavid from '../../assets/images/David Kazi.png';
import photoEnos from '../../assets/images/Enos Praygod.png';
import photoNdeigu from '../../assets/images/ndeigu Mafwele.png';
import photoAbout from '../../assets/images/about_us_photo.png';
import photoCustomer from '../../assets/images/customer_care.png';
import photoCTA from '../../assets/images/CTA.png';
import ctaImage from '../../assets/images/CTA.png';

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

// Fade In Up helper
const FadeInUp = ({ children, delay = 0 }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
            {children}
        </motion.div>
    );
};

const team = [
    { name: 'Sarah Matete', role: { en: 'Chief Executive Officer', sw: 'Afisa Mtendaji Mkuu' }, image: photoNeema, initials: 'SM' },
    { name: 'David Mwanga', role: { en: 'Head of Translation', sw: 'Mkuu wa Tafsiri' }, image: photoDavid, initials: 'DM' },
    { name: 'Fatuma Hassan', role: { en: 'Operations Manager', sw: 'Meneja wa Uendeshaji' }, image: photoCTA, initials: 'FH' },
    { name: 'James Kimaro', role: { en: 'Lead Interpreter', sw: 'Mkalimani Kiongozi' }, image: photoEnos, initials: 'JK' },
    { name: 'Grace Mussa', role: { en: 'Language Consultant', sw: 'Mshauri wa Lugha' }, image: photoNdeigu, initials: 'GM' },
    { name: 'Peter John', role: { en: 'Project Coordinator', sw: 'Mratibu wa Miradi' }, image: photoAbout, initials: 'PJ' },
    { name: 'Anna Robert', role: { en: 'Client Success', sw: 'Mafanikio ya Wateja' }, image: photoCustomer, initials: 'AR' }
];

const Hexagon = ({ member, t, delay = 0, x = 0, y = 0 }) => {
    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, x, y, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
                duration: 0.8, 
                delay, 
                ease: [0.22, 1, 0.36, 1],
                scale: { duration: 0.5, delay }
            }}
            sx={{
                width: { xs: 140, sm: 170, md: 150, lg: 180 },
                height: { xs: 160, sm: 196, md: 172, lg: 208 },
                position: 'relative',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                bgcolor: '#FFFFFF', // White border
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3px',
                transition: 'transform 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-10px) scale(1.05)',
                    zIndex: 20,
                    '& .member-overlay': { opacity: 1 }
                }
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    bgcolor: '#FFFFFF', // Inner background is white
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative'
                }}
            >
                <Box
                    component="img"
                    src={member.image}
                    alt={member.name}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top'
                    }}
                />
                
                {/* Member Info Overlay */}
                <Box
                    className="member-overlay"
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'rgba(26, 92, 42, 0.9)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        p: 2,
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        zIndex: 2
                    }}
                >
                    <Typography sx={{ color: '#F7A11A', fontFamily: 'Outfit', fontWeight: 700, fontSize: { xs: '0.8rem', sm: '0.9rem' }, mb: 0.5 }}>
                        {member.name}
                    </Typography>
                    <Typography sx={{ color: '#FFF', fontFamily: 'Outfit', fontWeight: 500, fontSize: { xs: '0.65rem', sm: '0.75rem' }, textTransform: 'uppercase' }}>
                        {t(member.role)}
                    </Typography>
                </Box>
            </Box>
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
                        <Box component={motion.div} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} style={{ height: '100%' }}>
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
                        </Box>
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
                        <Box component={motion.div} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
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

                            {/* Yellow Pill Arrow Button */}
                                <Box
                                    component={motion(RouterLink)}
                                    whileHover="hover"
                                    initial="rest"
                                    animate="rest"
                                    to={`/${language}/contact`}
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        border: '2px solid #F7A11A',
                                        borderRadius: 50,
                                        overflow: 'hidden',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease',
                                        bgcolor: 'transparent',
                                        '&:hover': { bgcolor: 'rgba(247, 161, 26, 0.04)' }
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
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

const values = [
    { img: imgPrecision, title: { en: 'Precision', sw: 'Usahihi' }, desc: { en: 'Every word matters. We deliver translations with exact accuracy, preserving meaning, tone, and intent.', sw: 'Kila neno ni muhimu. Tunatoa tafsiri kwa usahihi kabisa, tukihifadhi maana, sauti, na dhumuni.' } },
    { img: imgTrust, title: { en: 'Trust', sw: 'Imani' }, desc: { en: 'Confidentiality and reliability are the foundation of every client relationship we build.', sw: 'Usiri na uaminifu ndio msingi wa kila uhusiano wa mteja tunaoujenga.' } },
    { img: imgRespect, title: { en: 'Cultural Respect', sw: 'Heshima ya Kitamaduni' }, desc: { en: 'We honor the cultures behind every language, ensuring communication that resonates authentically.', sw: 'Tunahishimu tamaduni nyuma ya kila lugha, tukihakikisha mawasiliano yanayochochea uhalisia.' } },
    { img: imgExcellence, title: { en: 'Excellence', sw: 'Ubora' }, desc: { en: 'We hold ourselves to the highest professional standards in every project we undertake.', sw: 'Tunajiwekea viwango vya juu vya kitaaluma katika kila mradi tunaoutekeleza.' } },
];

const AboutPage = () => {
    const { language, t } = useLanguage();
    const ui = uiTranslations[language];

    const content = {
        en: {
            heroTitle: <>We Are <br /><Box component="span" sx={{ color: '#F7A11A' }}>Inspire Translations</Box></>,
            heroDesc: "Bridging language barriers with precision, cultural insight, and unwavering professionalism across East Africa and the world.",
            moreBtn: "More About Us",
            ourStory: "Our Story",
            storyTitle: "Born from a Passion for Language",
            storyP1: "Inspire Translations was founded with a simple but powerful belief: that effective communication across languages and cultures is a fundamental right for every individual and organization.",
            storyP2: "Starting as a small team of passionate linguists in Dar es Salaam, we have grown into one of Tanzania's most trusted language services companies, serving international organizations, government agencies, multinational corporations, and SMEs alike.",
            storyP3: "Today, our network of certified translators, interpreters, and language instructors covers 25+ language pairs, with a proven track record of excellence and client satisfaction.",
            missionTitle: "Mission and Vision",
            mission: "Our Mission",
            missionDesc: "To deliver exceptional language services that empower clients to communicate effectively and respectfully across all cultures.",
            vision: "Our Vision",
            visionDesc: "To be East Africa's foremost language services provider, fostering global connections through precision and cultural intelligence.",
            valuesTitle: "What Drives Us",
            meetExperts: "Meet the Experts",
            readyToWork: "Ready to Work With Us?",
            workDesc: "Let's discuss how Inspire Translations can support your language needs.",
            contactBtn: "Contact Us Today",
            seeMoreTeam: "See more of our team"
        },
        sw: {
            heroTitle: <>Sisi Ni <br /><Box component="span" sx={{ color: '#F7A11A' }}>Inspire Translations</Box></>,
            heroDesc: "Kuondoa vizuizi vya lugha kwa usahihi, uelewa wa kitamaduni, na weledi usioyumba kote Afrika Mashariki na duniani.",
            moreBtn: "Zaidi Kuhusu Sisi",
            ourStory: "Habari Yetu",
            storyTitle: "Tulizaliwa kutokana na Mapenzi ya Lugha",
            storyP1: "Inspire Translations ilianzishwa kwa imani rahisi lakini yenye nguvu: kwamba mawasiliano ya ufanisi katika lugha na tamaduni mbalimbali ni haki ya msingi kwa kila mtu na shirika.",
            storyP2: "Tukianza kama timu ndogo ya wanaisimu wenye shauku jijini Dar es Salaam, tumekua na kuwa miongoni mwa makampuni ya huduma za lugha yanayoaminika zaidi Tanzania, tukihudumia mashirika ya kimataifa, taasisi za serikali, makampuni ya kimataifa, na biashara ndogo na za kati.",
            storyP3: "Leo, mtandao wetu wa watafsiri walioidhinishwa, wakalimani, na walimu wa lugha unajumuisha zaidi ya jozi 25 za lugha, tukiwa na rekodi iliyothibitishwa ya ubora na kuridhika kwa wateja.",
            missionTitle: "Dhamira na Maono",
            mission: "Dhamira Yetu",
            missionDesc: "Kutoa huduma za lugha za kipekee zinazowawezesha wateja kuwasiliana kwa ufanisi na kwa heshima katika tamaduni zote.",
            vision: "Maono Yetu",
            visionDesc: "Kuwa mtoa huduma bora wa lugha Afrika Mashariki, tukikuza miunganisho ya kimataifa kupitia usahihi na akili ya kitamaduni.",
            valuesTitle: "Kinachotuongoza",
            meetExperts: "Kutana na Wataalamu",
            readyToWork: "Uko Tayari Kufanya Kazi Nasi?",
            workDesc: "Tujadili jinsi Inspire Translations inavyoweza kusaidia mahitaji yako ya lugha.",
            contactBtn: "Wasiliana Nasi Leo",
            seeMoreTeam: "Angalia timu yetu zaidi"
        }
    };

    const c = content[language];

    return (
        <>
            <SEOHead
                title={language === 'en' ? "About Inspire Translations | Our Story, Mission & Team" : "Kuhusu Inspire Translations | Habari Yetu, Dhamira na Timu"}
                description={c.heroDesc}
            />

            {/* Page Hero */}
            <Box sx={{
                minHeight: { xs: 'auto', md: '75vh' },
                display: 'flex',
                alignItems: 'stretch',
                flexDirection: { xs: 'column', md: 'row' },
                background: 'linear-gradient(135deg, #1A5C2A 0%, #0D2B14 100%)',
                position: 'relative'
            }}>
                <Box sx={{
                    width: { xs: '100%', md: '60%' },
                    display: 'flex',
                    alignItems: 'center',
                    px: { xs: 3, sm: 6, md: 12 },
                    py: { xs: 12, sm: 16, md: 20 },
                    position: 'relative',
                    zIndex: 2
                }}>
                    <Box>
                        <Typography variant="h1" sx={{ color: '#FFFFFF', fontWeight: 900, mb: 3, fontSize: { xs: '2rem', sm: '2.8rem', md: '4rem' }, lineHeight: 1.1 }}>
                            {c.heroTitle}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: '1rem', md: '1.2rem' }, maxWidth: 600, lineHeight: 1.8, mb: 4 }}>
                            {c.heroDesc}
                        </Typography>
                        <Box
                            component={motion.a}
                            whileHover="hover"
                            initial="rest"
                            animate="rest"
                            href="#story"
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                border: '2px solid #F7A11A',
                                borderRadius: 50,
                                overflow: 'hidden',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                '&:hover': { bgcolor: 'rgba(247, 161, 26, 0.04)' }
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
                                    fontSize: '0.8rem',
                                    px: 2.5,
                                    lineHeight: '40px',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {c.moreBtn}
                            </Typography>
                            <Box sx={{ width: 40, height: 40, flexShrink: 0, bgcolor: '#F7A11A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                </Box>
                <Box sx={{
                    width: { xs: '100%', md: '40%' },
                    minHeight: { xs: '300px', sm: '400px', md: 'auto' },
                    position: 'relative',
                    boxShadow: '-10px 0 30px rgba(0,0,0,0.2)',
                    overflow: 'hidden',
                    zIndex: 1
                }}>
                    <Box sx={{ width: '100%', height: '100%', background: `url(${aboutHeroImg}) center/cover no-repeat`, position: 'absolute', top: 0, left: 0 }} />
                </Box>
            </Box>

            {/* Our Story */}
            <Box id="story" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fff' }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'left', mb: 6 }}>
                        <AnimatedPreTitle text={c.ourStory} color="#F7A11A" />
                        <TypewriterText key={`story-title-${language}`} text={c.storyTitle} variant="h2" sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: { xs: '1.6rem', sm: '2rem', md: '2.6rem' }, color: '#0D2B14', lineHeight: 1.15, mb: 3 }} />
                        <Box sx={{ width: 56, height: 4, bgcolor: '#F7A11A', mb: 3 }} />
                    </Box>
                    <Box sx={{ 
                        bgcolor: '#F7A11A', 
                        borderRadius: 0, 
                        p: 0, 
                        mb: 8, 
                        position: 'relative', 
                        boxShadow: '0 20px 40px rgba(247,161,26,0.15)',
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        overflow: 'hidden',
                        minHeight: { md: 450 }
                    }}>
                        {/* Left Side: Content */}
                        <Box sx={{ 
                            flex: { xs: 1, md: 0.45 }, 
                            p: { xs: 3, sm: 4, md: 5 }, 
                            pr: { md: 0 }, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'center',
                            zIndex: 2
                        }}>
                            <Box sx={{ p: { xs: 0, md: 0 }, mb: 3, mr: { md: -40 } }}>
                                <Typography sx={{ 
                                    color: '#0D2B14', 
                                    fontFamily: '"Inknut Antiqua", serif', 
                                    fontSize: { xs: '0.8rem', md: '0.9rem' }, 
                                    lineHeight: 1.5, 
                                    mb: 2, 
                                    fontWeight: 500 
                                }}>
                                    {c.storyP1}
                                </Typography>
                                <Typography sx={{ 
                                    color: '#0D2B14', 
                                    fontFamily: '"Inknut Antiqua", serif', 
                                    fontSize: { xs: '0.8rem', md: '0.9rem' }, 
                                    lineHeight: 1.5, 
                                    mb: 2, 
                                    fontWeight: 500 
                                }}>
                                    {c.storyP2}
                                </Typography>
                                <Typography sx={{ 
                                    color: '#0D2B14', 
                                    fontFamily: '"Inknut Antiqua", serif', 
                                    fontSize: { xs: '0.8rem', md: '0.9rem' }, 
                                    lineHeight: 1.5, 
                                    m: 0, 
                                    fontWeight: 500 
                                }}>
                                    {c.storyP3}
                                </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0 }}>
                                <Box sx={{ width: 30, height: 2, bgcolor: '#0D2B14' }} />
                                <Box>
                                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#0D2B14', fontSize: '0.95rem' }}>Dr. Willson John</Typography>
                                    <Typography sx={{ fontFamily: 'Outfit', fontWeight: 600, color: '#0D2B14', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8 }}>Founder</Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* Right Side: Founder Photo */}
                        <Box sx={{ 
                            flex: { xs: 1, md: 0.55 }, 
                            position: 'relative',
                            minHeight: { xs: 300, md: '100%' },
                            overflow: 'hidden'
                        }}>
                            <Box
                                component="img"
                                src={photoDavid}
                                alt="Dr. Willson John - Founder"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: '10% 20%', 
                                    display: 'block'
                                }}
                            />
                            {/* Decorative gradient overlay */}
                            <Box sx={{
                                position: 'absolute',
                                inset: 0,
                                background: { 
                                    xs: 'linear-gradient(to top, #F7A11A 0%, transparent 20%)',
                                    md: 'linear-gradient(to left, transparent 95%, #F7A11A 100%)'
                                }
                            }} />
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Mission/Vision */}
            <Box sx={{ py: { xs: 10, md: 12 }, position: 'relative', background: `url(${aboutHeroImg}) center/cover no-repeat fixed` }}>
                <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.4)', zIndex: 1 }} />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Box sx={{ textAlign: 'left', mb: { xs: 10, md: 8 } }}>
                        <AnimatedPreTitle text={c.missionTitle} color="#FFFFFF" align="flex-start" />
                        <TypewriterText key={`mission-title-${language}`} text={c.missionTitle} variant="h2" sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: { xs: '1.6rem', sm: '2rem', md: '2.6rem' }, color: '#FFFFFF', lineHeight: 1.15, mb: 3 }} />
                        <Box sx={{ width: 56, height: 4, bgcolor: '#F7A11A' }} />
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: { xs: 10, md: 8 } }}>
                        {[
                            { icon: <TrackChangesIcon sx={{ fontSize: 36, color: '#fff' }} />, title: c.mission, desc: c.missionDesc, iconBg: '#1A5C2A', align: 'left' },
                            { icon: <VisibilityIcon sx={{ fontSize: 36, color: '#fff' }} />, title: c.vision, desc: c.visionDesc, iconBg: '#F7A11A', align: 'left' },
                        ].map((item) => (
                            <Box key={item.title} sx={{ display: 'flex' }}>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', pt: 6, pb: 4, px: { xs: 3, sm: 4, md: 5 }, borderRadius: 0, bgcolor: '#fff', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', height: '100%', position: 'relative', textAlign: { xs: 'center', md: item.align } }}>
                                    <Box sx={{ position: 'absolute', top: -45, left: '50%', transform: 'translateX(-50%)', '@media (min-width: 900px)': { left: item.align === 'left' ? 40 : 'auto', right: item.align === 'right' ? 40 : 'auto', transform: 'none' }, width: 90, height: 90, borderRadius: 0, bgcolor: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 12px 24px ${item.iconBg}40`, border: '4px solid #fff' }}>
                                        {item.icon}
                                    </Box>
                                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 800, fontSize: { xs: '1.25rem', md: '1.6rem' }, color: '#0D2B14', mb: 2.5 }}>{item.title}</Typography>
                                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', color: '#0D2B14', lineHeight: 1.8, fontSize: { xs: '0.9rem', md: '1.1rem' }, flexGrow: 1 }}>{item.desc}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* Values */}
            <Box sx={{ position: 'relative', pt: { xs: 8, md: 8 }, pb: { xs: 10, md: 14 }, background: { xs: '#1A5C2A', md: 'linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 60vh, #1A5C2A 60vh, #1A5C2A 100%)' } }}>
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ textAlign: 'left', mb: 7 }}>
                        <AnimatedPreTitle text={ui.ourPurpose} color="#F7A11A" align="flex-start" />
                        <TypewriterText key={`values-title-${language}`} text={c.valuesTitle} variant="h2" sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: { xs: '1.6rem', sm: '2rem', md: '2.6rem' }, color: { xs: '#FFFFFF', md: '#0D2B14' }, lineHeight: 1.15, mb: 2 }} />
                        <Box sx={{ width: 56, height: 4, bgcolor: '#F7A11A', mb: 3 }} />
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 4 }}>
                        {values.map((v, i) => (
                            <Box key={i} sx={{ textAlign: 'left', border: '3px solid #FFFFFF', p: { xs: 2, sm: 2.5, md: 3 }, bgcolor: { xs: 'rgba(255,255,255,0.05)', md: 'transparent' } }}>
                                <Box component="img" src={v.img} alt={t(v.title)} sx={{ width: '100%', height: { xs: 200, sm: 260 }, objectFit: 'cover', mb: 3, filter: 'contrast(1.1)' }} />
                                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 800, color: '#F7A11A', fontSize: '1.2rem', mb: 1, letterSpacing: '0.05em' }}>0{i + 1} /</Typography>
                                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#FFFFFF', mb: 1.5, fontSize: '1.2rem', lineHeight: 1.3 }}>{t(v.title)}</Typography>
                                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', lineHeight: 1.7 }}>{t(v.desc)}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* Team Honeycomb Section */}
            <Box sx={{ 
                minHeight: { xs: 'auto', md: '60vh' }, 
                py: { xs: 8, md: 10 }, 
                bgcolor: '#F7A11A', 
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Container maxWidth="lg">
                    <Box sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' }, 
                        gap: { xs: 8, md: 6 },
                        alignItems: 'center'
                    }}>
                        {/* Left Side: Honeycomb */}
                        <Box sx={{ width: '100%', position: 'relative' }}>
                            <Box sx={{ textAlign: 'left', mb: { xs: 6, md: 8 } }}>
                                <AnimatedPreTitle text={language === 'en' ? "Our Team" : "Timu Yetu"} color="#0D2B14" align="left" />
                                <TypewriterText key={`meet-experts-${language}`} text={c.meetExperts} variant="h2" sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: { xs: '1.6rem', sm: '2rem', md: '2.4rem' }, color: '#0D2B14', lineHeight: 1.15, mb: 2 }} />
                                <Box sx={{ width: 56, height: 4, bgcolor: '#0D2B14' }} />
                            </Box>
                            
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: { xs: 1, sm: -4, md: -5 }, position: 'relative' }}>
                                <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2, md: 3 }, mb: { xs: 1, sm: -4, md: -5 } }}>
                                    <Hexagon member={team[0]} t={t} delay={0.1} x={-100} />
                                    <Hexagon member={team[1]} t={t} delay={0.2} x={100} />
                                </Box>
                                <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2, md: 3 }, mb: { xs: 1, sm: -4, md: -5 } }}>
                                    <Hexagon member={team[2]} t={t} delay={0.3} x={-150} />
                                    <Hexagon member={team[3]} t={t} delay={0} y={100} />
                                    <Hexagon member={team[4]} t={t} delay={0.4} x={150} />
                                </Box>
                                <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2, md: 3 } }}>
                                    <Hexagon member={team[5]} t={t} delay={0.5} x={-100} y={50} />
                                    <Hexagon member={team[6]} t={t} delay={0.6} x={100} y={50} />
                                </Box>
                            </Box>
                        </Box>

                        {/* Right Side: Text Box */}
                        <Box sx={{ display: 'flex' }}>
                            <Box component={motion.div} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} sx={{ 
                                bgcolor: '#FFFFFF', 
                                p: { xs: 4, sm: 6, md: 8 }, 
                                borderRadius: 0, 
                                boxShadow: '0 30px 60px rgba(0,0,0,0.1)', 
                                width: '100%', 
                                minHeight: { md: '60vh' },
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'center' 
                            }}>
                                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#1A5C2A', fontSize: { xs: '1.1rem', md: '1.3rem' }, mb: 2, lineHeight: 1.4 }}>
                                    {language === 'en' ? 'Linguistic Excellence' : 'Ubora wa Kilugha'}
                                </Typography>
                                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', color: '#1A5C2A', fontSize: '0.85rem', lineHeight: 1.7, mb: 4 }}>
                                    {language === 'en' 
                                        ? 'Our certified experts combine precision with cultural intelligence to bridge communication gaps worldwide.' 
                                        : 'Wataalamu wetu walioidhinishwa wanachanganya usahihi na akili ya kitamaduni ili kuondoa mapengo ya mawasiliano duniani kote.'}
                                </Typography>
                                
                                <Box component={motion(RouterLink)} whileHover="hover" initial="rest" animate="rest" to={`/${language}/gallery`} sx={{ display: 'inline-flex', alignItems: 'center', border: '2px solid #1A5C2A', borderRadius: 50, overflow: 'hidden', textDecoration: 'none', transition: 'all 0.3s ease', alignSelf: 'flex-start', '&:hover': { bgcolor: 'rgba(26, 92, 42, 0.04)' } }}>
                                    <Typography component={motion.span} variants={{ rest: { x: 0 }, hover: { x: 5 } }} transition={{ type: 'spring', stiffness: 400, damping: 25 }} sx={{ color: '#1A5C2A', fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: '0.75rem', px: 3, lineHeight: '44px', whiteSpace: 'nowrap' }}>{c.seeMoreTeam}</Typography>
                                    <Box sx={{ width: 44, height: 44, flexShrink: 0, bgcolor: '#1A5C2A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <motion.div
                                            variants={{
                                                rest: { x: 0 },
                                                hover: { x: 8 }
                                            }}
                                            transition={{ type: 'spring', stiffness: 600, damping: 15 }}
                                        >
                                            <GroupsIcon sx={{ color: '#FFFFFF', fontSize: 18 }} />
                                        </motion.div>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <CTASection />
        </>
    );
};

export default AboutPage;
