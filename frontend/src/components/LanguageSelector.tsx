import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

const languages = [
  { code: 'ko' as Language, name: '한국어', flag: '🇰🇷' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
  { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
];

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-200"
      >
        <Globe className="w-5 h-5 text-slate-600" />
        <span className="text-slate-700 font-medium">
          {currentLanguage.flag} {currentLanguage.name}
        </span>
        <svg
          className={`w-4 h-4 text-slate-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-slate-50 transition-colors ${
                  language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {language === lang.code && (
                  <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;


