import { languages, Lang } from "@/i18n";
import { Icons } from "@/app/icons/icons";
import CopyAccount from "@/app/components/CopyAccount";
import { PublicHero } from "@/app/components/PublicUI";
import { SafeImage } from "@/app/components/SafeImage";

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
            <PublicHero title={t.cash_donation} eyebrow="Koh Chang Hospital" image="/images/cash.png" />

            {/* CONTENT */}
            <section className="container-page max-w-5xl space-y-8 py-10 sm:py-14">

                {/* INTRO */}
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="break-words text-2xl font-bold leading-relaxed text-[rgb(var(--color-secondary))]">
                        สมทบทุนเพื่อสนับสนุนการดำเนินงานของโรงพยาบาล
                    </h2>

                    <p className="mt-3 leading-8 text-slate-600">
                        {settings.description}
                    </p>
                </div>

                {/* BANK ACCOUNT */}
                <div className="surface-card p-5 sm:p-7">
                    <h3 className="text-xl font-semibold text-[rgb(var(--color-secondary))]">
                        บัญชีสำหรับบริจาค
                    </h3>

                    <div className="mt-5 grid gap-3 text-slate-700 sm:grid-cols-2">
                        <p><strong>ธนาคาร:</strong> {settings.bank_name}</p>
                        <p><strong>ชื่อบัญชี:</strong> {settings.account_name}</p>
                        <p className="flex items-start gap-2 sm:col-span-2">
                            <strong>เลขบัญชี:</strong>

                            <span className="relative inline-block pr-5">
                                <CopyAccount account={settings.account_number} />
                            </span>
                        </p>
                    </div>
                </div>

                {/* QR CODE */}
                <div className="surface-card p-5 text-center sm:p-8">
                    <h3 className="text-xl font-semibold text-[rgb(var(--color-secondary))]">
                        สแกน QR Code เพื่อบริจาค
                    </h3>

                    <SafeImage
                        src={settings.qr_code_image_url || fallbackSettings.qr_code_image_url || ""}
                        fallback="/images/qr-donation.png"
                        className="mx-auto mt-5 aspect-square w-full max-w-72 rounded-xl border border-[rgb(var(--color-border))] bg-white object-contain p-3"
                        alt={`QR code ${t.cash_donation}`}
                    />
                    <a
                        href={settings.qr_code_image_url || fallbackSettings.qr_code_image_url || ""}
                        download
                        className="btn-primary mt-5"
                    >
                        ดาวน์โหลด QR
                    </a>
                </div>

                {/* HOW TO CONFIRM */}
                <div className="surface-card border-l-4 !border-l-[rgb(var(--color-primary))] p-5 sm:p-7">
                    <h3 className="text-xl font-semibold text-[rgb(var(--color-secondary))]">
                        แจ้งหลักฐานการโอนเงิน
                    </h3>

                    <p className="mb-3 mt-3 text-slate-600">
                        กรุณาส่งหลักฐานการโอนเงินมาที่
                    </p>

                    <ul className="space-y-3 text-slate-700">
                        <li><Icons.Gmail className="text-red-500 inline mr-2" /> Email: <a href={`mailto:${settings.email}`} className="hover:text-[rgb(var(--color-primary-light))]">{settings.email}</a></li>
                        <li><Icons.Fax className="text-xl text-gray-500 inline mr-1" /> Fax: {settings.fax}</li>
                        <li><Icons.Facebook className="text-blue-500 inline mr-2" /> Facebook: <a href={settings.facebook} target="_blank" className="hover:text-[rgb(var(--color-primary-light))]">{facebookLabel(settings.facebook)}</a></li>
                    </ul>
                </div>

                {/* DONATE IN PERSON */}
                <div className="surface-card p-5 sm:p-7">
                    <h3 className="text-xl font-semibold text-[rgb(var(--color-secondary))]">
                        บริจาคด้วยตนเองที่โรงพยาบาล
                    </h3>

                    <div className="mt-4 space-y-3 leading-7 text-slate-700">
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
                <div className="surface-card overflow-hidden">
                    <iframe
                        src={settings.google_map_embed_url}
                        className="h-72 w-full border-0"
                        loading="lazy"
                        title={`แผนที่ ${settings.organization_name}`}
                    ></iframe>
                </div>

            </section>
        </>
    );
}
