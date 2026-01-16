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
                    DEFAULT: '#6D28D9', // Purple-700
                    hover: '#5B21B6',   // Purple-800
                    soft: '#EDE9FE',    // Purple-100
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
    plugins: [],
};

export default config;
