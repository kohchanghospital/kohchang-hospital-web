import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import '../globals.css';

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
    <html lang={lang}>
      <body className="flex min-h-screen flex-col">
        <Navbar lang={lang} />

        {/* content */}
        <main className="flex-1">
          {children}
        </main>

        <Footer lang={lang} />
      </body>
    </html>
  );
}
