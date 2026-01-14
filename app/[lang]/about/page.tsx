import Link from 'next/link';
import { languages, Lang } from '@/i18n';

export default async function AboutPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const resolvedParams = await params;
    const t = languages[resolvedParams.lang];
    return (
        <div>
            <section className="mx-auto max-w-6xl px-6 py-12">
                <h2 className="mb-6 text-3xl font-bold">{t.about}</h2>
                <ul className="space-y-4">
                    <li>
                        <Link href={`/${resolvedParams.lang}/about/history`} className="text-blue-600 underline">
                            {t.history}
                        </Link>
                    </li>
                    <li>
                        <Link href={`/${resolvedParams.lang}/about/vision`} className="text-blue-600 underline">
                            {t.vision}
                        </Link>
                    </li>
                    <li>
                        <Link href={`/${resolvedParams.lang}/about/calendar`} className="text-blue-600 underline">
                            {t.calendar}
                        </Link>
                    </li>
                </ul>
            </section>
        </div>
    );
}