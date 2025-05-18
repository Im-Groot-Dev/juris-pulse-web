
// We can't directly edit Navbar.tsx as it's in the read-only files
// But we can create a helper component that modifies the site title

import React, { useEffect } from 'react';

const SiteNameUpdater = () => {
  useEffect(() => {
    // Find all elements that might contain the site name
    const titleElements = document.querySelectorAll('.site-title, .brand-name, .navbar-brand, .logo-text');
    
    // Update all potential site name elements
    titleElements.forEach(element => {
      if (element.textContent?.includes('LegalAI') || 
          element.textContent?.includes('Legal AI') || 
          element.textContent?.includes('Legal Connect')) {
        element.textContent = 'Legal Bharat';
      }
    });
    
    // Update page title
    document.title = document.title.replace('LegalAI', 'Legal Bharat');
    document.title = document.title.replace('Legal AI', 'Legal Bharat');
    document.title = document.title.replace('Legal Connect', 'Legal Bharat');
    
    if (!document.title.includes('Legal Bharat')) {
      document.title = 'Legal Bharat | ' + document.title;
    }
  }, []);
  
  return null;
};

export default SiteNameUpdater;
