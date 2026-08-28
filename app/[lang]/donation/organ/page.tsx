import { languages, Lang } from "@/i18n";
import { EmptyState, PublicHero } from "@/app/components/PublicUI";

type OrganDonationData = {
    eyebrow_text: string | null;
    page_title: string | null;
    headline: string | null;
    subheadline: string | null;
    importance: { title: string | null; content: string | null };
    organs: Array<{ id: number; title: string; sort_order: number }>;
    qualifications: {
        title: string | null;
        items: Array<{ id: number; content: string; sort_order: number }>;
    };
    contact: {
        title: string | null;
        description: string | null;
        phone: string | null;
        external_url: string | null;
        external_url_label: string | null;
    };
};

async function getOrganDonation(): Promise<OrganDonationData | null> {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
        const response = await fetch(`${apiUrl.replace(/\/$/, "")}/organ-donation`, { cache: "no-store" });
        if (!response.ok) return null;
        const json = await response.json();
        return json.data || null;
    } catch {
        return null;
    }
}

export default async function OrganDonationPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const t = languages[(await params).lang];
    const data = await getOrganDonation();

    if (!data) {
        return (
            <>
                <PublicHero title={t.organ_donation} image="/images/organ.png" />
                <div className="container-page max-w-6xl py-10 sm:py-14">
                    <EmptyState title="ไม่สามารถโหลดข้อมูลได้" description="กรุณาลองใหม่อีกครั้งในภายหลัง" />
                </div>
            </>
        );
    }

    return (
        <>
            <PublicHero title={data.page_title || t.organ_donation} eyebrow={data.eyebrow_text || undefined} image="/images/organ.png" />
            <div className="container-page max-w-6xl py-10 sm:py-14">
                {(data.headline || data.subheadline) && (
                    <div className="text-center">
                        <div className="relative z-10 text-gray-700">
                            {data.headline && <p className="mt-4 text-xl font-bold">{data.headline}</p>}
                            {data.subheadline && <p className="mt-2 text-lg">{data.subheadline}</p>}
                        </div>
                        <div className="my-8 h-px w-full bg-gray-300" />
                    </div>
                )}

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div className="surface-card p-5 leading-8 sm:p-7">
                        {data.importance?.title && <h2 className="mb-4 text-2xl font-bold">{data.importance.title}</h2>}
                        {data.importance?.content && <p className="whitespace-pre-line">{data.importance.content}</p>}
                        {data.organs.length > 0 ? (
                            <>
                                <p className="mt-4 text-xl font-bold">อวัยวะที่สามารถบริจาคได้ ได้แก่</p>
                                <ul className="mt-4 list-disc pl-5">
                                    {data.organs.map((organ) => <li key={organ.id}>{organ.title}</li>)}
                                </ul>
                            </>
                        ) : (
                            <p className="mt-4 text-sm text-slate-500">ยังไม่มีรายการอวัยวะที่เปิดแสดง</p>
                        )}
                    </div>

                    <div className="surface-card bg-[rgb(var(--color-primary-light)/.4)] p-5 leading-8 sm:p-7">
                        {data.qualifications?.title && <h3 className="mb-4 text-2xl font-bold">{data.qualifications.title}</h3>}
                        {data.qualifications?.items?.length > 0 ? (
                            <ol className="list-decimal space-y-2 pl-5">
                                {data.qualifications.items.map((item) => <li key={item.id}>{item.content}</li>)}
                            </ol>
                        ) : (
                            <p className="text-sm text-slate-500">ยังไม่มีรายการคุณสมบัติที่เปิดแสดง</p>
                        )}
                    </div>
                </div>

                {(data.contact?.title || data.contact?.description || data.contact?.phone || data.contact?.external_url) && (
                    <>
                        <div className="my-8 h-px w-full bg-gray-300" />
                        <div className="text-center">
                            {data.contact.title && <h2 className="text-xl font-bold text-[rgb(var(--color-secondary))]">{data.contact.title}</h2>}
                            {data.contact.description && <p className="mx-auto mt-3 max-w-2xl whitespace-pre-line leading-8 text-slate-600">{data.contact.description}</p>}
                            {data.contact.phone && <p className="mt-3 text-slate-700">โทรศัพท์: <a className="font-semibold hover:text-[rgb(var(--color-primary))]" href={`tel:${data.contact.phone.replace(/[^\d+]/g, "")}`}>{data.contact.phone}</a></p>}
                            {data.contact.external_url && (
                                <a href={data.contact.external_url} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5">
                                    {data.contact.external_url_label || data.contact.external_url}
                                </a>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
