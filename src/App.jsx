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

const AdminDashboard = lazy(() => import('./cms/AdminDashboard'));

// Route Transition Wrapper
const RouteTransition = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setIsTransitioning(false);
        window.scrollTo(0, 0);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, displayLocation.pathname]);

  return (
    <>
      {isTransitioning && <PageSkeleton />}
      <Box sx={{ display: isTransitioning ? 'none' : 'block' }}>
        {children}
      </Box>
    </>
  );
};

// Layout Wrapper to sync lang param with context
const LangWrapper = ({ children, lang: forcedLang }) => {
  const { lang: paramLang } = useParams();
  const lang = forcedLang || paramLang;
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    if (lang && (lang === 'en' || lang === 'sw') && lang !== language) {
      setLanguage(lang);
    }
  }, [lang, language, setLanguage]);

  return (
    <Suspense fallback={<PageSkeleton />}>
      {children}
    </Suspense>
  );
};

const AppContent = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
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
    <>
      {!isAdmin && <Navbar />}
      <RouteTransition>
        <main>
          <Routes>
            {/* CMS Route */}
            <Route path="/admin" element={<Navigate to="/admin/blog" replace />} />
            <Route path="/admin/*" element={<Suspense fallback={<PageSkeleton />}><AdminDashboard /></Suspense>} />
            
            {/* Root redirect */}
            <Route path="/" element={<Navigate to={`/${language}`} replace />} />

            {/* Explicit Language Routes to prevent conflicts */}
            {['en', 'sw'].map((l) => (
              <Route key={l} path={`/${l}`}>
                <Route index element={<LangWrapper lang={l}><HomePage /></LangWrapper>} />
                <Route path="about" element={<LangWrapper lang={l}><AboutPage /></LangWrapper>} />
                <Route path="services" element={<LangWrapper lang={l}><ServicesPage /></LangWrapper>} />
                <Route path="services/:slug" element={<LangWrapper lang={l}><ServiceDetail /></LangWrapper>} />
                <Route path="projects" element={<LangWrapper lang={l}><ProjectsPage /></LangWrapper>} />
                <Route path="gallery" element={<LangWrapper lang={l}><GalleryPage /></LangWrapper>} />
                <Route path="blog" element={<LangWrapper lang={l}><BlogPage /></LangWrapper>} />
                <Route path="blog/:slug" element={<LangWrapper lang={l}><BlogPostPage /></LangWrapper>} />
                <Route path="contact" element={<LangWrapper lang={l}><ContactPage /></LangWrapper>} />
                <Route path="quote" element={<LangWrapper lang={l}><QuotePage /></LangWrapper>} />
                <Route path="privacy-policy" element={<LangWrapper lang={l}><PrivacyPage /></LangWrapper>} />
                <Route path="terms" element={<LangWrapper lang={l}><TermsPage /></LangWrapper>} />
                <Route path="*" element={<LangWrapper lang={l}><NotFoundPage /></LangWrapper>} />
              </Route>
            ))}

            {/* Catch-all for invalid top-level paths */}
            <Route path="*" element={<Navigate to="/en/404" replace />} />
          </Routes>
        </main>
      </RouteTransition>
      {!isAdmin && (
        <>
          <Footer />
          <WhatsAppFab />
          <CookieConsent />
        </>
      )}
    </>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
