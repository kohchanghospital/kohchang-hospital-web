import BackBtn from '@/app/components/BackBtn'
import { languages, Lang } from '@/i18n'

export default async function CalendarDetailPage({ params, }: { params: { lang: Lang, id: string } | Promise<{ lang: Lang, id: string }> }) {
    const t = languages[(await params).lang]

    // 🔹 ตัวอย่าง mock data (ภายหลังเปลี่ยนเป็น API)
    const activity = {
        id: (await params).id,
        title: 'ตรวจเยี่ยมหน่วย',
        date: '15 มกราคม 2569',
        time: '08:30 - 16:30',
        remark: 'ไม่มี',
        detail: `1.สสจ.ตราด - ประชุมแนวทางตรวจสอบ
            2.รพ.ตราด - รับส่งอุปกรณ์
            3.รพ.แหลมงอบ - ส่งเลือด`,
    }

    return (
        <section className="mx-auto max-w-3xl px-6 py-12">

            <div className="mb-4 flex ">
                <div className="mr-4">
                    <BackBtn lang={(await params).lang} base="about/vehicle" />
                </div>
                <h1 className="text-3xl font-bold">
                    {t.activity_info}
                </h1>
            </div>

            <div className="rounded-xl border p-6 shadow-sm space-y-3">
                <p><b>วันที่:</b> {activity.date}</p>
                <p><b>เวลา:</b> {activity.time}</p>
                <p><b>ชื่อเรื่อง:</b> {activity.title}</p>
                <p><b>รายละเอียด:</b></p><pre className="whitespace-pre-line">
                    {activity.detail}
                </pre>
                <p><b>หมายเหตุ:</b> {activity.remark}</p>
            </div>
        </section>
    )
}
