import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Centralized Window Scroll Reset Component
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Skip scroll reset when navigating from Contact Us
    // to a specific section on Home page
    if (location.state?.skipScrollTop) {
      return;
    }

    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};