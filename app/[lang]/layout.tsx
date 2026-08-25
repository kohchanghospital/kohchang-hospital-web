import { LanguageProvider } from '@/context/LanguageContext';
import { Noto_Sans_Thai, Inter } from 'next/font/google';
import { SiteChrome } from '../components/SiteChrome';
import { Lang } from '@/i18n';
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
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Lang;

  return (
    <html lang={lang} className={`${notoTh.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <LanguageProvider lang={lang}>
          <SiteChrome lang={lang}>{children}</SiteChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
