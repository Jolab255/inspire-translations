import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#F7A11A',
            light: '#F9B84A',
            dark: '#D4880E',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#1A5C2A',
            light: '#2A7A3B',
            dark: '#0F3A1A',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#FFFFFF',
            paper: '#F8F9FA',
            dark: '#0D2B14',
        },
        text: {
            primary: '#1A1A2E',
            secondary: '#4A4A6A',
        },
        grey: {
            50: '#F8F9FA',
            100: '#F1F3F4',
            200: '#E8EAED',
            800: '#3C4043',
            900: '#202124',
        },
        error: { main: '#D32F2F' },
        success: { main: '#2E7D32' },
        info: { main: '#0288D1' },
    },

    typography: {
        fontFamily: '"Outfit", "Inter", sans-serif',
        h1: {
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            lineHeight: 1.3,
        },
        h4: {
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
        },
        h5: {
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 600,
            fontSize: '1.25rem',
        },
        h6: {
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 600,
            fontSize: '1rem',
        },
        body1: {
            fontFamily: '"Inter", sans-serif',
            fontSize: '1rem',
            lineHeight: 1.7,
            color: '#4A4A6A',
        },
        body2: {
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.875rem',
            lineHeight: 1.6,
        },
        subtitle1: {
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 500,
            fontSize: '1.125rem',
        },
        button: {
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 600,
            textTransform: 'none',
            letterSpacing: '0.01em',
        },
    },

    shape: {
        borderRadius: 12,
    },

    shadows: [
        'none',
        '0px 2px 4px rgba(0,0,0,0.05)',
        '0px 4px 12px rgba(0,0,0,0.08)',
        '0px 8px 24px rgba(0,0,0,0.10)',
        '0px 12px 32px rgba(0,0,0,0.12)',
        '0px 16px 48px rgba(0,0,0,0.14)',
        ...Array(19).fill('none'),
    ],

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 50,
                    padding: '8px 24px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(247, 161, 26, 0.35)',
                    },
                },
                containedPrimary: {
                    background: 'linear-gradient(135deg, #F7A11A 0%, #F9B84A 100%)',
                    boxShadow: '0 4px 16px rgba(247, 161, 26, 0.3)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #D4880E 0%, #F7A11A 100%)',
                    },
                },
                containedSecondary: {
                    background: 'linear-gradient(135deg, #1A5C2A 0%, #2A7A3B 100%)',
                    boxShadow: '0 4px 16px rgba(26, 92, 42, 0.3)',
                },
                outlined: {
                    borderWidth: 2,
                    '&:hover': { borderWidth: 2 },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0 20px 48px rgba(0,0,0,0.12)',
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 500,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#F7A11A',
                            borderWidth: 2,
                        },
                    },
                    '& label.Mui-focused': {
                        color: '#F7A11A',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
                },
            },
        },
    },
});

export default theme;
