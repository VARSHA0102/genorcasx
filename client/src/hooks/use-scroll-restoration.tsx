import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function useScrollRestoration() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location]);
}

export function ScrollToTop() {
  useScrollRestoration();
  return null;
}
