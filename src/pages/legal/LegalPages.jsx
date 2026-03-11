import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { motion } from 'framer-motion';
import SEOHead from '../../components/seo/SEOHead';
import { useLanguage } from '../../contexts/LanguageContext';
import { uiTranslations } from '../../data/translations/ui';

const LegalPage = ({ title, badge, intro, children, language }) => (
    <>
        <Box sx={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2E40 100%)', py: { xs: 24, md: 28 }, textAlign: 'center' }}>
            <Container maxWidth="md">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <Chip label={badge} sx={{ bgcolor: 'rgba(247,161,26,0.15)', color: '#F7A11A', border: '1px solid rgba(247,161,26,0.3)', fontFamily: 'Outfit', fontWeight: 600, mb: 3 }} />
                    <Typography variant="h2" sx={{ color: '#FFFFFF', fontWeight: 800, mb: 2, fontSize: { xs: '2.2rem', md: '3rem' } }}>{title}</Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                        {language === 'en' ? 'Last updated: March 2025' : 'Ilisasishwa mwisho: Machi 2025'}
                    </Typography>
                    {intro && <Typography sx={{ color: 'rgba(255,255,255,0.7)', mt: 2, lineHeight: 1.8, fontSize: '1rem' }}>{intro}</Typography>}
                </motion.div>
            </Container>
        </Box>
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
            <Container maxWidth="md">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    {children}
                </motion.div>
            </Container>
        </Box>
    </>
);

