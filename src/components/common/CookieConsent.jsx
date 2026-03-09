import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const CookieConsent = () => {
    const { language } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('inspire_cookie_consent');
        if (!consent) {
            // Small delay so it doesn't instantly appear on load
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('inspire_cookie_consent', 'true');
        setIsVisible(false);
    };

    const content = {
        en: {
            message: "We use cookies to enhance your browsing experience and analyze site traffic. By continuing to use our site, you consent to our use of cookies.",
            accept: "Accept & Continue",
            privacy: "Privacy Policy"
        },
        sw: {
            message: "Tunatumia vidakuzi (cookies) kuboresha uzoefu wako wa kuvinjari na kuchambua trafiki ya tovuti. Kwa kuendelea kutumia tovuti yetu, unakubali matumizi yetu ya vidakuzi.",
            accept: "Kubali na Endelea",
            privacy: "Sera ya Faragha"
        }
    };

    const c = content[language] || content.en;

    return (
        <AnimatePresence>
            {isVisible && (
                <Box
                    component={motion.div}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    sx={{
                        position: 'fixed',
                        bottom: { xs: 20, md: 30 },
                        left: { xs: 20, md: 'auto' },
                        right: { xs: 20, md: 30 },
                        maxWidth: { md: 450 },
                        bgcolor: '#0D2B14', // Project Secondary Green
                        color: '#FFFFFF',
                        p: 3,
                        borderRadius: 3,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                        zIndex: 2000,
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <Typography sx={{ fontFamily: 'Inter', fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>
                        {c.message}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Typography
                            component="a"
                            href={`/${language}/privacy-policy`}
                            sx={{
                                color: '#F7A11A', // Project Accent
                                fontSize: '0.8rem',
                                textDecoration: 'none',
                                fontFamily: 'Outfit',
                                fontWeight: 600,
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            {c.privacy}
                        </Typography>
                        <Button
                            onClick={handleAccept}
                            variant="contained"
                            size="small"
                            sx={{
                                bgcolor: '#F7A11A', // Project Accent
                                color: '#0D2B14', // Contrast Text (Secondary Green)
                                fontFamily: 'Outfit',
                                fontWeight: 700,
                                borderRadius: 50,
                                textTransform: 'none',
                                px: 3,
                                '&:hover': { bgcolor: '#D4880E' } // Darker Accent (consistent with your other buttons)
                            }}
                        >
                            {c.accept}
                        </Button>
                    </Box>
                </Box>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
