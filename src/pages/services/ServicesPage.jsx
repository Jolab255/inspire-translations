import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import CTASection from '../../components/common/CTASection';
import FAQSection from '../../components/common/FAQSection';
import PillButton from '../../components/common/PillButton';
import { services } from '../../data/siteData';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';
import { FadeInUp, TypewriterText, AnimatedPreTitle } from '../../components/common/Animations';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useInView } from 'react-intersection-observer';

// Service & Methodology Images
import serviceWritten from '../../assets/images/written_translation.png';
import serviceOnsite from '../../assets/images/onsite_interpretation.png';
import serviceRemote from '../../assets/images/remote_interpretation.png';
import serviceClasses from '../../assets/images/language_classes.png';
import serviceLogistics from '../../assets/images/conference_logistics.png';
import serviceEquipment from '../../assets/images/equipment_rental.png';
import heroWoman from '../../assets/images/hero_woman_bg.png';
import methodologyAudit from '../../assets/images/project_hero.png';
import methodologyPairing from '../../assets/images/about_us_photo.png';
import methodologyExecution from '../../assets/images/written_translation.png';
import methodologyValidation from '../../assets/images/customer_care.png';

const serviceImages = {
    'written-translation': serviceWritten,
    'onsite-interpretation': serviceOnsite,
    'remote-interpretation': serviceRemote,
    'language-classes': serviceClasses,
    'conference-logistics': serviceLogistics,
    'equipment-rental': serviceEquipment,
};

