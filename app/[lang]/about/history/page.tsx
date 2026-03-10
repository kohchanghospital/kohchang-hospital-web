import { languages, Lang } from '@/i18n';
import { getContent } from '@/app/lib/api';

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
            <div
                className="relative text-center py-24 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/kohchang1.png')",
                    backgroundPosition: "center 40%",
                }}
            >
                {/* overlay ทำให้ตัวหนังสืออ่านง่าย */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/10 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-gray-700">
                    <h1 className="text-7xl font-bold text-[rgb(var(--color-primary))]">
                        {t.history}
                    </h1>
                </div>
                {/* เส้นล่าง hero */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-400"></div>
            </div>
            <div>
                <section className="mx-auto max-w-4xl px-6 py-12">
                    <div className="grid md:grid-cols-2 gap-8 mt-8 flex items-center">
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
                                className="w-full h-auto rounded-lg shadow"
                            />
                        </div>
                    </div>
                    <div className="w-full h-px bg-gray-300 my-8"></div>
                    <h3 className="mb-4 text-xl font-bold">{t.history_es_dis}</h3>
                    <div
                        className="prose max-w-none mb-8"
                        dangerouslySetInnerHTML={{ __html: historyEsDis.body }}
                    />
                    <div className="w-full h-px bg-gray-300 my-8"></div>
                    <h2 className="mb-4 text-2xl font-bold">{t.history_hos}</h2>
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: historyHos.body }}
                    />
                </section>
            </div>
        </>
    );
}
