import { languages, Lang } from '@/i18n';

export default async function NewsPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const t = languages[(await params).lang];
    return (
        <div>
            <section className="mx-auto max-w-6xl px-6 py-12">
                <h2 className="mb-6 text-3xl font-bold">{t.news}</h2>
                <div className="space-y-4">
                    <div className="rounded border p-4">
                        <h4 className="font-semibold">ข่าวกิจกรรมโรงพยาบาล</h4>
                        <p className="text-sm text-gray-600">รายละเอียดข่าวโดยย่อ</p>
                    </div>
                </div>
            </section>
        </div>
    );
}