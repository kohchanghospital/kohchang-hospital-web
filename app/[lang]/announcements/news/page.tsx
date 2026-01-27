import { languages, Lang } from "@/i18n";
import Image from 'next/image'
import Pagination from "@/app/components/Pagination";

type Announcement = {
    id: number;
    title: string;
    created_at: string;
};

async function getNews(page: number) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/announcements?type_id=1&per_page=10&page=${page}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("โหลดข่าวไม่สำเร็จ");
    }

    return res.json();
}

export default async function NewsPage({
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

    const data = await getNews(currentPage);
    const news: Announcement[] = data.data;
    // const pages = getSmartPagination(currentPage, data.last_page);

    return (
        <section className="mx-auto max-w-4xl px-6 py-12">
            <h2 className="mb-6 text-3xl font-bold">{t.news}</h2>

            <div className="space-y-4">
                {news.map((item) => (
                    <a
                        key={item.id}
                        href={`${process.env.NEXT_PUBLIC_API_URL}/announcements/file/${item.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 text-sm inline-block w-full"
                    >
                        <div key={item.id} className="rounded-2xl border pl-3 p-2 shadow hover:bg-[rgb(var(--color-primary-light)/0.1)] hover:text-[rgb(var(--color-primary))]">
                            <div className="flex items-center ">
                                <Image
                                    src="/images/file_b.png"
                                    alt="file icon"
                                    width={35}
                                    height={35}
                                    priority
                                />
                                <div className="pl-3">
                                    <h4 className="font-semibold text-base">{item.title}</h4>
                                    <p className="text-xs text-gray-600">
                                        {new Date(item.created_at).toLocaleDateString("th-TH")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            {/* 🔽 Pagination */}
            <Pagination currentPage={currentPage} last_page={data.last_page} lang={lang} path="/announcements/news"/>
        </section>
    );
}
