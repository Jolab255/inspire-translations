import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import GroupsIcon from '@mui/icons-material/Groups';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { AnimatedPreTitle, TypewriterText } from '../../../components/common/Animations';

// Team Images
import photoNeema from '../../../assets/images/Neema Prosper.png';
import photoDavid from '../../../assets/images/David Kazi.png';
import photoEnos from '../../../assets/images/Enos Praygod.png';
import photoNdeigu from '../../../assets/images/ndeigu Mafwele.png';
import photoAbout from '../../../assets/images/about_us_photo.png';
import photoCustomer from '../../../assets/images/customer_care.png';
import photoCTA from '../../../assets/images/CTA.png';

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

const AboutTeam = ({ c, language, t }) => {
    return (
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
                            
                            <Box component={motion(RouterLink)} whileHover="hover" initial="rest" animate="rest" to={`/${language}/gallery`} sx={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid #1A5C2A', borderRadius: 50, overflow: 'hidden', textDecoration: 'none', transition: 'all 0.3s ease', alignSelf: 'flex-start', '&:hover': { bgcolor: 'rgba(26, 92, 42, 0.04)' } }}>
                                <Typography component={motion.span} variants={{ rest: { x: 0 }, hover: { x: 5 } }} transition={{ type: 'spring', stiffness: 400, damping: 25 }} sx={{ color: '#1A5C2A', fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: '0.75rem', px: 3, lineHeight: '36px', whiteSpace: 'nowrap' }}>{c.seeMoreTeam}</Typography>
                                <Box sx={{ width: 36, height: 36, flexShrink: 0, bgcolor: '#1A5C2A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
    );
};

export default AboutTeam;
