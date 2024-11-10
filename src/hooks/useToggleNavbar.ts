import { useState, useEffect } from 'react';

export const useToggleNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleNav = () => {
    setIsOpen(prev => !prev);
  };

  return {
    isOpen,
    isMobile,
    toggleNav,
  };
};

export default useToggleNavbar;
