import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
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
        <Suspense fallback={<PageSkeleton />}>
          {children}
        </Suspense>
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
        <LanguageProvider>
          <ScrollToTop />
          <Routes>
            {/* Root redirect */}
            <Route path="/" element={<LangRedirect />} />

            {/* Language Routes */}
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
        </LanguageProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;