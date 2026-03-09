import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Use 'auto' (instant) instead of 'smooth' to ensure the user 
        // lands at the top before the page content starts rendering/animating
        window.scrollTo(0, 0);
        
        // Secondary backup for some browsers/situations
        document.documentElement.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;