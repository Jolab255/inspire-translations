import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import SEOHead from '../../components/seo/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';

const galleryItemsData = [
    { id: 1, title: { en: 'UN Conference Interpretation', sw: 'Ukalimani wa Mkutano wa UN' }, category: { en: 'Conference', sw: 'Mkutano' }, h: 240, bg: 'linear-gradient(135deg, #F7A11A, #D4880E)', emoji: '🎙️' },
    { id: 2, title: { en: 'Corporate Language Training', sw: 'Mafunzo ya Lugha ya Kampuni' }, category: { en: 'Training', sw: 'Mafunzo' }, h: 180, bg: 'linear-gradient(135deg, #1A5C2A, #2A7A3B)', emoji: '📚' },
    { id: 3, title: { en: 'Interpretation Booth Setup', sw: 'Ufungaji wa Vibanda vya Ukalimani' }, category: { en: 'Equipment', sw: 'Vifaa' }, h: 280, bg: 'linear-gradient(135deg, #0D1B2A, #2A4A60)', emoji: '🎧' },
    { id: 4, title: { en: 'Team at ARSO Conference', sw: 'Timu katika Mkutano wa ARSO' }, category: { en: 'Events', sw: 'Hafla' }, h: 200, bg: 'linear-gradient(135deg, #D4880E, #F7A11A)', emoji: '🏛️' },
    { id: 5, title: { en: 'Document Translation Project', sw: 'Mradi wa Tafsiri ya Nyaraka' }, category: { en: 'Translation', sw: 'Tafsiri' }, h: 260, bg: 'linear-gradient(135deg, #1A2E40, #0F3A1A)', emoji: '📄' },
    { id: 6, title: { en: 'Remote Interpretation Setup', sw: 'Maandalizi ya Ukalimani wa Masafa' }, category: { en: 'Remote', sw: 'Masafa' }, h: 180, bg: 'linear-gradient(135deg, #F7A11A, #1A5C2A)', emoji: '💻' },
    { id: 7, title: { en: 'GIZ Tanzania Partnership', sw: 'Ushirikiano na GIZ Tanzania' }, category: { en: 'Events', sw: 'Hafla' }, h: 220, bg: 'linear-gradient(135deg, #2A7A3B, #F7A11A)', emoji: '🤝' },
    { id: 8, title: { en: 'Legal Translation Team', sw: 'Timu ya Tafsiri ya Kisheria' }, category: { en: 'Translation', sw: 'Tafsiri' }, h: 200, bg: 'linear-gradient(135deg, #0F3A1A, #D4880E)', emoji: '⚖️' },
    { id: 9, title: { en: 'Language Class Session', sw: 'Kipindi cha Darasa la Lugha' }, category: { en: 'Training', sw: 'Mafunzo' }, h: 270, bg: 'linear-gradient(135deg, #D4880E, #1A5C2A)', emoji: '🌍' },
];

const GalleryPage = () => {
    const { language, t } = useLanguage();
    const ui = uiTranslations[language];
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [filter, setFilter] = useState('All');

    const content = {
        en: {
            heroLabel: "Gallery",
            heroTitle: <>Our <Box component="span" sx={{ color: '#F7A11A' }}>Gallery</Box></>,
            heroDesc: "A visual journey through our events, conferences, and team activities.",
            all: "All"
        },
        sw: {
            heroLabel: "Picha",
            heroTitle: <>Maktaba ya <Box component="span" sx={{ color: '#F7A11A' }}>Picha</Box></>,
            heroDesc: "Safari ya picha kupitia hafla zetu, mikutano, na shughuli za timu.",
            all: "Zote"
        }
    };

    const c = content[language];

    const categories = [c.all, ...new Set(galleryItemsData.map((g) => t(g.category)))];
    const filtered = filter === c.all ? galleryItemsData : galleryItemsData.filter((g) => t(g.category) === filter);

    return (
        <>
            <SEOHead
                title={language === 'en' ? "Gallery | Inspire Translations Tanzania" : "Picha | Inspire Translations Tanzania"}
                description={c.heroDesc}
            />
            {/* Hero */}
            <Box sx={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2E40 60%, #0F3A1A 100%)', py: { xs: 10, md: 13 }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                {[...Array(5)].map((_, i) => <Box key={i} sx={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', bgcolor: 'rgba(247,161,26,0.4)', top: `${15 + i * 15}%`, left: `${8 + i * 18}%`, animation: `float ${3 + i}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }} />)}
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <Chip label={c.heroLabel} sx={{ bgcolor: 'rgba(247,161,26,0.15)', color: '#F7A11A', border: '1px solid rgba(247,161,26,0.3)', fontFamily: 'Outfit', fontWeight: 600, mb: 3 }} />
                        <Typography variant="h1" sx={{ color: '#FFFFFF', fontWeight: 900, mb: 3, fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' } }}>
                            {c.heroTitle}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8 }}>
                            {c.heroDesc}
                        </Typography>
                    </motion.div>
                </Container>
            </Box>

            <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: '#F8F9FA' }}>
                <Container maxWidth="lg">
                    {/* Filter chips */}
                    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center', mb: 6 }}>
                        {categories.map((cat) => (
                            <Chip
                                key={cat}
                                label={cat}
                                clickable
                                onClick={() => setFilter(cat)}
                                sx={{
                                    bgcolor: filter === cat ? '#F7A11A' : '#fff',
                                    color: filter === cat ? '#fff' : '#4A4A6A',
                                    border: '1px solid',
                                    borderColor: filter === cat ? '#F7A11A' : 'rgba(0,0,0,0.1)',
                                    fontFamily: 'Outfit',
                                    fontWeight: 600,
                                    transition: 'all 0.3s',
                                    '&:hover': { bgcolor: filter === cat ? '#D4880E' : 'rgba(247,161,26,0.1)', borderColor: '#F7A11A' },
                                }}
                            />
                        ))}
                    </Box>

                    <Grid container spacing={2}>
                        {filtered.map((item, i) => (
                            <Grid item xs={12} sm={6} md={4} key={item.id}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    whileHover={{ y: -4 }}
                                >
                                    <Box
                                        onClick={() => { setIndex(i); setOpen(true); }}
                                        sx={{
                                            height: { xs: 200, sm: item.h },
                                            background: item.bg,
                                            borderRadius: 3,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            transition: 'box-shadow 0.3s',
                                            '&:hover': { boxShadow: '0 16px 40px rgba(0,0,0,0.25)' },
                                        }}
                                    >
                                        <Typography sx={{ fontSize: '3rem', mb: 1 }}>{item.emoji}</Typography>
                                        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2, background: 'linear-gradient(0deg, rgba(0,0,0,0.6), transparent)' }}>
                                            <Chip label={t(item.category)} size="small" sx={{ bgcolor: 'rgba(247,161,26,0.85)', color: '#fff', fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.65rem', mb: 0.5 }} />
                                            <Typography sx={{ color: '#fff', fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.85rem' }}>{t(item.title)}</Typography>
                                        </Box>
                                    </Box>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>

                    <Lightbox
                        open={open}
                        close={() => setOpen(false)}
                        index={index}
                        slides={filtered.map((item) => ({ src: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="black" /><text x="50%" y="50%" text-anchor="middle" font-size="80" fill="white">${encodeURIComponent(item.emoji)}</text></svg>`, alt: t(item.title) }))}
                    />
                </Container>
            </Box>
        </>
    );
};

export default GalleryPage;
