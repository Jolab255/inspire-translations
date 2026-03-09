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
import DownloadIcon from '@mui/icons-material/Download';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '../../components/seo/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';
import { FadeInUp, TypewriterText, AnimatedPreTitle } from '../../components/common/Animations';
import CTASection from '../../components/common/CTASection';

import projectHeroImg from '../../assets/images/project_hero.png';
import imgInterpretation from '../../assets/images/onsite_interpretation.png';
import imgTranslation from '../../assets/images/written_translation.png';

import { getAllProjects } from '../../utils/projectLoader';

const allProjects = getAllProjects();
const interpretationProjects = allProjects.filter(p => p.type === 'interpretation');
const translationProjects = allProjects.filter(p => p.type === 'translation');


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

                    {/* Read More Button with signature design */}
                    <Box 
                        component={motion.button} 
                        whileHover="hover" 
                        initial="rest" 
                        animate="rest"
                        onClick={() => onReadMore(project)}
                        sx={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            border: '1.5px solid #F7A11A',
                            borderRadius: 50,
                            overflow: 'hidden',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            bgcolor: 'transparent',
                            cursor: 'pointer',
                            p: 0,
                            '&:hover': {
                                bgcolor: 'rgba(247, 161, 26, 0.04)'
                            }
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
                                px: 3,
                                lineHeight: '36px',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Read More
                        </Typography>
                        <Box
                            sx={{
                                width: 36,
                                height: 36,
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
                                <ArrowForwardIcon sx={{ color: '#1A5C2A', fontSize: 18 }} />
                            </motion.div>
                        </Box>
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
            downloadBtn: "Download Company Profile",
            interpretation: "Interpretation Projects",
            translation: "Translation Projects"
        },
        sw: {
            heroTitle: "Miradi Yetu",
            heroDesc: "Kuonyesha kujitolea kwetu kwa usahihi wa kilugha na ubora wa kitamaduni katika kila mradi.",
            moreBtn: "Chunguza Kazi Zetu",
            downloadBtn: "Pakua Wasifu wa Kampuni",
            interpretation: "Miradi ya Ukalimani",
            translation: "Miradi ya Tafsiri"
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
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                            <Box
                                component={motion.a}
                                whileHover="hover"
                                initial="rest"
                                animate="rest"
                                href="#projects"
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    border: '1.5px solid #F7A11A',
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
                                        lineHeight: '36px',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {c.moreBtn}
                                </Typography>
                                <Box sx={{ width: 36, height: 36, flexShrink: 0, bgcolor: '#F7A11A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

                            <Button 
                                component="a" 
                                href="/Company_Profile.pdf" 
                                download="Inspire_Translations_Profile.pdf"
                                variant="outlined" 
                                startIcon={<DownloadIcon />}
                                sx={{ 
                                    borderColor: '#1A5C2A', 
                                    color: '#1A5C2A',
                                    borderRadius: 50,
                                    px: 4,
                                    fontFamily: 'Outfit',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    '&:hover': { bgcolor: 'rgba(26, 92, 42, 0.04)', borderColor: '#1A5C2A' }
                                }}
                            >
                                {c.downloadBtn}
                            </Button>
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

            <CTASection />

            <ProjectModal
                project={selectedProject}
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default ProjectsPage;
