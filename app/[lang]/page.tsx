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
    console.log("API announcements:", announcements);
    console.log("API knowledges:", knowledge);
    return (
        // ✅ UI IMPROVED
        <div className="bg-[#F8FAFC]">
            <header className="relative overflow-hidden px-4 py-20 text-center sm:py-24 lg:py-28">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,181,253,0.45),transparent_34%),linear-gradient(135deg,#F8FAFC_0%,#FFFFFF_48%,rgba(167,139,250,0.22)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C4B5FD] to-transparent" />
                <div className="relative mx-auto max-w-4xl animate-soft-reveal">
                    <span className="inline-flex rounded-full border border-[#C4B5FD]/70 bg-white/80 px-4 py-2 text-sm font-medium text-[#7C3AED] shadow-sm">
                        Koh Chang Hospital
                    </span>
                    <h2 className="mt-6 text-3xl font-bold leading-tight tracking-normal text-[#1E293B] sm:text-4xl lg:text-5xl">
                        {t.hos_name}
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#64748B] sm:text-lg">
                        {t.sub_about}
                    </p>
                    <a
                        href={`/${(await params).lang}/about`}
                        className="mt-8 inline-flex items-center justify-center rounded-full bg-[#7C3AED] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition-all duration-300 hover:scale-105 hover:bg-[#6D28D9] active:scale-95"
                    >
                        {t.about}
                        <Icons.ArrowRight className="ml-2" />
                    </a>
                </div>
            </header>

            <section className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
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
                            className="group inline-block w-full text-sm text-[#7C3AED]"
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
                            className="group inline-block w-full text-sm text-[#7C3AED]"
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
                            className="group inline-block w-full text-sm text-[#7C3AED]"
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
                    <span className="mb-2 block h-1 w-10 rounded-full bg-[#7C3AED]" />
                    <h3 className="text-2xl font-bold text-[#1E293B]">{title}</h3>
                </div>
                <a
                    href={href}
                    className="group inline-flex items-center self-start rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#64748B] shadow-sm transition-all duration-300 hover:scale-105 hover:border-[#C4B5FD] hover:bg-[#7C3AED]/10 hover:text-[#7C3AED] active:scale-95 sm:self-auto"
                >
                    {seeAll}
                    <Icons.ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
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
        <div className="h-full rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-md shadow-slate-900/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02] group-hover:border-[#C4B5FD] group-hover:bg-[#7C3AED]/[0.04] group-hover:shadow-lg group-hover:shadow-purple-700/10">
            <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED]/10">
                    <Image
                        src={icon}
                        alt="file icon"
                        width={34}
                        height={34}
                        priority
                    />
                </div>
                <div className="min-w-0">
                    <h4 className="line-clamp-2 text-base font-semibold leading-7 text-[#1E293B] transition-colors duration-300 group-hover:text-[#7C3AED]">
                        {title}
                    </h4>
                    <p className="mt-2 text-xs font-medium text-[#64748B]">
                        {new Date(createdAt).toLocaleDateString("th-TH")}
                    </p>
                </div>
            </div>
        </div>
    );
}
