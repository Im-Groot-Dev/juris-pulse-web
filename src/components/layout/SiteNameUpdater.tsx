
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SiteNameUpdater = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Update the document title based on current route
    const baseTitle = "Legal Bharat";
    let pageTitle = baseTitle;
    
    const path = location.pathname;
    if (path !== '/') {
      const pageName = path.split('/')[1].split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      pageTitle = `${pageName} | ${baseTitle}`;
    }
    
    document.title = pageTitle;
    
    // Update any site-title elements in the DOM
    const siteTitleElements = document.querySelectorAll('.site-title');
    siteTitleElements.forEach(element => {
      element.textContent = "Legal Bharat";
    });
  }, [location]);
  
  return null; // This component doesn't render anything
};

export default SiteNameUpdater;
