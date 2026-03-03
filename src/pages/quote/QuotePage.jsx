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
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import SendIcon from '@mui/icons-material/Send';
import { motion } from 'framer-motion';
import SEOHead from '../../components/seo/SEOHead';
import { services, languages } from '../../data/siteData';

const steps = ['Project Details', 'Contact Info', 'Confirm & Submit'];

const QuotePage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        serviceType: '', sourceLang: '', targetLang: '', documentType: '', wordCount: '',
        deadline: '', description: '', name: '', email: '', phone: '', organization: '',
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleNext = () => setActiveStep((s) => s + 1);
    const handleBack = () => setActiveStep((s) => s - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setLoading(false);
        setSubmitted(true);
    };

    return (
        <>
            <SEOHead
                title="Request a Quote | Inspire Translations Tanzania"
                description="Get a free, no-obligation quote for translation, interpretation, or language services. Fast response within 4 hours."
                canonicalUrl="https://inspiretranslations.co.tz/quote"
            />

            {/* Hero */}
            <Box sx={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2E40 60%, #0F3A1A 100%)', py: { xs: 10, md: 13 }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                {[...Array(5)].map((_, i) => (
                    <Box key={i} sx={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', bgcolor: 'rgba(247,161,26,0.4)', top: `${15 + i * 15}%`, left: `${8 + i * 18}%`, animation: `float ${3 + i % 2}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }} />
                ))}
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <Chip label="Free Quote" sx={{ bgcolor: 'rgba(247,161,26,0.15)', color: '#F7A11A', border: '1px solid rgba(247,161,26,0.3)', fontFamily: 'Outfit', fontWeight: 600, mb: 3 }} />
                        <Typography variant="h1" sx={{ color: '#FFFFFF', fontWeight: 900, mb: 3 }}>
                            Request a <Box component="span" sx={{ color: '#F7A11A' }}>Free Quote</Box>
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                            Tell us about your project and we'll get back to you with a competitive quote within 4 hours.
                        </Typography>
                    </motion.div>
                </Container>
            </Box>

            <Box sx={{ py: 10, bgcolor: '#F8F9FA' }}>
                <Container maxWidth="md">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        {submitted ? (
                            <Box sx={{ textAlign: 'center', py: 8 }}>
                                <Typography sx={{ fontSize: '4rem', mb: 3 }}>✅</Typography>
                                <Typography variant="h3" sx={{ fontFamily: 'Outfit', fontWeight: 800, color: '#1A5C2A', mb: 2 }}>Quote Request Sent!</Typography>
                                <Typography sx={{ color: '#4A4A6A', mb: 4, maxWidth: 500, mx: 'auto', lineHeight: 1.8 }}>
                                    Thank you, <strong>{form.name}</strong>! We've received your request and will send a detailed quote to <strong>{form.email}</strong> within 4 business hours.
                                </Typography>
                                <Alert severity="success" sx={{ maxWidth: 450, mx: 'auto', borderRadius: 3 }}>
                                    Check your inbox (and spam folder) for our response.
                                </Alert>
                            </Box>
                        ) : (
                            <Box sx={{ bgcolor: '#fff', borderRadius: 4, p: { xs: 3, md: 5 }, boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}>
                                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
                                    {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel sx={{ '& .MuiStepLabel-label': { fontFamily: 'Outfit', fontWeight: 600 }, '& .MuiStepIcon-root.Mui-active': { color: '#F7A11A' }, '& .MuiStepIcon-root.Mui-completed': { color: '#1A5C2A' } }}>
                                                {label}
                                            </StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>

                                <Box component="form" onSubmit={handleSubmit}>
                                    {/* Step 1 */}
                                    {activeStep === 0 && (
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <TextField fullWidth name="serviceType" label="Service Type" value={form.serviceType} onChange={handleChange} required select variant="outlined">
                                                    {services.map((s) => <MenuItem key={s.id} value={s.id}>{s.title}</MenuItem>)}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth name="sourceLang" label="Source Language" value={form.sourceLang} onChange={handleChange} required select variant="outlined">
                                                    {languages.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth name="targetLang" label="Target Language" value={form.targetLang} onChange={handleChange} required select variant="outlined">
                                                    {languages.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth name="documentType" label="Document Type" value={form.documentType} onChange={handleChange} select variant="outlined">
                                                    {['Legal Contract', 'Business Report', 'Medical Document', 'Technical Manual', 'Marketing Material', 'Academic Paper', 'Certificate', 'Other'].map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth name="wordCount" label="Approximate Word Count" value={form.wordCount} onChange={handleChange} type="number" variant="outlined" />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth name="deadline" label="Desired Deadline" value={form.deadline} onChange={handleChange} type="date" InputLabelProps={{ shrink: true }} variant="outlined" />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField fullWidth name="description" label="Project Description" value={form.description} onChange={handleChange} multiline rows={4} variant="outlined" placeholder="Describe your project, any specific requirements, or additional context..." />
                                            </Grid>
                                        </Grid>
                                    )}

                                    {/* Step 2 */}
                                    {activeStep === 1 && (
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth name="name" label="Full Name" value={form.name} onChange={handleChange} required />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth name="email" type="email" label="Email Address" value={form.email} onChange={handleChange} required />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth name="phone" label="Phone / WhatsApp" value={form.phone} onChange={handleChange} />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth name="organization" label="Organization / Company" value={form.organization} onChange={handleChange} />
                                            </Grid>
                                        </Grid>
                                    )}

                                    {/* Step 3: Review */}
                                    {activeStep === 2 && (
                                        <Box>
                                            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', mb: 3, fontSize: '1.1rem' }}>Review Your Request</Typography>
                                            <Grid container spacing={2}>
                                                {[
                                                    ['Service', services.find(s => s.id === form.serviceType)?.title || '-'],
                                                    ['Languages', `${form.sourceLang || '-'} → ${form.targetLang || '-'}`],
                                                    ['Document Type', form.documentType || '-'],
                                                    ['Word Count', form.wordCount ? `~${form.wordCount} words` : '-'],
                                                    ['Deadline', form.deadline || '-'],
                                                    ['Name', form.name || '-'],
                                                    ['Email', form.email || '-'],
                                                ].map(([label, value]) => (
                                                    <Grid item xs={12} sm={6} key={label}>
                                                        <Box sx={{ p: 2, bgcolor: '#F8F9FA', borderRadius: 2 }}>
                                                            <Typography sx={{ fontSize: '0.75rem', color: '#9E9E9E', fontFamily: 'Outfit', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', mb: 0.3 }}>{label}</Typography>
                                                            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 600, color: '#1A1A2E' }}>{value}</Typography>
                                                        </Box>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Box>
                                    )}

                                    {/* Navigation */}
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
                                        <Button onClick={handleBack} disabled={activeStep === 0} variant="outlined" color="secondary" sx={{ visibility: activeStep === 0 ? 'hidden' : 'visible' }}>
                                            Back
                                        </Button>
                                        {activeStep < steps.length - 1 ? (
                                            <Button onClick={handleNext} variant="contained" color="primary" size="large" sx={{ px: 5 }}>
                                                Next Step
                                            </Button>
                                        ) : (
                                            <Button type="submit" variant="contained" color="primary" size="large" disabled={loading} endIcon={<SendIcon />} sx={{ px: 5 }}>
                                                {loading ? 'Submitting...' : 'Submit Quote Request'}
                                            </Button>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </motion.div>
                </Container>
            </Box>
        </>
    );
};

export default QuotePage;
