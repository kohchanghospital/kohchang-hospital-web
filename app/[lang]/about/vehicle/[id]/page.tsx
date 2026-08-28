import Link from 'next/link'
import { Lang } from '@/i18n'
import { formatCalendarDate, formatCalendarTime } from '@/app/lib/calendar-format'

type Detail = { id: number; detail_text: string; sort_order: number }
type Schedule = {
    id: number
    schedule_date: string
    start_time: string | null
    end_time: string | null
    title: string
    note: string | null
    driver: { id: number; name: string }
    vehicle: { id: number; registration_number: string }
    details: Detail[]
}

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api'

export default async function VehicleDetailPage({ params }: { params: { lang: Lang; id: string } | Promise<{ lang: Lang; id: string }> }) {
    const { lang, id } = await params
    let schedule: Schedule | null = null
    try {
        const response = await fetch(`${apiBase}/vehicle-schedules/${encodeURIComponent(id)}`, { cache: 'no-store' })
        if (response.ok) schedule = (await response.json() as { data: Schedule }).data
    } catch { schedule = null }

    const backLabel = lang === 'th' ? 'กลับไปปฏิทินการใช้รถยนต์' : 'Back to vehicle calendar'
    if (!schedule) return (
        <section className="container-page py-12 sm:py-16"><div className="surface-card mx-auto max-w-2xl p-8 text-center sm:p-12"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(var(--color-primary-light))] text-3xl text-[rgb(var(--color-primary))]"><i className="bi bi-car-front" /></div><h1 className="mt-5 text-2xl font-bold text-[rgb(var(--color-secondary))]">{lang === 'th' ? 'ไม่พบข้อมูลการใช้รถยนต์' : 'Vehicle schedule not found'}</h1><p className="mt-3 text-[rgb(var(--color-muted))]">{lang === 'th' ? 'รายการนี้อาจถูกลบหรือไม่มีอยู่ในระบบ' : 'This schedule may have been removed or does not exist.'}</p><Link href={`/${lang}/about/vehicle`} className="btn-primary mt-7">{backLabel}</Link></div></section>
    )

    const details = [...schedule.details].sort((a, b) => a.sort_order - b.sort_order)
    const metadata = [
        [lang === 'th' ? 'วันที่' : 'Date', formatCalendarDate(schedule.schedule_date, lang), 'bi-calendar3'],
        [lang === 'th' ? 'เวลา' : 'Time', formatCalendarTime(schedule.start_time, schedule.end_time, lang), 'bi-clock'],
        [lang === 'th' ? 'พนักงานขับรถ' : 'Driver', schedule.driver.name, 'bi-person-badge'],
        [lang === 'th' ? 'ทะเบียนรถ' : 'Registration', schedule.vehicle.registration_number, 'bi-car-front'],
    ]

    return (
        <section className="container-page max-w-5xl py-10 sm:py-14">
            <Link href={`/${lang}/about/vehicle`} className="mb-6 inline-flex items-center gap-2 font-semibold text-primary-dark hover:text-primary"><i className="bi bi-arrow-left" aria-hidden="true" /> {backLabel}</Link>
            <div className="mb-6"><p className="text-sm font-bold uppercase tracking-[.16em] text-primary">Vehicle Schedule</p><h1 className="mt-1 text-2xl font-bold text-[rgb(var(--color-secondary))] sm:text-3xl">{lang === 'th' ? 'รายละเอียดการใช้รถยนต์' : 'Vehicle schedule details'}</h1></div>
            <article className="surface-card overflow-hidden shadow-[var(--shadow-md)]">
                <div className="border-b border-[rgb(var(--color-border))] bg-gradient-to-br from-[rgb(var(--color-primary-light))] to-white p-6 sm:p-8">
                    <h2 className="text-2xl font-bold leading-snug text-[rgb(var(--color-secondary))] sm:text-3xl">{schedule.title}</h2>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">{metadata.map(([label, value, icon]) => <div key={label} className="flex items-center gap-4 rounded-2xl border border-[rgb(var(--color-primary-border))] bg-white/90 p-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--color-primary-light))] text-xl text-[rgb(var(--color-primary))]"><i className={`bi ${icon}`} /></span><div><p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--color-muted))]">{label}</p><p className="font-semibold text-[rgb(var(--color-secondary))]">{value}</p></div></div>)}</div>
                </div>
                <div className="space-y-8 p-6 sm:p-8">
                    <section><h3 className="text-lg font-bold text-[rgb(var(--color-secondary))]">{lang === 'th' ? 'รายละเอียด' : 'Details'}</h3>{details.length ? <ol className="mt-4 space-y-3">{details.map((detail, index) => <li key={detail.id} className="flex gap-4 rounded-xl bg-[rgb(var(--color-background))] p-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--color-primary))] text-sm font-bold text-white">{index + 1}</span><p className="pt-0.5 leading-relaxed">{detail.detail_text}</p></li>)}</ol> : <p className="mt-3 text-[rgb(var(--color-muted))]">{lang === 'th' ? 'ไม่มีรายละเอียดเพิ่มเติม' : 'No additional details'}</p>}</section>
                    <section className="border-t border-[rgb(var(--color-border))] pt-7"><h3 className="text-lg font-bold text-[rgb(var(--color-secondary))]">{lang === 'th' ? 'หมายเหตุ' : 'Note'}</h3><p className="mt-3 whitespace-pre-wrap leading-relaxed">{schedule.note || (lang === 'th' ? 'ไม่มีหมายเหตุ' : 'No note')}</p></section>
                </div>
            </article>
        </section>
    )
}
