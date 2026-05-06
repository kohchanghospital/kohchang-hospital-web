import { languages, Lang } from "@/i18n";
import { Icons } from '@/app/icons/icons'
import CopyAccount from "@/app/components/CopyAccount";

export default async function CashDonationPage({ params, }: { params: { lang: Lang } | Promise<{ lang: Lang }>; }) {
    const t = languages[(await params).lang];

    return (
        <>
            {/* HERO */}
            <div
                className="relative text-center py-24 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/cash.png')",
                    backgroundPosition: "center 40%",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/10 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-black/20"></div>

                <div className="relative z-10 text-gray-700">
                    <h1 className="text-7xl font-bold text-[rgb(var(--color-primary))]">
                        {t.cash_donation}
                    </h1>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-400"></div>
            </div>

            {/* CONTENT */}
            <section className="mx-auto max-w-4xl px-6 py-12 space-y-12">

                {/* INTRO */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">
                        สมทบทุนเพื่อสนับสนุนการดำเนินงานของโรงพยาบาล
                    </h2>

                    <p className="text-gray-600">
                        เงินบริจาคของท่านจะนำไปใช้ในการพัฒนาเครื่องมือทางการแพทย์
                        สนับสนุนการรักษาผู้ป่วย และพัฒนาการบริการของโรงพยาบาลเกาะช้าง
                    </p>
                </div>

                {/* BANK ACCOUNT */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4 text-[rgb(var(--color-primary))]">
                        บัญชีสำหรับบริจาค
                    </h3>

                    <div className="space-y-2 text-gray-700">
                        <p><strong>ธนาคาร:</strong> ธนาคารกรุงไทย</p>
                        <p><strong>ชื่อบัญชี:</strong> โรงพยาบาลเกาะช้าง</p>
                        <p className="flex items-start gap-2">
                            <strong>เลขบัญชี:</strong>

                            <span className="relative inline-block pr-5">
                                <CopyAccount account="XXX-X-XXXXX-X" />
                            </span>
                        </p>
                    </div>
                </div>

                {/* QR CODE */}
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4">
                        สแกน QR Code เพื่อบริจาค
                    </h3>

                    <img
                        src="/images/qr-donation.png"
                        className="mx-auto w-80 rounded-lg shadow"
                        alt="QR Donation"
                    />
                    <a
                        href="/images/qr-donation.png"
                        download
                        className="inline-block mt-4 px-4 py-2 bg-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary-light)/0.2)] hover:text-[rgb(var(--color-primary))] text-white rounded"
                    >
                        ดาวน์โหลด QR
                    </a>
                </div>

                {/* HOW TO CONFIRM */}
                <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">
                        แจ้งหลักฐานการโอนเงิน
                    </h3>

                    <p className="text-gray-600 mb-3">
                        กรุณาส่งหลักฐานการโอนเงินมาที่
                    </p>

                    <ul className="space-y-2 text-gray-700">
                        <li><Icons.Gmail className="text-red-500 inline mr-2" /> Email: <a href="mailto:kohchanghealth123@gmail.com" className="hover:text-[rgb(var(--color-primary-light))]">kohchanghealth123@gmail.com</a></li>
                        <li><Icons.Fax className="text-xl text-gray-500 inline mr-1" /> Fax: 039-586-131, 039-586-160</li>
                        <li><Icons.Facebook className="text-blue-500 inline mr-2" /> Facebook: <a href="https://www.facebook.com/kochang.hospital/" target="_blank" className="hover:text-[rgb(var(--color-primary-light))]">kochang.hospital</a></li>
                    </ul>
                </div>

                {/* DONATE IN PERSON */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4 text-[rgb(var(--color-primary))]">
                        บริจาคด้วยตนเองที่โรงพยาบาล
                    </h3>

                    <div className="space-y-3 text-gray-700">
                        <p>
                            ท่านสามารถเดินทางมาบริจาคเงินสมทบทุนได้ด้วยตนเองที่
                            <span className="font-semibold"> โรงพยาบาลเกาะช้าง</span>
                        </p>

                        <p>
                            <Icons.MapPin className="text-red-500 inline mr-1" /> <span className="font-semibold">ที่อยู่: </span>
                            21/1 หมู่ที่ 2 ตำบลเกาะช้าง อำเภอเกาะช้าง จังหวัดตราด 23170
                        </p>

                        <p>
                            <Icons.PhoneAlt className="text-orange-500 inline mr-1" /> <span className="font-semibold">โทรศัพท์:</span> <a href="tel:+6639586131" className="hover:text-[rgb(var(--color-primary-light))]">039-586-131</a>
                        </p>
                    </div>
                </div>

                {/* GOOGLE MAP */}
                <div className="rounded-xl overflow-hidden shadow-md">
                    <iframe
                        src="https://maps.google.com/maps?q=โรงพยาบาลเกาะช้าง&z=15&output=embed"
                        className="w-full h-72 border-0"
                        loading="lazy"
                    ></iframe>
                </div>

            </section>
        </>
    );
}