import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SEOHead from '../../components/seo/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';

import projectHeroImg from '../../assets/images/project_hero.png';
import ctaImage from '../../assets/images/CTA.png';
import imgInterpretation from '../../assets/images/onsite_interpretation.png';
import imgTranslation from '../../assets/images/written_translation.png';
import imgConference from '../../assets/images/conference_logistics.png';

// Import specific project images
import imgSafeCities from '../../assets/images/Cities and Safe Public Spaces Global Leaders’ Forum .png';
import imgARSO from '../../assets/images/ARSO_TC 67 & TC 68 meetings.png';
import imgBorder from '../../assets/images/ScreRegional Technical Working Group Meeting on Border Governance and Implementation of the 12th JSC Decisions on Borders in the EAC.png';
import imgLab from '../../assets/images/SCapacity Building for Food Safety Laboratories in West Africa Official Launch of the FAO-AOAC Project in Dakar.png';
import imgBlueprint from '../../assets/images/ScrThe launch of the Preparation of the Second Blueprint for improving the business and investment environment President’s Office Planning and Investment.png';
import imgWomenTrans from '../../assets/images/Women in Transportation Sector Conference.png';
import imgAEEP from '../../assets/images/The AEEP-AEF High-Level Policymaker Evening Meeting.png';
import imgAUDA from '../../assets/images/The AUDA NEPAD Afternoon Partner Meeting Workshops on CMP Phase 3.png';
import imgSADC from '../../assets/images/Tanzania Stakeholder Consultations on SADC RAIP 2017-2022 Shadow Report.png';
import imgPolice from '../../assets/images/Large-scale law enforcers training.png';
import imgYouth from '../../assets/images/The Fourth International Conference on Youth and Land Governance in Africa.png';

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

const interpretationProjects = [
    { 
        id: 'i1', 
        title: '7th Safe Cities and Safe Public Spaces Global Leaders’ Forum', 
        client: 'UN Women', 
        place: 'Zanzibar, Tanzania', 
        year: '2025', 
        desc: 'Simultaneous interpretation for international leaders on safety and urban governance.',
        fullDesc: 'We provided comprehensive simultaneous interpretation services for the 7th Global Leaders’ Forum. Our team handled complex discussions on urban safety, policy development, and international cooperation, ensuring that leaders from across the globe could communicate with technical precision and cultural nuance.',
        img: imgSafeCities 
    },
    { 
        id: 'i2', 
        title: 'ARSO/TC 67 & TC 68 meetings', 
        client: 'African Organization for Standardization (ARSO)', 
        place: 'Zanzibar, Tanzania', 
        year: '2025', 
        desc: 'Technical interpretation for standardization meetings across multiple language pairs.',
        fullDesc: 'During the ARSO technical committee meetings, Inspire Translations delivered high-level technical interpretation. We bridged the communication gap for experts discussing continental standards, requiring deep knowledge of engineering and regulatory terminology.',
        img: imgARSO 
    },
    { 
        id: 'i3', 
        title: 'Regional Technical Working Group Meeting on Border Governance', 
        client: 'GIZ GmbH', 
        place: 'Dar es Salaam, Tanzania', 
        year: '2025', 
        desc: 'Expert interpretation for discussions on EAC border implementation.',
        fullDesc: 'Supporting GIZ and the East African Community (EAC), we facilitated technical discussions on border governance. Our interpreters ensured that complex legal and logistical frameworks were accurately conveyed between regional stakeholders.',
        img: imgBorder 
    },
    { 
        id: 'i4', 
        title: 'Strengthening African laboratories capacity building', 
        client: 'ARSO', 
        place: 'Dar es Salaam, Tanzania', 
        year: '2025', 
        desc: 'Technical support and interpretation for GLP alignment workshops.',
        fullDesc: 'This project involved specialized interpretation for laboratory capacity building. We focused on ISO/IEC 17025:2017 standards and Good Laboratory Practices (GLP), supporting African scientists in their mission to align with international quality benchmarks.',
        img: imgLab 
    },
    { 
        id: 'i5', 
        title: 'Preparation of the Second Blueprint launch', 
        client: 'President’s Office Planning and Investment', 
        place: 'Dar es Salaam, Tanzania', 
        year: '2025', 
        desc: 'Interpretation for high-level government launch regarding business environment.',
        fullDesc: 'We were honored to provide interpretation for the President’s Office during the launch of the Second Blueprint for business and investment. Our services facilitated clear communication between government officials and international investors.',
        img: imgBlueprint 
    },
    { 
        id: 'i6', 
        title: 'Women in Transportation Sector Conference', 
        client: 'TASAC & Womesa', 
        place: 'Dar es Salaam, Tanzania', 
        year: '2025', 
        desc: 'Supported the conference with high-quality simultaneous interpretation.',
        fullDesc: 'Collaborating with the UK Department for Transportation and TASAC, we provided interpretation for this landmark conference focusing on women’s leadership in the maritime and transportation industries.',
        img: imgWomenTrans 
    },
    { 
        id: 'i7', 
        title: 'The AEEP-AEF High-Level Policymaker Evening Meeting', 
        client: 'GIZ GmbH', 
        place: 'Dar es Salaam, Tanzania', 
        year: '2025', 
        desc: 'Evening session interpretation for energy policymakers.',
        fullDesc: 'Our team facilitated high-level diplomatic discussions on energy policy between African and European partners, providing seamless interpretation in a high-stakes evening session.',
        img: imgAEEP 
    },
    { 
        id: 'i8', 
        title: 'The AUDA NEPAD Afternoon Partner Meeting Workshops', 
        client: 'GIZ GmbH', 
        place: 'Dar es Salaam, Tanzania', 
        year: '2025', 
        desc: 'Workshop interpretation for partners on CMP Phase 3.',
        fullDesc: 'We provided technical workshop interpretation for AUDA-NEPAD partners, focusing on the Continental Master Plan (CMP) Phase 3 implementation strategies.',
        img: imgAUDA 
    }
];

