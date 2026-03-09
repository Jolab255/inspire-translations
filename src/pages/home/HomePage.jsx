import React from 'react';
import HeroSection from '../../components/hero/HeroSection';
import SEOHead from '../../components/seo/SEOHead';
import PurposeWhiteSection from './sections/PurposeWhiteSection';
import WhatWeDoSection from './sections/WhatWeDoSection';
import WhatWeOfferSection from './sections/WhatWeOfferSection';
import ClientsSection from './sections/ClientsSection';
import TestimonialsSection from './sections/TestimonialsSection';
import BlogSection from './sections/BlogSection';
import FAQSection from './sections/FAQSection';
import CTASection from '../../components/common/CTASection';

const HomePage = () => {
    return (
        <>
            <SEOHead />
            <HeroSection />
            <PurposeWhiteSection />
            <WhatWeDoSection />
            <WhatWeOfferSection />
            <ClientsSection />
            <TestimonialsSection />
            <BlogSection />
            <FAQSection />
            <CTASection />
        </>
    );
};

export default HomePage;
