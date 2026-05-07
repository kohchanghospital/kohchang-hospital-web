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
                            className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-md transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[rgba(124,58,237,0.05)] hover:shadow-lg md:p-5"
                        >
                            <Icons.Leaf className="absolute top-4 right-4 text-2xl text-white transition-colors group-hover:text-green-500" />
                            <h3 className="text-xl font-semibold text-[#1E293B] transition group-hover:text-[#7C3AED]">{t.cash_donation}</h3>
                            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#64748B] md:text-base">
                                {t.cash_donation_description}
                            </p>
                        </Link>
                        <Link
                            href={`/${(await params).lang}/donation/organ`}
                            className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-md transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[rgba(124,58,237,0.05)] hover:shadow-lg md:p-5"
                        >
                            <Icons.Leaf className="absolute top-4 right-4 text-2xl text-white transition-colors group-hover:text-green-500" />
                            <h3 className="text-xl font-semibold text-[#1E293B] transition group-hover:text-[#7C3AED]">{t.organ_donation}</h3>
                            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#64748B] md:text-base">
                                {t.organ_donation_description}
                            </p>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}