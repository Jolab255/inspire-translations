import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// Common wave animation style
const waveSx = {
    '&::after': {
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)',
        animation: 'loading-shimmer 2s infinite linear',
    }
};

// Reusable shimmer card
export const CardSkeleton = ({ height = 280 }) => (
    <Box sx={{ borderRadius: '12px', overflow: 'hidden' }}>
        <Skeleton variant="rectangular" width="100%" height={height} animation="wave" sx={{ borderRadius: '12px', ...waveSx }} />
        <Box sx={{ pt: 2 }}>
            <Skeleton variant="rounded" animation="wave" width="60%" height={28} sx={{ borderRadius: '4px', ...waveSx }} />
            <Skeleton variant="rounded" animation="wave" width="90%" height={20} sx={{ mt: 1, borderRadius: '4px', ...waveSx }} />
            <Skeleton variant="rounded" animation="wave" width="75%" height={20} sx={{ mt: 0.5, borderRadius: '4px', ...waveSx }} />
        </Box>
    </Box>
);

// Hero skeleton
export const HeroSkeleton = () => (
    <Box
        sx={{
            position: 'relative',
            width: '100%',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1A5C2A 0%, #0D2B14 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
        }}
    >
        <Box sx={{
            width: '100%',
            maxWidth: '1200px',
            px: { xs: 5, md: 5 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: 8 },
            alignItems: 'center'
        }}>
            <Box sx={{ flex: 1.2, width: '100%' }}>
                <Skeleton variant="rounded" width={160} height={24} animation="wave" sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', mb: 3, borderRadius: '4px', ...waveSx }} />
                <Skeleton variant="rounded" width="95%" height={75} animation="wave" sx={{ bgcolor: 'rgba(247, 161, 26, 0.15)', mb: 1.5, borderRadius: '8px', ...waveSx }} />
                <Skeleton variant="rounded" width="80%" height={75} animation="wave" sx={{ bgcolor: 'rgba(247, 161, 26, 0.15)', mb: 1.5, borderRadius: '8px', ...waveSx }} />
                <Skeleton variant="rounded" width="88%" height={75} animation="wave" sx={{ bgcolor: 'rgba(247, 161, 26, 0.15)', mb: 4, borderRadius: '8px', ...waveSx }} />
                <Skeleton variant="rounded" width="98%" height={18} animation="wave" sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', mb: 1.5, borderRadius: '4px', ...waveSx }} />
                <Skeleton variant="rounded" width="85%" height={18} animation="wave" sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', mb: 5, borderRadius: '4px', ...waveSx }} />
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Skeleton variant="rounded" width={170} height={52} animation="wave" sx={{ bgcolor: 'rgba(247, 161, 26, 0.25)', borderRadius: '26px', ...waveSx }} />
                    <Skeleton variant="rounded" width={140} height={52} animation="wave" sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', borderRadius: '26px', ...waveSx }} />
                </Box>
            </Box>
            <Box sx={{ flex: 1, display: { xs: 'none', md: 'flex' }, gap: 2, height: 400, overflow: 'hidden', width: '100%' }}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Skeleton variant="rounded" width="100%" height={120} animation="wave" sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', borderRadius: '12px', flexShrink: 0, ...waveSx }} />
                    <Skeleton variant="rounded" width="100%" height={120} animation="wave" sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', borderRadius: '12px', flexShrink: 0, ...waveSx }} />
                    <Skeleton variant="rounded" width="100%" height={120} animation="wave" sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', borderRadius: '12px', flexShrink: 0, ...waveSx }} />
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Skeleton variant="rounded" width="100%" height={120} animation="wave" sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', borderRadius: '12px', flexShrink: 0, ...waveSx }} />
                    <Skeleton variant="rounded" width="100%" height={120} animation="wave" sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', borderRadius: '12px', flexShrink: 0, ...waveSx }} />
                    <Skeleton variant="rounded" width="100%" height={120} animation="wave" sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', borderRadius: '12px', flexShrink: 0, ...waveSx }} />
                </Box>
            </Box>
        </Box>
    </Box>
);

// Navbar skeleton
export const NavbarSkeleton = () => (
    <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
    }}>
        {/* Top Bar Skeleton */}
        <Box sx={{
            bgcolor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)',
            py: 1,
            borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
            <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: 3 }}>
                    <Skeleton variant="text" width={140} height={16} animation="wave" sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 1, ...waveSx }} />
                    <Skeleton variant="text" width={180} height={16} animation="wave" sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', display: { xs: 'none', md: 'block' }, borderRadius: 1, ...waveSx }} />
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} variant="circular" width={20} height={20} animation="wave" sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', ...waveSx }} />
                    ))}
                </Box>
            </Container>
        </Box>

        <Box sx={{ pt: 2, px: { xs: 2, md: 3 }, bgcolor: 'rgba(26, 92, 42, 0.2)', backdropFilter: 'blur(10px)' }}>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 60 }}>
                    <Skeleton variant="rounded" width={150} height={40} animation="wave" sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2, ...waveSx }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Skeleton key={i} variant="text" width={80} height={24} animation="wave" sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', ...waveSx }} />
                        ))}
                    </Box>
                    <Skeleton variant="circular" width={40} height={40} animation="wave" sx={{ display: { xs: 'block', md: 'none' }, bgcolor: 'rgba(255, 255, 255, 0.1)', ...waveSx }} />
                </Box>
            </Container>
        </Box>
    </Box>
);

// Full page skeleton overlay
export const PageSkeleton = () => {
    useEffect(() => {
        // Prevent background scrolling while loading
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow || 'auto';
        };
    }, []);

    return (
        <Box sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            bgcolor: '#FFFFFF',
            overflowY: 'auto',
            height: '100vh',
            width: '100vw'
        }}>
            <NavbarSkeleton />
            <HeroSkeleton />
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Skeleton variant="rounded" width="30%" height={48} animation="wave" sx={{ mb: 2, mx: 'auto', display: 'block', borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.05)', ...waveSx }} />
                <Skeleton variant="rounded" width="60%" height={24} animation="wave" sx={{ mb: 6, mx: 'auto', display: 'block', borderRadius: '4px', bgcolor: 'rgba(0,0,0,0.03)', ...waveSx }} />
                <Grid container spacing={4}>
                    {[1, 2, 3].map((i) => (
                        <Grid item xs={12} sm={6} md={4} key={i}>
                            <CardSkeleton />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {/* Footer Skeleton area */}
            <Box sx={{ bgcolor: '#0D2B14', py: 8, mt: 4 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Skeleton variant="rounded" width={140} height={40} animation="wave" sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', mb: 3, ...waveSx }} />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Skeleton variant="text" width="100%" height={100} animation="wave" sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', ...waveSx }} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default PageSkeleton;
