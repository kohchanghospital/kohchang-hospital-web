'use client';

import Link from 'next/link';
import { languages, Lang } from '../../i18n';
import { Icons } from '../icons/icons';
import { PolicyFooterLinks } from './PolicyFooterLinks';

export function Footer({ lang }: { lang: Lang }) {
    const t = languages[lang];

    return (
        // ✅ UI IMPROVED
        <footer className="mt-12 border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] text-[rgb(var(--color-muted))]">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr_1fr_1.1fr]">
                    <div className="space-y-4">
                        <Link href={`/${lang}/`} className="inline-block">
                            <h3 className="text-2xl font-bold text-[rgb(var(--color-foreground))] transition-colors duration-300 hover:text-[rgb(var(--color-primary))]">
                                {t.hos_name}
                            </h3>
                        </Link>
                        <p className="max-w-sm text-sm leading-7">
                            {t.sub_about}
                        </p>
                        <h4 className="mb-4 mt-6 text-sm font-semibold uppercase tracking-wide text-[rgb(var(--color-foreground))]">
                            {t.footer_contact}
                        </h4>
                        <ul className="space-y-3 text-sm leading-6">
                            <li className="flex gap-3">
                                <Icons.MapPinFill className="mt-1 shrink-0 text-lg text-[rgb(var(--color-primary))]" />
                                <span>{t.address}</span>
                            </li>
                            <li className="flex gap-3">
                                <Icons.PhoneAlt className="mt-1 shrink-0 text-base text-[rgb(var(--color-primary))]" />
                                <span>
                                    <a href="tel:+6639586131" className="transition-colors duration-300 hover:text-[rgb(var(--color-primary))]">039-586-131</a>
                                    {' / '}
                                    <a href="tel:+6639586160" className="transition-colors duration-300 hover:text-[rgb(var(--color-primary))]">039-586-160</a>
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <Icons.Gmail className="mt-1 shrink-0 text-base text-[rgb(var(--color-primary))]" />
                                <a href="mailto:kohchanghealth123@gmail.com" className="break-all transition-colors duration-300 hover:text-[rgb(var(--color-primary))]">
                                    kohchanghealth123@gmail.com
                                </a>
                            </li>
                            <li className="flex gap-3">
                                <Icons.Facebook className="mt-1 shrink-0 text-base text-[rgb(var(--color-primary))]" />
                                <a href="https://www.facebook.com/kochang.hospital/" target="_blank" className="transition-colors duration-300 hover:text-[rgb(var(--color-primary))]">
                                    /kochang.hospital
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[rgb(var(--color-foreground))]">
                            {t.home}
                        </h4>
                        <ul className="space-y-3 text-sm mb-4">
                            <FooterLink href={`/${lang}/`}>{t.home}</FooterLink>
                        </ul>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[rgb(var(--color-foreground))]">
                            {t.about}
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <FooterLink href={`/${lang}/about/history`}>{t.history_hos}</FooterLink>
                            <FooterLink href={`/${lang}/about/management`}>{t.management_team}</FooterLink>
                            <FooterLink href={`/${lang}/about/vision`}>{t.vision_head}</FooterLink>
                            <FooterLink href={`/${lang}/about/calendar`}>{t.activity_calendar}</FooterLink>
                            <FooterLink href={`/${lang}/about/vehicle`}>{t.vehicle_calendar}</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[rgb(var(--color-foreground))]">
                            {t.announcements}
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <FooterLink href={`/${lang}/announcements/news`}>{t.news}</FooterLink>
                            <FooterLink href={`/${lang}/announcements/procurement`}>{t.procurement}</FooterLink>
                            <FooterLink href={`/${lang}/knowledges`}>{t.knowledge}</FooterLink>
                        </ul>
                        <h4 className="mb-4 mt-8 text-sm font-semibold uppercase tracking-wide text-[rgb(var(--color-foreground))]">
                            {t.donation}
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <FooterLink href={`/${lang}/donation/cash`}>{t.cash_donation}</FooterLink>
                            <FooterLink href={`/${lang}/donation/organ`}>{t.organ_donation}</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[rgb(var(--color-foreground))]">
                            {lang === 'th' ? 'แผนที่' : 'Map'}
                        </h4>

                        <div className="overflow-hidden rounded-xl border border-[rgb(var(--color-border))] bg-white shadow-md shadow-slate-900/5">
                            <iframe
                                title="Koh Chang Hospital Map"
                                src="https://www.google.com/maps?q=โรงพยาบาลเกาะช้าง&output=embed"
                                width="100%"
                                height="210"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="border-0"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-[rgb(var(--color-border))] px-4 py-5 text-center text-xs leading-6 text-[rgb(var(--color-muted))] sm:text-sm">
                © {new Date().getFullYear()} {t.hos_name}. All rights reserved.
                {' | '}
                <PolicyFooterLinks lang={lang} />
            </div>
        </footer>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link
                href={href}
                className="inline-flex items-center gap-2 transition-all duration-300 hover:translate-x-1 hover:text-[rgb(var(--color-primary))]"
            >
                <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--color-accent))]" />
                {children}
            </Link>
        </li>
    );
}
