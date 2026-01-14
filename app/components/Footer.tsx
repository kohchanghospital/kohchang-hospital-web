'use client';

import Link from 'next/link';
import { languages, Lang } from '../../i18n';

export function Footer({ lang }: { lang: Lang }) {
    const t = languages[lang];

    return (
        <footer className="mt-16 bg-gray-100 text-gray-700">
            <div className="mx-auto max-w-7xl px-6 py-10">
                <div className="grid gap-8 md:grid-cols-4">

                    {/* ข้อมูลโรงพยาบาล */}
                    <div>
                        <h3 className="mb-3 text-lg font-semibold text-blue-700">
                            {t.hos_name}
                        </h3>
                        <p className="text-sm leading-relaxed">
                            {t.footer_about}
                        </p>
                    </div>

                    {/* เมนู */}
                    <div>
                        <h4 className="mb-3 font-semibold">{t.home}</h4>
                        <ul className="space-y-2 text-sm" style={{ listStyleType: 'disc' }}>
                            <li>
                                <Link href={`/${lang}/about`} className="hover:text-blue-600">
                                    {t.about}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/announcements`} className="hover:text-blue-600">
                                    {t.announcements}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/knowledge`} className="hover:text-blue-600">
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
                            <li>📍 21/1 หมู่ที่ 2 ต.เกาะช้าง อ.เกาะช้าง จ.ตราด 23170</li>
                            <li><i className="bi bi-telephone-fill"></i> 039-586-131</li>
                            <li><i className="bi bi-envelope-fill"></i> kohchan7@kohchanghospital.go.th</li>
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
