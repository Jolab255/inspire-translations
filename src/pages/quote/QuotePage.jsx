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
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';

const QuotePage = () => {
    const { language, t } = useLanguage();
    const ui = uiTranslations[language];
    const [activeStep, setActiveStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        serviceType: '', sourceLang: '', targetLang: '', documentType: '', wordCount: '',
        deadline: '', description: '', name: '', email: '', phone: '', organization: '',
    });

    const content = {
        en: {
            heroLabel: "Free Quote",
            heroTitle: <>Request a <Box component="span" sx={{ color: '#F7A11A' }}>Free Quote</Box></>,
            heroDesc: "Tell us about your project and we'll get back to you with a competitive quote within 4 hours.",
            steps: ['Project Details', 'Contact Info', 'Confirm & Submit'],
            successTitle: "Quote Request Sent!",
            successDesc: (name, email) => <>Thank you, <strong>{name}</strong>! We've received your request and will send a detailed quote to <strong>{email}</strong> within 4 business hours.</>,
            successHint: "Check your inbox (and spam folder) for our response.",
            labels: {
                serviceType: "Service Type",
                sourceLang: "Source Language",
                targetLang: "Target Language",
                documentType: "Document Type",
                wordCount: "Approximate Word Count",
                deadline: "Desired Deadline",
                description: "Project Description",
                placeholder: "Describe your project, any specific requirements, or additional context...",
                name: "Full Name",
                email: "Email Address",
                phone: "Phone / WhatsApp",
                org: "Organization / Company",
                review: "Review Your Request"
            },
            docTypes: ['Legal Contract', 'Business Report', 'Medical Document', 'Technical Manual', 'Marketing Material', 'Academic Paper', 'Certificate', 'Other'],
            nav: {
                back: "Back",
                next: "Next Step",
                submit: "Submit Quote Request",
                submitting: "Submitting..."
            }
        },
        sw: {
            heroLabel: "Makadirio ya Bure",
            heroTitle: <>Omba <Box component="span" sx={{ color: '#F7A11A' }}>Makadirio ya Bure</Box></>,
            heroDesc: "Tueleze kuhusu mradi wako na tutakujibu kwa makadirio ya ushindani ndani ya saa 4.",
            steps: ['Maelezo ya Mradi', 'Maelezo ya Mawasiliano', 'Thibitisha na Tuma'],
            successTitle: "Ombi la Makadirio Limetumwa!",
            successDesc: (name, email) => <>Asante, <strong>{name}</strong>! Tumepokea ombi lako na tutatuma makadirio ya kina kwa <strong>{email}</strong> ndani ya saa 4 za kazi.</>,
            successHint: "Angalia kikasha chako (na folda ya spam) kwa jibu letu.",
            labels: {
                serviceType: "Aina ya Huduma",
                sourceLang: "Lugha ya Awali",
                targetLang: "Lugha Lengwa",
                documentType: "Aina ya Nyaraka",
                wordCount: "Idadi ya Maneno (Takriban)",
                deadline: "Muda wa Kukamilisha",
                description: "Maelezo ya Mradi",
                placeholder: "Elezea mradi wako, mahitaji yoyote maalum, au muktadha wa ziada...",
                name: "Jina Kamili",
                email: "Anwani ya Barua Pepe",
                phone: "Simu / WhatsApp",
                org: "Shirika / Kampuni",
                review: "Hakiki Ombi Lako"
            },
            docTypes: ['Mkataba wa Kisheria', 'Ripoti ya Biashara', 'Nyaraka za Matibabu', 'Mwongozo wa Kiufundi', 'Vifaa vya Masoko', 'Karatasi ya Kitaaluma', 'Cheti', 'Nyingine'],
            nav: {
                back: "Rudi",
                next: "Hatua Inayofuata",
                submit: "Tuma Ombi la Makadirio",
                submitting: "Inatuma..."
            }
        }
    };

    const c = content[language];

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
                title={language === 'en' ? "Request a Quote | Inspire Translations Tanzania" : "Omba Makadirio | Inspire Translations Tanzania"}
                description={c.heroDesc}
            />

            {/* Hero */}
            <Box sx={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2E40 60%, #0F3A1A 100%)', py: { xs: 8, md: 13 }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                {[...Array(5)].map((_, i) => (
                    <Box key={i} sx={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', bgcolor: 'rgba(247,161,26,0.4)', top: `${15 + i * 15}%`, left: `${8 + i * 18}%`, animation: `float ${3 + i % 2}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }} />
                ))}
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <Chip label={c.heroLabel} sx={{ bgcolor: 'rgba(247,161,26,0.15)', color: '#F7A11A', border: '1px solid rgba(247,161,26,0.3)', fontFamily: 'Outfit', fontWeight: 600, mb: 3 }} />
                        <Typography variant="h1" sx={{ color: '#FFFFFF', fontWeight: 900, mb: 3, fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' } }}>
                            {c.heroTitle}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: '0.95rem', md: '1.1rem' }, lineHeight: 1.8 }}>
                            {c.heroDesc}
                        </Typography>
                    </motion.div>
                </Container>
            </Box>

            <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#F8F9FA' }}>
                <Container maxWidth="md">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        {submitted ? (
                            <Box sx={{ textAlign: 'center', py: { xs: 4, md: 8 } }}>
                                <Typography sx={{ fontSize: '4rem', mb: 3 }}>✅</Typography>
                                <Typography variant="h3" sx={{ fontFamily: 'Outfit', fontWeight: 800, color: '#1A5C2A', mb: 2, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>{c.successTitle}</Typography>
                                <Typography sx={{ color: '#4A4A6A', mb: 4, maxWidth: 500, mx: 'auto', lineHeight: 1.8 }}>
                                    {c.successDesc(form.name, form.email)}
                                </Typography>
                                <Alert severity="success" sx={{ maxWidth: 450, mx: 'auto', borderRadius: 3, textAlign: 'left' }}>
                                    {c.successHint}
                                </Alert>
                            </Box>
                        ) : (
                            <Box sx={{ bgcolor: '#fff', borderRadius: 4, p: { xs: 2.5, sm: 4, md: 5 }, boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}>
                                <Stepper activeStep={activeStep} alternativeLabel={window.innerWidth > 600} orientation={window.innerWidth <= 600 ? "vertical" : "horizontal"} sx={{ mb: 5 }}>
                                    {c.steps.map((label) => (
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
                                                <TextField fullWidth name="serviceType" label={c.labels.serviceType} value={form.serviceType} onChange={handleChange} required select variant="outlined">
                                                    {services.map((s) => <MenuItem key={s.id} value={s.id}>{t(s.title)}</MenuItem>)}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth name="sourceLang" label={c.labels.sourceLang} value={form.sourceLang} onChange={handleChange} required select variant="outlined">
                                                    {languages.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth name="targetLang" label={c.labels.targetLang} value={form.targetLang} onChange={handleChange} required select variant="outlined">
                                                    {languages.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth name="documentType" label={c.labels.documentType} value={form.documentType} onChange={handleChange} select variant="outlined">
                                                    {c.docTypes.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth name="wordCount" label={c.labels.wordCount} value={form.wordCount} onChange={handleChange} type="number" variant="outlined" />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth name="deadline" label={c.labels.deadline} value={form.deadline} onChange={handleChange} type="date" InputLabelProps={{ shrink: true }} variant="outlined" />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField fullWidth name="description" label={c.labels.description} value={form.description} onChange={handleChange} multiline rows={4} variant="outlined" placeholder={c.labels.placeholder} />
                                            </Grid>
                                        </Grid>
                                    )}

                                    {/* Step 2 */}
                                    {activeStep === 1 && (
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth name="name" label={c.labels.name} value={form.name} onChange={handleChange} required />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth name="email" type="email" label={c.labels.email} value={form.email} onChange={handleChange} required />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth name="phone" label={c.labels.phone} value={form.phone} onChange={handleChange} />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth name="organization" label={c.labels.org} value={form.organization} onChange={handleChange} />
                                            </Grid>
                                        </Grid>
                                    )}

                                    {/* Step 3: Review */}
                                    {activeStep === 2 && (
                                        <Box>
                                            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', mb: 3, fontSize: '1.1rem' }}>{c.labels.review}</Typography>
                                            <Grid container spacing={2}>
                                                {[
                                                    [c.labels.serviceType, t(services.find(s => s.id === form.serviceType)?.title) || '-'],
                                                    [language === 'en' ? 'Languages' : 'Lugha', `${form.sourceLang || '-'} → ${form.targetLang || '-'}`],
                                                    [c.labels.documentType, form.documentType || '-'],
                                                    [c.labels.wordCount, form.wordCount ? `~${form.wordCount} ${language === 'en' ? 'words' : 'maneno'}` : '-'],
                                                    [c.labels.deadline, form.deadline || '-'],
                                                    [c.labels.name, form.name || '-'],
                                                    [c.labels.email, form.email || '-'],
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
                                            {c.nav.back}
                                        </Button>
                                        {activeStep < c.steps.length - 1 ? (
                                            <Button onClick={handleNext} variant="contained" color="primary" size="large" sx={{ px: { xs: 3, sm: 5 } }}>
                                                {c.nav.next}
                                            </Button>
                                        ) : (
                                            <Button type="submit" variant="contained" color="primary" size="large" disabled={loading} endIcon={<SendIcon />} sx={{ px: { xs: 3, sm: 5 } }}>
                                                {loading ? c.nav.submitting : c.nav.submit}
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