const translationProjects = [
    { 
        id: 't1', 
        title: 'Translation of the Policy Briefs', 
        client: 'ESRF', 
        place: 'Dar es Salaam, Tanzania', 
        year: '2025', 
        desc: 'Professional translation of economic policy briefs.',
        fullDesc: 'Inspire Translations handled the comprehensive translation of policy research briefs for the Economic and Social Research Foundation, ensuring complex economic data was accurately localized.',
        img: imgTranslation 
    },
    { 
        id: 't2', 
        title: 'Translation of the Commercial Driver’s Manual', 
        client: 'Pennsylvania Dept of Transportation', 
        place: 'Dar es Salaam, Tanzania', 
        year: '2025', 
        desc: 'Technical translation of automotive safety manuals.',
        fullDesc: 'A specialized project involving the translation of highly technical safety and operational manuals for commercial driving standards, maintaining strict adherence to regulatory terminology.',
        img: imgTranslation 
    },
    { 
        id: 't3', 
        title: 'Translation of content for CO-CREATE workshops', 
        client: 'Agakhan Foundation', 
        place: 'Dar es Salaam, Tanzania', 
        year: '2024', 
        desc: 'Workshop materials translation for community programs.',
        fullDesc: 'We translated a wide range of interactive workshop materials for the Aga Khan Foundation, helping facilitate community engagement and health education programs.',
        img: imgTranslation 
    },
    { 
        id: 't4', 
        title: 'Translation of contents for Kijana Nahodha Project', 
        client: 'USAID Tanzania', 
        place: 'Dar es Salaam, Tanzania', 
        year: '2024', 
        desc: 'Youth empowerment curriculum and content translation.',
        fullDesc: 'Working with USAID, we translated educational and vocational training content for the Kijana Nahodha project, empowering Tanzanian youth with accessible learning materials.',
        img: imgTranslation 
    }
];

