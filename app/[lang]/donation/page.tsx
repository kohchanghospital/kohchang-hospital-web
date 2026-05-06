import Link from 'next/link';
import { languages, Lang } from '@/i18n';
import { Icons } from '@/app/icons/icons'

export default async function DonationPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const t = languages[(await params).lang];
    return (
        <>
            <div
                className="relative text-center py-24 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/donation.png')",
                    backgroundPosition: "center 45%",
                }}
            >
                {/* overlay ทำให้ตัวหนังสืออ่านง่าย */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/10 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-gray-700">
                    <h1 className="text-7xl font-bold text-[rgb(var(--color-primary))]">
                        {t.donation}
                    </h1>
                </div>
                {/* เส้นล่าง hero */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-400"></div>
            </div>
            <div>
                <section className="mx-auto max-w-5xl px-6 py-12">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Link
                            href={`/${(await params).lang}/donation/cash`}
                            className="group relative rounded-lg border p-6 shadow hover:bg-[rgb(var(--color-primary-light)/0.1)] hover:text-[rgb(var(--color-primary))] transition"
                        >
                            <Icons.Leaf className="absolute top-4 right-4 text-2xl text-white transition-colors group-hover:text-green-500" />
                            <h3 className="text-xl font-semibold">{t.cash_donation}</h3>
                            <p className="mt-2 text-gray-600">
                                {t.cash_donation_description}
                            </p>
                        </Link>
                        <Link
                            href={`/${(await params).lang}/donation/organ`}
                            className="group relative rounded-lg border p-6 shadow hover:bg-[rgb(var(--color-primary-light)/0.1)] hover:text-[rgb(var(--color-primary))] transition"
                        >
                            <Icons.Leaf className="absolute top-4 right-4 text-2xl text-white transition-colors group-hover:text-green-500" />
                            <h3 className="text-xl font-semibold">{t.organ_donation}</h3>
                            <p className="mt-2 text-gray-600">
                                {t.organ_donation_description}
                            </p>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}