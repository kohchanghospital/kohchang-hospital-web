'use client';

import { usePathname } from 'next/navigation';
import { Lang } from '@/i18n';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import TopRightRibbon from './TopRightRibbon';

export function SiteChrome({ lang, showMourningRibbon, children }: { lang: Lang; showMourningRibbon: boolean; children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.includes('/admin');

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Navbar lang={lang} />
      <main id="main-content" className="min-w-0 flex-1">
        {showMourningRibbon && <TopRightRibbon />}
        {children}
      </main>
      <Footer lang={lang} />
    </>
  );
}
