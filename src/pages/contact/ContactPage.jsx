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

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!form.name || !form.email || !form.message) {
            setError(language === 'en' ? 'Please fill in all required fields.' : 'Tafadhali jaza sehemu zote zinazohitajika.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            setError(language === 'en' ? 'Please enter a valid email address.' : 'Tafadhali weka barua pepe halali.');
            return;
        }

        setError('');
        setLoading(true);
        
        try {
            // Setup Formspree integration
            const response = await fetch('https://formspree.io/f/xvzwzzey', {
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
            } else {
                throw new Error('Form submission failed');
            }
        } catch (err) {
            console.error(err);
            setError(language === 'en' ? 'Network error. Please contact us directly at info@inspiretranslations.co.tz' : 'Hitilafu ya mtandao. Tafadhali wasiliana nasi moja kwa moja kupitia info@inspiretranslations.co.tz');
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
            success: "Thank you! Your message has been sent successfully.",
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
            success: "Asante! Ujumbe wako umetumwa kwa mafanikio.",
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
            minHeight: '56px', // Standard height to prevent shrinking
            '& fieldset': {
                borderColor: '#1A5C2A', // Bold Green Outline
                borderWidth: '2.5px',
            },
            '&:hover fieldset': {
                borderColor: '#1A5C2A',
                borderWidth: '3px',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#F7A11A', // Yellow focus for clarity
                borderWidth: '3px',
            },
            '& input': {
                color: '#1A5C2A', // Dark Green Text
                fontFamily: 'Outfit',
                fontWeight: 600,
            },
            '& textarea': {
                color: '#1A5C2A', // Dark Green Text
                fontFamily: 'Outfit',
                fontWeight: 600,
            },
            '& .MuiSelect-select': {
                color: '#1A5C2A', // Ensure select text is also green
                fontFamily: 'Outfit',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
            },
            '& input::placeholder': {
                color: 'rgba(26, 92, 42, 0.5)', 
            },
            '& textarea::placeholder': {
                color: 'rgba(26, 92, 42, 0.5)',
            },
        },
        '& .MuiInputLabel-root': {
            fontFamily: '"Inknut Antiqua", serif',
            fontSize: '0.85rem',
            color: '#1A5C2A',
            fontWeight: 700,
            '&.Mui-focused': {
                color: '#F7A11A',
            },
        },
    };

    return (
        <Box sx={{ bgcolor: '#FFFFFF' }}>
            <SEOHead
                title={language === 'en' ? "Contact Us | Inspire Translations" : "Wasiliana Nasi | Inspire Translations"}
                description={c.heroDesc}
            />

            {/* Authentic Brand Hero - matching the HeroSection style */}
            <Box sx={{ 
                position: 'relative', 
                minHeight: { xs: 'auto', md: '75vh' },
                display: 'flex',
                alignItems: 'flex-start',
                background: `linear-gradient(135deg, rgba(26, 92, 42, 0.95) 0%, rgba(15, 58, 26, 0.9) 100%), url(${contactHeroImg}) center/cover no-repeat`,
                pt: { xs: 20, md: 24 },
                pb: { xs: 15, md: 24 }
            }}>
                <Container maxWidth="lg">
                    <Box sx={{ maxWidth: 850 }}>
                        {/* Animated arrow label */}
                        <Box ref={contactRef} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2, overflow: 'hidden' }}>
                            <Box sx={{
                                height: 2, bgcolor: '#F7A11A',
                                width: inView ? 32 : 0,
                                transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
                            }} />
                            <Box sx={{
                                display: 'flex', alignItems: 'center',
                                transform: inView ? 'translateX(0) scale(1)' : 'translateX(-20px) scale(0.6)',
                                opacity: inView ? 1 : 0,
                                transition: 'opacity 0.4s ease 0.45s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.45s',
                            }}>
                                <ArrowForwardIcon sx={{ color: '#F7A11A', fontSize: 18 }} />
                            </Box>
                            <Box sx={{
                                transform: inView ? 'translateY(0)' : 'translateY(8px)',
                                opacity: inView ? 1 : 0,
                                transition: 'opacity 0.4s ease 0.6s, transform 0.4s ease 0.6s',
                            }}>
                                <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#F7A11A', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                    {c.heroLabel}
                                </Typography>
                            </Box>
                        </Box>
                        <TypewriterText 
                            text={c.heroTitle}
                            variant="h1"
                            sx={{ 
                                fontFamily: '"Inknut Antiqua", serif',
                                fontSize: { xs: '2rem', sm: '2.8rem', md: '3.5rem' },
                                color: '#FFFFFF',
                                lineHeight: 1.1,
                                mb: 3,
                                fontWeight: 400
                            }}
                        />
                        <Typography sx={{ 
                            fontFamily: '"Inknut Antiqua", serif',
                            color: 'rgba(255,255,255,0.8)',
                            fontSize: '0.95rem',
                            lineHeight: 1.8,
                            maxWidth: 600
                        }}>
                            {c.heroDesc}
                        </Typography>
                    </Box>
                </Container>
            </Box>

            {/* Split Content Section - Matching the Hero side-by-side logic */}
            <Container maxWidth="lg" sx={{ mt: { xs: 4, md: -12 }, mb: 8, position: 'relative', zIndex: 10 }}>
                <Grid container spacing={0}>
                    {/* Left: Contact Details (The Yellow Box) */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ 
                            bgcolor: '#F7A11A', 
                            p: { xs: 4, md: 6 }, 
                            height: '100%',
                            border: '3px solid #FFFFFF',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Typography sx={{ 
                                fontFamily: '"Inknut Antiqua", serif', 
                                fontWeight: 700, 
                                color: '#1A5C2A', 
                                fontSize: '1.8rem',
                                mb: 2
                            }}>
                                {c.contactInfo}
                            </Typography>
                            <Typography sx={{ 
                                fontFamily: '"Inknut Antiqua", serif', 
                                color: '#4A4A4A', 
                                mb: 6, 
                                lineHeight: 1.6,
                                fontSize: '0.9rem'
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
                                        <Box sx={{ color: '#1A5C2A', mt: 0.5 }}>{item.icon}</Box>
                                        <Box>
                                            <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(26, 92, 42, 0.6)' }}>{item.label}</Typography>
                                            <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontSize: '1rem', fontWeight: 600, color: '#1A5C2A' }}>{item.value}</Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Right: The Form (The White Box) */}
                    <Grid item xs={12} md={7}>
                        <Box sx={{ 
                            bgcolor: '#FFFFFF', 
                            p: { xs: 4, md: 7 }, 
                            height: '100%',
                            border: '3px solid #1A5C2A',
                            borderLeft: { md: 'none' }
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
                                            <CheckCircleIcon sx={{ fontSize: 80, color: '#1A5C2A', mb: 3, opacity: 0.9 }} />
                                            <Typography variant="h4" sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#0D2B14', mb: 2 }}>
                                                {language === 'en' ? 'Success!' : 'Imefanikiwa!'}
                                            </Typography>
                                            <Typography sx={{ fontFamily: 'Outfit', color: '#4A4A6A', fontSize: '1.1rem', mb: 4, maxWidth: 450, lineHeight: 1.6 }}>
                                                {c.success}
                                            </Typography>
                                            <Box sx={{ p: 3, bgcolor: 'rgba(26,92,42,0.04)', border: '1px dashed #1A5C2A', mb: 6 }}>
                                                <Typography sx={{ color: '#1A5C2A', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                                    {language === 'en' ? 'Our team will contact you shortly.' : 'Timu yetu itawasiliana nawe hivi karibuni.'}
                                                </Typography>
                                            </Box>
                                            <Button 
                                                onClick={() => setSubmitted(false)} 
                                                variant="text" 
                                                sx={{ 
                                                    color: '#1A5C2A', 
                                                    fontWeight: 700, 
                                                    fontFamily: '"Inknut Antiqua", serif', 
                                                    fontSize: '1rem', 
                                                    textDecoration: 'underline',
                                                    '&:hover': { bgcolor: 'transparent', textDecoration: 'none' }
                                                }}
                                            >
                                                {language === 'en' ? 'Send another message' : 'Tuma ujumbe mwingine'}
                                            </Button>
                                        </Box>
                                    </motion.div>
                                ) : (
                                    <Box component="form" onSubmit={handleSubmit}>
                                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#1A5C2A', fontSize: '1.6rem', mb: 1.5 }}>{c.sendMessage}</Typography>
                                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', color: '#4A4A6A', fontSize: '0.9rem', mb: 5 }}>{c.formDesc}</Typography>
                                        
                                        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 0, fontFamily: 'Outfit' }}>{error}</Alert>}
                                        
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}><TextField fullWidth name="name" value={form.name} onChange={handleChange} label={c.fullName} required variant="outlined" sx={inputStyles} /></Grid>
                                            <Grid item xs={12} sm={6}><TextField fullWidth name="email" value={form.email} onChange={handleChange} label={c.email} type="email" required variant="outlined" sx={inputStyles} /></Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth name="subject" value={form.subject} onChange={handleChange} label={c.subject} required select variant="outlined" sx={inputStyles}>
                                                    {c.subjects.map((s) => <MenuItem key={s} value={s} sx={{ fontFamily: 'Outfit' }}>{s}</MenuItem>)}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} sm={6}><TextField fullWidth name="phone" value={form.phone} onChange={handleChange} label={c.phone} variant="outlined" sx={inputStyles} /></Grid>
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
                                                        border: '2px solid #1A5C2A',
                                                        borderRadius: 50,
                                                        overflow: 'hidden',
                                                        bgcolor: 'transparent',
                                                        cursor: 'pointer',
                                                        p: 0,
                                                        '&:hover': { bgcolor: 'rgba(26, 92, 42, 0.04)' }
                                                    }}
                                                >
                                                    <Typography
                                                        component={motion.span}
                                                        variants={{ rest: { x: 0 }, hover: { x: 5 } }}
                                                        sx={{
                                                            color: '#1A5C2A',
                                                            fontFamily: '"Inknut Antiqua", serif',
                                                            fontWeight: 700,
                                                            fontSize: '0.8rem',
                                                            px: 4,
                                                            lineHeight: '44px'
                                                        }}
                                                    >
                                                        {loading ? c.sending : c.send}
                                                    </Typography>
                                                    <Box sx={{ width: 44, height: 44, bgcolor: '#1A5C2A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <motion.div variants={{ rest: { x: 0 }, hover: { x: 8 } }}>
                                                            <ArrowForwardIcon sx={{ color: '#FFFFFF', fontSize: 18 }} />
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
        </Box>
    );
};

export default ContactPage;
