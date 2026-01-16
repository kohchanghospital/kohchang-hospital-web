import Link from 'next/link';
import { languages, Lang } from '@/i18n';


export default async function DonationPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const t = languages[(await params).lang];
    return (
        <div>
            <section className="mx-auto max-w-6xl px-6 py-12">
                <h2 className="mb-6 text-3xl font-bold">{t.donation}</h2>

                <div className="grid gap-6 md:grid-cols-2">
                    <Link
                        href={`/${(await params).lang}/donation/cash`}
                        className="rounded-lg border p-6 shadow hover:bg-[rgb(var(--color-primary-light)/0.1)]"
                    >
                        <h3 className="text-xl font-semibold">{t.cash_donation}</h3>
                        <p className="mt-2 text-gray-600">
                            {t.cash_donation_description}
                        </p>
                    </Link>
                    <Link
                        href={`/${(await params).lang}/donation/organ`}
                        className="rounded-lg border p-6 shadow hover:bg-[rgb(var(--color-primary-light)/0.1)]"
                    >
                        <h3 className="text-xl font-semibold">{t.organ_donation}</h3>
                        <p className="mt-2 text-gray-600">
                            {t.organ_donation_description}
                        </p>
                    </Link>
                </div>
            </section>
        </div>
    );
}