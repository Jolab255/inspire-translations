import React from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';

const PillButton = ({
    to,
    href,
    onClick,
    children,
    variant = 'dark', // 'dark', 'light', 'white', 'yellow'
    sx = {}
}) => {
    // Styling configurations based on exactly what is on the homepage
    let bgcolor = 'transparent';
    let borderColor = '#0D2B14';
    let color = '#0D2B14';
    let hoverBgcolor = 'rgba(13, 43, 20, 0.04)';
    let hoverBorderColor = '#0D2B14';
    let iconBgcolor = '#0D2B14';
    let iconColor = '#F7A11A';

    if (variant === 'light') {
        bgcolor = 'transparent';
        borderColor = '#FFFFFF';
        color = '#FFFFFF';
        hoverBgcolor = 'rgba(255, 255, 255, 0.05)';
        hoverBorderColor = '#FFFFFF';
        iconBgcolor = '#FFFFFF';
        iconColor = '#1A5C2A';
    } else if (variant === 'white') {
        bgcolor = '#FFFFFF';
        borderColor = '#FFFFFF';
        color = '#1A5C2A';
        hoverBgcolor = '#F7A11A';
        hoverBorderColor = '#F7A11A';
        iconBgcolor = 'rgba(26, 92, 42, 0.1)';
        iconColor = '#1A5C2A';
    } else if (variant === 'yellow') {
        bgcolor = '#F7A11A';
        borderColor = '#F7A11A';
        color = '#0D2B14';
        hoverBgcolor = '#E59414';
        hoverBorderColor = '#E59414';
        iconBgcolor = 'rgba(13, 43, 20, 0.1)';
        iconColor = '#0D2B14';
    }

    // Determine the wrapper component
    let Component;
    if (to) {
        Component = motion(RouterLink);
    } else if (href) {
        Component = motion.a;
    } else {
        Component = motion.button;
    }

    return (
        <Box
            component={Component}
            to={to}
            href={href}
            onClick={onClick}
            whileHover="hover"
            initial="rest"
            animate="rest"
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                bgcolor,
                border: `2px solid ${borderColor}`,
                borderRadius: 50,
                overflow: 'hidden',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                p: 0,
                outline: 'none',
                '&:hover': {
                    bgcolor: hoverBgcolor,
                    borderColor: hoverBorderColor,
                },
                ...sx
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
                    color,
                    fontFamily: '"Inknut Antiqua", serif',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    px: 3,
                    lineHeight: '46px',
                    whiteSpace: 'nowrap'
                }}
            >
                {children}
            </Typography>
            <Box
                className="pill-arrow-w"
                component={motion.div}
                variants={{
                    rest: { x: 0 },
                    hover: { x: 0 }
                }}
                sx={{
                    width: 48,
                    height: 48,
                    flexShrink: 0,
                    bgcolor: iconBgcolor,
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
                    <ArrowForwardIcon sx={{ color: iconColor, fontSize: 18 }} />
                </motion.div>
            </Box>
        </Box>
    );
};

export default PillButton;
