import { languages, Lang } from "@/i18n";
import Image from 'next/image'
import Pagination from "@/app/components/Pagination";
import { EmptyState, PublicHero } from "@/app/components/PublicUI";

type Announcement = {
    id: number;
    title: string;
    created_at: string;
};

async function getKnowledge(page: number) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/knowledges?per_page=10&page=${page}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("โหลดข้อมูลไม่สำเร็จ");
    }

    return res.json();
}

export default async function knowledgePage({
    params,
    searchParams,
}: {
    params: { lang: Lang };
    searchParams: Promise<{ page?: string }>;
}) {
    const lang = (await params).lang;
    const t = languages[lang];
    const { page } = await searchParams;
    const currentPage = Number(page || 1);

    const data = await getKnowledge(currentPage);
    const knowledge: Announcement[] = data.data;

    return (
        <>
            <PublicHero title={t.knowledge} eyebrow="Health Knowledge" image="/images/knowledge.png" />

            {/* ✅ UI IMPROVED */}
            <section className="container-page max-w-4xl py-10 sm:py-14">
                {knowledge.length === 0 ? (
                    <EmptyState title="ไม่พบข้อมูล" description="ยังไม่มีบทความความรู้ในขณะนี้" />
                ) : (
                    <div className="space-y-4">
                        {knowledge.map((item) => (
                            <a
                                key={item.id}
                                href={`${process.env.NEXT_PUBLIC_API_URL}/knowledges/file/${item.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-block w-full text-sm text-[rgb(var(--color-primary))]"
                            >
                                <div className="surface-card p-4 transition duration-200 group-hover:-translate-y-0.5 group-hover:border-[rgb(var(--color-primary-border))] group-hover:shadow-[var(--shadow-md)]">
                                    <div className="flex items-start gap-4">
                                        <Image
                                            src="/images/book_rb.png"
                                            alt="file icon"
                                            width={35}
                                            height={35}
                                            priority
                                        />
                                        <div className="min-w-0">
                                            <h2 className="line-clamp-2 text-base font-semibold leading-relaxed text-[rgb(var(--color-secondary))] transition group-hover:text-[rgb(var(--color-primary-hover))]">{item.title}</h2>
                                            <p className="mt-2 text-xs text-slate-500">
                                                {new Date(item.created_at).toLocaleDateString("th-TH")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
                <Pagination currentPage={currentPage} last_page={data.last_page} lang={lang} path="/knowledges" />
            </section>
        </>
    );
}
