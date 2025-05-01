import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  const iconStyle = { width: 22, height: 22, fill: '#ffffff' };

  return (
    <footer className="bg-dark text-white text-center text-lg-start mt-5">
      <div
        className="text-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      >
        
        <div className="mb-3">
          <button
            onClick={handleLanguageChange}
            className="btn btn-outline-light btn-sm"
          >
            {i18n.language === 'en' ? 'العربية' : 'English'}
          </button>
        </div>

        <div className="mb-3 d-flex justify-content-center gap-4">
       
          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            <svg {...iconStyle} viewBox="0 0 24 24">
              <path d="M22.46 6.03c-.77.34-1.6.58-2.46.69a4.26 4.26 0 0 0 1.88-2.35 8.49 8.49 0 0 1-2.7 1.03 4.24 4.24 0 0 0-7.23 3.87A12 12 0 0 1 3.15 4.6a4.24 4.24 0 0 0 1.31 5.66 4.21 4.21 0 0 1-1.92-.53v.05a4.25 4.25 0 0 0 3.4 4.16 4.29 4.29 0 0 1-1.91.07 4.25 4.25 0 0 0 3.97 2.95A8.5 8.5 0 0 1 2 19.54a12 12 0 0 0 6.5 1.9c7.79 0 12.06-6.46 12.06-12.06 0-.18-.01-.36-.02-.54a8.63 8.63 0 0 0 2.12-2.21Z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <svg {...iconStyle} viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.3c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.3.2 2.3.2v2.6h-1.3c-1.3 0-1.7.8-1.7 1.6V12H17l-.4 3h-2.6v7A10 10 0 0 0 22 12Z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg {...iconStyle} viewBox="0 0 24 24">
              <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.3.5.6.3 1 .7 1.4 1.4.3.4.4 1.1.5 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.3a3.1 3.1 0 0 1-1.4 1.4c-.4.3-1.1.4-2.3.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.3-.5a3.1 3.1 0 0 1-1.4-1.4c-.3-.4-.4-1.1-.5-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.3A3.1 3.1 0 0 1 4.2 3.4c.4-.3 1.1-.4 2.3-.5C7.8 2.2 8.2 2.2 12 2.2Zm0 2.2c-3.1 0-3.4 0-4.7.1-.9.1-1.4.2-1.7.4-.4.2-.7.5-.9.9-.2.3-.3.8-.4 1.7-.1 1.3-.1 1.6-.1 4.7s0 3.4.1 4.7c.1.9.2 1.4.4 1.7.2.4.5.7.9.9.3.2.8.3 1.7.4 1.3.1 1.6.1 4.7.1s3.4 0 4.7-.1c.9-.1 1.4-.2 1.7-.4.4-.2.7-.5.9-.9.2-.3.3-.8.4-1.7.1-1.3.1-1.6.1-4.7s0-3.4-.1-4.7c-.1-.9-.2-1.4-.4-1.7-.2-.4-.5-.7-.9-.9-.3-.2-.8-.3-1.7-.4-1.3-.1-1.6-.1-4.7-.1Zm0 3.8a4 4 0 1 1 0 8.1 4 4 0 0 1 0-8.1Zm0 6.6a2.6 2.6 0 1 0 0-5.3 2.6 2.6 0 0 0 0 5.3Zm5.1-6.8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
            </svg>
          </a>
        </div>

        <div>© {new Date().getFullYear()} GlowNest | All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;









