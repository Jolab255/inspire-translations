import { Helmet } from 'react-helmet-async';

const SEOHead = ({
    title = 'Inspire Translations | Professional Language Services Tanzania',
    description = 'Expert translation, interpretation, and language services in Tanzania and East Africa. Precision. Culture. Trust.',
    keywords = 'translation Tanzania, interpretation services, language classes, conference interpretation',
    ogImage = 'https://inspiretranslations.co.tz/og-image.jpg',
    canonicalUrl = 'https://inspiretranslations.co.tz',
    ogType = 'website',
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
        </Helmet>
    );
};

export default SEOHead;
