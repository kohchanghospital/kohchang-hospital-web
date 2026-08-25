import { languages, Lang } from '@/i18n';
import { getContent } from '@/app/lib/api';
import { PublicHero } from '@/app/components/PublicUI';

export default async function HistoryPage({ params }: { params: { lang: Lang } }) {
    const lang = (await params).lang;
    const t = languages[lang];

    const [
        historyDis,
        historyEsDis,
        historyHos
    ] = await Promise.all([
        getContent('district-history', lang),
        getContent('district-establishment', lang),
        getContent('hospital-history', lang),
    ]);

    return (
        <>
            <PublicHero title={t.history} eyebrow="Our Story" image="/images/kohchang1.png" />
            <div>
                <section className="container-page max-w-5xl py-10 sm:py-14">
                    <div className="surface-card grid items-center gap-8 p-5 md:grid-cols-2 sm:p-8">
                        <div>
                            <h2 className="mb-4 text-2xl font-bold">{t.history_dis}</h2>
                            <div
                                className="prose max-w-none mb-8"
                                dangerouslySetInnerHTML={{ __html: historyDis.body }}
                            />
                        </div>
                        <div>
                            <img
                                src="/images/kohchang.png"
                                alt="History of Koh Chang District"
                                className="aspect-[4/3] h-auto w-full rounded-xl object-cover"
                            />
                        </div>
                    </div>
                    <div className="surface-card mt-6 p-5 sm:p-8">
                    <h3 className="mb-4 text-xl font-bold">{t.history_es_dis}</h3>
                    <div
                        className="prose max-w-none mb-8"
                        dangerouslySetInnerHTML={{ __html: historyEsDis.body }}
                    />
                    </div><div className="surface-card mt-6 p-5 sm:p-8">
                    <h2 className="mb-4 text-2xl font-bold">{t.history_hos}</h2>
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: historyHos.body }}
                    />
                    </div>
                </section>
            </div>
        </>
    );
}
