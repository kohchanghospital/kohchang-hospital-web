'use client';

import { createContext, useContext, useState } from 'react';

export type Lang = 'th' | 'en';

const languages = {
    th: {
        hos_name: 'โรงพยาบาลเกาะช้าง',
    },
    en: {
        hos_name: 'Koh Chang Hospital',
    },
};

type LangContextType = {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: typeof languages.th;
};

const LanguageContext = createContext<LangContextType | null>(null);

export function LanguageProvider({
    children,
    lang: initialLang,
}: {
    children: React.ReactNode;
    lang: Lang;
}) {
    const [lang, setLang] = useState<Lang>(initialLang);

    return (
        <LanguageContext.Provider
            value={{
                lang,
                setLang,
                t: languages[lang],
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
