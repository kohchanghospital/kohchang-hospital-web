import { languages, Lang } from "@/i18n";

export default async function ProcurementPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const t = languages[(await params).lang];
    return (
        <div>
            <section className="mx-auto max-w-6xl px-6 py-12">
                <h2 className="mb-6 text-3xl font-bold">{t.procurement}</h2>
                <div className="space-y-4">
                    <div className="rounded border p-4">ประกาศ TOR</div>
                    <div className="rounded border p-4">ผลการจัดซื้อจัดจ้าง</div>
                </div>
            </section>
        </div>
    );
}