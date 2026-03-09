import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import WhatsAppFab from './components/common/WhatsAppFab';
import CookieConsent from './components/common/CookieConsent';
import { PageSkeleton } from './components/skeletons/Skeletons';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/home/HomePage'));
const AboutPage = lazy(() => import('./pages/about/AboutPage'));
const ServicesPage = lazy(() => import('./pages/services/ServicesPage'));
const ServiceDetail = lazy(() => import('./pages/services/ServiceDetailPage'));
const ProjectsPage = lazy(() => import('./pages/projects/ProjectsPage'));
const GalleryPage = lazy(() => import('./pages/gallery/GalleryPage'));
const BlogPage = lazy(() => import('./pages/blog/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/blog/BlogPostPage'));
const ContactPage = lazy(() => import('./pages/contact/ContactPage'));
const QuotePage = lazy(() => import('./pages/quote/QuotePage'));
const PrivacyPage = lazy(() => import('./pages/legal/LegalPages').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/legal/LegalPages').then(m => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('./pages/errors/NotFoundPage'));

// Route Transition Wrapper
const RouteTransition = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);
      
      // Artificial delay to allow skeleton to be seen and assets to stay smooth
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setIsTransitioning(false);
        window.scrollTo(0, 0);
      }, 400); // Matching a smooth transition time

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <>
      {isTransitioning && <PageSkeleton />}
      <Box sx={{ 
        opacity: isTransitioning ? 0 : 1, 
        transition: 'opacity 0.3s ease',
        visibility: isTransitioning ? 'hidden' : 'visible' 
      }}>
        {children}
      </Box>
    </>
  );
};

// Language Redirect Handler
const LangRedirect = () => {
  const { language } = useLanguage();
  return <Navigate to={`/${language}`} replace />;
};

// Layout Wrapper to sync lang param with context
const LangWrapper = ({ children }) => {
  const { lang } = useParams();
  const { language, setLanguage } = useLanguage();

  // Sync language context with URL parameter
  useEffect(() => {
    if (lang && (lang === 'en' || lang === 'sw') && lang !== language) {
      setLanguage(lang);
    }
  }, [lang, language, setLanguage]);

  // If the lang in URL is invalid, redirect to 404 or default
  if (lang !== 'en' && lang !== 'sw') {
    return <Navigate to="/en/404" replace />;
  }

  return (
    <>
      <Navbar />
      <main>
        <RouteTransition>
          <Suspense fallback={<PageSkeleton />}>
            {children}
          </Suspense>
        </RouteTransition>
      </main>
      <Footer />
    </>
  );
};

const App = () => {
  useEffect(() => {
    // Remove the initial loader from index.html if it exists
    const loader = document.getElementById('initial-loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        loader.remove();
        document.body.style.overflow = 'auto';
      }, 500);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <LanguageProvider>
          <Routes>
            {/* Root redirect */}
            <Route path="/" element={<LangRedirect />} />

            {/* Admin Bypass - No Language Wrapper */}
            <Route path="/admin" element={null} />
            <Route path="/:lang" element={<LangWrapper><HomePage /></LangWrapper>} />
            <Route path="/:lang/about" element={<LangWrapper><AboutPage /></LangWrapper>} />
            <Route path="/:lang/services" element={<LangWrapper><ServicesPage /></LangWrapper>} />
            <Route path="/:lang/services/:slug" element={<LangWrapper><ServiceDetail /></LangWrapper>} />
            <Route path="/:lang/projects" element={<LangWrapper><ProjectsPage /></LangWrapper>} />
            <Route path="/:lang/gallery" element={<LangWrapper><GalleryPage /></LangWrapper>} />
            <Route path="/:lang/blog" element={<LangWrapper><BlogPage /></LangWrapper>} />
            <Route path="/:lang/blog/:slug" element={<LangWrapper><BlogPostPage /></LangWrapper>} />
            <Route path="/:lang/contact" element={<LangWrapper><ContactPage /></LangWrapper>} />
            <Route path="/:lang/quote" element={<LangWrapper><QuotePage /></LangWrapper>} />
            <Route path="/:lang/privacy-policy" element={<LangWrapper><PrivacyPage /></LangWrapper>} />
            <Route path="/:lang/terms" element={<LangWrapper><TermsPage /></LangWrapper>} />
            
            {/* 404 Routes */}
            <Route path="/:lang/*" element={<LangWrapper><NotFoundPage /></LangWrapper>} />
            <Route path="*" element={<Navigate to="/en/404" replace />} />
          </Routes>
          <WhatsAppFab />
          <CookieConsent />
        </LanguageProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;