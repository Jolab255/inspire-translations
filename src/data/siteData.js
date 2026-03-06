// Services data
export const services = [
    {
        id: 'written-translation',
        title: 'Written Translation',
        shortDesc: 'Precision translation for legal, business, technical, and marketing documents.',
        fullDesc: 'Our expert translators handle a wide range of documents including legal contracts, business reports, academic papers, marketing materials, and technical manuals. We ensure the original intent, tone, and cultural nuance are perfectly preserved in every translation.',
        icon: '📄',
        lottieUrl: 'https://lottie.host/embed/translation-doc.json',
        features: ['Legal & Contracts', 'Business Reports', 'Marketing Materials', 'Technical Manuals', 'Academic Papers'],
        color: '#F7A11A',
    },
    {
        id: 'onsite-interpretation',
        title: 'On-Site Interpretation',
        shortDesc: 'Real-time professional interpretation for conferences, meetings & events.',
        fullDesc: 'Our certified interpreters provide real-time linguistic support for conferences, board meetings, court proceedings, medical consultations, and corporate events. We offer both consecutive and simultaneous interpretation services.',
        icon: '🎙️',
        lottieUrl: 'https://lottie.host/embed/interpretation.json',
        features: ['Conference Interpretation', 'Board Meetings', 'Court Proceedings', 'Medical Consultations', 'Simultaneous & Consecutive'],
        color: '#1A5C2A',
    },
    {
        id: 'remote-interpretation',
        title: 'Remote Interpretation',
        shortDesc: 'Seamless virtual interpretation via video conferencing and phone.',
        fullDesc: 'Connect across borders without leaving your location. Our remote interpretation service supports Zoom, Teams, Google Meet, and phone-based communication for international collaborations, virtual events, and multilingual webinars.',
        icon: '💻',
        lottieUrl: 'https://lottie.host/embed/remote.json',
        features: ['Video Conferencing', 'Phone Interpretation', 'Webinars', 'Virtual Conferences', 'Real-time Support'],
        color: '#F7A11A',
    },
    {
        id: 'language-classes',
        title: 'Language Classes',
        shortDesc: 'Tailored language training programs for individuals and organizations.',
        fullDesc: 'Whether you need corporate language training or personal language development, our qualified language instructors offer customized programs in Swahili, English, French, Arabic, Mandarin, and more. Classes available in-person or online.',
        icon: '📚',
        lottieUrl: 'https://lottie.host/embed/education.json',
        features: ['Corporate Training', 'Individual Lessons', 'Swahili Classes', 'Business English', 'Online & In-person'],
        color: '#1A5C2A',
    },
    {
        id: 'conference-logistics',
        title: 'Conference Logistics',
        shortDesc: 'Full-scale conference planning with interpreter coordination and AV support.',
        fullDesc: 'We handle the complete logistics for multilingual conferences and international events — from interpreter scheduling and briefing to audio-visual equipment setup, booth installation, and on-site technical support throughout your event.',
        icon: '🏛️',
        lottieUrl: 'https://lottie.host/embed/conference.json',
        features: ['Event Planning', 'Interpreter Coordination', 'AV Equipment Setup', 'Booth Installation', 'On-Site Technical Support'],
        color: '#F7A11A',
    },
    {
        id: 'equipment-rental',
        title: 'Equipment Rental',
        shortDesc: 'Professional interpretation booths, headsets, and AV equipment for your events.',
        fullDesc: 'Access our fleet of state-of-the-art interpretation equipment for rent — including soundproof interpretation booths, wireless receiver headsets, microphone systems, and full technical support from our experienced team.',
        icon: '🎧',
        lottieUrl: 'https://lottie.host/embed/headset.json',
        features: ['Interpretation Booths', 'Wireless Headsets', 'Microphone Systems', 'AV Equipment', 'Technical Support'],
        color: '#1A5C2A',
    },
];

// Stats data
export const stats = [
    { value: 10, suffix: '+', label: 'Years of Experience', icon: '🏆' },
    { value: 500, suffix: '+', label: 'Projects Completed', icon: '📋' },
    { value: 98, suffix: '%', label: 'Client Satisfaction', icon: '⭐' },
    { value: 25, suffix: '+', label: 'Language Pairs', icon: '🌍' },
];

// Testimonials data
export const testimonials = [
    {
        id: 1,
        name: 'Neema Prosper',
        role: 'Communications Lead',
        organization: 'Global Health Initiative',
        quote: 'Inspire Translations delivered exceptional simultaneous interpretation services for our 3-day international summit. Their professionalism and linguistic accuracy exceeded all expectations.',
        rating: 5,
        avatar: 'NP',
    },
    {
        id: 2,
        name: 'David Kazi',
        role: 'Legal Partner',
        organization: 'Kazi & Co. Advocates',
        quote: 'We rely on Inspire Translations for all our cross-border legal document translations. Their attention to legal terminology and deadlines is unmatched in Tanzania.',
        rating: 5,
        avatar: 'DK',
    },
    {
        id: 3,
        name: 'Enos Praygod',
        role: 'Project Manager',
        organization: 'Infrastructure Development Bank',
        quote: 'The corporate Swahili and English language training programs transformed our team\'s communication capabilities. Highly professional and tailored to our needs.',
        rating: 5,
        avatar: 'EP',
    },
    {
        id: 4,
        name: 'Ndeigu Mafwele',
        role: 'Conference Coordinator',
        organization: 'African Tourism Board',
        quote: 'Their technical support and equipment during our last regional conference were flawless. The team is dedicated and very responsive to last-minute changes.',
        rating: 5,
        avatar: 'NM',
    },
];

// Navigation links
export const navLinks = [
    { label: 'Home', path: '/' },
    {
        label: 'Services',
        path: '/services',
        children: services.map(s => ({ label: s.title, path: `/services/${s.id}` })),
    },
    { label: 'About Us', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
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

// Blog posts placeholder
export const blogPosts = [
    {
        id: 1,
        slug: 'importance-of-professional-translation',
        title: 'Why Professional Translation Matters for Business Growth',
        excerpt: 'In an increasingly globalized world, professional translation services are no longer a luxury — they are a necessity for businesses looking to expand beyond borders.',
        category: 'Industry Insights',
        date: '2025-12-01',
        readTime: '5 min read',
        image: null,
    },
    {
        id: 2,
        slug: 'swahili-business-guide',
        title: 'A Complete Guide to Swahili for Business in East Africa',
        excerpt: 'Swahili is spoken by over 200 million people across East Africa. Here\'s what businesses need to know about communicating effectively in the region.',
        category: 'Language Tips',
        date: '2025-11-15',
        readTime: '7 min read',
        image: null,
    },
    {
        id: 3,
        slug: 'conference-interpretation-tips',
        title: '5 Things to Know Before Hiring Conference Interpreters',
        excerpt: 'Planning a multilingual conference? Here are five critical factors to consider when booking professional interpretation services for your event.',
        category: 'Event Planning',
        date: '2025-11-01',
        readTime: '4 min read',
        image: null,
    },
];
