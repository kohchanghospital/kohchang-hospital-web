import Link from 'next/link';
import { languages, Lang } from '@/i18n';


export default async function AnnouncementsPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const t = languages[(await params).lang];
    return (
        <div>
            <section className="mx-auto max-w-6xl px-6 py-12">
                <h2 className="mb-6 text-3xl font-bold">{t.announcements}</h2>

                <div className="grid gap-6 md:grid-cols-2">
                    <Link
                        href={`/${(await params).lang}/announcements/news`}
                        className="rounded-lg border p-6 shadow hover:bg-blue-50"
                    >
                        <h3 className="text-xl font-semibold">{t.news}</h3>
                        <p className="mt-2 text-gray-600">
                            ข่าวกิจกรรม ข่าวประชาสัมพันธ์ของโรงพยาบาล
                        </p>
                    </Link>
                    <Link
                        href={`/${(await params).lang}/announcements/procurement`}
                        className="rounded-lg border p-6 shadow hover:bg-blue-50"
                    >
                        <h3 className="text-xl font-semibold">{t.procurement}</h3>
                        <p className="mt-2 text-gray-600">
                            ประกาศจัดซื้อจัดจ้าง TOR และผลการจัดซื้อ
                        </p>
                    </Link>
                </div>
            </section>
        </div>
    );
}