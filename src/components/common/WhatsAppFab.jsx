import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { motion } from 'framer-motion';

const WhatsAppFab = () => {
    const phoneNumber = "255759704170";
    const message = "Hello Inspire Translations, I'd like to inquire about your services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <Box
            component={motion.div}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
            sx={{
                position: 'fixed',
                bottom: { xs: 24, md: 40 },
                left: { xs: 24, md: 40 }, // Place on left so it doesn't conflict with ScrollToTop on the right
                zIndex: 1900,
            }}
        >
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <IconButton
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        bgcolor: '#1A5C2A', // Project Primary Green
                        color: '#FFF',
                        width: { xs: 56, md: 64 },
                        height: { xs: 56, md: 64 },
                        boxShadow: '0 8px 24px rgba(26, 92, 42, 0.4)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            bgcolor: '#0D2B14', // Project Secondary Green
                            transform: 'scale(1.1)',
                            boxShadow: '0 12px 32px rgba(13, 43, 20, 0.5)',
                        }
                    }}
                >
                    <WhatsAppIcon sx={{ fontSize: { xs: 32, md: 36 } }} />
                </IconButton>
            </motion.div>
        </Box>
    );
};

export default WhatsAppFab;
