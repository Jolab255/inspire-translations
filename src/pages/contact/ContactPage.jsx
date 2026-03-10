import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '../../components/seo/SEOHead';
import CTASection from '../../components/common/CTASection';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';
import { FadeInUp, TypewriterText, AnimatedPreTitle } from '../../components/common/Animations';
import { useInView } from 'react-intersection-observer';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Import the specific brand image
import contactHeroImg from '../../assets/images/project_hero.png';

const ContactPage = () => {
    const { ref: contactRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { language, t } = useLanguage();
    const ui = uiTranslations[language];
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

    const handleCloseNotification = () => setNotification({ ...notification, open: false });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!form.name || !form.email || !form.message) {
            setError(language === 'en' ? 'Please fill in all required fields.' : 'Tafadhali jaza sehemu zote zinazohitajika.');
            return;
        }

        setError('');
        setLoading(true);
        
        try {
            // Point to the live script on your server to allow localhost testing
            const response = await fetch('https://www.inspiretranslations.co.tz/send-contact.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                setSubmitted(true);
                setForm({ name: '', email: '', phone: '', subject: '', message: '' });
                setNotification({ 
                    open: true, 
                    message: language === 'en' ? 'Message sent successfully!' : 'Ujumbe umetumwa kikamilifu!', 
                    severity: 'success' 
                });
            } else {
                const data = await response.json();
                setNotification({ 
                    open: true, 
                    message: data.error || (language === 'en' ? 'Submission failed. Please try again later.' : 'Uwasilishaji umeshindwa. Tafadhali jaribu tena baadaye.'), 
                    severity: 'error' 
                });
            }
        } catch (err) {
            setNotification({ 
                open: true, 
                message: language === 'en' ? 'Network error. Please check your connection.' : 'Hitilafu ya mtandao. Tafadhali angalia muunganisho wako.', 
                severity: 'error' 
            });
        } finally {
            setLoading(false);
        }
    };

    const content = {
        en: {
            heroLabel: "Global Connection",
            heroTitle: "Get in Touch with Our Experts.",
            heroDesc: "We provide seamless communication solutions across borders. Reach out to discuss your project or learn how we can bridge your language gap.",
            contactInfo: "Contact Details",
            infoDesc: "Our team responds to all inquiries with absolute precision and professional courtesy.",
            sendMessage: "Send a Message",
            formDesc: "Interested in our services? Fill out the form below for a tailored consultation.",
            success: "Thank you! Your message has been received. A formal response will be sent from info@inspiretranslations.co.tz shortly.",
            fullName: "Full Name",
            email: "Email Address",
            phone: "Phone / WhatsApp",
            subject: "Service Type",
            message: "Project Details",
            send: "Send Message",
            sending: "Transmitting...",
            subjects: ['Written Translation', 'Interpretation', 'Language Classes', 'Logistics', 'Other']
        },
        sw: {
            heroLabel: "Uunganisho wa Kimataifa",
            heroTitle: "Wasiliana na Wataalamu Wetu.",
            heroDesc: "Tunatoa suluhu za mawasiliano zisizo na mshono kuvuka mipaka. Wasiliana nasi ili kujadili mradi wako au kujifunza jinsi tunavyoweza kuziba pengo lako la lugha.",
            contactInfo: "Maelezo ya Mawasiliano",
            infoDesc: "Timu yetu inajibu maswali yote kwa usahihi wa hali ya juu na adabu za kitaalamu.",
            sendMessage: "Tuma Ujumbe",
            formDesc: "Unavutiwa na huduma zetu? Jaza fomu hapa chini kwa ushauri maalum.",
            success: "Asante! Ujumbe wako umepokelewa. Majibu rasmi yatatumwa kutoka info@inspiretranslations.co.tz hivi karibuni.",
            fullName: "Jina Kamili",
            email: "Barua Pepe",
            phone: "Simu / WhatsApp",
            subject: "Aina ya Huduma",
            message: "Maelezo ya Mradi",
            send: "Tuma Ujumbe",
            sending: "Inatuma...",
            subjects: ['Tafsiri ya Maandishi', 'Ukalimani', 'Madarasa ya Lugha', 'Uratibu', 'Nyingine']
        }
    };

    const c = content[language];

    const inputStyles = {
        '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            bgcolor: '#FFFFFF',
            minHeight: '56px',
            '& fieldset': {
                borderColor: '#0D2B14',
                borderWidth: '2px',
            },
            '&:hover fieldset': {
                borderColor: '#0D2B14',
                borderWidth: '2px',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#0D2B14',
                borderWidth: '2.5px',
            },
            '& input': {
                color: '#0D2B14',
                fontFamily: 'Outfit',
                fontWeight: 600,
            },
            '& textarea': {
                color: '#0D2B14',
                fontFamily: 'Outfit',
                fontWeight: 600,
            },
            '& .MuiSelect-select': {
                color: '#0D2B14',
                fontFamily: 'Outfit',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
            },
            '& input::placeholder': {
                color: 'rgba(13, 43, 20, 0.5)', 
            },
            '& textarea::placeholder': {
                color: 'rgba(13, 43, 20, 0.5)',
            },
        },
        '& .MuiInputLabel-root': {
            fontFamily: '"Inknut Antiqua", serif',
            fontSize: '0.85rem',
            color: '#0D2B14',
            fontWeight: 700,
            '&.Mui-focused': {
                color: '#0D2B14',
            },
        },
    };

    return (
        <Box sx={{ bgcolor: '#FFFFFF' }}>
            <SEOHead
                title={language === 'en' ? "Contact Us | Inspire Translations" : "Wasiliana Nasi | Inspire Translations"}
                description={c.heroDesc}
            />

            {/* Split Hero Design */}
            <Box sx={{
                minHeight: { xs: 'auto', md: '65vh' },
                display: 'flex',
                alignItems: 'stretch',
                flexDirection: { xs: 'column', md: 'row' },
                background: '#F7A11A',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Box sx={{
                    width: { xs: '100%', md: '55%' },
                    display: 'flex',
                    alignItems: 'center',
                    px: { xs: 3, sm: 6, md: 12 },
                    py: { xs: 10, sm: 12, md: 15 },
                    zIndex: 2,
                    bgcolor: '#F7A11A',
                    order: { xs: 2, md: 1 }
                }}>
                    <Box>
                        {/* Animated arrow label */}
                        <Box ref={contactRef} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2, overflow: 'hidden' }}>
                            <Box sx={{
                                height: 2, bgcolor: '#0D2B14',
                                width: inView ? 32 : 0,
                                transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
                            }} />
                            <Box sx={{
                                display: 'flex', alignItems: 'center',
                                transform: inView ? 'translateX(0) scale(1)' : 'translateX(-20px) scale(0.6)',
                                opacity: inView ? 1 : 0,
                                transition: 'opacity 0.4s ease 0.45s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.45s',
                            }}>
                                <ArrowForwardIcon sx={{ color: '#0D2B14', fontSize: 18 }} />
                            </Box>
                            <Box sx={{
                                transform: inView ? 'translateY(0)' : 'translateY(8px)',
                                opacity: inView ? 1 : 0,
                                transition: 'opacity 0.4s ease 0.6s, transform 0.4s ease 0.6s',
                            }}>
                                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#0D2B14', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                    {c.heroLabel}
                                </Typography>
                            </Box>
                        </Box>
                        <TypewriterText 
                            text={c.heroTitle}
                            variant="h1"
                            sx={{ 
                                fontFamily: '"Inknut Antiqua", serif',
                                fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4.2rem' },
                                color: '#0D2B14',
                                lineHeight: 1.1,
                                mb: 3,
                                fontWeight: 900
                            }}
                        />
                        <Typography sx={{ 
                            fontFamily: '"Inknut Antiqua", serif',
                            color: 'rgba(13, 43, 20, 0.8)',
                            fontSize: { xs: '0.9rem', md: '1.1rem' },
                            lineHeight: 1.8,
                            maxWidth: 550,
                            fontWeight: 500
                        }}>
                            {c.heroDesc}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    width: { xs: '100%', md: '45%' },
                    height: { xs: '300px', md: 'auto' },
                    position: 'relative',
                    order: { xs: 1, md: 2 },
                    borderLeft: { md: '2px solid #0D2B14' }
                }}>
                    <Box 
                        sx={{ 
                            width: '100%', 
                            height: '100%', 
                            minHeight: '100%',
                            background: `url(${contactHeroImg}) center/cover no-repeat`,
                            filter: 'grayscale(0.2) contrast(1.1)',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                inset: 0,
                                background: {
                                    xs: 'linear-gradient(to top, rgba(13, 43, 20, 0.8) 0%, transparent 100%)',
                                    md: 'rgba(13, 43, 20, 0.15)'
                                }
                            }
                        }} 
                    />
                </Box>
            </Box>

            {/* Split Content Section */}
            <Container maxWidth="lg" sx={{ mt: { xs: 4, md: -12 }, mb: 8, position: 'relative', zIndex: 10 }}>
                <Grid container spacing={0}>
                    {/* Left: Contact Details (The White Box) */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ 
                            bgcolor: '#FFFFFF', 
                            p: { xs: 4, md: 6 }, 
                            height: '100%',
                            border: '3px solid #0D2B14',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: 'none'
                        }}>
                            <Typography sx={{ 
                                fontFamily: '"Inknut Antiqua", serif', 
                                fontWeight: 700, 
                                color: '#0D2B14', 
                                fontSize: '1.8rem',
                                mb: 2
                            }}>
                                {c.contactInfo}
                            </Typography>
                            <Typography sx={{ 
                                fontFamily: '"Inknut Antiqua", serif', 
                                color: 'rgba(13, 43, 20, 0.7)', 
                                mb: 6, 
                                lineHeight: 1.6,
                                fontSize: '0.9rem',
                                fontWeight: 500
                            }}>
                                {c.infoDesc}
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {[
                                    { icon: <LocationOnIcon />, label: 'Location', value: 'Dar es Salaam, TZ' },
                                    { icon: <PhoneIcon />, label: 'Call', value: '+255 759 704 170' },
                                    { icon: <WhatsAppIcon />, label: 'WhatsApp', value: '+255 759 704 170' },
                                    { icon: <EmailIcon />, label: 'Email', value: 'info@inspiretranslations.co.tz' }
                                ].map((item, i) => (
                                    <Box key={i} sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#F7A11A', mt: 0.5 }}>{item.icon}</Box>
                                        <Box>
                                            <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(13, 43, 20, 0.5)' }}>{item.label}</Typography>
                                            <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontSize: '1rem', fontWeight: 600, color: '#0D2B14' }}>{item.value}</Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Right: The Form (The Yellow Box) */}
                    <Grid item xs={12} md={7}>
                        <Box sx={{ 
                            bgcolor: '#F7A11A', 
                            p: { xs: 4, md: 7 }, 
                            height: '100%',
                            border: '3px solid #0D2B14',
                            borderLeft: { md: 'none' },
                            boxShadow: '0 20px 60px rgba(13, 43, 20, 0.15)'
                        }}>
                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }} 
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Box sx={{ 
                                            textAlign: 'center', 
                                            py: { xs: 4, md: 8 },
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '100%'
                                        }}>
                                            <CheckCircleIcon sx={{ fontSize: 80, color: '#0D2B14', mb: 3 }} />
                                            <Typography variant="h4" sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#0D2B14', mb: 2 }}>
                                                {language === 'en' ? 'Success!' : 'Imefanikiwa!'}
                                            </Typography>
                                            <Typography sx={{ fontFamily: 'Outfit', color: '#0D2B14', fontSize: '1.1rem', mb: 4, maxWidth: 450, lineHeight: 1.6, fontWeight: 500 }}>
                                                {c.success}
                                            </Typography>
                                            <Button 
                                                onClick={() => setSubmitted(false)} 
                                                variant="contained" 
                                                sx={{ 
                                                    bgcolor: '#0D2B14', 
                                                    color: '#FFFFFF',
                                                    fontWeight: 700, 
                                                    fontFamily: 'Outfit', 
                                                    borderRadius: 50,
                                                    px: 4,
                                                    '&:hover': { bgcolor: '#000' }
                                                }}
                                            >
                                                {language === 'en' ? 'Send another message' : 'Tuma ujumbe mwingine'}
                                            </Button>
                                        </Box>
                                    </motion.div>
                                ) : (
                                    <Box component="form" onSubmit={handleSubmit}>
                                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#0D2B14', fontSize: '1.6rem', mb: 1.5 }}>{c.sendMessage}</Typography>
                                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', color: 'rgba(13, 43, 20, 0.8)', fontSize: '0.9rem', mb: 5, fontWeight: 500 }}>{c.formDesc}</Typography>
                                        
                                        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 0, fontFamily: 'Outfit' }}>{error}</Alert>}
                                        
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}><TextField fullWidth name="name" value={form.name} onChange={handleChange} label={c.fullName} required variant="outlined" sx={inputStyles} /></Grid>
                                            <Grid item xs={12} sm={6}><TextField fullWidth name="email" value={form.email} onChange={handleChange} label={c.email} type="email" required variant="outlined" sx={inputStyles} /></Grid>
                                            <Grid item xs={12} sm={7}>
                                                <TextField fullWidth name="subject" value={form.subject} onChange={handleChange} label={c.subject} required select variant="outlined" sx={inputStyles}>
                                                    {c.subjects.map((s) => <MenuItem key={s} value={s} sx={{ fontFamily: 'Outfit' }}>{s}</MenuItem>)}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} sm={5}><TextField fullWidth name="phone" value={form.phone} onChange={handleChange} label={c.phone} variant="outlined" sx={inputStyles} /></Grid>
                                            <Grid item xs={12}><TextField fullWidth name="message" value={form.message} onChange={handleChange} label={c.message} required multiline rows={3} variant="outlined" sx={inputStyles} /></Grid>
                                            <Grid item xs={12}>
                                                {/* Signature Pill Arrow Button */}
                                                <Box
                                                    component={motion.button}
                                                    type="submit"
                                                    disabled={loading}
                                                    whileHover="hover"
                                                    initial="rest"
                                                    animate="rest"
                                                    sx={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        border: '2.5px solid #0D2B14',
                                                        borderRadius: 50,
                                                        overflow: 'hidden',
                                                        bgcolor: 'transparent',
                                                        cursor: 'pointer',
                                                        p: 0,
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': { bgcolor: 'rgba(13, 43, 20, 0.05)' }
                                                    }}
                                                >
                                                    <Typography
                                                        component={motion.span}
                                                        variants={{ rest: { x: 0 }, hover: { x: 5 } }}
                                                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                                        sx={{
                                                            color: '#0D2B14',
                                                            fontFamily: '"Inknut Antiqua", serif',
                                                            fontWeight: 800,
                                                            fontSize: '0.85rem',
                                                            px: 4,
                                                            lineHeight: '48px',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                    >
                                                        {loading ? c.sending : c.send}
                                                    </Typography>
                                                    <Box sx={{ 
                                                        width: 48, 
                                                        height: 48, 
                                                        bgcolor: '#0D2B14', 
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        justifyContent: 'center',
                                                        flexShrink: 0
                                                    }}>
                                                        <motion.div 
                                                            variants={{ rest: { x: 0 }, hover: { x: 8 } }}
                                                            transition={{ type: 'spring', stiffness: 600, damping: 15 }}
                                                        >
                                                            <ArrowForwardIcon sx={{ color: '#F7A11A', fontSize: 22 }} />
                                                        </motion.div>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )}
                            </AnimatePresence>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <CTASection />

            {/* Pop-up Notifications */}
            <Snackbar 
                open={notification.open} 
                autoHideDuration={6000} 
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <MuiAlert 
                    onClose={handleCloseNotification} 
                    severity={notification.severity} 
                    variant="filled"
                    sx={{ 
                        width: '100%', 
                        bgcolor: notification.severity === 'success' ? '#0D2B14' : '#d32f2f',
                        color: notification.severity === 'success' ? '#F7A11A' : '#fff',
                        fontFamily: 'Outfit',
                        fontWeight: 700,
                        borderRadius: 0,
                        boxShadow: 'none',
                        border: notification.severity === 'success' ? '2px solid #F7A11A' : 'none'
                    }}
                >
                    {notification.message}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
};

export default ContactPage;
