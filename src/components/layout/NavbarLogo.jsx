import React from 'react';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import logoImg from '../../assets/logos/Inspire_Translations_Logo.png';

const NavbarLogo = ({ height = 56 }) => {
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
                p: 0.25,
                bgcolor: '#FFFFFF',
                borderRadius: 0,
                transition: 'transform 0.3s ease',
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
                    height,
                    minWidth: 160,
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
