import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { AnimatedPreTitle, TypewriterText } from '../../../components/common/Animations';
import photoDavid from '../../../assets/images/David Kazi.png';

const AboutStory = ({ c, language }) => {
    return (
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
    );
};

export default AboutStory;
