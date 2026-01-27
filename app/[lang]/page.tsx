import '../globals.css';
import { languages, Lang } from '@/i18n';
import Image from 'next/image'
import { Icons } from '@/app/icons/icons';

type Announcement = {
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


export default async function HomePage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const t = languages[(await params).lang];
    const announcements = await getLatestAnnouncements();
    const news : Announcement[] = announcements.data.news;
    const procurement : Announcement[] = announcements.data.procurement;
    console.log("API announcements:", announcements);
    return (
        <div>
            <header className="bg-blue-50 py-60 text-center">
                <h2 className="text-3xl font-bold text-blue-800">{t.hos_name}</h2>
                <p className="mt-4 text-gray-600">{t.sub_about}</p>
            </header>
            <section className="mx-auto max-w-6xl px-6 py-12">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-semibold">{t.latest_news}</h3>
                    <a
                        href={`/${(await params).lang}/announcements/news`}
                        className="text-primary-600 hover:underline self-end text-sm group"
                    >
                        {t.see_all}<Icons.ArrowRight className="ml-1 hidden group-hover:inline" />
                    </a>
                </div>
                <div className="grid gap-6 md:grid-cols-3 mb-12">
                    {news.map((item) => (
                        <a
                            key={item.id}
                            href={`${process.env.NEXT_PUBLIC_API_URL}/announcements/file/${item.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 text-sm inline-block w-full"
                        >
                            <div key={item.id} className="rounded-lg border p-4 shadow-sm hover:bg-[rgb(var(--color-primary-light)/0.1)] hover:text-[rgb(var(--color-primary))]">
                                <div className="flex items-center ">
                                    <Image
                                        src="/images/file_b.png"
                                        alt="file icon"
                                        width={40}
                                        height={40}
                                        priority
                                    />
                                    <div className="pl-3">
                                        <h4 className="font-semibold text-base pb-1">{item.title}</h4>
                                        <p className="text-xs text-gray-600">
                                            {new Date(item.created_at).toLocaleDateString("th-TH")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-semibold">{t.latest_procurement}</h3>
                    <a
                        href={`/${(await params).lang}/announcements/procurement`}
                        className="text-primary-600 hover:underline self-end text-sm group"
                    >
                        {t.see_all}<Icons.ArrowRight className="ml-1 hidden group-hover:inline" />
                    </a>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {procurement.map((item) => (
                        <a
                            key={item.id}
                            href={`${process.env.NEXT_PUBLIC_API_URL}/announcements/file/${item.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 text-sm inline-block w-full"
                        >
                            <div key={item.id} className="rounded-lg border p-4 shadow-sm hover:bg-[rgb(var(--color-primary-light)/0.1)] hover:text-[rgb(var(--color-primary))]">
                                <div className="flex items-center ">
                                    <Image
                                        src="/images/file_y.png"
                                        alt="file icon"
                                        width={40}
                                        height={40}
                                        priority
                                    />
                                    <div className="pl-3">
                                        <h4 className="font-semibold text-base pb-1">{item.title}</h4>
                                        <p className="text-xs text-gray-600">
                                            {new Date(item.created_at).toLocaleDateString("th-TH")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}                                                                                                                                                                                                           