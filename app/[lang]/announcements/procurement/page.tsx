import { languages, Lang } from "@/i18n";
import Image from 'next/image'
import Pagination from "@/app/components/Pagination";

type Announcement = {
    id: number;
    title: string;
    created_at: string;
};

async function getProcurement(page: number) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/announcements?type_id=2&per_page=10&page=${page}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("โหลดข่าวไม่สำเร็จ");
    }

    return res.json();
}

export default async function ProcurementPage({
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

    const data = await getProcurement(currentPage);
    const procurement: Announcement[] = data.data;

    return (
        <>
            <div
                className="relative text-center py-24 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/announcement.png')",
                    backgroundPosition: "center 25%",
                }}
            >
                {/* overlay ทำให้ตัวหนังสืออ่านง่าย */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/10 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-gray-700">
                    <h1 className="text-7xl font-bold text-[rgb(var(--color-primary))]">
                        {t.procurement}
                    </h1>
                </div>
                {/* เส้นล่าง hero */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-400"></div>
            </div>
            <section className="mx-auto max-w-4xl px-6 py-12">
                {procurement.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        ไม่พบข้อมูล
                    </div>
                ) : (
                    <div className="space-y-4">
                        {procurement.map((item) => (
                            <a
                                key={item.id}
                                href={`${process.env.NEXT_PUBLIC_API_URL}/announcements/file/${item.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-600 text-sm inline-block w-full"
                            >
                                <div key={item.id} className="rounded-2xl border pl-3 p-2 shadow hover:bg-[rgb(var(--color-primary-light)/0.2)] hover:text-[rgb(var(--color-primary))]">
                                    <div className="flex items-center ">
                                        <Image
                                            src="/images/file_yy.png"
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
                )}
                {/* 🔽 Pagination */}
                <Pagination currentPage={currentPage} last_page={data.last_page} lang={lang} path="/announcements/procurement" />
            </section>
        </>
    );
}
