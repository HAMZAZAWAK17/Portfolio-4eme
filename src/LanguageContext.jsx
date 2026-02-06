import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('fr');

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
            setLanguage(savedLanguage);
            document.documentElement.lang = savedLanguage;
        }
    }, []);

    const changeLanguage = (lang) => {
        if (lang === 'fr' || lang === 'en') {
            setLanguage(lang);
            localStorage.setItem('language', lang);
            document.documentElement.lang = lang;
        }
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
