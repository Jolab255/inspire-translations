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
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setIsTransitioning(false);
        window.scrollTo(0, 0);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, displayLocation.pathname, location]);

  return (
    <>
      {isTransitioning && <PageSkeleton />}
      <Box sx={{ display: isTransitioning ? 'none' : 'block' }}>
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

const AdminDashboard = lazy(() => import('./cms/AdminDashboard'));

// Layout Wrapper to sync lang param with context
const LangWrapper = ({ children }) => {
  const { lang } = useParams();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    if (lang && (lang === 'en' || lang === 'sw') && lang !== language) {
      setLanguage(lang);
    }
  }, [lang, language, setLanguage]);

  if (lang !== 'en' && lang !== 'sw') {
    return <Navigate to="/en/404" replace />;
  }

  return (
    <Suspense fallback={<PageSkeleton />}>
      {children}
    </Suspense>
  );
};

const AppContent = () => {
  const location = useLocation();
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
    <LanguageProvider>
      {!isAdmin && <Navbar />}
      <RouteTransition>
        <main>
          <Routes>
            <Route path="/" element={<LangRedirect />} />
            <Route path="/admin/*" element={<Suspense fallback={<PageSkeleton />}><AdminDashboard /></Suspense>} />
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
            <Route path="/:lang/*" element={<LangWrapper><NotFoundPage /></LangWrapper>} />
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
    </LanguageProvider>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
