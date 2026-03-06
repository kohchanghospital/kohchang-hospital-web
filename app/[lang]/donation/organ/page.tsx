import { languages, Lang } from "@/i18n";

export default async function OrganDonationPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const t = languages[(await params).lang];
    return (
        <div>
            <section className="mx-auto max-w-4xl px-6 py-12">
                <h2 className="mb-6 text-3xl font-bold">{t.organ_donation}</h2>

            </section>
        </div>
    );
}