export const PrivacyPage = () => {
    const { language } = useLanguage();
    
    const content = {
        en: {
            title: "Privacy Policy",
            intro: "At Inspire Translations, we are committed to protecting your privacy and handling your personal data with transparency and care.",
            sections: [
                { title: '1. Information We Collect', content: 'We collect information you provide directly to us, such as when you submit a quote request, contact form, or subscribe to our newsletter. This includes your name, email address, phone number, and project details.' },
                { title: '2. How We Use Your Information', content: 'We use the information we collect to: provide, maintain, and improve our services; respond to your inquiries and fulfill your requests; send you quotes, project updates, and service communications; and comply with legal obligations.' },
                { title: '3. Confidentiality & NDAs', content: 'All documents, materials, and information shared with Inspire Translations for translation or interpretation purposes are treated with strict confidentiality. We sign NDAs upon request and our staff are bound by professional confidentiality standards.' },
                { title: '4. Information Sharing', content: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and providing services, subject to confidentiality agreements.' },
                { title: '5. Data Security', content: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.' },
                { title: '6. Cookies', content: 'Our website uses cookies to enhance your browsing experience. You can control cookie settings through your browser preferences. Disabling cookies may affect some functionality of our website.' },
                { title: '7. Your Rights', content: 'You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at privacy@inspiretranslations.co.tz.' },
                { title: '8. Contact Us', content: 'If you have questions about this Privacy Policy, please contact us at info@inspiretranslations.co.tz or by mail at our Dar es Salaam address.' },
            ]
        },
        sw: {
            title: "Sera ya Faragha",
            intro: "Katika Inspire Translations, tumejitolea kulinda faragha yako na kushughulikia data zako za kibinafsi kwa uwazi na umakini.",
            sections: [
                { title: '1. Taarifa Tunazokusanya', content: 'Tunakusanya taarifa unazotoa moja kwa moja kwetu, kama vile unapotuma ombi la makadirio, fomu ya mawasiliano, au kujiandikisha kwa jarida letu. Hii inajumuisha jina lako, anwani ya barua pepe, nambari ya simu, na maelezo ya mradi.' },
                { title: '2. Jinsi Tunavyotumia Taarifa Zako', content: 'Tunatumia taarifa tunazokusanya ili: kutoa, kudumisha, na kuboresha huduma zetu; kujibu maswali yako na kutimiza maombi yako; kukutumia makadirio, sasisho za mradi, na mawasiliano ya huduma; na kutii majukumu ya kisheria.' },
                { title: '3. Usiri na NDAs', content: 'Nyaraka zote, vifaa, na taarifa zinazoshirikiwa na Inspire Translations kwa madhumuni ya tafsiri au ukalimani zinashughulikiwa kwa usiri mkubwa. Tunasaini mikataba ya usiri (NDAs) kwa ombi na wafanyakazi wetu wamefungwa na viwango vya usiri vya kitaalamu.' },
                { title: '4. Kushiriki Taarifa', content: 'Hatuuzi, hatufanyi biashara, wala kukodisha taarifa zako za kibinafsi kwa wahusika wengine. Tunaweza kushiriki taarifa zako na watoa huduma wanaoaminika wanaotusaidia katika kuendesha tovuti yetu na kutoa huduma, kwa kuzingatia mikataba ya usiri.' },
                { title: '5. Usalama wa Data', content: 'Tunatekeleza hatua zinazofaa za kiufundi na shirika ili kulinda taarifa zako za kibinafsi dhidi ya ufikiaji usioidhinishwa, mabadiliko, ufumbuzi, au uharibifu.' },
                { title: '6. Cookies', content: 'Tovuti yetu hutumia cookies ili kuboresha uzoefu wako wa kuvinjari. Unaweza kudhibiti mipangilio ya cookies kupitia mapendeleo ya kivinjari chako. Kuzima cookies kunaweza kuathiri baadhi ya utendaji wa tovuti yetu.' },
                { title: '7. Haki Zako', content: 'Una haki ya kupata, kusahihisha, au kufuta taarifa zako za kibinafsi. Ili kutekeleza haki hizi, tafadhali wasiliana nasi kupitia privacy@inspiretranslations.co.tz.' },
                { title: '8. Wasiliana Nasi', content: 'Ikiwa una maswali kuhusu Sera hii ya Faragha, tafadhali wasiliana nasi kupitia info@inspiretranslations.co.tz au kwa barua kupitia anwani yetu ya Dar es Salaam.' },
            ]
        }
    };

    const c = content[language];

    return (
        <>
            <SEOHead title={`${c.title} | Inspire Translations`} description={c.intro} canonicalUrl="https://inspiretranslations.co.tz/privacy-policy" />
            <LegalPage title={c.title} badge="Legal" intro={c.intro} language={language}>
                {c.sections.map((s, i) => (
                    <Box key={s.title} sx={{ mb: 4 }}>
                        <Typography variant="h5" sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', mb: 1.5, fontSize: '1.25rem' }}>{s.title}</Typography>
                        <Typography sx={{ color: '#4A4A6A', lineHeight: 1.9, fontSize: '0.95rem' }}>{s.content}</Typography>
                        {i < c.sections.length - 1 && <Divider sx={{ mt: 4 }} />}
                    </Box>
                ))}
            </LegalPage>
        </>
    );
};

export const TermsPage = () => {
    const { language } = useLanguage();

    const content = {
        en: {
            title: "Terms of Service",
            intro: "By engaging Inspire Translations services or using our website, you agree to the following terms and conditions.",
            sections: [
                { title: '1. Acceptance of Terms', content: 'By accessing our website or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.' },
                { title: '2. Services', content: 'Inspire Translations provides professional translation, interpretation, language training, conference logistics, and related language services. All services are subject to availability.' },
                { title: '3. Project Agreements', content: 'Each project is governed by a separate service agreement outlining scope, deliverables, timelines, and pricing. Commencement of work requires written confirmation.' },
                { title: '4. Payment Terms', content: 'Payment terms are specified in project agreements. Late payments may incur interest charges. We reserve the right to suspend services for overdue accounts.' },
                { title: '5. Intellectual Property', content: 'Upon full payment, clients own the rights to translated or interpreted materials produced by Inspire Translations for their projects.' },
                { title: '6. Limitation of Liability', content: 'Inspire Translations shall not be liable for indirect, incidental, or consequential damages arising from use of our services beyond the fees paid for the specific project.' },
                { title: '7. Governing Law', content: 'These terms are governed by the laws of the United Republic of Tanzania. Disputes shall be resolved in the courts of Dar es Salaam.' },
            ]
        },
        sw: {
            title: "Vigezo na Masharti",
            intro: "Kwa kutumia huduma za Inspire Translations au kutumia tovuti yetu, unakubaliana na vigezo na masharti yafuatayo.",
            sections: [
                { title: '1. Kukubali Masharti', content: 'Kwa kufikia tovuti yetu au kutumia huduma zetu, unakubali kufungwa na Vigezo na Masharti haya na sheria na kanuni zote zinazotumika.' },
                { title: '2. Huduma', content: 'Inspire Translations hutoa tafsiri ya kitaalamu, ukalimani, mafunzo ya lugha, uratibu wa mikutano, na huduma zinazohusiana na lugha. Huduma zote zinategemea upatikanaji.' },
                { title: '3. Mikataba ya Mradi', content: 'Kila mradi unatawaliwa na mkataba tofauti wa huduma unaofafanua upeo, matokeo, muda, na bei. Kuanza kwa kazi kunahitaji thibitisho la maandishi.' },
                { title: '4. Masharti ya Malipo', content: 'Masharti ya malipo yameainishwa katika mikataba ya mradi. Malipo ya marehemu yanaweza kusababisha tozo za riba. Tuna haki ya kusitisha huduma kwa akaunti zilizopitisha muda wa malipo.' },
                { title: '5. Miliki Ubunifu', content: 'Baada ya malipo kamili, wateja wanamiliki haki za vifaa vilivyotafsiriwa au kukalimaniwa vilivyotolewa na Inspire Translations kwa ajili ya miradi yao.' },
                { title: '6. Ukomo wa Dhima', content: 'Inspire Translations haitawajibika kwa uharibifu wa njia isiyo ya moja kwa moja, wa bahati mbaya, au wa matokeo unaotokana na matumizi ya huduma zetu zaidi ya ada zilizolipwa kwa mradi husika.' },
                { title: '7. Sheria Inayotawala', content: 'Masharti haya yanatawaliwa na sheria za Jamhuri ya Muungano wa Tanzania. Migogoro itatatuliwa katika mahakama za Dar es Salaam.' },
            ]
        }
    };

    const c = content[language];

    return (
        <>
            <SEOHead title={`${c.title} | Inspire Translations`} description={c.intro} canonicalUrl="https://inspiretranslations.co.tz/terms" />
            <LegalPage title={c.title} badge="Legal" intro={c.intro} language={language}>
                {c.sections.map((s, i) => (
                    <Box key={s.title} sx={{ mb: 4 }}>
                        <Typography variant="h5" sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', mb: 1.5, fontSize: '1.25rem' }}>{s.title}</Typography>
                        <Typography sx={{ color: '#4A4A6A', lineHeight: 1.9, fontSize: '0.95rem' }}>{s.content}</Typography>
                        {i < c.sections.length - 1 && <Divider sx={{ mt: 4 }} />}
                    </Box>
                ))}
            </LegalPage>
        </>
    );
};
