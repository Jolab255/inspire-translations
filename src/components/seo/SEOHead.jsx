import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const SEOHead = ({
    title,
    description,
    keywords,
    ogImage = 'https://inspiretranslations.co.tz/og-image.jpg',
    ogType = 'website',
    jsonLd = null,
}) => {
    const { language } = useLanguage();
    const location = useLocation();
    const siteUrl = 'https://inspiretranslations.co.tz';
    
    // Logic to get the path without the language prefix
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const hasLangPrefix = ['en', 'sw'].includes(pathSegments[0]);
    const cleanPathSegment = hasLangPrefix ? pathSegments.slice(1).join('/') : pathSegments.join('/');
    const cleanPath = cleanPathSegment ? `/${cleanPathSegment}` : '/';
    
    const canonicalUrl = `${siteUrl}/${language}${cleanPath === '/' ? '' : cleanPath}`;

    // Language alternates for SEO
    const alternates = [
        { lang: 'en', href: `${siteUrl}/en${cleanPath === '/' ? '' : cleanPath}` },
        { lang: 'sw', href: `${siteUrl}/sw${cleanPath === '/' ? '' : cleanPath}` },
        { lang: 'x-default', href: `${siteUrl}/en${cleanPath === '/' ? '' : cleanPath}` },
    ];

    // Default Fallbacks
    const defaultData = {
        en: {
            title: 'Inspire Translations | Professional Language Services Tanzania',
            description: 'Expert translation, interpretation, and language services in Tanzania and East Africa. Precision. Culture. Trust.',
            keywords: 'translation Tanzania, interpretation services, language classes, conference interpretation',
        },
        sw: {
            title: 'Inspire Translations | Huduma Bora za Ukalimani na Tafsiri Tanzania',
            description: 'Wataalamu wa tafsiri, ukalimani, na huduma za lugha Tanzania na Afrika Mashariki. Usahihi. Utamaduni. Imani.',
            keywords: 'tafsiri Tanzania, huduma za ukalimani, madarasa ya lugha, ukalimani wa mikutano',
        }
    };

    const currentTitle = title || defaultData[language].title;
    const currentDescription = description || defaultData[language].description;
    const currentKeywords = keywords || defaultData[language].keywords;

    // Structured Data (JSON-LD) for LocalBusiness/ProfessionalService
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Inspire Translations",
        "image": ogImage,
        "@id": siteUrl,
        "url": siteUrl,
        "telephone": "+255759704170",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Dar es Salaam",
            "addressLocality": "Dar es Salaam",
            "addressRegion": "Dar es Salaam",
            "addressCountry": "TZ"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": -6.7924,
            "longitude": 39.2083
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "08:00",
            "closes": "17:00"
        },
        "sameAs": [
            "https://facebook.com/inspiretranslations",
            "https://linkedin.com/company/inspiretranslations",
            "https://instagram.com/inspiretranslations"
        ]
    };

    return (
        <Helmet>
            {/* Basic Metadata */}
            <title>{currentTitle}</title>
            <meta name="description" content={currentDescription} />
            <meta name="keywords" content={currentKeywords} />
            <link rel="canonical" href={canonicalUrl} />
            <html lang={language} />

            {/* Hreflang Tags */}
            {alternates.map((alt) => (
                <link key={alt.lang} rel="alternate" hrefLang={alt.lang} href={alt.href} />
            ))}

            {/* Open Graph */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={currentTitle} />
            <meta property="og:description" content={currentDescription} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:locale" content={language === 'en' ? 'en_US' : 'sw_TZ'} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={currentTitle} />
            <meta name="twitter:description" content={currentDescription} />
            <meta name="twitter:image" content={ogImage} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLd || structuredData)}
            </script>
        </Helmet>
    );
};

export default SEOHead;
