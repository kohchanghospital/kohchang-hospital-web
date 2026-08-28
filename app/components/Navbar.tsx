'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { languages, Lang } from '../../i18n';
import { Icons } from '../icons/icons';

type NavItem = { key: string; label: string; href: string; items?: { label: string; href: string }[] };

export function Navbar({ lang }: { lang: Lang }) {
  const t = languages[lang];
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleLang: Lang = lang === 'th' ? 'en' : 'th';
  const segments = pathname.split('/');
  segments[1] = toggleLang;
  const query = searchParams.toString();
  const switchLangPath = query ? `${segments.join('/')}?${query}` : segments.join('/');

  const navItems: NavItem[] = [
    { key: 'home', label: t.home, href: `/${lang}` },
    { key: 'about', label: t.about, href: `/${lang}/about`, items: [
      { label: t.history_hos, href: `/${lang}/about/history` },
      { label: t.management_team, href: `/${lang}/about/management` },
      { label: t.vision_head, href: `/${lang}/about/vision` },
      { label: t.activity_calendar, href: `/${lang}/about/calendar` },
      { label: t.vehicle_calendar, href: `/${lang}/about/vehicle` },
    ] },
    { key: 'announcements', label: t.announcements, href: `/${lang}/announcements`, items: [
      { label: t.news, href: `/${lang}/announcements/news` },
      { label: t.procurement, href: `/${lang}/announcements/procurement` },
    ] },
    { key: 'knowledge', label: t.knowledge, href: `/${lang}/knowledges` },
    { key: 'donation', label: t.donation, href: `/${lang}/donation`, items: [
      { label: t.cash_donation, href: `/${lang}/donation/cash` },
      { label: t.organ_donation, href: `/${lang}/donation/organ` },
    ] },
  ];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (item: NavItem) =>
    item.key === 'home' ? pathname === item.href || pathname === `${item.href}/` : pathname.startsWith(item.href);

  return (
    <>
      <a href="#main-content" className="sr-only z-[100] rounded-md bg-white px-4 py-2 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        {lang === 'th' ? 'ข้ามไปยังเนื้อหาหลัก' : 'Skip to main content'}
      </a>
      <header className="sticky top-0 z-50 border-b border-[rgb(var(--color-border))] bg-white/95 shadow-[0_4px_18px_rgba(53,38,80,.06)] backdrop-blur">
        <div className="container-page flex h-[4.75rem] items-center gap-2 sm:gap-4">
          <Link href={`/${lang}`} className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3 lg:flex-none" aria-label={t.hos_name}>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--color-secondary))] p-1.5">
              <Image src="/images/logo_w.png" alt="" width={36} height={36} className="h-full w-full object-contain" priority />
            </span>
            <span className="min-w-0">
              <strong className="block truncate text-sm font-semibold leading-tight text-[rgb(var(--color-secondary))] min-[390px]:text-base sm:text-lg">{t.hos_name}</strong>
              <span className="hidden text-xs font-medium uppercase tracking-[.12em] text-[rgb(var(--color-primary))] sm:block">Koh Chang Hospital</span>
            </span>
          </Link>

          <nav className="ml-auto hidden items-center lg:flex" aria-label={lang === 'th' ? 'เมนูหลัก' : 'Main navigation'}>
            {navItems.map((item) => (
              <div key={item.key} className="group relative">
                <div className={`flex items-center rounded-lg border ${isActive(item) ? 'border-[rgb(var(--color-primary-border))] bg-[rgb(var(--color-primary-light))] text-[rgb(var(--color-primary-hover))]' : 'border-transparent text-slate-600 hover:bg-[rgb(var(--color-primary-light))] hover:text-[rgb(var(--color-primary-hover))]'}`}>
                  <Link href={item.href} className="px-3 py-2 text-sm font-medium" aria-current={isActive(item) ? 'page' : undefined}>{item.label}</Link>
                  {item.items && <button className="mr-1 flex h-9 w-7 items-center justify-center" aria-label={`${item.label} submenu`}><Chevron /></button>}
                </div>
                {item.items && (
                  <div className="invisible absolute left-0 top-full z-20 w-64 translate-y-2 pt-2 opacity-0 transition duration-150 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="rounded-xl border border-[rgb(var(--color-border))] bg-white p-2 shadow-[var(--shadow-md)]">
                      {item.items.map((sub) => (
                        <Link key={sub.href} href={sub.href} className={`block rounded-lg border px-3 py-2.5 text-sm ${pathname === sub.href ? 'border-[rgb(var(--color-primary-border))] bg-[rgb(var(--color-primary-light))] font-semibold text-[rgb(var(--color-primary-hover))]' : 'border-transparent text-slate-600 hover:bg-[rgb(var(--color-primary-light))] hover:text-[rgb(var(--color-primary-hover))]'}`}>{sub.label}</Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <Link href={switchLangPath} className="btn-outline ml-auto hidden !min-h-10 !px-2.5 min-[420px]:inline-flex lg:ml-2 lg:!px-3" aria-label={lang === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}>
            <Icons.OutlineGlobe className="hidden text-lg sm:block" /><span>{lang === 'th' ? 'EN' : 'TH'}</span>
          </Link>
          <button type="button" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[rgb(var(--color-border))] text-[rgb(var(--color-secondary))] lg:hidden" onClick={() => setMobileOpen(true)} aria-label={lang === 'th' ? 'เปิดเมนู' : 'Open menu'} aria-expanded={mobileOpen}>
            <MenuIcon />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label={lang === 'th' ? 'เมนูหลัก' : 'Main menu'}>
          <button className="absolute inset-0 bg-slate-950/40" onClick={() => setMobileOpen(false)} aria-label={lang === 'th' ? 'ปิดเมนู' : 'Close menu'} />
          <div className="absolute inset-y-0 right-0 w-[min(90vw,24rem)] overflow-y-auto bg-white p-5 shadow-2xl animate-modal">
            <div className="mb-5 flex items-center justify-between border-b border-[rgb(var(--color-border))] pb-4">
              <span className="font-semibold text-[rgb(var(--color-secondary))]">{t.hos_name}</span>
              <button className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-50 text-2xl" onClick={() => setMobileOpen(false)} aria-label={lang === 'th' ? 'ปิดเมนู' : 'Close menu'}><Icons.Close /></button>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => item.items ? (
                <details key={item.key} open={isActive(item)} className="group rounded-xl border border-[rgb(var(--color-border))] bg-white">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 py-3 font-medium text-[rgb(var(--color-secondary))]">{item.label}<Chevron /></summary>
                  <div className="border-t border-[rgb(var(--color-border))] bg-slate-50/70 p-2">
                    <Link href={item.href} onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-semibold text-[rgb(var(--color-primary-hover))]">{lang === 'th' ? 'ดูทั้งหมด' : 'View all'}</Link>
                    {item.items.map((sub) => <Link key={sub.href} href={sub.href} onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-white">{sub.label}</Link>)}
                  </div>
                </details>
              ) : (
                <Link key={item.key} href={item.href} onClick={() => setMobileOpen(false)} className={`flex min-h-12 items-center rounded-xl border px-4 py-3 font-medium ${isActive(item) ? 'border-[rgb(var(--color-primary-border))] bg-[rgb(var(--color-primary-light))] text-[rgb(var(--color-primary-hover))]' : 'border-[rgb(var(--color-border))] text-[rgb(var(--color-secondary))]'}`}>{item.label}</Link>
              ))}
            </nav>
            <Link href={switchLangPath} onClick={() => setMobileOpen(false)} className="btn-outline mt-5 w-full">
              <Icons.OutlineGlobe className="text-lg" /> {lang === 'th' ? 'English' : 'ภาษาไทย'}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function Chevron() {
  return <svg className="h-4 w-4 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 8 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function MenuIcon() {
  return <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" /></svg>;
}
