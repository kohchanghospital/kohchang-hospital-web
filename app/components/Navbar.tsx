'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { languages, Lang } from '../../i18n';
import { Icons } from '../icons/icons';

export function Navbar({ lang }: { lang: Lang }) {
    const t = languages[lang];

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const toggleLang: Lang = lang === 'th' ? 'en' : 'th';

    const segments = pathname.split('/');
    segments[1] = toggleLang;
    const newPath = segments.join('/');

    const query = searchParams.toString();
    const switchLangPath = query ? `${newPath}?${query}` : newPath;

    const [mobileOpen, setMobileOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const [announceOpen, setAnnounceOpen] = useState(false);
    const [donationOpen, setDonationOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [highlight, setHighlight] = useState({ left: 0, width: 0, opacity: 0 });
    const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

    const navItems = [
        { key: 'home', label: t.home, href: `/${lang}` },
        {
            key: 'about',
            label: t.about,
            href: `/${lang}/about`,
            items: [
                { label: t.history_hos, href: `/${lang}/about/history` },
                { label: t.management_team, href: `/${lang}/about/management` },
                { label: t.vision_head, href: `/${lang}/about/vision` },
                { label: t.activity_calendar, href: `/${lang}/about/calendar` },
                { label: t.vehicle_calendar, href: `/${lang}/about/vehicle` },
            ],
        },
        {
            key: 'announcements',
            label: t.announcements,
            href: `/${lang}/announcements`,
            items: [
                { label: t.news, href: `/${lang}/announcements/news` },
                { label: t.procurement, href: `/${lang}/announcements/procurement` },
            ],
        },
        { key: 'knowledge', label: t.knowledge, href: `/${lang}/knowledges` },
        {
            key: 'donation',
            label: t.donation,
            href: `/${lang}/donation`,
            items: [
                { label: t.cash_donation, href: `/${lang}/donation/cash` },
                { label: t.organ_donation, href: `/${lang}/donation/organ` },
            ],
        },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 18);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const updateHighlight = (key: string) => {
        const item = itemRefs.current[key];
        const parent = item?.parentElement;
        if (!item || !parent) return;

        const itemBox = item.getBoundingClientRect();
        const parentBox = parent.getBoundingClientRect();

        setHighlight({
            left: itemBox.left - parentBox.left,
            width: itemBox.width,
            opacity: 1,
        });
    };

    return (
        // ✅ UI IMPROVED
        <motion.nav
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="sticky top-0 z-50 px-3 pt-3"
        >
            <motion.div
                animate={{
                    paddingTop: scrolled ? 10 : 14,
                    paddingBottom: scrolled ? 10 : 14,
                    boxShadow: scrolled
                        ? '0 18px 45px rgba(15, 23, 42, 0.12)'
                        : '0 10px 30px rgba(124, 58, 237, 0.08)',
                }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="mx-auto max-w-7xl rounded-2xl border border-white/70 bg-white/75 px-4 backdrop-blur-md md:px-6"
            >
                <div className="flex items-center justify-between">
                    <Link className="group min-w-0" href={`/${lang}`}>
                        <motion.h1
                            animate={{ scale: scrolled ? 0.94 : 1 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="truncate text-lg font-bold tracking-normal text-[#1E293B] transition-colors group-hover:text-[#7C3AED] sm:text-2xl"
                        >
                            <img
                                src="/images/logo_w.png"
                                alt="Logo"
                                className="mr-2 inline-block h-8 w-8 rounded-full object-cover align-middle sm:h-10 sm:w-10"
                            />
                            {t.hos_name}
                        </motion.h1>
                    </Link>

                    <ul
                        className="relative hidden items-center gap-1 rounded-full border border-slate-200/70 bg-slate-50/65 p-1 text-sm font-medium text-[#64748B] md:flex"
                        onMouseLeave={() => setHighlight((current) => ({ ...current, opacity: 0 }))}
                    >
                        <motion.div
                            className="absolute bottom-1 top-1 rounded-full bg-[#7C3AED]/10"
                            animate={highlight}
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                        {navItems.map((item) => (
                            <li
                                key={item.key}
                                ref={(node) => {
                                    itemRefs.current[item.key] = node;
                                }}
                                onMouseEnter={() => updateHighlight(item.key)}
                                className="group relative z-10"
                            >
                                <div className="flex items-center gap-1 rounded-full px-4 py-2 text-[#64748B] transition-colors duration-300 group-hover:text-[#7C3AED]">
                                    <Link href={item.href}>{item.label}</Link>
                                    {item.items && <Arrow className="transition-transform group-hover:rotate-180" />}
                                </div>

                                {item.items && (
                                    <Dropdown>
                                        {item.items.map((dropdownItem) => (
                                            <DropdownItem key={dropdownItem.href} href={dropdownItem.href}>
                                                {dropdownItem.label}
                                            </DropdownItem>
                                        ))}
                                    </Dropdown>
                                )}
                            </li>
                        ))}

                        <li className="relative z-10">
                            <Link
                                href={switchLangPath}
                                className="ml-2 flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#1E293B] shadow-sm transition-all duration-300 hover:scale-105 hover:border-[#C4B5FD] hover:bg-[#7C3AED]/10 hover:text-[#7C3AED] active:scale-95"
                            >
                                <Icons.OutlineGlobe className="text-xl" />
                                {lang === 'th' ? 'TH' : 'EN'}
                            </Link>
                        </li>
                    </ul>

                    <Link
                        href={switchLangPath}
                        className="ml-auto mr-3 flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white/80 px-3 py-2 text-sm text-[#1E293B] transition-all duration-300 hover:bg-[#7C3AED]/10 hover:text-[#7C3AED] md:hidden"
                    >
                        <Icons.OutlineGlobe className="text-xl" />
                        {lang === 'th' ? 'TH' : 'EN'}
                    </Link>

                    <button
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white/85 text-xl text-[#1E293B] shadow-sm transition-all duration-300 hover:bg-[#7C3AED]/10 hover:text-[#7C3AED] active:scale-95 md:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle navigation"
                    >
                        {mobileOpen ? <Icons.Close /> : <span className="leading-none">☰</span>}
                    </button>
                </div>

                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="overflow-hidden md:hidden"
                        >
                            <motion.div
                                initial="hidden"
                                animate="show"
                                variants={{
                                    hidden: {},
                                    show: { transition: { staggerChildren: 0.045 } },
                                }}
                                className="mt-4 space-y-2 border-t border-[#E5E7EB] pt-4 text-[#1E293B]"
                            >
                                <MobileLink href={`/${lang}`} onClick={() => setMobileOpen(false)}>{t.home}</MobileLink>
                                <MobileGroup label={t.about} open={aboutOpen} onClick={() => setAboutOpen(!aboutOpen)}>
                                    <MobileSubLink href={`/${lang}/about/history`} onClick={() => setMobileOpen(false)}>{t.history_hos}</MobileSubLink>
                                    <MobileSubLink href={`/${lang}/about/management`} onClick={() => setMobileOpen(false)}>{t.management_team}</MobileSubLink>
                                    <MobileSubLink href={`/${lang}/about/vision`} onClick={() => setMobileOpen(false)}>{t.vision_head}</MobileSubLink>
                                    <MobileSubLink href={`/${lang}/about/calendar`} onClick={() => setMobileOpen(false)}>{t.activity_calendar}</MobileSubLink>
                                    <MobileSubLink href={`/${lang}/about/vehicle`} onClick={() => setMobileOpen(false)}>{t.vehicle_calendar}</MobileSubLink>
                                </MobileGroup>
                                <MobileGroup label={t.announcements} open={announceOpen} onClick={() => setAnnounceOpen(!announceOpen)}>
                                    <MobileSubLink href={`/${lang}/announcements/news`} onClick={() => setMobileOpen(false)}>{t.news}</MobileSubLink>
                                    <MobileSubLink href={`/${lang}/announcements/procurement`} onClick={() => setMobileOpen(false)}>{t.procurement}</MobileSubLink>
                                </MobileGroup>
                                <MobileLink href={`/${lang}/knowledges`} onClick={() => setMobileOpen(false)}>{t.knowledge}</MobileLink>
                                <MobileGroup label={t.donation} open={donationOpen} onClick={() => setDonationOpen(!donationOpen)}>
                                    <MobileSubLink href={`/${lang}/donation/cash`} onClick={() => setMobileOpen(false)}>{t.cash_donation}</MobileSubLink>
                                    <MobileSubLink href={`/${lang}/donation/organ`} onClick={() => setMobileOpen(false)}>{t.organ_donation}</MobileSubLink>
                                </MobileGroup>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.nav>
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
        <div className="invisible absolute left-0 top-full z-50 mt-3 w-64 translate-y-2 rounded-2xl border border-[#E5E7EB] bg-white/95 p-3 text-[#1E293B] shadow-xl shadow-slate-900/10 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
            <ul className="space-y-2">{children}</ul>
        </div>
    );
}

function DropdownItem({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link
                href={href}
                className="block rounded-xl px-3 py-2 text-sm text-[#64748B] transition-all duration-300 hover:bg-[#7C3AED]/10 hover:text-[#7C3AED]"
            >
                {children}
            </Link>
        </li>
    );
}

function MobileLink({
    href,
    children,
    onClick,
}: {
    href: string;
    children: React.ReactNode;
    onClick: () => void;
}) {
    return (
        <motion.div variants={{ hidden: { opacity: 0, x: 16 }, show: { opacity: 1, x: 0 } }}>
            <Link
                href={href}
                onClick={onClick}
                className="block rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 hover:bg-[#7C3AED]/10 hover:text-[#7C3AED]"
            >
                {children}
            </Link>
        </motion.div>
    );
}

function MobileGroup({
    label,
    open,
    onClick,
    children,
}: {
    label: React.ReactNode;
    open: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <motion.div variants={{ hidden: { opacity: 0, x: 16 }, show: { opacity: 1, x: 0 } }}>
            <button
                onClick={onClick}
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 hover:bg-[#7C3AED]/10 hover:text-[#7C3AED]"
            >
                <span>{label}</span>
                <Arrow className={open ? 'rotate-180' : ''} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="ml-3 overflow-hidden border-l border-[#E5E7EB] pl-3"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function MobileSubLink({
    href,
    children,
    onClick,
}: {
    href: string;
    children: React.ReactNode;
    onClick: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="block rounded-lg px-3 py-2 text-sm text-[#64748B] transition-all duration-300 hover:bg-[#7C3AED]/10 hover:text-[#7C3AED]"
        >
            {children}
        </Link>
    );
}
