import { languages, Lang } from "@/i18n";
import CalendarClient from '@/app/components/CalendarClient'

export default async function CalendarPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const t = languages[(await params).lang];
    const events = [
        {
            id: '1',
            title: '1.สสจ.ตราด - ประชุมแนวทางตรวจสอบเวชระเบียน + รับ - ส่งเอกสาร\n2.รพ.ตราด - รับ ส่ง อุปกรณ์ส่งนึ่ง อบแก๊ส - แผนกจ่ายกลาง รพ.ตราด + แผนกซักฟอกรับเสื้อผ้าคนไข้ + ส่งเลือด\n3.รพ.แหลมงอบ - ส่งเลือด',
            start: '2026-01-15',
        },
        {
            id: '2',
            title: '1.สสจ.ตราด - ประชุมแนวทางตรวจสอบเวชระเบียน + รับ - ส่งเอกสาร\n2.รพ.ตราด - รับ ส่ง อุปกรณ์ส่งนึ่ง อบแก๊ส - แผนกจ่ายกลาง รพ.ตราด + แผนกซักฟอกรับเสื้อผ้าคนไข้ + ส่งเลือด\n3.รพ.แหลมงอบ - ส่งเลือด',
            start: '2026-01-15',
        },
    ];
    return (
        <div>
            <section className="mx-auto max-w-4xl px-6 py-12">
                <h1 className="mb-6 text-3xl font-bold">{t.activity_calendar}</h1>
                <div className="rounded-xl p-6 shadow-xl">
                    <CalendarClient events={events} lang={(await params).lang} base="about/calendar" />
                </div>
            </section>
        </div>
    );
}