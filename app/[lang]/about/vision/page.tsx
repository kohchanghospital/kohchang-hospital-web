import { languages, Lang } from '@/i18n';
import { getContent } from '@/app/lib/api';

export default async function VisionPage({ params }: { params: { lang: Lang } }) {
    const lang = (await params).lang;
    const t = languages[lang];
    console.log("LANG FROM PARAMS:", lang);

    const [
        vision,
        mission,
        values
    ] = await Promise.all([
        getContent('vision', lang),
        getContent('mission', lang),
        getContent('values', lang),
    ]);

    return (
        <>
            <div
                className="relative text-center py-24 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/vision.png')",
                    backgroundPosition: "center 25%",
                }}
            >
                {/* overlay ทำให้ตัวหนังสืออ่านง่าย */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/10 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-gray-700">
                    <h1 className="text-7xl font-bold text-[rgb(var(--color-primary))]">
                        {t.vision_head}
                    </h1>
                </div>
                {/* เส้นล่าง hero */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-400"></div>
            </div>
            <div>
                <section className="mx-auto max-w-4xl px-6 py-12">
                    <h2 className="mb-4 text-2xl font-bold">{t.vision}</h2>
                    <div
                        className="prose max-w-none mb-8"
                        dangerouslySetInnerHTML={{ __html: vision.body }}
                    />
                    <div className="w-full h-px bg-gray-300 my-8"></div>
                    <h3 className="mb-4 text-2xl font-bold">{t.mission}</h3>
                    <div
                        className="prose max-w-none mb-8"
                        dangerouslySetInnerHTML={{ __html: mission.body }}
                    />
                    <div className="w-full h-px bg-gray-300 my-8"></div>
                    <h2 className="mb-4 text-2xl font-bold">{t.values}</h2>
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: values.body }}
                    />
                </section>
            </div>
        </>
    );
}