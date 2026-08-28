import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#6D4AA2',
                    hover: '#593989',
                    dark: '#352650',
                    soft: '#F0EBF7',
                },
                accent: {
                    green: '#16A34A',
                },
                danger: '#DC2626',
            },
            fontFamily: {
                th: ['var(--font-th)', 'sans-serif'],
                en: ['var(--font-en)', 'sans-serif'],
            },
        },
    },
    plugins: [typography],
};

export default config;
