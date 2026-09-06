import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { translations, type Language } from '../lib/translations';

interface LanguageContextType {
  language: Language;
  isBn: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, defaultText?: string) => string;
  tr: (enText: string, bnText: string) => string;
  toBn: (num: number | string) => string;
  num: (num: number | string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'bn';
    const saved = localStorage.getItem('shasthosetu_lang');
    return (saved as Language) === 'en' || (saved as Language) === 'bn' ? (saved as Language) : 'bn';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('shasthosetu_lang', lang);
      document.documentElement.lang = lang;
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  }, [language, setLanguage]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
      document.title = language === 'bn'
        ? 'স্বাস্থ্যসেতু বিডি (ShasthoSetu BD) — ওপেনহেলথ বিডি'
        : 'ShasthoSetu BD — OpenHealthBD (Digital Health Ecosystem)';
    }
  }, [language]);

  const t = useCallback((key: string, defaultText?: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return defaultText || key;
  }, [language]);

  const tr = useCallback((enText: string, bnText: string): string => {
    return language === 'bn' ? bnText : enText;
  }, [language]);

  const toBn = useCallback((input: number | string): string => {
    if (language === 'en') return String(input);
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(input).replace(/[0-9]/g, (w) => bnDigits[+w]);
  }, [language]);

  const value = useMemo<LanguageContextType>(() => ({
    language,
    isBn: language === 'bn',
    setLanguage,
    toggleLanguage,
    t,
    tr,
    toBn,
    num: toBn,
  }), [language, setLanguage, toggleLanguage, t, tr, toBn]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
