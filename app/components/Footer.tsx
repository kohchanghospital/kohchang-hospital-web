'use client';

import Link from 'next/link';
import { languages, Lang } from '../../i18n';
import { Icons } from '../icons/icons';

export function Footer({ lang }: { lang: Lang }) {
    const t = languages[lang];

    return (
        // ✅ UI IMPROVED
        <footer className="mt-12 border-t border-[#E5E7EB] bg-[#F8FAFC] text-[#64748B]">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr_1fr_1.1fr]">
                    <div className="space-y-4">
                        <Link href={`/${lang}/`} className="inline-block">
                            <h3 className="text-2xl font-bold text-[#1E293B] transition-colors duration-300 hover:text-[#7C3AED]">
                                {t.hos_name}
                            </h3>
                        </Link>
                        <p className="max-w-sm text-sm leading-7">
                            {t.sub_about}
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#1E293B]">
                            {t.home}
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <FooterLink href={`/${lang}/about`}>{t.about}</FooterLink>
                            <FooterLink href={`/${lang}/announcements`}>{t.announcements}</FooterLink>
                            <FooterLink href={`/${lang}/knowledges`}>{t.knowledge}</FooterLink>
                            <FooterLink href={`/${lang}/donation`}>{t.donation}</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#1E293B]">
                            {t.footer_contact}
                        </h4>
                        <ul className="space-y-3 text-sm leading-6">
                            <li className="flex gap-3">
                                <Icons.MapPinFill className="mt-1 shrink-0 text-lg text-[#7C3AED]" />
                                <span>{t.address}</span>
                            </li>
                            <li className="flex gap-3">
                                <Icons.PhoneAlt className="mt-1 shrink-0 text-base text-[#7C3AED]" />
                                <span>
                                    <a href="tel:+6639586131" className="transition-colors duration-300 hover:text-[#7C3AED]">039-586-131</a>
                                    {' / '}
                                    <a href="tel:+6639586160" className="transition-colors duration-300 hover:text-[#7C3AED]">039-586-160</a>
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <Icons.Gmail className="mt-1 shrink-0 text-base text-[#7C3AED]" />
                                <a href="mailto:kohchanghealth123@gmail.com" className="break-all transition-colors duration-300 hover:text-[#7C3AED]">
                                    kohchanghealth123@gmail.com
                                </a>
                            </li>
                            <li className="flex gap-3">
                                <Icons.Facebook className="mt-1 shrink-0 text-base text-[#7C3AED]" />
                                <a href="https://www.facebook.com/kochang.hospital/" target="_blank" className="transition-colors duration-300 hover:text-[#7C3AED]">
                                    /kochang.hospital
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#1E293B]">
                            {lang === 'th' ? 'แผนที่' : 'Map'}
                        </h4>

                        <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-md shadow-slate-900/5">
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

            <div className="border-t border-[#E5E7EB] px-4 py-5 text-center text-xs leading-6 text-[#64748B] sm:text-sm">
                © {new Date().getFullYear()} {t.hos_name}. All rights reserved.
                {' | '}
                <a href={`/${lang}/privacy-policy`} className="transition-colors duration-300 hover:text-[#7C3AED]">{t.privacy_policy}</a>
                {' | '}
                <a href={`/${lang}/cookie-policy`} className="transition-colors duration-300 hover:text-[#7C3AED]">{t.cookie_policy}</a>
                {' | '}
                <a href={`/${lang}/terms-of-service`} className="transition-colors duration-300 hover:text-[#7C3AED]">{t.terms_of_service}</a>
            </div>
        </footer>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link
                href={href}
                className="inline-flex items-center gap-2 transition-all duration-300 hover:translate-x-1 hover:text-[#7C3AED]"
            >
                <span className="h-1.5 w-1.5 rounded-full bg-[#C4B5FD]" />
                {children}
            </Link>
        </li>
    );
}
