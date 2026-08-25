import '../globals.css';
import { languages, Lang } from '@/i18n';
import Image from 'next/image'
import { Icons } from '@/app/icons/icons';

type Announcement = {
    id: number;
    title: string;
    created_at: string;
};

type Knowledge = {
    id: number;
    title: string;
    created_at: string;
};

async function getLatestAnnouncements() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/announcements/latest?num=6`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("โหลดข่าวไม่สำเร็จ");
    }

    return res.json();
}

async function getLatestKnowledges() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/knowledges/latest?num=6`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("โหลดข่าวไม่สำเร็จ");
    }

    return res.json();
}


export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
    const t = languages[((await params).lang as Lang)];
    const announcements = await getLatestAnnouncements();
    const knowledge = await getLatestKnowledges();
    const knowledges: Knowledge[] = knowledge.data.knowledge;
    const news: Announcement[] = announcements.data.news;
    const procurement: Announcement[] = announcements.data.procurement;
    return (
        // ✅ UI IMPROVED
        <div>
            <header className="relative isolate overflow-hidden bg-[rgb(var(--color-secondary))]">
                <div className="absolute inset-0 -z-20 bg-[url('/images/kohchang.png')] bg-cover bg-center opacity-30" />
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(15,42,61,.98)_8%,rgba(15,76,92,.9)_58%,rgba(8,119,128,.7))]" />
                <div className="container-page py-16 sm:py-20 lg:py-24">
                <div className="max-w-3xl animate-soft-reveal">
                    <span className="inline-flex rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-teal-100 backdrop-blur">
                        Koh Chang Hospital
                    </span>
                    <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                        {t.hos_name}
                    </h1>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                        {t.sub_about}
                    </p>
                    <a
                        href={`/${(await params).lang}/about`}
                        className="btn-primary mt-7 !bg-white !text-[rgb(var(--color-secondary))] hover:!bg-teal-50"
                    >
                        {t.about}
                        <Icons.ArrowRight className="ml-2" />
                    </a>
                </div>
                </div>
            </header>

            <section className="container-page space-y-12 py-10 sm:py-14">
                <ContentSection
                    title={t.latest_news}
                    href={`/${(await params).lang}/announcements/news`}
                    seeAll={t.see_all}
                >
                    {news.map((item) => (
                        <a
                            key={item.id}
                            href={`${process.env.NEXT_PUBLIC_API_URL}/announcements/file/${item.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-block w-full text-sm text-[rgb(var(--color-primary))]"
                        >
                            <ArticleCard
                                icon="/images/file_b.png"
                                title={item.title}
                                createdAt={item.created_at}
                            />
                        </a>
                    ))}
                </ContentSection>

                <ContentSection
                    title={t.latest_knowledge}
                    href={`/${(await params).lang}/knowledges`}
                    seeAll={t.see_all}
                >
                    {knowledges.map((item) => (
                        <a
                            key={item.id}
                            href={`${process.env.NEXT_PUBLIC_API_URL}/knowledges/file/${item.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-block w-full text-sm text-[rgb(var(--color-primary))]"
                        >
                            <ArticleCard
                                icon="/images/book_rb.png"
                                title={item.title}
                                createdAt={item.created_at}
                            />
                        </a>
                    ))}
                </ContentSection>

                <ContentSection
                    title={t.latest_procurement}
                    href={`/${(await params).lang}/announcements/procurement`}
                    seeAll={t.see_all}
                >
                    {procurement.map((item) => (
                        <a
                            key={item.id}
                            href={`${process.env.NEXT_PUBLIC_API_URL}/announcements/file/${item.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-block w-full text-sm text-[rgb(var(--color-primary))]"
                        >
                            <ArticleCard
                                icon="/images/file_y.png"
                                title={item.title}
                                createdAt={item.created_at}
                            />
                        </a>
                    ))}
                </ContentSection>
            </section>
        </div>
    );
}

function ContentSection({
    title,
    href,
    seeAll,
    children,
}: {
    title: string;
    href: string;
    seeAll: string;
    children: React.ReactNode;
}) {
    return (
        // ✅ UI IMPROVED
        <section className="animate-soft-reveal">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <span className="mb-2 block h-1 w-10 rounded-full bg-[rgb(var(--color-primary))]" />
                    <h2 className="text-2xl font-bold text-[rgb(var(--color-secondary))]">{title}</h2>
                </div>
                <a
                    href={href}
                    className="btn-outline self-start sm:self-auto"
                >
                    {seeAll}
                    <Icons.ArrowRight className="ml-2 hidden group-hover:inline " />
                </a>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {children}
            </div>
        </section>
    );
}

function ArticleCard({
    icon,
    title,
    createdAt,
}: {
    icon: string;
    title: string;
    createdAt: string;
}) {
    return (
        // ✅ UI IMPROVED
        <div className="surface-card h-full p-5 transition duration-200 group-hover:-translate-y-0.5 group-hover:border-teal-200 group-hover:shadow-[var(--shadow-md)]">
            <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50">
                    <Image
                        src={icon}
                        alt="file icon"
                        width={34}
                        height={34}
                        priority
                    />
                </div>
                <div className="min-w-0">
                    <h3 className="line-clamp-2 text-base font-semibold leading-7 text-[rgb(var(--color-secondary))] transition-colors group-hover:text-[rgb(var(--color-primary-dark))]">
                        {title}
                    </h3>
                    <p className="mt-2 text-xs font-medium text-slate-500">
                        {new Date(createdAt).toLocaleDateString("th-TH")}
                    </p>
                </div>
            </div>
        </div>
    );
}
