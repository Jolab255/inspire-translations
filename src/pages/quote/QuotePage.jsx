import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SendIcon from '@mui/icons-material/Send';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '../../components/seo/SEOHead';
import CTASection from '../../components/common/CTASection';
import { services, languages } from '../../data/siteData';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';
import { TypewriterText, AnimatedPreTitle } from '../../components/common/Animations';

// Brand Assets
import quoteHeroImg from '../../assets/images/project_hero.png';

const COLORS = {
    primary: '#1A5C2A',
    secondary: '#0D2B14',
    accent: '#F7A11A',
    bg: '#FFFFFF',
    bgSoft: '#FBFBFB',
    text: '#1A1A2E',
    textMuted: '#4A4A6A'
};

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
            heroLabel: "Professional Estimations",
            heroTitle: "Request a Free Quote",
            heroDesc: "Tell us about your project and we'll get back to you with a competitive quote within 4 hours.",
            steps: ['Project Details', 'Contact Info', 'Confirm & Submit'],
            stepsTitle: "Quote Process",
            stepsDesc: "Follow these steps to receive a comprehensive proposal.",
            successTitle: "Submission Received",
            successDesc: (name, email) => <>Thank you, <strong>{name}</strong>. Your request is being analyzed. A formal proposal will be sent to <strong>{email}</strong> shortly.</>,
            successHint: "Average response time: 2.5 hours.",
            labels: {
                serviceType: "Service Type",
                sourceLang: "Source Language",
                targetLang: "Target Language",
                documentType: "Document Type",
                wordCount: "Word Count",
                deadline: "Deadline",
                description: "Description",
                placeholder: "Describe requirements...",
                name: "Full Name",
                email: "Email Address",
                phone: "Phone / WhatsApp",
                org: "Organization",
                review: "Review Your Request"
            },
            docTypes: ['Legal', 'Business', 'Medical', 'Technical', 'Marketing', 'Academic', 'Other'],
            nav: {
                back: "Back",
                next: "Next Step",
                submit: "Submit Request",
                submitting: "Submitting..."
            }
        },
        sw: {
            heroLabel: "Makadirio ya Bure",
            heroTitle: "Omba Makadirio ya Bure",
            heroDesc: "Tueleze kuhusu mradi wako na tutakujibu kwa makadirio ya ushindani ndani ya saa 4.",
            steps: ['Maelezo ya Mradi', 'Maelezo ya Mawasiliano', 'Thibitisha na Tuma'],
            stepsTitle: "Hatua za Makadirio",
            stepsDesc: "Fuata hatua hizi ili kupokea pendekezo kamili.",
            successTitle: "Ombi Limepokelewa",
            successDesc: (name, email) => <>Asante, <strong>{name}</strong>. Ombi lako linachambuliwa. Pendekezo rasmi litatumwa kwa <strong>{email}</strong> hivi karibuni.</>,
            successHint: "Muda wa wastani: saa 2.5.",
            labels: {
                serviceType: "Aina ya Huduma",
                sourceLang: "Lugha Chanzo",
                targetLang: "Lugha Lengwa",
                documentType: "Aina ya Hati",
                wordCount: "Maneno",
                deadline: "Muda",
                description: "Maelezo",
                placeholder: "Elezea mahitaji...",
                name: "Jina Kamili",
                email: "Barua Pepe",
                phone: "Simu / WhatsApp",
                org: "Shirika",
                review: "Kagua Ombi"
            },
            docTypes: ['Kisheria', 'Biashara', 'Matibabu', 'Kiufundi', 'Masoko', 'Kitaaluma', 'Nyingine'],
            nav: {
                back: "Rudi",
                next: "Hatua Inayofuata",
                submit: "Tuma Ombi",
                submitting: "Inatuma..."
            }
        }
    };

    const c = content[language];

    const inputStyles = {
        '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            bgcolor: '#FFFFFF',
            '& fieldset': {
                borderColor: COLORS.primary,
                borderWidth: '2px',
            },
            '&:hover fieldset': {
                borderColor: COLORS.primary,
                borderWidth: '2.5px',
            },
            '&.Mui-focused fieldset': {
                borderColor: COLORS.accent,
                borderWidth: '2.5px',
            },
            '& input': {
                fontFamily: 'Outfit',
                fontWeight: 600,
                py: 1.5
            },
            '& textarea': {
                fontFamily: 'Outfit',
                fontWeight: 600,
            },
            '& .MuiSelect-select': {
                fontFamily: 'Outfit',
                fontWeight: 600,
                py: 1.5
            },
        },
        '& .MuiInputLabel-root': {
            fontFamily: '"Inknut Antiqua", serif',
            fontSize: '0.75rem',
            color: COLORS.primary,
            fontWeight: 700,
            '&.Mui-focused': {
                color: COLORS.accent,
            },
        },
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleNext = () => {
        setActiveStep((s) => s + 1);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };
    
    const handleBack = () => {
        setActiveStep((s) => s - 1);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('https://formspree.io/f/xvzwzzey', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (response.ok) setSubmitted(true);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ bgcolor: '#FFFFFF' }}>
            <SEOHead
                title={language === 'en' ? "Request a Quote | Inspire Translations" : "Omba Makadirio | Inspire Translations"}
                description={c.heroDesc}
            />

            {/* Premium Split Hero */}
            <Box sx={{
                minHeight: { xs: 'auto', md: '55vh' },
                display: 'flex',
                alignItems: 'stretch',
                flexDirection: { xs: 'column', md: 'row' },
                background: COLORS.secondary,
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Box sx={{
                    width: { xs: '100%', md: '50%' },
                    display: 'flex',
                    alignItems: 'center',
                    px: { xs: 3, sm: 6, md: 12 },
                    py: { xs: 8, sm: 10, md: 12 },
                    bgcolor: COLORS.secondary,
                    zIndex: 2
                }}>
                    <Box>
                        <AnimatedPreTitle text={c.heroLabel} color={COLORS.accent} />
                        <TypewriterText 
                            key={`quote-hero-${language}`}
                            text={c.heroTitle}
                            variant="h1" 
                            sx={{ color: '#FFFFFF', fontWeight: 900, mb: 3, fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4rem' }, lineHeight: 1.1, fontFamily: '"Inknut Antiqua", serif' }} 
                        />
                        <Box sx={{ width: 80, height: 4, bgcolor: COLORS.accent, mb: 4 }} />
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: '1rem', md: '1.1rem' }, maxWidth: 500, lineHeight: 1.8, fontFamily: '"Inknut Antiqua", serif' }}>
                            {c.heroDesc}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    width: { xs: '100%', md: '50%' },
                    minHeight: { xs: '300px', md: 'auto' },
                    position: 'relative'
                }}>
                    <Box 
                        sx={{ 
                            width: '100%', 
                            height: '100%', 
                            background: `url(${quoteHeroImg}) center/cover no-repeat`,
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to right, #0D2B14 0%, transparent 100%)',
                                display: { xs: 'none', md: 'block' }
                            }
                        }} 
                    />
                </Box>
            </Box>

            {/* Compact Split Form Content Section */}
            <Container maxWidth="lg" sx={{ mt: { xs: 4, md: -10 }, mb: 8, position: 'relative', zIndex: 10 }}>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' },
                    borderRadius: 0,
                    overflow: 'hidden',
                    boxShadow: '0 50px 100px -20px rgba(0,0,0,0.15)',
                    minHeight: { md: '600px' }
                }}>
                    {/* Left: Progress Sidebar (The Yellow Box) */}
                    <Box sx={{ 
                        flex: { xs: 'none', md: '0 0 35%' },
                        bgcolor: COLORS.accent, 
                        p: { xs: 4, md: 5 }, 
                        border: '3px solid #FFFFFF',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 0
                    }}>
                        <Typography sx={{ 
                            fontFamily: '"Inknut Antiqua", serif', 
                            fontWeight: 700, 
                            color: COLORS.secondary, 
                            fontSize: '1.5rem',
                            mb: 2
                        }}>
                            {c.stepsTitle}
                        </Typography>
                        <Typography sx={{ 
                            fontFamily: '"Inknut Antiqua", serif', 
                            color: 'rgba(0,0,0,0.6)', 
                            mb: 4, 
                            lineHeight: 1.5,
                            fontSize: '0.85rem'
                        }}>
                            {c.stepsDesc}
                        </Typography>

                        <Stepper 
                            activeStep={activeStep} 
                            orientation="vertical"
                            sx={{
                                '& .MuiStepConnector-line': {
                                    borderColor: 'rgba(13, 43, 20, 0.2)',
                                    borderLeftWidth: '2px',
                                    minHeight: '30px'
                                },
                                '& .MuiStepIcon-root': {
                                    width: 28,
                                    height: 28,
                                    color: 'rgba(13, 43, 20, 0.1)',
                                    '&.Mui-active': { color: COLORS.secondary },
                                    '&.Mui-completed': { color: COLORS.secondary }
                                },
                                '& .MuiStepLabel-label': {
                                    fontFamily: '"Inknut Antiqua", serif',
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                    color: 'rgba(13, 43, 20, 0.5)',
                                    '&.Mui-active': { color: COLORS.secondary },
                                    '&.Mui-completed': { color: COLORS.secondary }
                                }
                            }}
                        >
                            {c.steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        <Box sx={{ mt: 'auto', pt: 4, display: { xs: 'none', md: 'block' } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                                <AssignmentIcon sx={{ color: COLORS.secondary, fontSize: 18 }} />
                                <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', color: COLORS.secondary, letterSpacing: '0.1em' }}>Secure Intake</Typography>
                            </Box>
                            <Typography sx={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'rgba(13, 43, 20, 0.7)', lineHeight: 1.4 }}>All project data is handled with absolute confidentiality.</Typography>
                        </Box>
                    </Box>

                    {/* Right: The Dynamic Form (The White Box) */}
                    <Box sx={{ 
                        flex: { xs: 'none', md: '1' },
                        bgcolor: '#FFFFFF', 
                        p: { xs: 4, md: 5 }, 
                        border: '3px solid #1A5C2A',
                        borderLeft: { md: 'none' },
                        borderRadius: 0,
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                    <Box sx={{ textAlign: 'center', py: 6 }}>
                                        <FactCheckIcon sx={{ fontSize: 70, color: COLORS.primary, mb: 3 }} />
                                        <Typography variant="h4" sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: COLORS.secondary, mb: 2 }}>{c.successTitle}</Typography>
                                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', color: '#4A4A6A', fontSize: '1rem', mb: 4, lineHeight: 1.8 }}>
                                            {c.successDesc(form.name, form.email)}
                                        </Typography>
                                        <Alert severity="success" sx={{ borderRadius: 0, fontFamily: 'Outfit', bgcolor: 'rgba(26, 92, 42, 0.05)', color: COLORS.primary, border: `1px solid ${COLORS.primary}`, textAlign: 'left' }}>{c.successHint}</Alert>
                                        <Button onClick={() => setSubmitted(false)} sx={{ mt: 5, color: COLORS.primary, fontWeight: 700, fontFamily: '"Inknut Antiqua", serif', textDecoration: 'underline', '&:hover': { bgcolor: 'transparent', textDecoration: 'none' } }}>Initialize New Request</Button>
                                    </Box>
                                </motion.div>
                            ) : (
                                <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <Box sx={{ mb: 4 }}>
                                        <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: COLORS.secondary, fontSize: '1.4rem', mb: 1 }}>
                                            {activeStep === 2 ? c.labels.review : c.steps[activeStep]}
                                        </Typography>
                                        <Box sx={{ width: 40, height: 3, bgcolor: COLORS.accent }} />
                                    </Box>
                                    
                                    <Box sx={{ flexGrow: 1 }}>
                                        {activeStep === 0 && (
                                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
                                                <TextField fullWidth select name="serviceType" value={form.serviceType} onChange={handleChange} label={c.labels.serviceType} required variant="outlined" sx={{ ...inputStyles, gridColumn: 'span 2' }}>
                                                    {services.map((s) => <MenuItem key={s.id} value={s.id} sx={{ fontFamily: 'Outfit' }}>{t(s.title)}</MenuItem>)}
                                                </TextField>
                                                <TextField fullWidth select name="sourceLang" value={form.sourceLang} onChange={handleChange} label={c.labels.sourceLang} required variant="outlined" sx={inputStyles}>
                                                    {languages.map((l) => <MenuItem key={l} value={l} sx={{ fontFamily: 'Outfit' }}>{l}</MenuItem>)}
                                                </TextField>
                                                <TextField fullWidth select name="targetLang" value={form.targetLang} onChange={handleChange} label={c.labels.targetLang} required variant="outlined" sx={inputStyles}>
                                                    {languages.map((l) => <MenuItem key={l} value={l} sx={{ fontFamily: 'Outfit' }}>{l}</MenuItem>)}
                                                </TextField>
                                                <TextField fullWidth select name="documentType" value={form.documentType} onChange={handleChange} label={c.labels.documentType} variant="outlined" sx={inputStyles}>
                                                    {c.docTypes.map((d) => <MenuItem key={d} value={d} sx={{ fontFamily: 'Outfit' }}>{d}</MenuItem>)}
                                                </TextField>
                                                <TextField fullWidth name="wordCount" value={form.wordCount} onChange={handleChange} label={c.labels.wordCount} type="number" variant="outlined" sx={inputStyles} />
                                                <TextField fullWidth name="deadline" value={form.deadline} onChange={handleChange} label={c.labels.deadline} type="date" InputLabelProps={{ shrink: true }} variant="outlined" sx={inputStyles} />
                                                <TextField fullWidth name="description" value={form.description} onChange={handleChange} label={c.labels.description} multiline rows={2} variant="outlined" sx={{ ...inputStyles, gridColumn: 'span 2' }} />
                                            </Box>
                                        )}

                                        {activeStep === 1 && (
                                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
                                                <TextField fullWidth name="name" value={form.name} onChange={handleChange} label={c.labels.name} required variant="outlined" sx={{ ...inputStyles, gridColumn: 'span 2' }} />
                                                <TextField fullWidth name="email" value={form.email} onChange={handleChange} label={c.labels.email} type="email" required variant="outlined" sx={{ ...inputStyles, gridColumn: 'span 2' }} />
                                                <TextField fullWidth name="phone" value={form.phone} onChange={handleChange} label={c.labels.phone} variant="outlined" sx={inputStyles} />
                                                <TextField fullWidth name="organization" value={form.organization} onChange={handleChange} label={c.labels.org} variant="outlined" sx={inputStyles} />
                                            </Box>
                                        )}

                                        {activeStep === 2 && (
                                            <Box sx={{ p: 3, bgcolor: 'rgba(13, 43, 20, 0.02)', border: '1px solid rgba(13, 43, 20, 0.05)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                                                <Box sx={{ gridColumn: 'span 2', borderBottom: '1px solid rgba(0,0,0,0.05)', pb: 2 }}>
                                                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(13, 43, 20, 0.4)', mb: 0.5 }}>Target Solution</Typography>
                                                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontSize: '0.85rem', fontWeight: 600, color: COLORS.secondary }}>{t(services.find(s => s.id === form.serviceType)?.title) || '-'}</Typography>
                                                </Box>
                                                <Box sx={{ borderBottom: '1px solid rgba(0,0,0,0.05)', pb: 2 }}>
                                                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(13, 43, 20, 0.4)', mb: 0.5 }}>Linguistic Pair</Typography>
                                                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontSize: '0.85rem', fontWeight: 600, color: COLORS.secondary }}>{form.sourceLang} → {form.targetLang}</Typography>
                                                </Box>
                                                <Box sx={{ borderBottom: '1px solid rgba(0,0,0,0.05)', pb: 2 }}>
                                                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(13, 43, 20, 0.4)', mb: 0.5 }}>Point of Contact</Typography>
                                                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontSize: '0.85rem', fontWeight: 600, color: COLORS.secondary }}>{form.name}</Typography>
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', pt: 4 }}>
                                        <Button 
                                            onClick={handleBack} 
                                            disabled={activeStep === 0} 
                                            startIcon={<ArrowBackIcon />}
                                            sx={{ 
                                                color: COLORS.primary, 
                                                fontFamily: '"Inknut Antiqua", serif', 
                                                fontWeight: 700,
                                                fontSize: '0.75rem',
                                                visibility: activeStep === 0 ? 'hidden' : 'visible'
                                            }}
                                        >
                                            {c.nav.back}
                                        </Button>

                                        {activeStep < 2 ? (
                                            <Box
                                                component={motion.button}
                                                onClick={handleNext}
                                                whileHover="hover"
                                                initial="rest"
                                                animate="rest"
                                                sx={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    border: `2px solid ${COLORS.primary}`,
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
                                                        color: COLORS.primary,
                                                        fontFamily: '"Inknut Antiqua", serif',
                                                        fontWeight: 700,
                                                        fontSize: '0.75rem',
                                                        px: 3,
                                                        lineHeight: '40px'
                                                    }}
                                                >
                                                    {c.nav.next}
                                                </Typography>
                                                <Box sx={{ width: 40, height: 40, bgcolor: COLORS.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <motion.div variants={{ rest: { x: 0 }, hover: { x: 6 } }}>
                                                        <ArrowForwardIcon sx={{ color: '#FFFFFF', fontSize: 16 }} />
                                                    </motion.div>
                                                </Box>
                                            </Box>
                                        ) : (
                                            <Box
                                                component={motion.button}
                                                onClick={handleSubmit}
                                                disabled={loading}
                                                whileHover="hover"
                                                initial="rest"
                                                animate="rest"
                                                sx={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    border: `2px solid ${COLORS.accent}`,
                                                    borderRadius: 50,
                                                    overflow: 'hidden',
                                                    bgcolor: COLORS.accent,
                                                    cursor: 'pointer',
                                                    p: 0,
                                                    opacity: loading ? 0.7 : 1
                                                }}
                                            >
                                                <Typography
                                                    component={motion.span}
                                                    variants={{ rest: { x: 0 }, hover: { x: 5 } }}
                                                    sx={{
                                                        color: COLORS.secondary,
                                                        fontFamily: '"Inknut Antiqua", serif',
                                                        fontWeight: 700,
                                                        fontSize: '0.75rem',
                                                        px: 3,
                                                        lineHeight: '40px'
                                                    }}
                                                >
                                                    {loading ? c.nav.submitting : c.nav.submit}
                                                </Typography>
                                                <Box sx={{ width: 40, height: 40, bgcolor: COLORS.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <motion.div variants={{ rest: { x: 0 }, hover: { x: 6 } }}>
                                                        <SendIcon sx={{ color: COLORS.accent, fontSize: 16 }} />
                                                    </motion.div>
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            )}
                        </AnimatePresence>
                    </Box>
                </Box>
            </Container>

            <CTASection />
        </Box>
    );
};

export default QuotePage;
