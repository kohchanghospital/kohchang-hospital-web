import { languages, Lang } from "@/i18n";
import { Icons } from "@/app/icons/icons";
import CopyAccount from "@/app/components/CopyAccount";

type DonationSettings = {
    bank_name: string;
    account_name: string;
    account_number: string;
    qr_code_image_url: string | null;
    email: string;
    phone: string;
    fax: string;
    facebook: string;
    organization_name: string;
    description: string;
    address: string;
    google_map_embed_url: string;
    latitude: string | number;
    longitude: string | number;
};

const fallbackSettings: DonationSettings = {
    bank_name: "ธนาคารกรุงไทย",
    account_name: "โรงพยาบาลเกาะช้าง",
    account_number: "XXX-X-XXXXX-X",
    qr_code_image_url: "/images/qr-donation.png",
    email: "kohchanghealth123@gmail.com",
    phone: "039-586-131",
    fax: "039-586-131, 039-586-160",
    facebook: "https://www.facebook.com/kochang.hospital/",
    organization_name: "โรงพยาบาลเกาะช้าง",
    description: "เงินบริจาคของท่านจะนำไปใช้ในการพัฒนาเครื่องมือทางการแพทย์ สนับสนุนการรักษาผู้ป่วย และพัฒนาการบริการของโรงพยาบาลเกาะช้าง",
    address: "21/1 หมู่ที่ 2 ตำบลเกาะช้าง อำเภอเกาะช้าง จังหวัดตราด 23170",
    google_map_embed_url: "https://maps.app.goo.gl/JuEfXGN8bZoXPP2r8",
    latitude: 12.103,
    longitude: 102.354,
};

async function getDonationSettings(): Promise<DonationSettings> {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
        const res = await fetch(`${apiUrl}/donation/settings`, {
            cache: "no-store",
        });

        if (!res.ok) {
            return fallbackSettings;
        }

        const json = await res.json();
        return {
            ...fallbackSettings,
            ...json.data,
            qr_code_image_url: json.data?.qr_code_image_url || fallbackSettings.qr_code_image_url,
        };
    } catch {
        return fallbackSettings;
    }
}

function facebookLabel(url: string) {
    try {
        const parsed = new URL(url);
        return parsed.pathname.replace(/^\/|\/$/g, "") || parsed.hostname;
    } catch {
        return url;
    }
}

export default async function CashDonationPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const t = languages[(await params).lang];
    const settings = await getDonationSettings();

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
                        {settings.description}
                    </p>
                </div>

                {/* BANK ACCOUNT */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4 text-[rgb(var(--color-primary))]">
                        บัญชีสำหรับบริจาค
                    </h3>

                    <div className="space-y-2 text-gray-700">
                        <p><strong>ธนาคาร:</strong> {settings.bank_name}</p>
                        <p><strong>ชื่อบัญชี:</strong> {settings.account_name}</p>
                        <p className="flex items-start gap-2">
                            <strong>เลขบัญชี:</strong>

                            <span className="relative inline-block pr-5">
                                <CopyAccount account={settings.account_number} />
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
                        src={settings.qr_code_image_url || fallbackSettings.qr_code_image_url || ""}
                        className="mx-auto w-80 rounded-lg shadow"
                        alt="QR Donation"
                    />
                    <a
                        href={settings.qr_code_image_url || fallbackSettings.qr_code_image_url || ""}
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
                        <li><Icons.Gmail className="text-red-500 inline mr-2" /> Email: <a href={`mailto:${settings.email}`} className="hover:text-[rgb(var(--color-primary-light))]">{settings.email}</a></li>
                        <li><Icons.Fax className="text-xl text-gray-500 inline mr-1" /> Fax: {settings.fax}</li>
                        <li><Icons.Facebook className="text-blue-500 inline mr-2" /> Facebook: <a href={settings.facebook} target="_blank" className="hover:text-[rgb(var(--color-primary-light))]">{facebookLabel(settings.facebook)}</a></li>
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
                            <span className="font-semibold"> {settings.organization_name}</span>
                        </p>

                        <p>
                            <Icons.MapPin className="text-red-500 inline mr-1" /> <span className="font-semibold">ที่อยู่: </span>
                            {settings.address}
                        </p>

                        <p>
                            <Icons.PhoneAlt className="text-orange-500 inline mr-1" /> <span className="font-semibold">โทรศัพท์:</span> <a href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`} className="hover:text-[rgb(var(--color-primary-light))]">{settings.phone}</a>
                        </p>
                    </div>
                </div>

                {/* GOOGLE MAP */}
                <div className="rounded-xl overflow-hidden shadow-md">
                    <iframe
                        src={settings.google_map_embed_url}
                        className="w-full h-72 border-0"
                        loading="lazy"
                        title={`แผนที่ ${settings.organization_name}`}
                    ></iframe>
                </div>

            </section>
        </>
    );
}
