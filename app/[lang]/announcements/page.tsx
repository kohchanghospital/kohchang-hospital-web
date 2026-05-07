import Link from 'next/link';
import { languages, Lang } from '@/i18n';


export default async function AnnouncementsPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const t = languages[(await params).lang];
    return (
        <>
            {/* ✅ UI IMPROVED */}
            <div
                className="relative overflow-hidden bg-cover bg-center px-4 py-20 text-center md:py-24"
                style={{
                    backgroundImage: "url('/images/announcement.png')",
                    backgroundPosition: "center 20%",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/80 to-[#C4B5FD]/30 backdrop-blur-sm"></div>
                <div className="relative z-10 text-[#1E293B]">
                    <h1 className="text-2xl font-bold text-[#1E293B] md:text-3xl">
                        {t.announcements}
                    </h1>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#C4B5FD]"></div>
            </div>

            {/* ✅ UI IMPROVED */}
            <section className="mx-auto max-w-5xl px-6 py-12">
                <div className="grid gap-6 md:grid-cols-2">
                    <Link
                        href={`/${(await params).lang}/announcements/news`}
                        className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-md transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[rgba(124,58,237,0.05)] hover:shadow-lg md:p-5"
                    >
                        <h3 className="text-xl font-semibold text-[#1E293B] transition group-hover:text-[#7C3AED]">{t.news}</h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#64748B] md:text-base">
                            ข่าวกิจกรรม ข่าวประชาสัมพันธ์ของโรงพยาบาล
                        </p>
                    </Link>
                    <Link
                        href={`/${(await params).lang}/announcements/procurement`}
                        className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-md transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[rgba(124,58,237,0.05)] hover:shadow-lg md:p-5"
                    >
                        <h3 className="text-xl font-semibold text-[#1E293B] transition group-hover:text-[#7C3AED]">{t.procurement}</h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#64748B] md:text-base">
                            ประกาศจัดซื้อจัดจ้าง TOR และผลการจัดซื้อ
                        </p>
                    </Link>
                </div>
            </section>
        </>
    );
}
