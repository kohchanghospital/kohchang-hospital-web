import Link from 'next/link';
import { languages, Lang } from '@/i18n';


export default async function AnnouncementsPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const t = languages[(await params).lang];
    return (
        <>
            <div
                className="relative text-center py-24 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/announcement.png')",
                    backgroundPosition: "center 20%",
                }}
            >
                {/* overlay ทำให้ตัวหนังสืออ่านง่าย */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/10 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-gray-700">
                    <h1 className="text-7xl font-bold text-[rgb(var(--color-primary))]">
                        {t.announcements}
                    </h1>
                </div>
                {/* เส้นล่าง hero */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-400"></div>
            </div>
            <div>
                <section className="mx-auto max-w-5xl px-6 py-12">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Link
                            href={`/${(await params).lang}/announcements/news`}
                            className="rounded-lg border p-6 shadow hover:bg-[rgb(var(--color-primary-light)/0.1)] hover:text-[rgb(var(--color-primary))]"
                        >
                            <h3 className="text-xl font-semibold">{t.news}</h3>
                            <p className="mt-2 text-gray-600">
                                ข่าวกิจกรรม ข่าวประชาสัมพันธ์ของโรงพยาบาล
                            </p>
                        </Link>
                        <Link
                            href={`/${(await params).lang}/announcements/procurement`}
                            className="rounded-lg border p-6 shadow hover:bg-[rgb(var(--color-primary-light)/0.1)] hover:text-[rgb(var(--color-primary))]"
                        >
                            <h3 className="text-xl font-semibold">{t.procurement}</h3>
                            <p className="mt-2 text-gray-600">
                                ประกาศจัดซื้อจัดจ้าง TOR และผลการจัดซื้อ
                            </p>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}