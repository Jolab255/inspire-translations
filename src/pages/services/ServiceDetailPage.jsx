import { useParams, Link as RouterLink, Navigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import StarsIcon from '@mui/icons-material/Stars';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SEOHead from '../../components/seo/SEOHead';
import CTASection from '../../components/common/CTASection';
import FAQSection from '../../components/common/FAQSection';
import PillButton from '../../components/common/PillButton';
import { services } from '../../data/siteData';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';
import { FadeInUp, TypewriterText } from '../../components/common/Animations';

// Service Images
import serviceWritten from '../../assets/images/written_translation.png';
import serviceOnsite from '../../assets/images/onsite_interpretation.png';
import serviceRemote from '../../assets/images/remote_interpretation.png';
import serviceClasses from '../../assets/images/language_classes.png';
import serviceLogistics from '../../assets/images/conference_logistics.png';
import serviceEquipment from '../../assets/images/equipment_rental.png';
import fallbackHero from '../../assets/images/project_hero.png';

const ServiceDetailPage = () => {
    const { slug } = useParams();
    const { language, t } = useLanguage();
    const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: overviewRef, inView: overviewInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: exploreRef, inView: exploreInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const [expanded, setExpanded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(services.length); 
    const ui = uiTranslations[language];
    const service = services.find((s) => s.id === slug);

    // Triple the services array for seamless infinite looping
    const infiniteServices = useMemo(() => [...services, ...services, ...services], []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => prev + 1);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Handle wrap-around seamlessly
    useEffect(() => {
        if (currentIndex >= services.length * 2) {
            const timeout = setTimeout(() => {
                setCurrentIndex(services.length);
            }, 800); 
            return () => clearTimeout(timeout);
        }
    }, [currentIndex]);

    if (!service) return <Navigate to={`/${language}/services`} replace />;

    const serviceImages = {
        'written-translation': serviceWritten,
        'onsite-interpretation': serviceOnsite,
        'remote-interpretation': serviceRemote,
        'language-classes': serviceClasses,
        'conference-logistics': serviceLogistics,
        'equipment-rental': serviceEquipment,
    };

    const heroImg = serviceImages[service.id] || fallbackHero;

    const content = {
        en: {
            backToServices: "Return to Services",
            serviceOverview: "Professional Overview",
            readMore: "Read Professional Details",
            readLess: "Show Less",
            processTitle: "Strategic Approach",
            processDesc: "Our delivery model is built on three pillars: absolute linguistic accuracy, cultural resonance, and rigorous technical validation. We don't just translate words; we transpose impact across borders.",
            keyFeatures: "Core Specializations",
            readyToStart: "Initiate Your Project",
            readyDesc: `Connect with our experts today for a tailored consultation regarding your ${t(service.title).toLowerCase()} requirements.`,
            requestQuote: "Request Professional Quote",
            whyUs: "The Inspire Advantage",
            points: [
                'Certified subject-matter experts',
                'Guaranteed linguistic precision',
                'Absolute data confidentiality',
                '25+ Global language pairs',
                '24/7 Professional support'
            ],
            otherExpertise: "Explore Other Expertise"
        },
        sw: {
            backToServices: "Rudi kwenye Huduma",
            serviceOverview: "Maelezo ya Kitaalamu",
            readMore: "Soma Maelezo Zaidi",
            readLess: "Onyesha Kidogo",
            processTitle: "Mkakati Wetu",
            processDesc: "Mfumo wetu wa utoaji huduma umejengwa juu ya misingi mitatu: usahihi kamili wa kilinguisti, mwangwi wa kitamaduni, na uhakiki madhubuti wa kiufundi. Hatutafsiri maneno tu; tunahamisha matokeo kuvuka mipaka.",
            keyFeatures: "Utaalamu Wetu Mkuu",
            readyToStart: "Anza Mradi Wako",
            readyDesc: `Wasiliana na wataalamu wetu leo kwa ushauri maalum kuhusu mahitaji yako ya ${t(service.title).toLowerCase()}.`,
            requestQuote: "Omba Makadirio ya Kitaalamu",
            whyUs: "Faida za Inspire",
            points: [
                'Wataalamu walioidhinishwa',
                'Usahihi wa lugha uliohakikishwa',
                'Usiri kamili wa data',
                'Zaidi ya jozi 25 za lugha',
                'Usaidizi wa kitaalamu 24/7'
            ],
            otherExpertise: "Gundua Utaalamu Mwingine"
        }
    };

    const c = content[language];

    const extendedDetails = [
        language === 'en'
            ? `${t(service.fullDesc)} At Inspire Translations, we recognize that every document carries the weight of your professional reputation. Our native linguists capture subtle nuances and industry-specific terminology to ensure perfect resonance with your audience.`
            : `${t(service.fullDesc)} Katika Inspire Translations, tunatambua kuwa kila hati inabeba uzito wa sifa yako ya kitaalamu. Wanaisimu wetu wazawa wananasa nuances fiche na istilahi za sekta ili kuhakikisha matokeo bora kwa hadhira yako.`,
        language === 'en' 
            ? "Our methodology integrates advanced linguistic tools with deep subject-matter expertise to deliver results that go beyond simple translation. We employ a multi-layered quality control system where each project undergoes rigorous proofreading and editing by senior specialists who are experts in the specific field—be it law, medicine, technology, or finance. This comprehensive approach allows us to identify and correct potential ambiguities before they ever reach the client, ensuring a level of precision that is unmatched in the industry."
            : "Mbinu yetu inaunganisha zana za kisasa za kilinguisti na utaalamu wa kina wa mada ili kutoa matokeo yanayogusa hadhira unayokusudia. Tunapa kipaumbele uwazi, usahihi wa kitamaduni, na usahihi wa kiufundi katika kila kazi. Tunatumia mfumo wa udhibiti wa ubora wa ngazi mbalimbali ambapo kila mradi hupitia uhakiki na uhariri mkali na wataalamu wakuu ambao ni mabingwa katika nyanja mahususi—iwe ni sheria, tiba, teknolojia, au fedha.",
        language === 'en'
            ? "Furthermore, we prioritize the cultural context of your communication. Language is deeply rooted in culture, and a message that works in one region may fail or even cause offense in another. Our consultants provide invaluable insights into local customs, professional etiquette, and consumer behavior, helping you navigate the complexities of international expansion with confidence. By bridging both the linguistic and cultural gaps, we empower your business to speak directly to the hearts and minds of your global partners and customers."
            : "Aidha, tunapa kipaumbele muktadha wa kitamaduni wa mawasiliano yako. Lugha imekita mizizi katika utamaduni, na ujumbe unaofanya kazi katika eneo moja unaweza kushindwa au hata kusababisha kero katika eneo lingine. Washauri wetu wanatoa maarifa muhimu kuhusu mila za kienyeji, adabu za kitaalamu, na tabia za walaji, wakikusaidia kupita katika utata wa upanuzi wa kimataifa kwa ujasiri. Kwa kuziba pengo la kilinguisti na kitamaduni, tunawezesha biashara yako kuzungumza moja kwa moja na mioyo na akili za washirika na wateja wako wa kimataifa."
    ];

    return (
        <Box sx={{ bgcolor: '#FFFFFF' }}>
            <SEOHead
                title={`${t(service.title)} | Inspire Translations`}
                description={t(service.shortDesc)}
            />

            {/* Premium Service Hero */}
            <Box sx={{ 
                position: 'relative', 
                minHeight: { xs: 'auto', md: '100vh' },
                display: 'flex',
                alignItems: 'center',
                background: `linear-gradient(135deg, rgba(26, 92, 42, 0.96) 0%, rgba(15, 58, 26, 0.92) 100%), url(${heroImg}) center/cover no-repeat`,
                pt: { xs: 18, md: 12 },
                pb: { xs: 6, md: 8 },
                overflow: 'hidden'
            }}>
                <Container maxWidth="lg">
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', md: 'row' }, 
                        alignItems: 'center',
                        gap: { xs: 6, md: 8 }
                    }}>
                        <Box sx={{ flex: 1, maxWidth: { md: '60%' } }}>
                            <Box ref={heroRef} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2, overflow: 'hidden' }}>
                                <Box sx={{
                                    height: 2, bgcolor: '#F7A11A',
                                    width: heroInView ? 32 : 0,
                                    transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
                                }} />
                                <Box sx={{
                                    display: 'flex', alignItems: 'center',
                                    transform: heroInView ? 'translateX(0) scale(1)' : 'translateX(-20px) scale(0.6)',
                                    opacity: heroInView ? 1 : 0,
                                    transition: 'opacity 0.4s ease 0.45s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.45s',
                                }}>
                                    <ArrowForwardIcon sx={{ color: '#F7A11A', fontSize: 18 }} />
                                </Box>
                                <Box sx={{
                                    transform: heroInView ? 'translateY(0)' : 'translateY(8px)',
                                    opacity: heroInView ? 1 : 0,
                                    transition: 'opacity 0.4s ease 0.6s, transform 0.4s ease 0.6s',
                                }}>
                                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#F7A11A', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                        {language === 'en' ? 'Service Excellence' : 'Ubora wa Huduma'}
                                    </Typography>
                                </Box>
                            </Box>

                            <TypewriterText 
                                text={t(service.title)}
                                variant="h1"
                                sx={{ 
                                    fontFamily: '"Inknut Antiqua", serif',
                                    fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.8rem' },
                                    color: '#FFFFFF',
                                    lineHeight: 1.1,
                                    mb: 3,
                                    fontWeight: 400
                                }}
                            />
                            
                            <Typography sx={{ 
                                fontFamily: '"Inknut Antiqua", serif',
                                color: 'rgba(255,255,255,0.85)',
                                fontSize: { xs: '0.95rem', md: '1.05rem' },
                                lineHeight: 1.8,
                                maxWidth: 600,
                                mb: 4
                            }}>
                                {t(service.shortDesc)}
                            </Typography>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mt: 2, fontFamily: 'Outfit', fontSize: '0.85rem' }}>
                                <Typography component={RouterLink} to={`/${language}`} sx={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', '&:hover': { color: '#F7A11A' } }}>Home</Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.4)' }}>/</Typography>
                                <Typography component={RouterLink} to={`/${language}/services`} sx={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', '&:hover': { color: '#F7A11A' } }}>Services</Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.4)' }}>/</Typography>
                                <Typography sx={{ color: '#F7A11A', fontWeight: 600 }}>{t(service.title)}</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ 
                            flex: { xs: '1', md: '0 0 38%' },
                            width: '100%',
                            bgcolor: '#F7A11A',
                            p: { xs: 4, md: 8, lg: 10 },
                            border: '3px solid #FFFFFF',
                            boxShadow: '30px 30px 0px rgba(26, 92, 42, 0.3)',
                            position: 'relative',
                            zIndex: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <Typography sx={{ 
                                fontFamily: '"Inknut Antiqua", serif', 
                                fontWeight: 700, 
                                color: '#1A5C2A', 
                                fontSize: '1.6rem', 
                                mb: 3,
                                lineHeight: 1.2
                            }}>
                                {c.readyToStart}
                            </Typography>
                            <Typography sx={{ 
                                fontFamily: '"Inknut Antiqua", serif',
                                color: '#4A4A4A', 
                                mb: 5, 
                                fontSize: '0.95rem', 
                                lineHeight: 1.8 
                            }}>
                                {c.readyDesc}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1 }}>
                                    <Box sx={{ width: 10, height: 10, bgcolor: '#1A5C2A', borderRadius: '50%' }} />
                                    <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '0.8rem', color: '#1A5C2A', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                                        {language === 'en' ? 'Official Service Provider' : 'Mtoa Huduma Rasmi'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Dedicated Overview Section */}
            <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: '#F8F9FA', borderBottom: '1px solid #EEEEEE' }}>
                <Container maxWidth="lg">
                    <FadeInUp>
                        <Box sx={{ width: '100%', textAlign: 'left' }}>
                            <Box ref={overviewRef} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2, overflow: 'hidden' }}>
                                <Box sx={{
                                    height: 2, bgcolor: '#F7A11A',
                                    width: overviewInView ? 32 : 0,
                                    transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
                                }} />
                                <Box sx={{
                                    display: 'flex', alignItems: 'center',
                                    transform: overviewInView ? 'translateX(0) scale(1)' : 'translateX(-20px) scale(0.6)',
                                    opacity: overviewInView ? 1 : 0,
                                    transition: 'opacity 0.4s ease 0.45s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.45s',
                                }}>
                                    <ArrowForwardIcon sx={{ color: '#F7A11A', fontSize: 18 }} />
                                </Box>
                                <Box sx={{
                                    transform: overviewInView ? 'translateY(0)' : 'translateY(8px)',
                                    opacity: overviewInView ? 1 : 0,
                                    transition: 'opacity 0.4s ease 0.6s, transform 0.4s ease 0.6s',
                                }}>
                                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#F7A11A', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                        {language === 'en' ? 'Inside Insight' : 'Uchambuzi wa Ndani'}
                                    </Typography>
                                </Box>
                            </Box>

                            <TypewriterText 
                                text={c.serviceOverview}
                                variant="h3"
                                sx={{ 
                                    fontFamily: '"Inknut Antiqua", serif', 
                                    color: '#1A5C2A', 
                                    fontWeight: 700, 
                                    fontSize: '1.8rem',
                                    mb: 4
                                }}
                            />

                            <Typography sx={{ 
                                fontFamily: '"Inknut Antiqua", serif',
                                color: '#4A4A4A', 
                                lineHeight: 2, 
                                mb: 3, 
                                fontSize: '1rem',
                                fontWeight: 100
                            }}>
                                {extendedDetails[0]}
                            </Typography>

                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <Box sx={{ mt: 0 }}>
                                    {extendedDetails.slice(1).map((para, i) => (
                                        <Typography key={i} sx={{ 
                                            fontFamily: '"Inknut Antiqua", serif',
                                            color: '#4A4A4A', 
                                            lineHeight: 2, 
                                            mb: 3, 
                                            fontSize: '1rem',
                                            fontWeight: 100
                                        }}>
                                            {para}
                                        </Typography>
                                    ))}
                                </Box>
                            </Collapse>

                            <Box sx={{ mt: 2 }}>
                                <Button 
                                    onClick={() => setExpanded(!expanded)}
                                    endIcon={expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    sx={{ 
                                        color: '#1A5C2A', 
                                        fontFamily: '"Inknut Antiqua", serif', 
                                        fontWeight: 700, 
                                        fontSize: '0.85rem',
                                        textTransform: 'none',
                                        p: 0,
                                        '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
                                    }}
                                >
                                    {expanded ? c.readLess : c.readMore}
                                </Button>
                            </Box>
                        </Box>
                    </FadeInUp>
                </Container>
            </Box>

            {/* Methodology Section */}
            <Box sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 8, md: 12 }, bgcolor: '#FFFFFF' }}>
                <Container maxWidth="lg">
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', md: 'row' }, 
                        gap: { xs: 8, md: 12 },
                        alignItems: 'center'
                    }}>
                        <Box sx={{ flex: 1, width: '100%' }}>
                            <FadeInUp>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2, overflow: 'hidden' }}>
                                    <Box sx={{
                                        height: 2, bgcolor: '#F7A11A',
                                        width: overviewInView ? 32 : 0,
                                        transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
                                    }} />
                                    <Box sx={{
                                        display: 'flex', alignItems: 'center',
                                        transform: overviewInView ? 'translateX(0) scale(1)' : 'translateX(-20px) scale(0.6)',
                                        opacity: overviewInView ? 1 : 0,
                                        transition: 'opacity 0.4s ease 0.45s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.45s',
                                    }}>
                                        <ArrowForwardIcon sx={{ color: '#F7A11A', fontSize: 18 }} />
                                    </Box>
                                    <Box sx={{
                                        transform: overviewInView ? 'translateY(0)' : 'translateY(8px)',
                                        opacity: overviewInView ? 1 : 0,
                                        transition: 'opacity 0.4s ease 0.6s, transform 0.4s ease 0.6s',
                                    }}>
                                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#F7A11A', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                            {language === 'en' ? 'Methodology' : 'Mbinu Yetu'}
                                        </Typography>
                                    </Box>
                                </Box>

                                <TypewriterText 
                                    text={c.processTitle}
                                    variant="h3"
                                    sx={{ 
                                        fontFamily: '"Inknut Antiqua", serif', 
                                        color: '#1A5C2A', 
                                        fontWeight: 700, 
                                        fontSize: '2rem',
                                        mb: 4 
                                    }}
                                />
                                <Typography sx={{ 
                                    fontFamily: '"Inknut Antiqua", serif',
                                    color: '#4A4A4A', 
                                    lineHeight: 2.2, 
                                    mb: 8, 
                                    fontSize: '1rem',
                                    fontWeight: 100
                                }}>
                                    {c.processDesc}
                                </Typography>

                                <Box sx={{ p: { xs: 4, md: 6 }, border: '4px solid #1A5C2A', position: 'relative', bgcolor: 'rgba(26, 92, 42, 0.02)' }}>
                                    <Box sx={{ position: 'absolute', top: -18, left: 40, bgcolor: '#FFFFFF', px: 2 }}>
                                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#1A5C2A', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            {c.keyFeatures}
                                        </Typography>
                                    </Box>
                                    <List disablePadding>
                                        {t(service.features).map((f, i) => (
                                            <ListItem key={i} disablePadding sx={{ mb: 3 }}>
                                                <ListItemIcon sx={{ minWidth: 45 }}>
                                                    <CheckCircleIcon sx={{ color: '#F7A11A', fontSize: 28 }} />
                                                </ListItemIcon>
                                                <ListItemText 
                                                    primary={f} 
                                                    primaryTypographyProps={{ 
                                                        fontFamily: '"Inknut Antiqua", serif', 
                                                        color: '#1A1A2E', 
                                                        fontWeight: 600,
                                                        fontSize: '1.1rem'
                                                    }} 
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </FadeInUp>
                        </Box>

                        <Box sx={{ flex: { xs: '1', md: '0 0 45%' }, width: '100%', position: 'relative' }}>
                            <FadeInUp delay={0.2}>
                                <Box sx={{ position: 'relative' }}>
                                    <Box sx={{ position: 'absolute', top: 20, left: 20, right: -20, bottom: -20, border: '3px solid #F7A11A', zIndex: 0 }} />
                                    <Box
                                        component="img" src={heroImg} alt={t(service.title)}
                                        sx={{ width: '100%', height: { xs: '350px', md: '550px' }, objectFit: 'cover', display: 'block', position: 'relative', zIndex: 1, filter: 'contrast(1.05) brightness(1.02)' }}
                                    />
                                </Box>
                            </FadeInUp>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Why Us Block (Inspire Advantage) */}
            <Box sx={{ pb: 10, bgcolor: '#FFFFFF' }}>
                <Container maxWidth="lg">
                    <Box sx={{ 
                        p: { xs: 4, md: 6 }, 
                        bgcolor: '#F8F9FA', 
                        border: '1px solid rgba(0,0,0,0.08)',
                        borderLeft: '8px solid #1A5C2A',
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { md: 'flex-start' },
                        gap: { xs: 4, md: 8 }
                    }}>
                        <Typography sx={{ 
                            fontFamily: '"Inknut Antiqua", serif', 
                            fontWeight: 700, 
                            color: '#1A5C2A', 
                            fontSize: '1.4rem',
                            minWidth: '250px'
                        }}>
                            {c.whyUs}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
                            {c.points.map((point, i) => (
                                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                                    <CheckCircleIcon sx={{ color: '#F7A11A', fontSize: 24 }} />
                                    <Typography sx={{ 
                                        fontFamily: 'Outfit',
                                        fontWeight: 700,
                                        color: '#4A4A4A', 
                                        fontSize: '1rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        {point}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Container>
            </Box>

            <FAQSection />

            {/* CTA Section */}
            <CTASection />

            {/* Explore Other Expertise (Seamless Infinite Carousel) */}
            <Box sx={{ py: 15, bgcolor: '#FFFFFF', overflow: 'hidden' }}>
                <Container maxWidth="lg">
                    <Box sx={{ mb: 10, textAlign: 'left' }}>
                        <Box ref={exploreRef} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2, overflow: 'hidden' }}>
                            <Box sx={{
                                height: 2, bgcolor: '#F7A11A',
                                width: exploreInView ? 32 : 0,
                                transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
                            }} />
                            <Box sx={{
                                display: 'flex', alignItems: 'center',
                                transform: exploreInView ? 'translateX(0) scale(1)' : 'translateX(-20px) scale(0.6)',
                                opacity: exploreInView ? 1 : 0,
                                transition: 'opacity 0.4s ease 0.45s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.45s',
                            }}>
                                <ArrowForwardIcon sx={{ color: '#F7A11A', fontSize: 18 }} />
                            </Box>
                            <Box sx={{
                                transform: exploreInView ? 'translateY(0)' : 'translateY(8px)',
                                opacity: exploreInView ? 1 : 0,
                                transition: 'opacity 0.4s ease 0.6s, transform 0.4s ease 0.6s',
                            }}>
                                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#F7A11A', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                    {language === 'en' ? 'Full Solutions' : 'Suluhu Kamili'}
                                </Typography>
                            </Box>
                        </Box>
                        
                        <TypewriterText 
                            text={c.otherExpertise}
                            variant="h2"
                            sx={{ 
                                fontFamily: '"Inknut Antiqua", serif', 
                                fontWeight: 700, 
                                color: '#1A5C2A', 
                                fontSize: { xs: '1.8rem', md: '2.5rem' }
                            }}
                        />
                    </Box>
                    
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                        <Box 
                            component={motion.div}
                            animate={{ x: `calc(-${currentIndex} * (100% / 3))` }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            sx={{ 
                                display: 'flex', 
                                width: '100%'
                            }}
                        >
                            {infiniteServices.map((s, idx) => (
                                <Box 
                                    key={`${s.id}-${idx}`}
                                    sx={{ 
                                        flex: '0 0 33.333%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        p: 2,
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    <Box sx={{ 
                                        bgcolor: '#FFFFFF',
                                        border: '2px solid #1A5C2A',
                                        height: '600px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%'
                                    }}>
                                        <Box 
                                            component="img" 
                                            src={serviceImages[s.id] || fallbackHero} 
                                            sx={{ width: '100%', height: '240px', objectFit: 'cover' }} 
                                        />
                                        <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                            <Typography sx={{ 
                                                fontFamily: '"Inknut Antiqua", serif', 
                                                fontWeight: 700, 
                                                fontSize: '1.1rem', 
                                                color: '#1A5C2A',
                                                mb: 2,
                                                lineHeight: 1.3,
                                                height: '2.6em',
                                                overflow: 'hidden'
                                            }}>
                                                {t(s.title)}
                                            </Typography>

                                            <Typography sx={{ 
                                                fontFamily: '"Inknut Antiqua", serif', 
                                                fontWeight: 300, 
                                                fontSize: '0.85rem',
                                                color: '#4A4A4A',
                                                mb: 1.5, // Reduced gap further
                                                lineHeight: 1.8,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                height: '5.4em'
                                            }}>
                                                {t(s.shortDesc)}
                                            </Typography>
                                            
                                            <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'center' }}>
                                                <PillButton 
                                                    to={`/${language}/services/${s.id}`} 
                                                    variant="dark" 
                                                    sx={{ 
                                                        width: 'auto', 
                                                        '& .MuiTypography-root': { px: 2, fontSize: '0.7rem' }, // Compact text
                                                        '& .MuiBox-root': { width: 36, height: 36 } // Smaller arrow box
                                                    }}
                                                >
                                                    {ui.readMore}
                                                </PillButton>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default ServiceDetailPage;