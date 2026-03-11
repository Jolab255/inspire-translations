import servicesData from '../content/services.json';

// Services data
export const services = servicesData.services;

// Stats data
export const stats = [
    { value: 10, suffix: '+', label: { en: 'Years of Experience', sw: 'Miaka ya Uzoefu' }, icon: '🏆' },
    { value: 500, suffix: '+', label: { en: 'Projects Completed', sw: 'Miradi Imekamilika' }, icon: '📋' },
    { value: 98, suffix: '%', label: { en: 'Client Satisfaction', sw: 'Kuridhika kwa Wateja' }, icon: '⭐' },
    { value: 25, suffix: '+', label: { en: 'Language Pairs', sw: 'Jozi za Lugha' }, icon: '🌍' },
];

// Testimonials data
export const testimonials = [
    {
        id: 1,
        name: 'Neema Prosper',
        role: { en: 'Communications Lead', sw: 'Kiongozi wa Mawasiliano' },
        organization: 'Global Health Initiative',
        quote: {
            en: 'Inspire Translations delivered exceptional simultaneous interpretation services for our 3-day international summit. Their professionalism and linguistic accuracy exceeded all expectations.',
            sw: 'Inspire Translations walitoa huduma za kipekee za ukalimani wa papo hapo kwa mkutano wetu wa kimataifa wa siku 3. Taaluma yao na usahihi wa lugha vilivuka matarajio yote.'
        },
        rating: 5,
        avatar: 'NP',
    },
    {
        id: 2,
        name: 'David Kazi',
        role: { en: 'Legal Partner', sw: 'Mshirika wa Kisheria' },
        organization: 'Kazi & Co. Advocates',
        quote: {
            en: 'We rely on Inspire Translations for all our cross-border legal document translations. Their attention to legal terminology and deadlines is unmatched in Tanzania.',
            sw: 'Tunategemea Inspire Translations kwa tafsiri zote za nyaraka zetu za kisheria zinazovuka mipaka. Umakini wao kwa istilahi za kisheria na muda wa kukamilisha hauna kifani nchini Tanzania.'
        },
        rating: 5,
        avatar: 'DK',
    },
    {
        id: 3,
        name: 'Enos Praygod',
        role: { en: 'Project Manager', sw: 'Meneja wa Mradi' },
        organization: 'Infrastructure Development Bank',
        quote: {
            en: 'The corporate Swahili and English language training programs transformed our team\'s communication capabilities. Highly professional and tailored to our needs.',
            sw: 'Programu za mafunzo ya lugha ya Kiswahili na Kiingereza kwa kampuni zilileta mabadiliko makubwa katika uwezo wa mawasiliano wa timu yetu. Kitaalamu sana na ziliandaliwa kulingana na mahitaji yetu.'
        },
        rating: 5,
        avatar: 'EP',
    },
    {
        id: 4,
        name: 'Ndeigu Mafwele',
        role: { en: 'Conference Coordinator', sw: 'Mratibu wa Mikutano' },
        organization: 'African Tourism Board',
        quote: {
            en: 'Their technical support and equipment during our last regional conference were flawless. The team is dedicated and very responsive to last-minute changes.',
            sw: 'Usaidizi wao wa kiufundi na vifaa wakati wa mkutano wetu wa mwisho wa kikanda ulikuwa mzuri sana. Timu imejitolea na inaitikia haraka mabadiliko ya dakika za mwisho.'
        },
        rating: 5,
        avatar: 'NM',
    },
];

// Navigation links
export const navLinks = [
    { label: { en: 'Home', sw: 'Nyumbani' }, path: '/' },
    { label: { en: 'Services', sw: 'Huduma' }, path: '/services' },
    { label: { en: 'About Us', sw: 'Kuhusu Sisi' }, path: '/about' },
    { label: { en: 'Projects', sw: 'Miradi' }, path: '/projects' },
    { label: { en: 'Gallery', sw: 'Picha' }, path: '/gallery' },
    { label: { en: 'Blog', sw: 'Blogu' }, path: '/blog' },
    { label: { en: 'Contact', sw: 'Wasiliana Nasi' }, path: '/contact' },
];

// Languages supported
export const languages = [
    'English', 'Swahili', 'French', 'Arabic', 'Mandarin',
    'Portuguese', 'German', 'Spanish', 'Italian', 'Hindi',
];

// Client/partners placeholder
export const clients = [
    'UN Women', 'GIZ', 'World Bank', 'African Union', 'ARSO',
    'TRA', 'TCRA', 'TANESCO', 'Tanzania Tourism Board', 'NMB Bank',
];

// Blog posts are now managed via Markdown files in src/content/blog/
export const blogPosts = [];
