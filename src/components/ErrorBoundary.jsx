import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box
                    sx={{
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2E40 100%)',
                        color: '#fff',
                        textAlign: 'center',
                        p: 4,
                    }}
                >
                    <ErrorOutlineIcon sx={{ fontSize: 80, color: '#F7A11A', mb: 3 }} />
                    <Typography variant="h2" sx={{ color: '#F7A11A', mb: 2, fontWeight: 800 }}>
                        Something Went Wrong
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4, maxWidth: 480 }}>
                        We encountered an unexpected error. Please try refreshing the page or contact us if the problem persists.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => window.location.reload()}
                        sx={{ mr: 2, mb: 2 }}
                    >
                        Refresh Page
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)', mb: 2 }}
                        onClick={() => (window.location.href = '/')}
                    >
                        Go Home
                    </Button>
                </Box>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
