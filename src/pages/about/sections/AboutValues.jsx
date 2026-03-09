import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { AnimatedPreTitle, TypewriterText } from '../../../components/common/Animations';

import imgPrecision from '../../../assets/images/written_translation.png';
import imgTrust from '../../../assets/images/onsite_interpretation.png';
import imgRespect from '../../../assets/images/language_classes.png';
import imgExcellence from '../../../assets/images/conference_logistics.png';

const values = [
    { img: imgPrecision, title: { en: 'Precision', sw: 'Usahihi' }, desc: { en: 'Every word matters. We deliver translations with exact accuracy, preserving meaning, tone, and intent.', sw: 'Kila neno ni muhimu. Tunatoa tafsiri kwa usahihi kabisa, tukihifadhi maana, sauti, na dhumuni.' } },
    { img: imgTrust, title: { en: 'Trust', sw: 'Imani' }, desc: { en: 'Confidentiality and reliability are the foundation of every client relationship we build.', sw: 'Usiri na uaminifu ndio msingi wa kila uhusiano wa mteja tunaoujenga.' } },
    { img: imgRespect, title: { en: 'Cultural Respect', sw: 'Heshima ya Kitamaduni' }, desc: { en: 'We honor the cultures behind every language, ensuring communication that resonates authentically.', sw: 'Tunahishimu tamaduni nyuma ya kila lugha, tukihakikisha mawasiliano yanayochochea uhalisia.' } },
    { img: imgExcellence, title: { en: 'Excellence', sw: 'Ubora' }, desc: { en: 'We hold ourselves to the highest professional standards in every project we undertake.', sw: 'Tunajiwekea viwango vya juu vya kitaaluma katika kila mradi tunaoutekeleza.' } },
];

const AboutValues = ({ c, language, ui, t }) => {
    return (
        <Box sx={{ position: 'relative', pt: { xs: 8, md: 8 }, pb: { xs: 10, md: 14 }, background: { xs: '#1A5C2A', md: 'linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 60vh, #1A5C2A 60vh, #1A5C2A 100%)' } }}>
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ textAlign: 'left', mb: 7 }}>
                    <AnimatedPreTitle text={ui.ourPurpose} color="#F7A11A" align="flex-start" />
                    <TypewriterText key={`values-title-${language}`} text={c.valuesTitle} variant="h2" sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, fontSize: { xs: '1.6rem', sm: '2rem', md: '2.6rem' }, color: { xs: '#FFFFFF', md: '#0D2B14' }, lineHeight: 1.15, mb: 2 }} />
                    <Box sx={{ width: 56, height: 4, bgcolor: '#F7A11A', mb: 3 }} />
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 4 }}>
                    {values.map((v, i) => (
                        <Box key={i} sx={{ textAlign: 'left', border: '3px solid #FFFFFF', p: { xs: 2, sm: 2.5, md: 3 }, bgcolor: { xs: 'rgba(255,255,255,0.05)', md: 'transparent' } }}>
                            <Box component="img" src={v.img} alt={t(v.title)} sx={{ width: '100%', height: { xs: 200, sm: 260 }, objectFit: 'cover', mb: 3, filter: 'contrast(1.1)' }} />
                            <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 800, color: '#F7A11A', fontSize: '1.2rem', mb: 1, letterSpacing: '0.05em' }}>0{i + 1} /</Typography>
                            <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontWeight: 700, color: '#FFFFFF', mb: 1.5, fontSize: '1.2rem', lineHeight: 1.3 }}>{t(v.title)}</Typography>
                            <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', lineHeight: 1.7 }}>{t(v.desc)}</Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default AboutValues;
