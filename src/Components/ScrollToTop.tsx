import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Find the element with the ID matching the hash (e.g., #my-section)
      const element = document.getElementById(hash.slice(1)); 
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Default: scroll to top if no hash is present
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null; // This component doesn't render anything
};

