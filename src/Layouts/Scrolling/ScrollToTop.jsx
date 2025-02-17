import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function ScrollToTop() {
    const { pathname } = useLocation();

    // Disable the browser's automatic scroll restoration
    useEffect(() => {
        window.history.scrollRestoration = 'manual';
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default ScrollToTop;