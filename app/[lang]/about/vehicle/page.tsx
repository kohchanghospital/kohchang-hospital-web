import { languages, Lang } from '@/i18n'
import CalendarClient from '@/app/components/CalendarClient'

export default async function VehiclePage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const t = languages[(await params).lang]

    const events = [
        {
            id: '1',
            title: 'ตรวจเยี่ยมหน่วย',
            detail: '123456789',
            start: '2026-01-15',
            time: '08:30 - 16:30',
        },
        {
            id: '2',
            title: '1.สสจ.ตราด - ประชุมแนวทางตรวจสอบเวชระเบียน + รับ - ส่งเอกสาร\n2.รพ.ตราด - รับ ส่ง อุปกรณ์ส่งนึ่ง อบแก๊ส - แผนกจ่ายกลาง รพ.ตราด + แผนกซักฟอกรับเสื้อผ้าคนไข้ + ส่งเลือด\n3.รพ.แหลมงอบ - ส่งเลือด',
            start: '2026-01-15',
        },
        {
            id: '3',
            title: '8:30-16:30 ตรวจเยี่ยมหน่วย',
            start: '2026-01-15',
        },
        {
            id: '4',
            title: '13:00-16:30 ประชุม',
            start: '2026-01-15',
        },
        {
            id: '5 ',
            title: '8:30-16:30 ตรวจเยี่ยมหน่วย',
            start: '2026-01-15',
        },
    ]

    return (
        <>
            <div
                className="relative text-center py-24 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/ambulant.png')",
                    backgroundPosition: "center 65%",
                }}
            >
                {/* overlay ทำให้ตัวหนังสืออ่านง่าย */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/10 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-gray-700">
                    <h1 className="text-7xl font-bold text-[rgb(var(--color-primary))]">
                        {t.vehicle_calendar}
                    </h1>
                </div>
                {/* เส้นล่าง hero */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-400"></div>
            </div>
            <section className="mx-auto max-w-4xl px-6 py-12">
                <div className="rounded-xl p-6 shadow-xl">
                    <CalendarClient events={events} lang={(await params).lang} base="about/vehicle" />
                </div>
            </section>
        </>
    )
}
