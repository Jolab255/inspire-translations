import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import SEOHead from '../../components/seo/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';
import { FadeInUp, TypewriterText, AnimatedPreTitle } from '../../components/common/Animations';
import CTASection from '../../components/common/CTASection';

// Real Gallery Assets
import imgARSO from '../../assets/images/ARSO_TC 67 & TC 68 meetings.png';
import imgCities from '../../assets/images/Cities and Safe Public Spaces Global Leaders’ Forum .png';
import imgLawEnforcement from '../../assets/images/Large-scale law enforcers training.png';
import imgFoodSafety from '../../assets/images/SCapacity Building for Food Safety Laboratories in West Africa Official Launch of the FAO-AOAC Project in Dakar.png';
import imgBorderGov from '../../assets/images/ScreRegional Technical Working Group Meeting on Border Governance and Implementation of the 12th JSC Decisions on Borders in the EAC.png';
import imgBlueprint from '../../assets/images/ScrThe launch of the Preparation of the Second Blueprint for improving the business and investment environment President’s Office Planning and Investment.png';
import imgSADC from '../../assets/images/Tanzania Stakeholder Consultations on SADC RAIP 2017-2022 Shadow Report.png';
import imgAEEP from '../../assets/images/The AEEP-AEF High-Level Policymaker Evening Meeting.png';
import imgAUDA from '../../assets/images/The AUDA NEPAD Afternoon Partner Meeting Workshops on CMP Phase 3.png';
import imgYouthLand from '../../assets/images/The Fourth International Conference on Youth and Land Governance in Africa.png';
import imgWomenTrans from '../../assets/images/Women in Transportation Sector Conference.png';
import imgLogistics from '../../assets/images/conference_logistics.png';

const galleryItemsData = [
    { id: 1, src: imgARSO, title: { en: 'ARSO TC 67 & TC 68 Meetings', sw: 'Mikutano ya ARSO TC 67 & TC 68' }, category: { en: 'Conference', sw: 'Mkutano' }, span: 1 },
    { id: 2, src: imgCities, title: { en: 'Global Leaders’ Forum', sw: 'Jukwaa la Viongozi wa Kimataifa' }, category: { en: 'Forum', sw: 'Jukwaa' }, span: 2 },
    { id: 3, src: imgLawEnforcement, title: { en: 'Law Enforcers Training', sw: 'Mafunzo ya Wasimamizi wa Sheria' }, category: { en: 'Training', sw: 'Mafunzo' }, span: 1 },
    { id: 4, src: imgFoodSafety, title: { en: 'FAO-AOAC Project Launch', sw: 'Uzinduzi wa Mradi wa FAO-AOAC' }, category: { en: 'Project', sw: 'Mradi' }, span: 1 },
    { id: 5, src: imgBorderGov, title: { en: 'Border Governance Meeting', sw: 'Mkutano wa Utawala wa Mipakani' }, category: { en: 'Governance', sw: 'Utawala' }, span: 1 },
    { id: 6, src: imgBlueprint, title: { en: 'Business Environment Blueprint', sw: 'Mpango wa Mazingira ya Biashara' }, category: { en: 'Events', sw: 'Hafla' }, span: 1 },
    { id: 7, src: imgSADC, title: { en: 'SADC RAIP Consultations', sw: 'Mashauriano ya SADC RAIP' }, category: { en: 'Conference', sw: 'Mkutano' }, span: 1 },
    { id: 8, src: imgAEEP, title: { en: 'High-Level Policymaker Meeting', sw: 'Mkutano wa Watunga Sera wa Ngazi ya Juu' }, category: { en: 'Forum', sw: 'Jukwaa' }, span: 1 },
    { id: 9, src: imgAUDA, title: { en: 'AUDA NEPAD Workshops', sw: 'Warsha za AUDA NEPAD' }, category: { en: 'Training', sw: 'Mafunzo' }, span: 2 },
    { id: 10, src: imgYouthLand, title: { en: 'Conference on Youth & Land', sw: 'Mkutano wa Vijana na Ardhi' }, category: { en: 'Conference', sw: 'Mkutano' }, span: 1 },
    { id: 11, src: imgWomenTrans, title: { en: 'Women in Transportation', sw: 'Wanawake katika Sekta ya Usafirishaji' }, category: { en: 'Events', sw: 'Hafla' }, span: 1 },
    { id: 12, src: imgLogistics, title: { en: 'Regional Logistics Summit', sw: 'Mkutano wa Vifaa wa Kikanda' }, category: { en: 'Project', sw: 'Mradi' }, span: 1 },
];

