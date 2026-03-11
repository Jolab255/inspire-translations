import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useLanguage } from '../../contexts/LanguageContext';

const TopBar = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <Box sx={{
            bgcolor: '#0D2B14',
            color: 'rgba(255,255,255,0.7)',
            py: 1,
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            position: 'relative',
            zIndex: 20
        }}>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Contact Info - Hidden on mobile */}
                    <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <PhoneIcon sx={{ fontSize: 16, color: '#F7A11A' }} />
                            <Typography variant="body2" sx={{ fontSize: '0.85rem', fontFamily: 'Outfit' }}>
                                +255 759 704 170
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <EmailIcon sx={{ fontSize: 16, color: '#F7A11A' }} />
                            <Typography variant="body2" sx={{ fontSize: '0.85rem', fontFamily: 'Outfit' }}>
                                info@inspiretranslations.co.tz
                            </Typography>
                        </Stack>
                    </Stack>

                    {/* Mobile Spacer */}
                    <Box sx={{ display: { xs: 'block', md: 'none' } }} />

                    {/* Right Side: Socials + Language */}
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Stack direction="row" spacing={0.5}>
                            <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#F7A11A' } }} href="https://facebook.com/inspiretranslations" target="_blank">
                                <FacebookIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#F7A11A' } }} href="https://www.linkedin.com/in/willy-elson-john-6418621a9" target="_blank">
                                <LinkedInIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#F7A11A' } }} href="https://www.instagram.com/inspire_translations/" target="_blank">
                                <InstagramIcon fontSize="small" />
                            </IconButton>
                        </Stack>

                        {/* Language Toggler */}
                        <Button
                            onClick={toggleLanguage}
                            size="small"
                            sx={{
                                minWidth: 'auto',
                                color: '#fff',
                                fontFamily: 'Outfit',
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: 1,
                                px: 1.5,
                                '&:hover': {
                                    borderColor: '#F7A11A',
                                    color: '#F7A11A',
                                    bgcolor: 'rgba(247, 161, 26, 0.05)'
                                }
                            }}
                        >
                            {language === 'en' ? 'SW' : 'EN'}
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

export default TopBar;