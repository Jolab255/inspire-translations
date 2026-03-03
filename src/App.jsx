import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import { PageSkeleton } from './components/skeletons/Skeletons';

// Lazy-loaded pages
const HomePage = React.lazy(() => import('./pages/home/HomePage'));
const AboutPage = React.lazy(() => import('./pages/about/AboutPage'));
const ServicesPage = React.lazy(() => import('./pages/services/ServicesPage'));
const ServiceDetail = React.lazy(() => import('./pages/services/ServiceDetailPage'));
const ProjectsPage = React.lazy(() => import('./pages/projects/ProjectsPage'));
const GalleryPage = React.lazy(() => import('./pages/gallery/GalleryPage'));
const BlogPage = React.lazy(() => import('./pages/blog/BlogPage'));
const BlogPostPage = React.lazy(() => import('./pages/blog/BlogPostPage'));
const ContactPage = React.lazy(() => import('./pages/contact/ContactPage'));
const QuotePage = React.lazy(() => import('./pages/quote/QuotePage'));
const PrivacyPage = React.lazy(() => import('./pages/legal/PrivacyPage'));
const TermsPage = React.lazy(() => import('./pages/legal/TermsPage'));
const NotFoundPage = React.lazy(() => import('./pages/errors/NotFoundPage'));

const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/quote" element={<QuotePage />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
