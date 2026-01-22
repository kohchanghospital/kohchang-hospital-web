'use client';

import Link from 'next/link';
import { languages, Lang } from '../../i18n';
import { Icons } from '../icons/icons';

export function Footer({ lang }: { lang: Lang }) {
    const t = languages[lang];

    return (
        <footer className="mt-10 bg-gray-100 text-gray-700">
            <div className="mx-auto max-w-7xl px-6 py-10">
                <div className="grid gap-8 md:grid-cols-4">

                    {/* ข้อมูลโรงพยาบาล */}
                    <div>
                        <Link href={`/${lang}/`} className="hover:text-[rgb(var(--color-primary-light))]">
                            <h3 className="mb-3 text-2xl font-semibold text-primary-dark">
                                {t.hos_name}
                            </h3>
                        </Link>
                        <p className="text-sm leading-relaxed">
                            {t.sub_about}
                        </p>
                    </div>

                    {/* เมนู */}
                    <div>
                        <h4 className="mb-3 font-semibold"><Link href={`/${lang}/`} className="hover:text-[rgb(var(--color-primary-light))]">{t.home}</Link></h4>
                        <ul className="space-y-2 text-sm pl-4" style={{ listStyleType: 'disc' }}>
                            <li>
                                <Link href={`/${lang}/about`} className="hover:text-[rgb(var(--color-primary-light))]">
                                    {t.about}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/announcements`} className="hover:text-[rgb(var(--color-primary-light))]">
                                    {t.announcements}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/knowledge`} className="hover:text-[rgb(var(--color-primary-light))]">
                                    {t.knowledge}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* ติดต่อ */}
                    <div>
                        <h4 className="mb-3 font-semibold">
                            {t.footer_contact}
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li><Icons.MapPinFill className="inline mr-2" /> {t.address}</li>
                            <li><Icons.PhoneAlt className="inline mr-2" /> <a href="tel:+6639586131" className="hover:text-[rgb(var(--color-primary-light))]">039-586-131</a> / <a href="tel:+6639586160" className="hover:text-[rgb(var(--color-primary-light))]">039-586-160</a></li>
                            <li><Icons.Gmail className="inline mr-2" /> <a href="mailto:kohchanghealth123@gmail.com" className="hover:text-[rgb(var(--color-primary-light))]">kohchanghealth123@gmail.com</a></li>
                            <li><Icons.Facebook className="inline mr-2" /> <a href="https://www.facebook.com/kochang.hospital/" target="_blank" className="hover:text-[rgb(var(--color-primary-light))]">/kochang.hospital</a></li>
                        </ul>
                    </div>

                    {/* 🗺 Google Map */}
                    <div>
                        <h4 className="mb-3 font-semibold">
                            {lang === 'th' ? 'แผนที่' : 'Map'}
                        </h4>

                        <div className="overflow-hidden rounded-lg shadow">
                            <iframe
                                title="Koh Chang Hospital Map"
                                src="https://www.google.com/maps?q=โรงพยาบาลเกาะช้าง&output=embed"
                                width="100%"
                                height="180"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="border-0"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* copyright */}
            <div className="border-t p-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} {t.hos_name}. All rights reserved.
            </div>
        </footer>
    );
}
