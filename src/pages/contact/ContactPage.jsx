import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { motion } from 'framer-motion';
import SEOHead from '../../components/seo/SEOHead';

const ContactPage = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1200));
        setLoading(false);
        setSubmitted(true);
    };

    const contactDetails = [
        { icon: <LocationOnIcon sx={{ color: '#F7A11A' }} />, label: 'Address', value: 'Dar es Salaam, Tanzania' },
        { icon: <PhoneIcon sx={{ color: '#F7A11A' }} />, label: 'Phone', value: '+255 000 000 000' },
        { icon: <WhatsAppIcon sx={{ color: '#25D366' }} />, label: 'WhatsApp', value: '+255 000 000 000' },
        { icon: <EmailIcon sx={{ color: '#F7A11A' }} />, label: 'Email', value: 'info@inspiretranslations.co.tz' },
        { icon: <AccessTimeIcon sx={{ color: '#F7A11A' }} />, label: 'Working Hours', value: 'Mon – Fri: 8:00 AM – 5:00 PM' },
    ];

    return (
        <>
            <SEOHead
                title="Contact Inspire Translations | Get in Touch"
                description="Contact Inspire Translations in Dar es Salaam, Tanzania. Reach us by phone, email, WhatsApp, or fill out our contact form for a quick response."
                canonicalUrl="https://inspiretranslations.co.tz/contact"
            />

            {/* Hero */}
            <Box sx={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2E40 60%, #0F3A1A 100%)', py: { xs: 10, md: 14 }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                {[...Array(6)].map((_, i) => (
                    <Box key={i} sx={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', bgcolor: 'rgba(247,161,26,0.4)', top: `${15 + i * 12}%`, left: `${8 + i * 15}%`, animation: `float ${3 + i % 2}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }} />
                ))}
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <Chip label="Contact Us" sx={{ bgcolor: 'rgba(247,161,26,0.15)', color: '#F7A11A', border: '1px solid rgba(247,161,26,0.3)', fontFamily: 'Outfit', fontWeight: 600, mb: 3 }} />
                        <Typography variant="h1" sx={{ color: '#FFFFFF', fontWeight: 900, mb: 3 }}>
                            Let's <Box component="span" sx={{ color: '#F7A11A' }}>Start a Conversation</Box>
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                            Whether you have a project or just want to learn more — we're here to help.
                        </Typography>
                    </motion.div>
                </Container>
            </Box>

            <Box sx={{ py: 12, bgcolor: '#fff' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6}>
                        {/* Contact Info */}
                        <Grid item xs={12} md={5}>
                            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                                <Typography variant="h3" sx={{ color: '#1A1A2E', fontWeight: 700, mb: 1.5 }}>Get in Touch</Typography>
                                <Typography sx={{ color: '#4A4A6A', mb: 4, lineHeight: 1.8 }}>
                                    Our team is ready to assist you with any language service need. Expect a response within 4 hours during business hours.
                                </Typography>

                                {contactDetails.map((item) => (
                                    <Box key={item.label} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5, mb: 3, p: 2.5, bgcolor: '#F8F9FA', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', transition: 'all 0.3s', '&:hover': { bgcolor: 'rgba(247,161,26,0.04)', borderColor: 'rgba(247,161,26,0.2)', transform: 'translateX(4px)' } }}>
                                        <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                                            {item.icon}
                                        </Box>
                                        <Box>
                                            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 600, color: '#9E9E9E', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 0.3 }}>{item.label}</Typography>
                                            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 600, color: '#1A1A2E' }}>{item.value}</Typography>
                                        </Box>
                                    </Box>
                                ))}

                                {/* Map placeholder */}
                                <Box sx={{ height: 200, borderRadius: 3, bgcolor: '#F8F9FA', border: '2px dashed rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography sx={{ fontSize: '2rem', mb: 1 }}>🗺️</Typography>
                                        <Typography sx={{ color: '#9E9E9E', fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.9rem' }}>Dar es Salaam, Tanzania</Typography>
                                    </Box>
                                </Box>
                            </motion.div>
                        </Grid>

                        {/* Contact Form */}
                        <Grid item xs={12} md={7}>
                            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                                <Box sx={{ p: { xs: 3, md: 5 }, bgcolor: '#F8F9FA', borderRadius: 4, border: '1px solid rgba(0,0,0,0.06)' }}>
                                    <Typography variant="h4" sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', mb: 1 }}>Send Us a Message</Typography>
                                    <Typography sx={{ color: '#4A4A6A', mb: 4, fontSize: '0.95rem' }}>Fill out the form and we'll get back to you within 4 hours.</Typography>

                                    {submitted ? (
                                        <Alert severity="success" sx={{ borderRadius: 3, fontFamily: 'Outfit', fontWeight: 600 }}>
                                            ✅ Thank you! Your message has been sent. We'll respond within 4 hours.
                                        </Alert>
                                    ) : (
                                        <Box component="form" onSubmit={handleSubmit}>
                                            <Grid container spacing={2.5}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField fullWidth name="name" label="Full Name" value={form.name} onChange={handleChange} required variant="outlined" sx={{ bgcolor: '#fff', borderRadius: 2 }} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField fullWidth name="email" label="Email Address" type="email" value={form.email} onChange={handleChange} required variant="outlined" sx={{ bgcolor: '#fff' }} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField fullWidth name="phone" label="Phone / WhatsApp" value={form.phone} onChange={handleChange} variant="outlined" sx={{ bgcolor: '#fff' }} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField fullWidth name="subject" label="Subject" value={form.subject} onChange={handleChange} required select variant="outlined" sx={{ bgcolor: '#fff' }}>
                                                        {['General Enquiry', 'Request a Quote', 'Partnership', 'Careers', 'Technical Support', 'Other'].map((opt) => (
                                                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField fullWidth name="message" label="Your Message" value={form.message} onChange={handleChange} required multiline rows={5} variant="outlined" sx={{ bgcolor: '#fff' }} />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button type="submit" variant="contained" color="primary" size="large" fullWidth disabled={loading} endIcon={<SendIcon />} sx={{ py: 1.8, fontSize: '1rem' }}>
                                                        {loading ? 'Sending...' : 'Send Message'}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    )}
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default ContactPage;
