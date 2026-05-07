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
            {/* ✅ UI IMPROVED */}
            <div
                className="relative overflow-hidden bg-cover bg-center px-4 py-20 text-center md:py-24"
                style={{
                    backgroundImage: "url('/images/procurement.png')",
                    backgroundPosition: "center 65%",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/80 to-[#C4B5FD]/30 backdrop-blur-sm"></div>
                <div className="relative z-10 text-[#1E293B]">
                    <h1 className="text-2xl font-bold text-[#1E293B] md:text-3xl">
                        {t.procurement}
                    </h1>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#C4B5FD]"></div>
            </div>

            {/* ✅ UI IMPROVED */}
            <section className="mx-auto max-w-7xl px-4 py-10 md:py-12">
                {procurement.length === 0 ? (
                    <div className="py-10 text-center text-[#64748B]">
                        ไม่พบข้อมูล
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {procurement.map((item) => (
                            <a
                                key={item.id}
                                href={`${process.env.NEXT_PUBLIC_API_URL}/announcements/file/${item.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-block w-full text-sm text-[#7C3AED]"
                            >
                                <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-md transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[rgba(124,58,237,0.05)] hover:shadow-lg md:p-5">
                                    <div className="flex items-start gap-4">
                                        <Image
                                            src="/images/file_yy.png"
                                            alt="file icon"
                                            width={35}
                                            height={35}
                                            priority
                                        />
                                        <div className="min-w-0">
                                            <h4 className="line-clamp-2 text-base font-semibold leading-relaxed text-[#1E293B] transition group-hover:text-[#7C3AED]">{item.title}</h4>
                                            <p className="mt-2 text-xs text-[#64748B]">
                                                {new Date(item.created_at).toLocaleDateString("th-TH")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
                <Pagination currentPage={currentPage} last_page={data.last_page} lang={lang} path="/announcements/procurement" />
            </section>
        </>
    );
}
