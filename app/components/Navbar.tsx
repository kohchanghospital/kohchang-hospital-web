'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { languages, Lang } from '../../i18n';
import { Icons } from '../icons/icons';
import Image from 'next/image'

export function Navbar({ lang }: { lang: Lang }) {
    const t = languages[lang];

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const toggleLang: Lang = lang === 'th' ? 'en' : 'th';

    const segments = pathname.split('/');
    segments[1] = toggleLang; // เปลี่ยนเฉพาะ lang
    const newPath = segments.join('/');

    const query = searchParams.toString();
    const switchLangPath = query ? `${newPath}?${query}` : newPath;
    // const switchLangPath = pathname.replace(`/${lang}`, `/${toggleLang}`);

    const [mobileOpen, setMobileOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const [announceOpen, setAnnounceOpen] = useState(false);

    return (
        <nav className="bg-white shadow sticky top-0 z-50
                    bg-white/90 backdrop-blur
                    border-b border-gray-200">
            <div className="mx-auto max-w-7xl px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link className="hover:text-primary-light]" href={`/${lang}`}>

                        <h1 className="text-2xl font-bold text-primary-dark">
                            {t.hos_name}
                        </h1>
                    </Link>
                    {/* Desktop */}
                    <ul className="hidden items-center gap-6 text-gray-700 md:flex">
                        <li><Link className="hover:text-[rgb(var(--color-primary-light))]" href={`/${lang}`}>{t.home}</Link></li>

                        {/* เกี่ยวกับเรา */}
                        <li className="group relative">
                            <div className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-[rgb(var(--color-primary-light))]">
                                <Link href={`/${lang}/about`}>{t.about}</Link>
                                <Arrow className="transition-transform group-hover:rotate-180 group-hover:text-[rgb(var(--color-primary-light))]" />
                            </div>
                            <Dropdown>
                                <DropdownItem href={`/${lang}/about/history`}>{t.history_hos}</DropdownItem>
                                <DropdownItem href={`/${lang}/about/vision`}>{t.vision_head}</DropdownItem>
                                <DropdownItem href={`/${lang}/about/calendar`}>{t.activity_calendar}</DropdownItem>
                                <DropdownItem href={`/${lang}/about/vehicle`}>{t.vehicle_calendar}</DropdownItem>
                            </Dropdown>
                        </li>

                        {/* ประกาศ */}
                        <li className="group relative">
                            <div className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-[rgb(var(--color-primary-light))]">
                                <Link href={`/${lang}/announcements`}>{t.announcements}</Link>
                                <Arrow className="transition-transform group-hover:rotate-180 group-hover:text-[rgb(var(--color-primary-light))]" />
                            </div>
                            <Dropdown>
                                <DropdownItem href={`/${lang}/announcements/news`}>
                                    {t.news}
                                </DropdownItem>
                                <DropdownItem href={`/${lang}/announcements/procurement`}>
                                    {t.procurement}
                                </DropdownItem>
                            </Dropdown>
                        </li>

                        <li>
                            <Link className="hover:text-[rgb(var(--color-primary-light))]" href={`/${lang}/knowledges`}>{t.knowledge}</Link>
                        </li>
                        <li className="group relative">
                            <div className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-[rgb(var(--color-primary-light))]">
                                <Link href={`/${lang}/donation`}>{t.donation}</Link>
                                <Arrow className="transition-transform group-hover:rotate-180 group-hover:text-[rgb(var(--color-primary-light))]" />
                            </div>
                            <Dropdown>
                                <DropdownItem href={`/${lang}/donation/cash`}>
                                    {t.cash_donation}
                                </DropdownItem>
                                <DropdownItem href={`/${lang}/donation/organ`}>
                                    {t.organ_donation}
                                </DropdownItem>
                            </Dropdown>
                        </li>
                        <li>
                            <Link
                                href={switchLangPath}
                                className="flex items-center gap-2 rounded border px-3 py-1 text-sm hover:bg-[rgb(var(--color-primary-light)/0.1)] hover:text-[rgb(var(--color-primary))]"
                            >
                                <Icons.OutlineGlobe className="text-xl" />
                                {lang === 'th' ? 'TH' : 'EN'}
                            </Link>
                        </li>
                    </ul>

                    {/* ปุ่มเปลี่ยนภาษา */}
                    <Link
                        href={switchLangPath}
                        className="md:hidden flex items-center gap-2 rounded border px-3 py-1 text-sm "
                    >
                        <Icons.OutlineGlobe className="text-xl text-gray-600" />
                        {lang === 'th' ? 'TH' : 'EN'}
                    </Link>

                    {/* ปุ่มมือถือ */}
                    <button
                        className="md:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >☰</button>
                </div>

                {/* Mobile */}
                {mobileOpen && (
                    <div className="mt-4 space-y-3 md:hidden">

                        <Link href={`/${lang}`} className="block rounded px-2 py-2 hover:bg-gray-100"> {t.home} </Link>

                        {/* เกี่ยวกับเรา */}
                        <button
                            onClick={() => setAboutOpen(!aboutOpen)}
                            className="flex w-full items-center justify-between rounded px-2 py-2 hover:bg-gray-100"
                        >
                            <span>{t.about}</span>
                            <Arrow />
                        </button>

                        {aboutOpen && (
                            <div className="ml-4 space-y-2">
                                <Link href={`/${lang}/about/history`} className="block py-1">
                                    {t.history_hos}
                                </Link>
                                <Link href={`/${lang}/about/vision`} className="block py-1">
                                    {t.vision}
                                </Link>
                                <Link href={`/${lang}/about/calendar`} className="block py-1">
                                    {t.activity_calendar}
                                </Link>
                            </div>
                        )}

                        {/* ประกาศ */}
                        <button
                            onClick={() => setAnnounceOpen(!announceOpen)}
                            className="flex w-full items-center justify-between rounded px-2 py-2 hover:bg-gray-100"
                        >
                            <span>{t.announcements}</span>
                            <Arrow />
                        </button>

                        {announceOpen && (
                            <div className="ml-4 space-y-2">
                                <Link href={`/${lang}/announcements/news`} className="block py-1">
                                    {t.news}
                                </Link>
                                <Link
                                    href={`/${lang}/announcements/procurement`}
                                    className="block py-1"
                                >
                                    {t.procurement}
                                </Link>
                            </div>
                        )}

                        <Link
                            href={`/${lang}/knowledges`}
                            className="block rounded px-2 py-2 hover:bg-gray-100"
                        >
                            {t.knowledge}
                        </Link>

                    </div>
                )}
            </div>
        </nav>
    );
}

function Arrow({ className = '' }: { className?: string }) {
    return (
        <svg
            className={`h-4 w-4 transition-colors ${className}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
}


function Dropdown({ children }: { children: React.ReactNode }) {
    return (
        <div className="invisible absolute left-0 top-full z-50 mt-3 w-55 rounded-xl bg-white p-4 shadow-lg opacity-0 transition-all group-hover:visible group-hover:opacity-100">
            <ul className="space-y-2">{children}</ul>
        </div>
    );
}

function DropdownItem({ href, children }: any) {
    return (
        <li>
            <Link
                href={href}
                className="
                    block rounded px-2 py-1
                    hover:bg-[rgb(var(--color-primary-light)/0.1)]
                    hover:text-[rgb(var(--color-primary))]
                    "
            >
                {children}
            </Link>
        </li>
    );
}