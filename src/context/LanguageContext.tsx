import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'bn' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultText?: string) => string;
  toBn: (num: number | string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  dashboard: { bn: 'ড্যাশবোর্ড', en: 'Dashboard' },
  my_appointments: { bn: 'আমার অ্যাপয়েন্টমেন্ট', en: 'My Appointments' },
  live_serial_tracker: { bn: 'লাইভ সিরিয়াল ট্র্যাকার', en: 'Live Serial Tracker' },
  e_prescriptions: { bn: 'ই-প্রেসক্রিপশন', en: 'e-Prescriptions' },
  reports_and_results: { bn: 'রিপোর্ট ও ফলাফল', en: 'Reports & Results' },
  health_timeline: { bn: 'আমার স্বাস্থ্য টাইমলাইন', en: 'Health Timeline' },
  medicine_price_index: { bn: 'ওষুধ ও মূল্য সূচক', en: 'Medicine & Price Index' },
  blood_network: { bn: 'রক্তদান নেটওয়ার্ক', en: 'Blood Donation Network' },
  bed_icu_directory: { bn: 'বেড ও ICU ডিরেক্টরি', en: 'Bed & ICU Directory' },
  student_hub: { bn: 'মেডিকেল শিক্ষার্থী হাব', en: 'Medical Student Hub' },
  settings: { bn: 'সেটিংস', en: 'Settings' },
  emergency_helpline: { bn: 'জরুরি প্রয়োজনে', en: 'Emergency Helpline' },
  helpline_24_7: { bn: 'হেল্পলাইন ২৪/৭', en: 'Helpline 24/7' },
  search_placeholder: { bn: 'সার্চ করুন (ডাক্তার, বিশেষজ্ঞ, ওষুধ, পরীক্ষা...)', en: 'Search (Doctor, Specialist, Medicine, Test...)' },
  welcome: { bn: 'স্বাগতম', en: 'Welcome' },
  our_promise: { bn: 'আপনার স্বাস্থ্য, আমাদের অঙ্গীকার', en: 'Your Health, Our Commitment' },
  stay_safe: { bn: 'সুস্থ থাকুন, নিরাপদ থাকুন।', en: 'Stay healthy, stay safe.' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('shasthosetu_lang');
    return (saved as Language) || 'bn';
  });

  useEffect(() => {
    localStorage.setItem('shasthosetu_lang', language);
  }, [language]);

  const t = (key: string, defaultText?: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return defaultText || key;
  };

  const toBn = (input: number | string): string => {
    if (language === 'en') return String(input);
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(input).replace(/[0-9]/g, (w) => bnDigits[+w]);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toBn }}>
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