const GalleryItem = ({ item, t, onClick, delay }) => {
    return (
        <FadeInUp delay={delay} style={{ height: '100%' }}>
            <Box
                onClick={onClick}
                sx={{
                    position: 'relative',
                    width: '100%',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    '&:hover .overlay': { opacity: 1 },
                    '&:hover img': { transform: 'scale(1.08)' },
                    bgcolor: '#f0f0f0',
                    border: '1px solid rgba(0,0,0,0.05)',
                    lineHeight: 0 // Remove extra space at bottom of image
                }}
            >
                <Box
                    component="img"
                    src={item.src}
                    alt={t(item.title)}
                    sx={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        transition: 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)',
                    }}
                />
                <Box
                    className="overlay"
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'rgba(26, 92, 42, 0.85)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        p: 3,
                        opacity: 0,
                        transition: 'opacity 0.4s ease',
                        zIndex: 2
                    }}
                >
                    <Chip 
                        label={t(item.category)} 
                        size="small" 
                        sx={{ 
                            bgcolor: '#F7A11A', 
                            color: '#1A5C2A', 
                            fontWeight: 700, 
                            fontFamily: 'Outfit', 
                            mb: 1.5, 
                            alignSelf: 'flex-start',
                            fontSize: '0.7rem'
                        }} 
                    />
                    <Typography 
                        sx={{ 
                            color: '#FFFFFF', 
                            fontFamily: '"Inknut Antiqua", serif', 
                            fontWeight: 700, 
                            fontSize: '0.95rem',
                            lineHeight: 1.4
                        }}
                    >
                        {t(item.title)}
                    </Typography>
                </Box>
            </Box>
        </FadeInUp>
    );
};

