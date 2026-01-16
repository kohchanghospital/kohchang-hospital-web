import { LanguageProvider } from '@/context/LanguageContext';
import { Noto_Sans_Thai, Inter } from 'next/font/google';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import '../globals.css';

// ฟอนต์ไทย
const notoTh = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-th',
  display: 'swap',
});

// ฟอนต์อังกฤษ
const inter = Inter({
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600'],
  variable: '--font-en',
  display: 'swap',
});

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: 'th' | 'en' } | Promise<{ lang: 'th' | 'en' }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  return (
    <html lang={lang} className={`${notoTh.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <LanguageProvider lang={lang}>
          <Navbar lang={lang} />

          {/* content */}
          <main className="flex-1">
            {children}
          </main>

          <Footer lang={lang} />
        </LanguageProvider>
      </body>
    </html>
  );
}