const ProjectCard = ({ project, onReadMore }) => {
    return (
        <FadeInUp>
            <Card sx={{ 
                height: '100%', 
                borderRadius: 0, 
                border: '1px solid rgba(255,255,255,0.1)', 
                position: 'relative',
                transition: 'none',
                bgcolor: '#1A5C2A', // Green background
                '&:hover': {
                    transform: 'none',
                    boxShadow: 'none'
                }
            }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    {/* Project Title */}
                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#FFFFFF', fontSize: { xs: '1.05rem', md: '1.15rem' }, mb: 2, lineHeight: 1.4 }}>
                        {project.title}
                    </Typography>

                    {/* Separator Line */}
                    <Box sx={{ width: '40px', height: 3, bgcolor: '#F7A11A', mb: 3 }} />
                    
                    {/* 2-box split grid for details and image */}
                    <Box sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
                        gap: 3, 
                        mb: 3,
                        alignItems: 'center'
                    }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <GroupsIcon sx={{ fontSize: 18, color: '#F7A11A' }} />
                                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', color: '#F7A11A', fontSize: '0.8rem', fontWeight: 700 }}>
                                    {project.client}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <PlaceIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.7)' }} />
                                <Typography sx={{ fontFamily: 'Outfit', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                                    {project.place}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <CalendarTodayIcon sx={{ fontSize: 18, color: '#FFFFFF' }} />
                                <Typography sx={{ fontFamily: 'Outfit', color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700 }}>
                                    {project.year}
                                </Typography>
                            </Box>
                        </Box>
                        
                        <Box sx={{ width: '100%', height: 120, borderRadius: 0, overflow: 'hidden' }}>
                            <Box component="img" src={project.img} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>
                    </Box>

                    {/* Description Wrapped in White Background */}
                    <Box sx={{ bgcolor: '#FFFFFF', p: 2.5, borderRadius: 0, mb: 3 }}>
                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', color: '#4A4A6A', fontSize: '0.8rem', lineHeight: 1.6, fontWeight: 500 }}>
                            {project.desc}
                        </Typography>
                    </Box>

                    {/* Read More Button with signature animation */}
                    <Box 
                        component={motion.button} 
                        whileHover="hover" 
                        initial="rest" 
                        animate="rest"
                        onClick={() => onReadMore(project)}
                        sx={{ 
                            background: 'none', 
                            border: 'none', 
                            p: 0, 
                            cursor: 'pointer', 
                            display: 'flex', 
                            alignItems: 'center',
                            gap: 1.5
                        }}
                    >
                        <Typography component={motion.span} variants={{ rest: { x: 0 }, hover: { x: 5 } }} sx={{ color: '#F7A11A', fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: '0.85rem' }}>
                            Read More
                        </Typography>
                        <motion.div variants={{ rest: { x: 0 }, hover: { x: 8 } }} transition={{ type: 'spring', stiffness: 600, damping: 15 }}>
                            <ArrowForwardIcon sx={{ color: '#F7A11A', fontSize: 18 }} />
                        </motion.div>
                    </Box>
                </CardContent>
            </Card>
        </FadeInUp>
    );
};

const ProjectModal = ({ project, open, onClose }) => {
    if (!project) return null;
    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}
        >
            <Box component={motion.div} initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} sx={{ 
                position: 'relative', 
                width: '100%', 
                maxWidth: 900, 
                maxHeight: '90vh',
                bgcolor: '#FFFFFF', 
                boxShadow: '0 40px 100px rgba(0,0,0,0.2)', 
                p: 0, 
                overflowY: 'auto',
                borderRadius: 0,
                outline: 'none',
                '&::-webkit-scrollbar': { width: '6px' },
                '&::-webkit-scrollbar-track': { bgcolor: '#F1F1F1' },
                '&::-webkit-scrollbar-thumb': { bgcolor: '#1A5C2A' }
            }}>
                {/* Sticky Close Header */}
                <Box sx={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', justifyContent: 'flex-end', p: 1, pointerEvents: 'none' }}>
                    <IconButton onClick={onClose} sx={{ 
                        pointerEvents: 'auto',
                        bgcolor: 'rgba(255,255,255,0.9)', 
                        backdropFilter: 'blur(10px)',
                        color: '#0D2B14',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        '&:hover': { bgcolor: '#F7A11A', color: '#FFF' } 
                    }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                
                <Box sx={{ p: 0 }}>
                    {/* Hero Image in Modal */}
                    <Box sx={{ width: '100%', height: { xs: 250, md: 400 }, overflow: 'hidden' }}>
                        <Box component="img" src={project.img} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>

                    {/* Content Section */}
                    <Box sx={{ p: { xs: 4, md: 8 } }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                            <Chip 
                                label={project.year} 
                                sx={{ 
                                    bgcolor: 'rgba(26, 92, 42, 0.1)', 
                                    color: '#1A5C2A', 
                                    fontWeight: 800, 
                                    fontFamily: 'Outfit',
                                    borderRadius: 0,
                                    fontSize: '0.9rem'
                                }} 
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, borderLeft: '2px solid rgba(0,0,0,0.1)' }}>
                                <PlaceIcon sx={{ color: '#F7A11A', fontSize: 20 }} />
                                <Typography sx={{ fontFamily: 'Outfit', fontWeight: 600, color: '#4A4A6A' }}>{project.place}</Typography>
                            </Box>
                        </Box>

                        <Typography sx={{ 
                            fontFamily: '"Inknut Antiqua", serif', 
                            fontWeight: 800, 
                            color: '#0D2B14', 
                            fontSize: { xs: '1.6rem', md: '2.2rem' }, 
                            lineHeight: 1.2, 
                            mb: 4 
                        }}>
                            {project.title}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6, p: 3, bgcolor: '#F8F9FA', borderLeft: '4px solid #F7A11A' }}>
                            <GroupsIcon sx={{ color: '#1A5C2A', fontSize: 28 }} />
                            <Box>
                                <Typography sx={{ fontFamily: 'Outfit', fontWeight: 500, color: '#9E9E9E', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Client</Typography>
                                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', color: '#1A5C2A', fontWeight: 700, fontSize: '1.1rem' }}>{project.client}</Typography>
                            </Box>
                        </Box>

                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#0D2B14', mb: 2, fontSize: '1.1rem' }}>
                            Project Scope & Impact
                        </Typography>
                        
                        <Typography sx={{ 
                            fontFamily: 'Outfit', 
                            color: '#4A4A6A', 
                            lineHeight: 2, 
                            fontSize: '1.05rem',
                            mb: 4,
                            whiteSpace: 'pre-line'
                        }}>
                            {project.fullDesc}
                        </Typography>

                        <Box sx={{ pt: 4, borderTop: '1px solid rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'center' }}>
                            <Button 
                                onClick={onClose}
                                variant="contained" 
                                sx={{ 
                                    bgcolor: '#1A5C2A', 
                                    color: '#FFF', 
                                    px: 6, 
                                    py: 1.5, 
                                    borderRadius: 50, 
                                    fontFamily: 'Outfit', 
                                    fontWeight: 700,
                                    '&:hover': { bgcolor: '#0D2B14' }
                                }}
                            >
                                Close Project
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

const ProjectsPage = () => {
    const { language } = useLanguage();
    const ui = uiTranslations[language];
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleReadMore = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const content = {
        en: {
            heroTitle: "Our Projects",
            heroDesc: "Showcasing our commitment to linguistic precision and cultural excellence across every mission.",
            moreBtn: "Explore Our Work",
            interpretation: "Interpretation Projects",
            translation: "Translation Projects",
            readyTitle: "Ready to Start Your Project?",
            readyDesc: "Let's discuss how we can bring precision and cultural insight to your next mission.",
            contactBtn: "Contact Us Today"
        },
        sw: {
            heroTitle: "Miradi Yetu",
            heroDesc: "Kuonyesha kujitolea kwetu kwa usahihi wa kilugha na ubora wa kitamaduni katika kila mradi.",
            moreBtn: "Chunguza Kazi Zetu",
            interpretation: "Miradi ya Ukalimani",
            translation: "Miradi ya Tafsiri",
            readyTitle: "Uko Tayari Kuanza Mradi Wako?",
            readyDesc: "Tujadili jinsi tunavyoweza kuleta usahihi na uelewa wa kitamaduni katika mradi wako ujao.",
            contactBtn: "Wasiliana Nasi Leo"
        }
    };

    const c = content[language];

    return (
        <>
            <SEOHead
                title={language === 'en' ? "Our Projects | Inspire Translations Portfolio" : "Miradi Yetu | Kazi za Inspire Translations"}
                description={language === 'en' ? "Explore our successful interpretation and translation projects." : "Chunguza miradi yetu ya ukalimani na tafsiri iliyofanikiwa."}
            />

            {/* Page Hero - Full-Width Green Gradient with Floating White Content Box */}
            <Box sx={{
                height: { xs: 'auto', md: '100vh' },
                minHeight: { xs: '600px', md: '100vh' },
                pt: { xs: '70px', md: '84px' }, // Header offset
                pb: 0,
                display: 'flex',
                alignItems: 'stretch',
                background: 'linear-gradient(135deg, #1A5C2A 0%, #0D2B14 100%)', // Green Theme
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Full-Height White Box (35% width, with margin-left) */}
                <Box sx={{
                    display: 'flex',
                    width: { xs: '100%', md: '35%' },
                    ml: { xs: 0, md: '5%' }, // Margin from left edge
                    bgcolor: '#FFFFFF',
                    zIndex: 10,
                    px: { xs: 4, sm: 6, md: 8 },
                    py: { xs: 8, md: 0 },
                    flexDirection: 'column',
                    justifyContent: 'center',
                    boxShadow: '20px 0 60px rgba(0,0,0,0.1)',
                    borderRadius: 0
                }}>
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                        <Typography variant="h1" sx={{ color: '#0D2B14', fontWeight: 900, mb: 3, fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' }, lineHeight: 1.1, fontFamily: '"Inknut Antiqua", serif' }}>
                            {c.heroTitle}
                        </Typography>
                        <Typography sx={{ color: '#4A4A6A', fontSize: '1rem', lineHeight: 1.8, mb: 5, fontFamily: '"Inknut Antiqua", serif' }}>
                            {c.heroDesc}
                        </Typography>
                        
                        <Box
                            component={motion.a}
                            whileHover="hover"
                            initial="rest"
                            animate="rest"
                            href="#projects"
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
                                    fontSize: '0.85rem',
                                    px: 4,
                                    lineHeight: '56px',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {c.moreBtn}
                            </Typography>
                            <Box sx={{ width: 56, height: 56, flexShrink: 0, bgcolor: '#F7A11A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                    </motion.div>
                </Box>

                {/* Right Side: project_hero Image */}
                <Box sx={{
                    flexGrow: 1,
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 5
                }}>
                    <Box
                        component={motion.img}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        src={projectHeroImg}
                        alt="Project Hero"
                        sx={{
                            maxWidth: '90%',
                            maxHeight: '80%',
                            objectFit: 'contain'
                        }}
                    />
                </Box>
            </Box>

            {/* Projects List */}
            <Box id="projects" sx={{ py: { xs: 6, md: 8 }, pt: { md: 4 }, bgcolor: '#FFFFFF' }}>
                <Container maxWidth="lg">
                    {/* Interpretation Section */}
                    <Box sx={{ mb: 15 }}>
                        <AnimatedPreTitle text="Portfolio" color="#F7A11A" />
                        <TypewriterText text={c.interpretation} variant="h2" sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 800, fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' }, color: '#0D2B14', mb: 8 }} />
                        
                        {/* 2-Column Grid for Cards (Matching Mission/Vision style) */}
                        <Box sx={{ 
                            display: 'grid', 
                            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
                            gap: { xs: 4, md: 6 } 
                        }}>
                            {interpretationProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} onReadMore={handleReadMore} />
                            ))}
                        </Box>
                    </Box>

                    {/* Translation Section */}
                    <Box>
                        <AnimatedPreTitle text="Certified Works" color="#1A5C2A" />
                        <TypewriterText text={c.translation} variant="h2" sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 800, fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' }, color: '#0D2B14', mb: 8 }} />
                        
                        {/* 2-Column Grid for Cards */}
                        <Box sx={{ 
                            display: 'grid', 
                            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
                            gap: { xs: 4, md: 6 } 
                        }}>
                            {translationProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} onReadMore={handleReadMore} />
                            ))}
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* CTA SECTION */}
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
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2, overflow: 'hidden' }}>
                                    <Box sx={{ height: 2, bgcolor: '#F7A11A', width: 32 }} />
                                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                                        <ArrowForwardIcon sx={{ color: '#F7A11A', fontSize: 18 }} />
                                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#F7A11A', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', ml: 1 }}>
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

            <ProjectModal
                project={selectedProject}
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default ProjectsPage;