const GalleryPage = () => {
    const { ref: galleryRef, inView } = useInView({ triggerOnce: false, threshold: 0.3 });
    const { language, t } = useLanguage();
    const ui = uiTranslations[language];
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [filter, setFilter] = useState('All');

    const content = {
        en: {
            heroLabel: "Visual Journey",
            heroTitle: "Moments of Impact",
            heroDesc: "A professional showcase of our on-site interpretation, high-level conferences, and language training sessions across the continent.",
            all: "All",
        },
        sw: {
            heroLabel: "Safari ya Picha",
            heroTitle: "Muda wa Matokeo",
            heroDesc: "Maonyesho ya kitaalamu ya ukalimani wetu, mikutano ya ngazi ya juu, na vipindi vya mafunzo ya lugha kote barani.",
            all: "Zote",
        }
    };

    const c = content[language];

    const categories = useMemo(() => {
        return [c.all, ...new Set(galleryItemsData.map((g) => t(g.category)))];
    }, [c.all, t]);

    const filteredItems = useMemo(() => {
        return filter === c.all ? galleryItemsData : galleryItemsData.filter((g) => t(g.category) === filter);
    }, [filter, c.all, t]);

    return (
        <>
            <SEOHead
                title={language === 'en' ? "Gallery | Inspire Translations Tanzania" : "Picha | Inspire Translations Tanzania"}
                description={c.heroDesc}
            />

            {/* Split Hero Design */}
            <Box sx={{
                minHeight: { xs: 'auto', md: '65vh' },
                display: 'flex',
                alignItems: 'stretch',
                flexDirection: { xs: 'column', md: 'row' },
                background: '#1A5C2A',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Box sx={{
                    width: { xs: '100%', md: '55%' },
                    display: 'flex',
                    alignItems: 'center',
                    px: { xs: 3, sm: 6, md: 12 },
                    py: { xs: 10, sm: 12, md: 15 },
                    zIndex: 2,
                    bgcolor: '#1A5C2A'
                }}>
                    <Box>
                        {/* Animated arrow label */}
                        <Box ref={galleryRef} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2, overflow: 'hidden' }}>
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
                                    {c.heroLabel}
                                </Typography>
                            </Box>
                        </Box>
                        <TypewriterText 
                            text={c.heroTitle}
                            variant="h1"
                            sx={{ 
                                color: '#FFFFFF', 
                                fontWeight: 900, 
                                mb: 3, 
                                fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4.2rem' }, 
                                lineHeight: 1.1, 
                                fontFamily: '"Inknut Antiqua", serif' 
                            }}
                        />
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: '0.9rem', md: '1rem' }, maxWidth: 500, lineHeight: 1.8, fontFamily: '"Inknut Antiqua", serif' }}>
                            {c.heroDesc}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    width: { xs: '100%', md: '45%' },
                    minHeight: { xs: '300px', md: 'auto' },
                    position: 'relative'
                }}>
                    <Box 
                        sx={{ 
                            width: '100%', 
                            height: '100%', 
                            background: `url(${imgARSO}) center/cover no-repeat`,
                            filter: 'grayscale(0.3) contrast(1.1)',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                inset: 0,
                                bgcolor: 'rgba(26, 92, 42, 0.2)'
                            }
                        }} 
                    />
                </Box>
            </Box>

            {/* Gallery Section */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#FFFFFF' }}>
                <Container maxWidth="lg">
                    {/* Interactive Filter System */}
                    <Box sx={{ mb: 10 }}>
                        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
                            {categories.map((cat) => (
                                <Box
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    sx={{
                                        px: 3,
                                        py: 1,
                                        cursor: 'pointer',
                                        bgcolor: filter === cat ? '#F7A11A' : 'transparent',
                                        border: '2px solid',
                                        borderColor: filter === cat ? '#F7A11A' : '#EEEEEE',
                                        borderRadius: '50px',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: '#F7A11A',
                                            bgcolor: filter === cat ? '#F7A11A' : 'rgba(247, 161, 26, 0.05)'
                                        }
                                    }}
                                >
                                    <Typography sx={{ 
                                        fontFamily: 'Outfit', 
                                        fontWeight: 700, 
                                        fontSize: '0.85rem',
                                        color: filter === cat ? '#1A5C2A' : '#444444',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        {cat}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Mosaic / Masonry Layout */}
                    <Box sx={{ 
                        columnCount: { xs: 1, sm: 2, md: 3 },
                        columnGap: 2,
                        width: '100%'
                    }}>
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((item, i) => (
                                <Box 
                                    key={item.id}
                                    component={motion.div}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    sx={{ 
                                        breakInside: 'avoid',
                                        mb: 2,
                                        display: 'block'
                                    }}
                                >
                                    <GalleryItem 
                                        item={item} 
                                        t={t} 
                                        delay={0}
                                        onClick={() => { setIndex(i); setOpen(true); }}
                                    />
                                </Box>
                            ))}
                        </AnimatePresence>
                    </Box>

                    {/* Lightbox */}
                    <Lightbox
                        open={open}
                        close={() => setOpen(false)}
                        index={index}
                        slides={filteredItems.map((item) => ({ 
                            src: item.src, 
                            alt: t(item.title) 
                        }))}
                        styles={{ container: { backgroundColor: "rgba(13, 43, 20, 0.98)" } }}
                    />
                </Container>
            </Box>
            <CTASection />
        </>
    );
};

export default GalleryPage;
