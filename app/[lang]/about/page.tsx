import Link from 'next/link';
import { languages, Lang } from '@/i18n';

export default async function AboutPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const t = languages[(await params).lang];
    return (
        <>
            {/* ✅ UI IMPROVED */}
            <div
                className="relative overflow-hidden bg-cover bg-center px-4 py-20 text-center md:py-24"
                style={{
                    backgroundImage: "url('/images/ab1.png')",
                    backgroundPosition: "center 40%",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/80 to-[#C4B5FD]/30 backdrop-blur-sm"></div>
                <div className="relative z-10 text-[#1E293B]">
                    <h1 className="text-2xl font-bold text-[#1E293B] md:text-3xl">
                        {t.about}
                    </h1>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#C4B5FD]"></div>
            </div>

            {/* ✅ UI IMPROVED */}
            <section className="mx-auto max-w-7xl px-4 py-10 md:py-12">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Link href={`/${(await params).lang}/about/history`} className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-md transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[rgba(124,58,237,0.05)] hover:shadow-lg md:p-5">
                        <h3 className="text-xl font-semibold text-[#1E293B] transition group-hover:text-[#7C3AED]">{t.history_hos}</h3>
                    </Link>
                    <Link href={`/${(await params).lang}/about/management`} className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-md transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[rgba(124,58,237,0.05)] hover:shadow-lg md:p-5">
                        <h3 className="text-xl font-semibold text-[#1E293B] transition group-hover:text-[#7C3AED]">{t.management_team}</h3>
                    </Link>
                    <Link href={`/${(await params).lang}/about/vision`} className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-md transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[rgba(124,58,237,0.05)] hover:shadow-lg md:p-5">
                        <h3 className="text-xl font-semibold text-[#1E293B] transition group-hover:text-[#7C3AED]">{t.vision_head}</h3>
                    </Link>
                    <Link href={`/${(await params).lang}/about/calendar`} className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-md transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[rgba(124,58,237,0.05)] hover:shadow-lg md:p-5">
                        <h3 className="text-xl font-semibold text-[#1E293B] transition group-hover:text-[#7C3AED]">{t.activity_calendar}</h3>
                    </Link>
                    <Link href={`/${(await params).lang}/about/vehicle`} className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-md transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[rgba(124,58,237,0.05)] hover:shadow-lg md:p-5">
                        <h3 className="text-xl font-semibold text-[#1E293B] transition group-hover:text-[#7C3AED]">{t.vehicle_calendar}</h3>
                    </Link>
                </div>
            </section>
        </>
    );
}
