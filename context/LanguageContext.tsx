'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { languages, Lang } from '../i18n';

type LangContextType = {
    lang: Lang;
    t: typeof languages.th;
    setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LangContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Lang>('th');

    // 🔹 โหลดภาษาจาก localStorage ตอนเปิดเว็บ
    useEffect(() => {
        const savedLang = localStorage.getItem('lang') as Lang | null;
        if (savedLang && ['th', 'en'].includes(savedLang)) {
            setLangState(savedLang);
        }
    }, []);

    // 🔹 ฟังก์ชันเปลี่ยนภาษา + บันทึกค่า
    const setLang = (newLang: Lang) => {
        setLangState(newLang);
        localStorage.setItem('lang', newLang);
    };

    return (
        <LanguageContext.Provider
            value={{
                lang,
                t: languages[lang],
                setLang,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLang() {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error('useLang must be used inside LanguageProvider');
    }
    return ctx;
}
