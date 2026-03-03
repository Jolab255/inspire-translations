import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { motion } from 'framer-motion';
import SEOHead from '../../components/seo/SEOHead';

const sections = [
    { title: '1. Information We Collect', content: 'We collect information you provide directly to us, such as when you submit a quote request, contact form, or subscribe to our newsletter. This includes your name, email address, phone number, and project details.' },
    { title: '2. How We Use Your Information', content: 'We use the information we collect to: provide, maintain, and improve our services; respond to your inquiries and fulfill your requests; send you quotes, project updates, and service communications; and comply with legal obligations.' },
    { title: '3. Confidentiality & NDAs', content: 'All documents, materials, and information shared with Inspire Translations for translation or interpretation purposes are treated with strict confidentiality. We sign NDAs upon request and our staff are bound by professional confidentiality standards.' },
    { title: '4. Information Sharing', content: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and providing services, subject to confidentiality agreements.' },
    { title: '5. Data Security', content: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.' },
    { title: '6. Cookies', content: 'Our website uses cookies to enhance your browsing experience. You can control cookie settings through your browser preferences. Disabling cookies may affect some functionality of our website.' },
    { title: '7. Your Rights', content: 'You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at privacy@inspiretranslations.co.tz.' },
    { title: '8. Contact Us', content: 'If you have questions about this Privacy Policy, please contact us at info@inspiretranslations.co.tz or by mail at our Dar es Salaam address.' },
];

const LegalPage = ({ title, badge, intro, children }) => (
    <>
        <Box sx={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2E40 100%)', py: { xs: 9, md: 11 }, textAlign: 'center' }}>
            <Container maxWidth="md">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <Chip label={badge} sx={{ bgcolor: 'rgba(247,161,26,0.15)', color: '#F7A11A', border: '1px solid rgba(247,161,26,0.3)', fontFamily: 'Outfit', fontWeight: 600, mb: 3 }} />
                    <Typography variant="h2" sx={{ color: '#FFFFFF', fontWeight: 800, mb: 2 }}>{title}</Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Last updated: March 2025</Typography>
                    {intro && <Typography sx={{ color: 'rgba(255,255,255,0.7)', mt: 2, lineHeight: 1.8 }}>{intro}</Typography>}
                </motion.div>
            </Container>
        </Box>
        <Box sx={{ py: 10, bgcolor: '#fff' }}>
            <Container maxWidth="md">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    {children}
                </motion.div>
            </Container>
        </Box>
    </>
);

export const PrivacyPage = () => (
    <>
        <SEOHead title="Privacy Policy | Inspire Translations" description="Inspire Translations Privacy Policy — how we collect, use and protect your personal information." canonicalUrl="https://inspiretranslations.co.tz/privacy-policy" />
        <LegalPage title="Privacy Policy" badge="Legal" intro="At Inspire Translations, we are committed to protecting your privacy and handling your personal data with transparency and care.">
            {sections.map((s, i) => (
                <Box key={s.title} sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', mb: 1.5 }}>{s.title}</Typography>
                    <Typography sx={{ color: '#4A4A6A', lineHeight: 1.9 }}>{s.content}</Typography>
                    {i < sections.length - 1 && <Divider sx={{ mt: 4 }} />}
                </Box>
            ))}
        </LegalPage>
    </>
);

export const TermsPage = () => (
    <>
        <SEOHead title="Terms of Service | Inspire Translations" description="Terms of Service for Inspire Translations — the terms governing use of our services and website." canonicalUrl="https://inspiretranslations.co.tz/terms" />
        <LegalPage title="Terms of Service" badge="Legal" intro="By engaging Inspire Translations services or using our website, you agree to the following terms and conditions.">
            {[
                { title: '1. Acceptance of Terms', content: 'By accessing our website or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.' },
                { title: '2. Services', content: 'Inspire Translations provides professional translation, interpretation, language training, conference logistics, and related language services. All services are subject to availability.' },
                { title: '3. Project Agreements', content: 'Each project is governed by a separate service agreement outlining scope, deliverables, timelines, and pricing. Commencement of work requires written confirmation.' },
                { title: '4. Payment Terms', content: 'Payment terms are specified in project agreements. Late payments may incur interest charges. We reserve the right to suspend services for overdue accounts.' },
                { title: '5. Intellectual Property', content: 'Upon full payment, clients own the rights to translated or interpreted materials produced by Inspire Translations for their projects.' },
                { title: '6. Limitation of Liability', content: 'Inspire Translations shall not be liable for indirect, incidental, or consequential damages arising from use of our services beyond the fees paid for the specific project.' },
                { title: '7. Governing Law', content: 'These terms are governed by the laws of the United Republic of Tanzania. Disputes shall be resolved in the courts of Dar es Salaam.' },
            ].map((s, i, arr) => (
                <Box key={s.title} sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1A1A2E', mb: 1.5 }}>{s.title}</Typography>
                    <Typography sx={{ color: '#4A4A6A', lineHeight: 1.9 }}>{s.content}</Typography>
                    {i < arr.length - 1 && <Divider sx={{ mt: 4 }} />}
                </Box>
            ))}
        </LegalPage>
    </>
);
