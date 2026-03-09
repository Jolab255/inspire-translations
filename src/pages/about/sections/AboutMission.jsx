import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { AnimatedPreTitle, TypewriterText } from '../../../components/common/Animations';
import aboutHeroImg from '../../../assets/images/about_us_hero.png';

const AboutMission = ({ c, language }) => {
    return (
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
    );
};

export default AboutMission;