const ServicesPage = () => {
    const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { language, t } = useLanguage();
    const ui = uiTranslations[language];

    const content = {
        en: {
            heroLabel: "Linguistic Infrastructure",
            heroTitle: "Precision Solutions for Global Impact.",
            heroDesc: "We engineer communication frameworks that bridge the gap between cultures and industries, providing the linguistic precision required for high-stakes operations.",
            howItWorks: "The Methodology",
            howItWorksDesc: "Our process is rooted in technical validation and cultural intelligence, ensuring every word serves a strategic purpose.",
            requestQuote: "Initiate Professional Quote",
            exploreServices: "Explore Expertise",
            steps: [
                { step: '01', title: 'Technical Audit', desc: 'We begin with a deep analysis of your document’s technical requirements and intended audience impact.', img: methodologyAudit },
                { step: '02', title: 'Specialist Pairing', desc: 'Your project is assigned to a native linguist with verified subject-matter expertise in your specific industry.', img: methodologyPairing },
                { step: '03', title: 'Precision Execution', desc: 'Our team implements a multi-stage translation process, focusing on nuance preservation and technical accuracy.', img: methodologyExecution },
                { step: '04', title: 'Quality Validation', desc: 'A final rigorous audit by senior editors ensures the work meets international standards before delivery.', img: methodologyValidation },
            ]
        },
        sw: {
            heroLabel: "Miundombinu ya Kilugha",
            heroTitle: "Suluhu Sahihi kwa Athari za Kimataifa.",
            heroDesc: "Tunatengeneza mifumo ya mawasiliano inayoziba pengo kati ya tamaduni na sekta, tukitoa usahihi wa kilugha unaohitajika kwa shughuli za kiwango cha juu.",
            howItWorks: "Mbinu Zetu",
            howItWorksDesc: "Mchakato wetu umekita mizizi katika uhakiki wa kiufundi na akili ya kitamaduni, kuhakikisha kila neno linatumumika kwa madhumuni ya kimkakati.",
            requestQuote: "Anza Makadirio ya Kitaalamu",
            exploreServices: "Gundua Utaalamu",
            steps: [
                { step: '01', title: 'Uhakiki wa Kiufundi', desc: 'Tunaanza na uchambuzi wa kina wa mahitaji ya kiufundi ya hati yako na athari kwa hadhira iliyokusudiwa.', img: methodologyAudit },
                { step: '02', title: 'Uoanishaji wa Wataalamu', desc: 'Mradi wako unakabidhiwa kwa mwanaisimu mzawa mwenye utaalamu wa mada uliothibitishwa katika sekta yako mahususi.', img: methodologyPairing },
                { step: '03', title: 'Utekelezaji Sahihi', desc: 'Timu yetu inatekeleza mchakato wa tafsiri wa hatua nyingi, ikizingatia uhifadhi wa nuance na usahihi wa kiufundi.', img: methodologyExecution },
                { step: '04', title: 'Uhalali wa Ubora', desc: 'Uhakiki wa mwisho mkali na wahariri wakuu unahakikisha kazi inafikia viwango vya kimataifa kabla ya kukabidhiwa.', img: methodologyValidation },
            ]
        }
    };

    const c = content[language];

    return (
        <Box sx={{ bgcolor: '#FFFFFF' }}>
            <SEOHead
                title={language === 'en' ? "Professional Language Infrastructure | Inspire Translations" : "Miundombinu ya Lugha ya Kitaalamu | Inspire Translations"}
                description={c.heroDesc}
            />

            {/* Split Hero Design */}
            <Box sx={{
                minHeight: { xs: 'auto', md: '65vh' },
                display: 'flex',
                alignItems: 'stretch',
                flexDirection: { xs: 'column', md: 'row' },
                background: '#F7A11A',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Box sx={{
                    width: { xs: '100%', md: '55%' },
                    display: 'flex',
                    alignItems: 'center',
                    px: { xs: 3, sm: 6, md: 12 },
                    py: { xs: 18, sm: 22, md: 26 },
                    zIndex: 2,
                    bgcolor: '#F7A11A',
                    order: { xs: 2, md: 1 }
                }}>
                    <Box>
                        {/* Animated arrow label */}
                        <Box ref={heroRef} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2, overflow: 'hidden' }}>
                            <Box sx={{
                                height: 2, bgcolor: '#0D2B14',
                                width: heroInView ? 32 : 0,
                                transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
                            }} />
                            <Box sx={{
                                display: 'flex', alignItems: 'center',
                                transform: heroInView ? 'translateX(0) scale(1)' : 'translateX(-20px) scale(0.6)',
                                opacity: heroInView ? 1 : 0,
                                transition: 'opacity 0.4s ease 0.45s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.45s',
                            }}>
                                <ArrowForwardIcon sx={{ color: '#0D2B14', fontSize: 18 }} />
                            </Box>
                            <Box sx={{
                                transform: heroInView ? 'translateY(0)' : 'translateY(8px)',
                                opacity: heroInView ? 1 : 0,
                                transition: 'opacity 0.4s ease 0.6s, transform 0.4s ease 0.6s',
                            }}>
                                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#0D2B14', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                    {c.heroLabel}
                                </Typography>
                            </Box>
                        </Box>
                        <TypewriterText 
                            text={c.heroTitle}
                            variant="h1"
                            sx={{ 
                                color: '#0D2B14', 
                                fontWeight: 900, 
                                mb: 3, 
                                fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4.2rem' }, 
                                lineHeight: 1.1, 
                                fontFamily: '"Inknut Antiqua", serif' 
                            }}
                        />
                        <Typography sx={{ color: 'rgba(13, 43, 20, 0.8)', fontSize: { xs: '0.9rem', md: '1rem' }, maxWidth: 500, lineHeight: 1.8, fontFamily: '"Inknut Antiqua", serif', fontWeight: 500, mb: 4 }}>
                            {c.heroDesc}
                        </Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            <PillButton to={`/${language}/quote`} variant="dark">
                                {ui.getAQuote}
                            </PillButton>
                            <PillButton to="#services-grid" variant="dark" sx={{ bgcolor: 'transparent', color: '#0D2B14', borderColor: '#0D2B14' }}>
                                {c.exploreServices}
                            </PillButton>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    width: { xs: '100%', md: '45%' },
                    height: { xs: '300px', md: 'auto' },
                    position: 'relative',
                    order: { xs: 1, md: 2 },
                    borderLeft: { md: '2px solid #0D2B14' }
                }}>
                    <Box 
                        sx={{ 
                            width: '100%', 
                            height: '100%', 
                            minHeight: '100%',
                            background: `url(${serviceImages['written-translation']}) center/cover no-repeat`,
                            filter: 'grayscale(0.2) contrast(1.1)',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                inset: 0,
                                background: {
                                    xs: 'linear-gradient(to top, rgba(13, 43, 20, 0.8) 0%, transparent 100%)',
                                    md: 'rgba(13, 43, 20, 0.15)'
                                }
                            }
                        }} 
                    />
                </Box>
            </Box>

            {/* What We Offer - Vertical Cards Grid */}
            <Box id="services-grid" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#FFFFFF' }}>
                <Container maxWidth="lg">
                    <Box sx={{ mb: 10, textAlign: 'left' }}>
                        <FadeInUp>
                            <AnimatedPreTitle text={ui.whatWeOffer} color="#F7A11A" align="flex-start" />
                            <TypewriterText 
                                text={ui.comprehensiveSolutions}
                                variant="h2"
                                sx={{ fontFamily: '"Inknut Antiqua", serif', color: '#0D2B14', fontWeight: 800, fontSize: { xs: '2.2rem', md: '3rem' }, mb: 2 }}
                            />
                            <Box sx={{ width: 80, height: 4, bgcolor: '#F7A11A' }} />
                        </FadeInUp>
                    </Box>

                    <Box sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
                        gap: { xs: 4, md: 6 }
                    }}>
                        {services.map((service, i) => (
                            <FadeInUp key={service.id} delay={i * 0.1}>
                                <Box sx={{ 
                                    bgcolor: '#FFFFFF', borderRadius: 0, 
                                    display: 'flex', flexDirection: 'column',
                                    height: '100%', border: '1.5px solid #0D2B14',
                                    overflow: 'hidden', position: 'relative',
                                    transition: 'none',
                                    '&:hover': {
                                        transform: 'none',
                                        boxShadow: 'none'
                                    }
                                }}>
                                    <Box sx={{ 
                                        width: '100%', 
                                        height: { xs: '220px', md: '280px' },
                                        position: 'relative', overflow: 'hidden',
                                        borderBottom: '1.5px solid #0D2B14'
                                    }}>
                                        <Box 
                                            component="img" 
                                            src={service.img || serviceImages[service.id] || heroWoman} 
                                            sx={{ 
                                                width: '100%', 
                                                height: '100%', 
                                                objectFit: 'cover'
                                            }} 
                                        />
                                        <Box sx={{ 
                                            position: 'absolute', top: 0, left: 0, 
                                            bgcolor: '#F7A11A', color: '#0D2B14', 
                                            px: 2, py: 1, fontFamily: 'Outfit', 
                                            fontWeight: 900, fontSize: '0.75rem', 
                                            textTransform: 'uppercase', letterSpacing: '0.15em' 
                                        }}>
                                            {service.id.split('-')[0]}
                                        </Box>
                                    </Box>

                                    <Box sx={{ p: { xs: 4, md: 5 }, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                        <Typography sx={{ 
                                            fontFamily: '"Inknut Antiqua", serif', 
                                            fontWeight: 700, color: '#0D2B14', 
                                            fontSize: '1.3rem', lineHeight: 1.2, mb: 2
                                        }}>
                                            {t(service.title)}
                                        </Typography>

                                        <Typography sx={{ 
                                            color: 'rgba(13, 43, 20, 0.8)', fontSize: '0.9rem', 
                                            lineHeight: 1.8, fontFamily: '"Inknut Antiqua", serif', 
                                            mb: 3, fontWeight: 500 
                                        }}>
                                            {t(service.shortDesc)}
                                        </Typography>

                                        <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {t(service.features).map((feature, idx) => (
                                                <Box 
                                                    key={idx} 
                                                    sx={{ 
                                                        bgcolor: 'rgba(13, 43, 20, 0.03)', 
                                                        color: '#0D2B14', 
                                                        px: 1.5, py: 0.4, 
                                                        borderRadius: 0, 
                                                        border: '1px solid rgba(13, 43, 20, 0.1)', 
                                                        fontSize: '0.65rem', 
                                                        fontFamily: 'Outfit', 
                                                        fontWeight: 700, 
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em'
                                                    }}
                                                >
                                                    {feature}
                                                </Box>
                                            ))}
                                        </Box>

                                        <Box sx={{ mt: 'auto' }}>
                                            <PillButton to={`/${language}/services/${service.id}`} variant="dark">
                                                {ui.readMore}
                                            </PillButton>
                                        </Box>
                                    </Box>
                                </Box>
                            </FadeInUp>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* Redesigned Methodology Section with Images */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F7A11A', position: 'relative', overflow: 'hidden' }}>
                <Container maxWidth="lg">
                    {/* Header with Animation - Left Aligned */}
                    <Box sx={{ mb: 10, textAlign: 'left' }}>
                        <FadeInUp>
                            <AnimatedPreTitle text={c.howItWorks} color="#0D2B14" align="flex-start" />
                            <TypewriterText 
                                text={language === 'en' ? "Engineered for Impact." : "Ilioundwa kwa Matokeo."}
                                variant="h2"
                                sx={{ 
                                    color: '#0D2B14', fontFamily: '"Inknut Antiqua", serif', 
                                    fontWeight: 800, mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' },
                                    textAlign: 'left'
                                }}
                            />
                            <Typography sx={{ 
                                color: '#0D2B14', opacity: 0.8, lineHeight: 2, 
                                fontSize: '1.1rem', fontFamily: '"Inknut Antiqua", serif', 
                                fontWeight: 500, maxWidth: 650, textAlign: 'left'
                            }}>
                                {c.howItWorksDesc}
                            </Typography>
                        </FadeInUp>
                    </Box>

                    {/* Methodology Steps with Alternating Layout */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 8, md: 14 } }}>
                        {c.steps.map((step, i) => (
                            <Box key={step.step} sx={{ 
                                display: 'flex', 
                                flexDirection: { xs: 'column', md: i % 2 === 0 ? 'row' : 'row-reverse' },
                                alignItems: 'center',
                                gap: { xs: 4, md: 10 }
                            }}>
                                {/* Image Frame */}
                                <Box sx={{ width: { xs: '100%', md: '50%' }, position: 'relative' }}>
                                    <FadeInUp delay={i * 0.1}>
                                        <Box sx={{ position: 'relative' }}>
                                            {/* Offset Accent Block */}
                                            <Box sx={{ 
                                                position: 'absolute', 
                                                top: -15, 
                                                [i % 2 === 0 ? 'left' : 'right']: -15, 
                                                width: '100%', height: '100%', 
                                                border: '2px solid #0D2B14', zIndex: 0 
                                            }} />
                                            {/* Main Image */}
                                            <Box sx={{ 
                                                bgcolor: '#FFFFFF', p: 1, position: 'relative', zIndex: 1,
                                                border: '2px solid #0D2B14',
                                                transition: 'none'
                                            }}>
                                                <Box component="img" src={step.img} sx={{ width: '100%', height: { xs: '250px', md: '350px' }, objectFit: 'cover' }} />
                                                
                                                {/* Floating Step Number Marker */}
                                                <Box sx={{ 
                                                    position: 'absolute', 
                                                    bottom: 20, 
                                                    [i % 2 === 0 ? 'right' : 'left']: -25, 
                                                    width: 60, height: 60, 
                                                    bgcolor: '#0D2B14', 
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: '#F7A11A', fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.5rem',
                                                    zIndex: 10
                                                }}>
                                                    {step.step}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </FadeInUp>
                                </Box>

                                {/* Text Content */}
                                <Box sx={{ width: { xs: '100%', md: '50%' }, textAlign: { xs: 'center', md: 'left' } }}>
                                    <FadeInUp delay={0.2}>
                                        <Typography sx={{ 
                                            color: '#0D2B14', fontFamily: '"Inknut Antiqua", serif', 
                                            fontWeight: 800, fontSize: { xs: '1.6rem', md: '2.2rem' }, 
                                            mb: 3, lineHeight: 1.1
                                        }}>
                                            {step.title}
                                        </Typography>
                                        <Typography sx={{ 
                                            color: '#0D2B14', opacity: 0.9, lineHeight: 2, 
                                            fontSize: '1rem', fontFamily: '"Inknut Antiqua", serif', 
                                            fontWeight: 500, maxWidth: 500
                                        }}>
                                            {step.desc}
                                        </Typography>
                                    </FadeInUp>
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    {/* Bottom CTA */}
                    <FadeInUp delay={0.5}>
                        <Box sx={{ textAlign: 'center', mt: { xs: 10, md: 16 } }}>
                            <PillButton to={`/${language}/quote`} variant="dark">
                                {c.requestQuote}
                            </PillButton>
                        </Box>
                    </FadeInUp>
                </Container>
            </Box>

            <FAQSection />
            <CTASection />
        </Box>
    );
};

export default ServicesPage;
