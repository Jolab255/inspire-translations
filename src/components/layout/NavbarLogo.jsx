import React from 'react';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import logoImg from '../../assets/logos/Inspire_Translations_Logo.png';

const NavbarLogo = ({ height = 56, scrolled = false }) => {
    const { language } = useLanguage();
    return (
        <Box
            component={RouterLink}
            to={`/${language}`}
            sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                mr: { xs: 2, md: 4 },
                mt: 0,
                flexShrink: 0,
                p: { xs: 0.5, md: 0.8 }, // Restored and slightly increased for better look
                bgcolor: '#FFFFFF', // Restored white background
                borderRadius: '4px', // Slight rounding for a cleaner look on dark green
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.02)'
                }
            }}
        >
            <Box
                component="img"
                src={logoImg}
                alt="Inspire Translations"
                sx={{
                    height: { xs: Math.min(height, 44), md: height },
                    minWidth: { xs: 120, md: 160 },
                    maxWidth: 240,
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                }}
            />
        </Box>
    );
};

export default NavbarLogo;
