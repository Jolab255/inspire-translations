import { createContext, useState, useContext, useEffect, useCallback } from 'react';

const LanguageContext = createContext({
    language: 'en',
    setLanguage: () => { },
    toggleLanguage: () => { },
    t: (obj) => typeof obj === 'string' ? obj : (obj?.en || ''),
});

export const LanguageProvider = ({ children }) => {
    // Helper to get lang from URL
    const getLangFromUrl = () => {
        const path = window.location.pathname;
        const firstSegment = path.split('/')[1];
        if (firstSegment === 'sw' || firstSegment === 'en') {
            return firstSegment;
        }
        return null;
    };

    // Initialize language
    const [language, setLanguage] = useState(() => {
        const urlLang = getLangFromUrl();
        if (urlLang) return urlLang;
        
        const saved = localStorage.getItem('app_language');
        return saved === 'sw' ? 'sw' : 'en';
    });

    // Update state if URL changes (e.g. browser back/forward)
    useEffect(() => {
        const handleLocationChange = () => {
            const urlLang = getLangFromUrl();
            if (urlLang && urlLang !== language) {
                setLanguage(urlLang);
            }
        };

        window.addEventListener('popstate', handleLocationChange);
        return () => window.removeEventListener('popstate', handleLocationChange);
    }, [language]);

    useEffect(() => {
        localStorage.setItem('app_language', language);
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = useCallback(() => {
        const newLang = language === 'en' ? 'sw' : 'en';
        setLanguage(newLang);
        
        // Update URL
        const path = window.location.pathname;
        const segments = path.split('/');
        
        if (segments[1] === 'en' || segments[1] === 'sw') {
            segments[1] = newLang;
        } else {
            // If no lang prefix, insert it
            segments.splice(1, 0, newLang);
        }
        
        const newPath = segments.join('/') || '/';
        window.history.pushState({}, '', newPath + window.location.search);
        // Dispatch event for other components to react if needed
        window.dispatchEvent(new Event('popstate'));
    }, [language]);

    /**
     * Helper to get translated string from an object
     */
    const t = useCallback((obj) => {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj[language] || obj['en'] || '';
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
