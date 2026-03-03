import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// Reusable shimmer card
export const CardSkeleton = ({ height = 280 }) => (
    <Box sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Skeleton variant="rectangular" width="100%" height={height} animation="wave" sx={{ borderRadius: 3 }} />
        <Box sx={{ pt: 2 }}>
            <Skeleton animation="wave" width="60%" height={28} />
            <Skeleton animation="wave" width="90%" height={20} sx={{ mt: 1 }} />
            <Skeleton animation="wave" width="75%" height={20} sx={{ mt: 0.5 }} />
        </Box>
    </Box>
);

// Hero skeleton - dark themed
export const HeroSkeleton = () => (
    <Box
        sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2E40 100%)',
            display: 'flex',
            alignItems: 'center',
            pt: 10,
        }}
    >
        <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Skeleton variant="text" width="40%" height={24} animation="wave" sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />
                    <Skeleton variant="text" width="90%" height={80} animation="wave" sx={{ bgcolor: 'rgba(247,161,26,0.2)' }} />
                    <Skeleton variant="text" width="75%" height={80} animation="wave" sx={{ bgcolor: 'rgba(247,161,26,0.2)' }} />
                    <Skeleton variant="text" width="85%" height={80} animation="wave" sx={{ bgcolor: 'rgba(247,161,26,0.2)', mb: 3 }} />
                    <Skeleton variant="text" width="95%" height={20} animation="wave" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                    <Skeleton variant="text" width="80%" height={20} animation="wave" sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 4 }} />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Skeleton variant="rounded" width={160} height={52} animation="wave" sx={{ bgcolor: 'rgba(247,161,26,0.3)', borderRadius: 50 }} />
                        <Skeleton variant="rounded" width={140} height={52} animation="wave" sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 50 }} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', gap: 2, height: 520, overflow: 'hidden' }}>
                        {[1, 2, 3].map((col) => (
                            <Box key={col} sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {[1, 2, 3].map((card) => (
                                    <Skeleton key={card} variant="rounded" width="100%" height={160} animation="wave"
                                        sx={{ bgcolor: 'rgba(255,255,255,0.08)', borderRadius: 3, flexShrink: 0 }} />
                                ))}
                            </Box>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </Box>
);

// Full page skeleton
export const PageSkeleton = () => (
    <Box>
        <HeroSkeleton />
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Skeleton variant="text" width="30%" height={48} animation="wave" sx={{ mb: 2, mx: 'auto', display: 'block' }} />
            <Skeleton variant="text" width="60%" height={24} animation="wave" sx={{ mb: 6, mx: 'auto', display: 'block' }} />
            <Grid container spacing={4}>
                {[1, 2, 3].map((i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                        <CardSkeleton />
                    </Grid>
                ))}
            </Grid>
        </Container>
    </Box>
);

// Gallery skeleton - masonry style
export const GallerySkeleton = () => (
    <Container maxWidth="lg" sx={{ py: 8 }}>
        <Skeleton variant="text" width="25%" height={48} animation="wave" sx={{ mb: 4, mx: 'auto', display: 'block' }} />
        <Grid container spacing={2}>
            {[320, 240, 280, 200, 340, 260, 300, 220, 280].map((h, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                    <Skeleton variant="rounded" width="100%" height={h} animation="wave" sx={{ borderRadius: 3 }} />
                </Grid>
            ))}
        </Grid>
    </Container>
);

export default PageSkeleton;
