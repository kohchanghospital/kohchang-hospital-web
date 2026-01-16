import Link from 'next/link';
import { languages, Lang } from '@/i18n';

export default async function AboutPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const t = languages[(await params).lang];
    return (
        <div>
            <section className="mx-auto max-w-6xl px-6 py-12">
                <h2 className="mb-6 text-3xl font-bold">{t.about}</h2>
                <div className="grid gap-4 md:grid-cols-1">
                    <Link href={`/${(await params).lang}/about/history`} className="rounded-md border p-4 shadow hover:bg-[rgb(var(--color-primary-light)/0.1)]" >
                        <h3 className="text-xl font-semibold">{t.history_hos}</h3>
                    </Link>
                    <Link href={`/${(await params).lang}/about/vision`} className="rounded-md border p-4 shadow hover:bg-[rgb(var(--color-primary-light)/0.1)]" >
                        <h3 className="text-xl font-semibold">{t.vision}</h3>
                    </Link>
                    <Link href={`/${(await params).lang}/about/calendar`} className="rounded-md border p-4 shadow hover:bg-[rgb(var(--color-primary-light)/0.1)]" >
                        <h3 className="text-xl font-semibold">{t.activity_calendar}</h3>
                    </Link>
                    <Link href={`/${(await params).lang}/about/vehicle`} className="rounded-md border p-4 shadow hover:bg-[rgb(var(--color-primary-light)/0.1)]" >
                        <h3 className="text-xl font-semibold">{t.vehicle_calendar}</h3>
                    </Link>
                </div>
            </section>
        </div>
    );
}