import Link from 'next/link';
import { languages, Lang } from '@/i18n';

export default async function AboutPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const t = languages[(await params).lang];
    return (
        <>
            <div
                className="relative text-center py-24 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/ab1.png')",
                    backgroundPosition: "center 40%",
                }}
            >
                {/* overlay ทำให้ตัวหนังสืออ่านง่าย */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/10 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-gray-700">
                    <h1 className="text-7xl font-bold text-[rgb(var(--color-primary))]">
                        {t.about}
                    </h1>
                </div>
                {/* เส้นล่าง hero */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-400"></div>
            </div>
            <div>
                <section className="mx-auto max-w-5xl px-6 py-12">
                    <div className="grid gap-4 md:grid-cols-1">
                        <Link href={`/${(await params).lang}/about/history`} className="rounded-md border p-4 shadow hover:bg-[rgb(var(--color-primary-light)/0.2)]" >
                            <h3 className="text-xl font-semibold">{t.history_hos}</h3>
                        </Link>
                        <Link href={`/${(await params).lang}/about/management`} className="rounded-md border p-4 shadow hover:bg-[rgb(var(--color-primary-light)/0.2)]" >
                            <h3 className="text-xl font-semibold">{t.management_team}</h3>
                        </Link>
                        <Link href={`/${(await params).lang}/about/vision`} className="rounded-md border p-4 shadow hover:bg-[rgb(var(--color-primary-light)/0.2)]" >
                            <h3 className="text-xl font-semibold">{t.vision_head}</h3>
                        </Link>
                        <Link href={`/${(await params).lang}/about/calendar`} className="rounded-md border p-4 shadow hover:bg-[rgb(var(--color-primary-light)/0.2)]" >
                            <h3 className="text-xl font-semibold">{t.activity_calendar}</h3>
                        </Link>
                        <Link href={`/${(await params).lang}/about/vehicle`} className="rounded-md border p-4 shadow hover:bg-[rgb(var(--color-primary-light)/0.2)]" >
                            <h3 className="text-xl font-semibold">{t.vehicle_calendar}</h3>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}