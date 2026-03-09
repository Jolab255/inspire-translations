import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Standard Fade In Up
export const FadeInUp = ({ children, delay = 0, threshold = 0.1, ...props }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'transform, opacity' }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Animated text component for typewriter spelling effect
export const TypewriterText = ({ text, sx, variant = "h2", ...props }) => {
    // Reduced threshold and triggerOnce: true for smoother performance
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const words = text.split(' ');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { 
                staggerChildren: 0.03, // Slightly faster stagger
                delayChildren: 0.05 
            }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 15, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 20, // Increased damping for less "bouncy" scratchiness
                stiffness: 100
            }
        }
    };

    return (
        <Typography
            component={motion.div}
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variant={variant}
            sx={{ ...sx, display: 'block', willChange: 'transform, opacity' }}
            {...props}
        >
            {words.map((word, wordIndex) => (
                <Box key={wordIndex} component="span" sx={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                    {Array.from(word).map((char, charIndex) => (
                        <motion.span 
                            key={charIndex} 
                            variants={letterVariants} 
                            style={{ display: 'inline-block', willChange: 'transform, opacity' }}
                        >
                            {char}
                        </motion.span>
                    ))}
                    {wordIndex < words.length - 1 && (
                        <Box component="span" sx={{ display: 'inline-block' }}>&nbsp;</Box>
                    )}
                </Box>
            ))}
        </Typography>
    );
};

// Animated Pre-Title with Sliding Line and Arrow
export const AnimatedPreTitle = ({ text, color = '#F7A11A', align = 'flex-start', triggerOnce = true }) => {
    const { ref, inView } = useInView({ triggerOnce, threshold: 0.1 });
    return (
        <Box ref={ref} sx={{ display: 'flex', alignItems: 'center', justifyContent: align, mb: 1, overflow: 'hidden' }}>
            <Box sx={{
                height: 2, bgcolor: color,
                width: inView ? 32 : 0,
                transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'width'
            }} />
            <Box sx={{
                display: 'flex', alignItems: 'center',
                transform: inView ? 'translateX(0) scale(1)' : 'translateX(-20px) scale(0.6)',
                opacity: inView ? 1 : 0,
                transition: 'opacity 0.4s ease 0.4s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
                ml: 1,
                willChange: 'transform, opacity'
            }}>
                <ArrowForwardIcon sx={{ color: color, fontSize: 18 }} />
            </Box>
            <Box sx={{
                transform: inView ? 'translateY(0)' : 'translateY(8px)',
                opacity: inView ? 1 : 0,
                transition: 'opacity 0.5s ease 0.5s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
                ml: 1,
                willChange: 'transform, opacity'
            }}>
                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: color, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {text}
                </Typography>
            </Box>
        </Box>
    );
};
