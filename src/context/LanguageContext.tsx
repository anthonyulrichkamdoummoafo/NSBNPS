import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, TRANSLATIONS } from '../translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: any; // Translation object for the current language
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('EN');

  const value = {
    lang,
    setLang,
    t: TRANSLATIONS[lang],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
