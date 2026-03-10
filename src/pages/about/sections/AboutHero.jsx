import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';
import aboutHeroImg from '../../../assets/images/about_us_hero.png';

const AboutHero = ({ c }) => {
    return (
        <Box sx={{
            minHeight: { xs: 'auto', md: '75vh' },
            display: 'flex',
            alignItems: 'stretch',
            flexDirection: { xs: 'column', md: 'row' },
            background: '#F7A11A',
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
                    <Typography variant="h1" sx={{ 
                        fontFamily: '"Inknut Antiqua", serif',
                        color: '#0D2B14', 
                        fontWeight: 900, 
                        mb: 3, 
                        fontSize: { xs: '2.2rem', sm: '3rem', md: '4.5rem' }, 
                        lineHeight: 1.1 
                    }}>
                        {c.heroTitle}
                    </Typography>
                    <Typography sx={{ 
                        fontFamily: '"Inknut Antiqua", serif',
                        color: 'rgba(13, 43, 20, 0.85)', 
                        fontSize: { xs: '1rem', md: '1.15rem' }, 
                        maxWidth: 600, 
                        lineHeight: 1.8, 
                        mb: 5, 
                        fontWeight: 500 
                    }}>
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
                            border: '2px solid #0D2B14',
                            borderRadius: 50,
                            overflow: 'hidden',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            '&:hover': { bgcolor: 'rgba(13, 43, 20, 0.04)' }
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
                                color: '#0D2B14',
                                fontFamily: '"Inknut Antiqua", serif',
                                fontWeight: 700,
                                fontSize: '0.8rem',
                                px: 2.5,
                                lineHeight: '44px',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {c.moreBtn}
                        </Typography>
                        <Box sx={{ width: 44, height: 44, flexShrink: 0, bgcolor: '#0D2B14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <motion.div
                                variants={{
                                    rest: { x: 0 },
                                    hover: { x: 8 }
                                }}
                                transition={{ type: 'spring', stiffness: 600, damping: 15 }}
                            >
                                <ArrowForwardIcon sx={{ color: '#F7A11A', fontSize: 16 }} />
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
    );
};

export default AboutHero;
