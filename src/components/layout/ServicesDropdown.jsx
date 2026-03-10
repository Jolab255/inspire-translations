import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { services } from '../../data/siteData';
import { uiTranslations } from '../../data/translations/ui';

const ServicesDropdown = ({ onClose, scrolled }) => {
    const { language, t } = useLanguage();
    const ui = uiTranslations[language];
    
    // Updated top position since top bar is removed: Toolbar height (84px) or scrolled height (70px)
    const dropdownTop = scrolled ? '70px' : '84px';

    return (
        <ClickAwayListener onClickAway={onClose}>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                    position: 'fixed',
                    top: dropdownTop,
                    left: '7.5%', 
                    width: '85%', 
                    height: '60vh', 
                    zIndex: 1200,
                    background: '#ffffff',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.15)',
                    display: 'flex',
                    overflow: 'hidden',
                    borderTop: '1px solid rgba(247,161,26,0.2)',
                    borderRadius: 0, 
                }}
            >
                {/* Left Side: Services Content */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                    {/* Sticky Header inside Dropdown */}
                    <Box sx={{ 
                        px: 4, 
                        py: 2, 
                        bgcolor: '#fff', 
                        borderBottom: '1px solid rgba(0,0,0,0.06)',
                        zIndex: 10
                    }}>
                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#0D2B14', fontSize: '1.1rem' }}>
                            {language === 'en' ? 'Our Professional Services' : 'Huduma Zetu za Kitaalamu'}
                        </Typography>
                    </Box>

                    {/* Scrollable Grid */}
                    <Box sx={{ 
                        flex: 1, 
                        p: { xs: 2, md: 4 }, 
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': { width: '6px' },
                        '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(247,161,26,0.3)', borderRadius: '10px' }
                    }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
                            {services.map((item) => (
                                <Box
                                    key={item.id}
                                    sx={{
                                        p: 2.5,
                                        borderRadius: 0,
                                        bgcolor: '#F7A11A', // Yellow background
                                        border: '1px solid rgba(0,0,0,0.05)',
                                        transition: 'all 0.25s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                        },
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: '0.95rem', color: '#0D2B14' }}>
                                            {t(item.title)}
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ fontSize: '0.8rem', color: '#0D2B14', fontFamily: 'Inter', mb: 2.5, lineHeight: 1.6, height: '3.2em', overflow: 'hidden', fontWeight: 500 }}>
                                        {t(item.shortDesc)}
                                    </Typography>
                                    
                                    <Box sx={{ mt: 'auto', display: 'flex' }}>
                                        <Box
                                            component={RouterLink}
                                            to={`/${language}/services/${item.id}`}
                                            onClick={onClose}
                                            sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                textDecoration: 'none',
                                                border: '1px solid #1A5C2A',
                                                borderRadius: '50px',
                                                overflow: 'hidden',
                                                transition: 'all 0.3s ease',
                                                '&:hover': { bgcolor: 'rgba(26, 92, 42, 0.08)' }
                                            }}
                                        >
                                            <Typography sx={{ color: '#0D2B14', fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: '0.75rem', px: 2, lineHeight: '32px' }}>
                                                {language === 'en' ? 'Read More' : 'Soma Zaidi'}
                                            </Typography>
                                            <Box sx={{ bgcolor: '#0D2B14', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <ArrowForwardIosIcon sx={{ color: '#fff', fontSize: '14px !important' }} />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>

                {/* Right Side */}
                <Box
                    sx={{
                        width: { md: 320, lg: 400 },
                        position: 'relative',
                        display: { xs: 'none', md: 'flex' },
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        p: 5,
                        bgcolor: '#1A1A2E',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundImage: 'url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.5,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'linear-gradient(to top, rgba(26,92,42,0.95) 0%, rgba(26,26,46,0.4) 100%)',
                        }}
                    />

                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Typography sx={{ color: '#F7A11A', fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: '0.85rem', mb: 1, textTransform: 'uppercase' }}>
                            {language === 'en' ? 'Excellence in Every Word' : 'Ubora katika Kila Neno'}
                        </Typography>
                        <Typography sx={{ color: '#FFFFFF', fontFamily: '"Inknut Antiqua", serif', fontWeight: 400, fontSize: '1.3rem', mb: 3, lineHeight: 1.3 }}>
                            {language === 'en' ? 'Trusted by global organizations for precise communication.' : 'Tunaaminiwa na mashirika ya kimataifa kwa mawasiliano sahihi.'}
                        </Typography>
                        
                        <Box
                            component={RouterLink}
                            to={`/${language}/quote`}
                            onClick={onClose}
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                border: '1px solid #F7A11A',
                                borderRadius: '50px',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                '&:hover': { bgcolor: 'rgba(247, 161, 26, 0.04)' }
                            }}
                            >
                            <Typography sx={{ color: '#F7A11A', fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: '0.85rem', px: 3, lineHeight: '36px' }}>
                                {ui.getAQuote}
                            </Typography>
                            <Box sx={{ bgcolor: '#F7A11A', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ArrowForwardIosIcon sx={{ color: '#0D2B14', fontSize: '14px !important' }} />
                            </Box>
                            </Box>                    </Box>
                </Box>
            </motion.div>
        </ClickAwayListener>
    );
};

export default ServicesDropdown;
