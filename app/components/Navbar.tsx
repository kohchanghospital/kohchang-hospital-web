'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { languages, Lang } from '../../i18n';
import { Icons } from '../icons/icons';

export function Navbar({ lang }: { lang: Lang }) {
    const t = languages[lang];

    const pathname = usePathname();
    const toggleLang: Lang = lang === 'th' ? 'en' : 'th';

    // แปลง path เดิมเป็นอีกภาษา
    const switchLangPath = pathname.replace(`/${lang}`, `/${toggleLang}`);

    const [mobileOpen, setMobileOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const [announceOpen, setAnnounceOpen] = useState(false);

    return (
        <nav className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-6 py-4">

                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-blue-700">
                        {t.hos_name}
                    </h1>

                    {/* Desktop */}
                    <ul className="hidden items-center gap-6 text-gray-700 md:flex">
                        <li><Link href={`/${lang}`}>{t.home}</Link></li>

                        {/* เกี่ยวกับเรา */}
                        <li className="group relative">
                            <div className="flex items-center gap-1 cursor-pointer">
                                <Link href={`/${lang}/about`}>{t.about}</Link>
                                <Arrow />
                            </div>
                            <Dropdown>
                                <DropdownItem href={`/${lang}/about/history`}>{t.history}</DropdownItem>
                                <DropdownItem href={`/${lang}/about/vision`}>{t.vision}</DropdownItem>
                                <DropdownItem href={`/${lang}/about/calendar`}>{t.calendar}</DropdownItem>
                            </Dropdown>
                        </li>

                        {/* ประกาศ */}
                        <li className="group relative">
                            <div className="flex items-center gap-1 cursor-pointer">
                                <Link href={`/${lang}/announcements`}>{t.announcements}</Link>
                                <Arrow />
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
                            <Link href={`/${lang}/knowledge`}>{t.knowledge}</Link>
                        </li>
                    </ul>

                    {/* ปุ่มเปลี่ยนภาษา */}
                    <Link
                        href={switchLangPath}
                        className="flex items-center gap-2 rounded border px-3 py-1 text-sm hover:bg-gray-100"
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

                        <Link
                            href={`/${lang}`}
                            className="block rounded px-2 py-2 hover:bg-gray-100"
                        >
                            {t.home}
                        </Link>

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
                                    {t.history}
                                </Link>
                                <Link href={`/${lang}/about/vision`} className="block py-1">
                                    {t.vision}
                                </Link>
                                <Link href={`/${lang}/about/calendar`} className="block py-1">
                                    {t.calendar}
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
                            href={`/${lang}/knowledge`}
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

function Arrow({ rotate = false }: { rotate?: boolean }) {
    return (
        <svg
            className={`h-4 w-4 text-gray-500 transition-transform ${rotate ? 'rotate-180' : ''
                }`}
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
        <div className="invisible absolute left-0 top-full z-50 mt-3 w-64 rounded-xl bg-white p-4 shadow-lg opacity-0 transition-all group-hover:visible group-hover:opacity-100">
            <ul className="space-y-2">{children}</ul>
        </div>
    );
}

function DropdownItem({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <li>
            <Link href={href} className="block hover:text-blue-600">
                {children}
            </Link>
        </li>
    );
}