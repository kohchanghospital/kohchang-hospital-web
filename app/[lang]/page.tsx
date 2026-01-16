import '../globals.css';
import { languages, Lang } from '@/i18n';

export default async function HomePage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const t = languages[(await params).lang];
    return (
        <div>
            <header className="bg-blue-50 py-60 text-center">
                <h2 className="text-3xl font-bold text-blue-800">{t.hos_name}</h2>
                <p className="mt-4 text-gray-600">{t.sub_about}</p>
            </header>
            <section className="mx-auto max-w-6xl px-6 py-12">
                <h3 className="mb-6 text-2xl font-semibold">{t.news}</h3>
                <div className="grid gap-6 md:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-lg border p-4 shadow-sm">
                            <h4 className="font-semibold">ประกาศที่ {i}</h4>
                            <p className="mt-2 text-sm text-gray-600">
                                รายละเอียดประกาศโดยย่อ สามารถเชื่อม API ภายหลังได้
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}