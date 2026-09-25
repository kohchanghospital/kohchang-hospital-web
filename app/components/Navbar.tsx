'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenus = () => { setOpenDropdown(null); setMobileOpen(false); };
  useEffect(() => {
    const outside = (event: PointerEvent) => { if (!headerRef.current?.contains(event.target as Node) && !dialogRef.current?.contains(event.target as Node)) setOpenDropdown(null); };
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const trigger = headerRef.current?.querySelector<HTMLButtonElement>('[aria-expanded="true"]');
        setOpenDropdown(null); setMobileOpen(false);
        (mobileOpen ? menuButtonRef.current : trigger)?.focus();
      }
      if (event.key === 'Tab' && mobileOpen) {
        const nodes = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') || []).filter(el => el.getClientRects().length);
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', keyboard);
    if (mobileOpen) dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', keyboard); };
  }, [mobileOpen]);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const resize = () => { setOpenDropdown(null); if (media.matches) setMobileOpen(false); };
    media.addEventListener('change', resize);
    return () => media.removeEventListener('change', resize);
  }, []);
  const toggleLang: Lang = lang === 'th' ? 'en' : 'th';
  const segments = pathname.split('/');
  segments[1] = toggleLang;
  const query = searchParams.toString();
  const switchLangPath = query ? `${segments.join('/')}?${query}` : segments.join('/');

  const navItems: NavItem[] = [
    { key: 'home', label: t.home, href: `/${lang}` },
    {
      key: 'about', label: t.about, href: `/${lang}/about`, items: [
        { label: t.history_hos, href: `/${lang}/about/history` },
        { label: t.management_team, href: `/${lang}/about/management` },
        { label: t.vision_head, href: `/${lang}/about/vision` },
        { label: t.activity_calendar, href: `/${lang}/about/calendar` },
        { label: t.vehicle_calendar, href: `/${lang}/about/vehicle` },
      ]
    },
    {
      key: 'announcements', label: t.announcements, href: `/${lang}/announcements`, items: [
        { label: t.news, href: `/${lang}/announcements/news` },
        { label: t.procurement, href: `/${lang}/announcements/procurement` },
      ]
    },
    { key: 'knowledge', label: t.knowledge, href: `/${lang}/knowledges` },
    {
      key: 'donation', label: t.donation, href: `/${lang}/donation`, items: [
        { label: t.cash_donation, href: `/${lang}/donation/cash` },
        { label: t.organ_donation, href: `/${lang}/donation/organ` },
      ]
    },
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
      <header ref={headerRef} onClickCapture={(e) => { if ((e.target as HTMLElement).closest("a")) closeMenus(); }} className="sticky top-0 z-50 border-b border-[rgb(var(--color-border))] bg-white/95 shadow-[0_4px_18px_rgba(53,38,80,.06)] backdrop-blur">
        <div className="container-page flex h-[4.75rem] items-center gap-2 sm:gap-4">
          <Link
            href={`/${lang}`}
            className="flex shrink-0 items-center"
            aria-label={t.hos_name}
          >
            <img
              src="/images/logo_name_b.png"
              alt={t.hos_name}
              className="h-12 w-auto object-contain sm:h-14 lg:h-16"
            />
          </Link>
          <nav
            className="ml-auto hidden items-center gap-1 lg:flex"
            aria-label={lang === 'th' ? 'เมนูหลัก' : 'Main navigation'}
          >
            {navItems.map((item) => {
              const hasDropdown = !!item.items?.length;
              const isOpen = openDropdown === item.key;

              return (
                <div
                  key={item.key}
                  className="group relative"
                  onMouseEnter={() => {
                    if (hasDropdown) {
                      setOpenDropdown(item.key);
                    }
                  }}
                  onMouseLeave={() => {
                    if (hasDropdown) {
                      setOpenDropdown(null);
                    }
                  }}
                >
                  <div
                    className={`
            flex h-11 items-center rounded-xl border
            transition-all duration-200
            ${isActive(item) || isOpen
                        ? `
                    border-[rgb(var(--color-primary-border))]
                    bg-[rgb(var(--color-primary-light))]
                    text-[rgb(var(--color-primary-hover))]
                  `
                        : `
                    border-transparent
                    text-slate-600
                    hover:border-[rgb(var(--color-primary-border))]
                    hover:bg-[rgb(var(--color-primary-light))]
                    hover:text-[rgb(var(--color-primary-hover))]
                  `
                      }
          `}
                  >
                    <Link
                      href={item.href}
                      className={`
              flex h-full items-center
              py-2 text-sm font-medium
              ${hasDropdown ? 'pl-4 pr-1' : 'px-4'}
            `}
                      aria-current={isActive(item) ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>

                    {hasDropdown && (
                      <button
                        type="button"
                        className="
                flex h-full w-9
                items-center justify-center
                rounded-r-xl
              "
                        aria-label={`${item.label} submenu`}
                        aria-expanded={isOpen}
                        aria-controls={`desktop-${item.key}`}
                        onClick={(e) => {
                          e.stopPropagation();

                          setOpenDropdown(
                            isOpen ? null : item.key
                          );
                        }}
                      >
                        <span
                          className={`
                  transition-transform duration-200
                  ${isOpen ? 'rotate-180' : ''}
                `}
                        >
                          <Chevron />
                        </span>
                      </button>
                    )}
                  </div>

                  {hasDropdown && (
                    <div
                      id={`desktop-${item.key}`}
                      className={`
              absolute left-0 top-full z-30
              w-64 pt-2
              transition-all duration-200

              ${isOpen
                          ? `
                      visible
                      translate-y-0
                      opacity-100
                      pointer-events-auto
                    `
                          : `
                      invisible
                      translate-y-1
                      opacity-0
                      pointer-events-none
                    `
                        }
            `}
                    >
                      <div
                        className="
                rounded-xl
                border border-[rgb(var(--color-border))]
                bg-white
                p-2
                shadow-[var(--shadow-md)]
              "
                      >
                        {item.items!.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            aria-current={
                              pathname === sub.href ? 'page' : undefined
                            }
                            className={`
                    block rounded-lg border
                    px-3 py-2.5
                    text-sm
                    transition-colors duration-150

                    ${pathname === sub.href
                                ? `
                            border-[rgb(var(--color-primary-border))]
                            bg-[rgb(var(--color-primary-light))]
                            font-semibold
                            text-[rgb(var(--color-primary-hover))]
                          `
                                : `
                            border-transparent
                            text-slate-600
                            hover:bg-[rgb(var(--color-primary-light))]
                            hover:text-[rgb(var(--color-primary-hover))]
                          `
                              }
                  `}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <Link href={switchLangPath} className="btn-outline ml-auto hidden !min-h-10 !px-2.5 min-[420px]:inline-flex lg:ml-2 lg:!px-3" aria-label={lang === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}>
            <Icons.OutlineGlobe className="hidden text-lg sm:block" /><span>{lang === 'th' ? 'EN' : 'TH'}</span>
          </Link>
          <button ref={menuButtonRef} type="button" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[rgb(var(--color-border))] text-[rgb(var(--color-secondary))] lg:hidden" onClick={() => { setOpenDropdown(null); setMobileOpen(true); }} aria-label={lang === 'th' ? 'เปิดเมนู' : 'Open menu'} aria-expanded={mobileOpen}>
            <MenuIcon />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label={lang === 'th' ? 'เมนูหลัก' : 'Main menu'}>
          <button className="absolute inset-0 bg-slate-950/40" onClick={() => { closeMenus(); menuButtonRef.current?.focus(); }} aria-label={lang === 'th' ? 'ปิดเมนู' : 'Close menu'} />
          <div ref={dialogRef} className="absolute inset-y-0 right-0 w-[min(90vw,24rem)] overflow-y-auto bg-white p-5 shadow-2xl animate-modal">
            <div className="mb-5 flex items-center justify-between border-b border-[rgb(var(--color-border))] pb-4">
              <span className="font-semibold text-[rgb(var(--color-secondary))]">{t.hos_name}</span>
              <button className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-50 text-2xl" onClick={() => { closeMenus(); menuButtonRef.current?.focus(); }} aria-label={lang === 'th' ? 'ปิดเมนู' : 'Close menu'}><Icons.Close /></button>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => item.items ? (
                <div key={item.key} className="group rounded-xl border border-[rgb(var(--color-border))] bg-white">
                  <button type="button" aria-expanded={openDropdown === item.key} aria-controls={`mobile-${item.key}`} onClick={() => setOpenDropdown(openDropdown === item.key ? null : item.key)} className="flex w-full min-h-12 cursor-pointer list-none items-center justify-between px-4 py-3 font-medium text-[rgb(var(--color-secondary))]">{item.label}<span className={openDropdown === item.key ? "rotate-180" : ""}><Chevron /></span></button>
                  <div id={`mobile-${item.key}`} hidden={openDropdown !== item.key} className="border-t border-[rgb(var(--color-border))] bg-slate-50/70 p-2">
                    <Link href={item.href} onClick={() => { closeMenus(); menuButtonRef.current?.focus(); }} className="block rounded-lg px-3 py-2 text-sm font-semibold text-[rgb(var(--color-primary-hover))]">{lang === 'th' ? 'ดูทั้งหมด' : 'View all'}</Link>
                    {item.items.map((sub) => <Link key={sub.href} href={sub.href} aria-current={pathname === sub.href ? "page" : undefined} onClick={() => { closeMenus(); menuButtonRef.current?.focus(); }} className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-[rgb(var(--color-primary-light))] aria-[current=page]:bg-[rgb(var(--color-primary-light))] aria-[current=page]:text-[rgb(var(--color-primary))]">{sub.label}</Link>)}
                  </div>
                </div>
              ) : (
                <Link key={item.key} href={item.href} onClick={() => { closeMenus(); menuButtonRef.current?.focus(); }} className={`flex min-h-12 items-center rounded-xl border px-4 py-3 font-medium ${isActive(item) ? 'border-[rgb(var(--color-primary-border))] bg-[rgb(var(--color-primary-light))] text-[rgb(var(--color-primary-hover))]' : 'border-[rgb(var(--color-border))] text-[rgb(var(--color-secondary))]'}`}>{item.label}</Link>
              ))}
            </nav>
            <Link href={switchLangPath} onClick={() => { closeMenus(); menuButtonRef.current?.focus(); }} className="btn-outline mt-5 w-full">
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
