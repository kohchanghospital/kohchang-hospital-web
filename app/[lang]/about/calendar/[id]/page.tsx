import Link from 'next/link'
import { Lang } from '@/i18n'
import { formatCalendarDate, formatCalendarTime } from '@/app/lib/calendar-format'

type ActivityDetail = { id: number; detail_text: string; sort_order: number }
type Activity = {
    id: number
    activity_date: string
    start_time: string | null
    end_time: string | null
    title: string
    note: string | null
    details: ActivityDetail[]
}

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api'

export default async function CalendarDetailPage({ params }: { params: { lang: Lang; id: string } | Promise<{ lang: Lang; id: string }> }) {
    const { lang, id } = await params
    let activity: Activity | null = null

    try {
        const response = await fetch(`${apiBase}/activities/${encodeURIComponent(id)}`, { cache: 'no-store' })
        if (response.ok) activity = (await response.json() as { data: Activity }).data
    } catch {
        activity = null
    }

    const backLabel = lang === 'th' ? 'กลับไปปฏิทินกิจกรรม' : 'Back to activity calendar'

    if (!activity) {
        return (
            <section className="container-page py-12 sm:py-16">
                <div className="surface-card mx-auto max-w-2xl p-8 text-center sm:p-12">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(var(--color-primary-light))] text-3xl text-[rgb(var(--color-primary))]"><i className="bi bi-calendar-x" /></div>
                    <h1 className="mt-5 text-2xl font-bold text-[rgb(var(--color-secondary))]">{lang === 'th' ? 'ไม่พบข้อมูลกิจกรรม' : 'Activity not found'}</h1>
                    <p className="mt-3 text-[rgb(var(--color-muted))]">{lang === 'th' ? 'กิจกรรมนี้อาจถูกลบหรือไม่มีอยู่ในระบบ' : 'This activity may have been removed or does not exist.'}</p>
                    <Link href={`/${lang}/about/calendar`} className="btn-primary mt-7">{backLabel}</Link>
                </div>
            </section>
        )
    }

    const details = [...activity.details].sort((a, b) => a.sort_order - b.sort_order)

    return (
        <section className="container-page max-w-5xl py-10 sm:py-14">
            <Link href={`/${lang}/about/calendar`} className="mb-6 inline-flex items-center gap-2 font-semibold text-primary-dark hover:text-primary">
                <i className="bi bi-arrow-left" aria-hidden="true" /> {backLabel}
            </Link>
            <div className="mb-6"><p className="text-sm font-bold uppercase tracking-[.16em] text-primary">Activity</p><h1 className="mt-1 text-2xl font-bold text-[rgb(var(--color-secondary))] sm:text-3xl">{lang === 'th' ? 'รายละเอียดกิจกรรม' : 'Activity details'}</h1></div>
            <article className="surface-card overflow-hidden shadow-[var(--shadow-md)]">
                <div className="border-b border-[rgb(var(--color-border))] bg-gradient-to-br from-[rgb(var(--color-primary-light))] to-white p-6 sm:p-8">
                    <h2 className="text-2xl font-bold leading-snug text-[rgb(var(--color-secondary))] sm:text-3xl">{activity.title}</h2>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="flex items-center gap-4 rounded-2xl border border-[rgb(var(--color-primary-border))] bg-white/90 p-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--color-primary-light))] text-xl text-[rgb(var(--color-primary))]"><i className="bi bi-calendar3" /></span><div><p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--color-muted))]">{lang === 'th' ? 'วันที่' : 'Date'}</p><p className="font-semibold text-[rgb(var(--color-secondary))]">{formatCalendarDate(activity.activity_date, lang)}</p></div></div>
                        <div className="flex items-center gap-4 rounded-2xl border border-[rgb(var(--color-primary-border))] bg-white/90 p-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--color-primary-light))] text-xl text-[rgb(var(--color-primary))]"><i className="bi bi-clock" /></span><div><p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--color-muted))]">{lang === 'th' ? 'เวลา' : 'Time'}</p><p className="font-semibold text-[rgb(var(--color-secondary))]">{formatCalendarTime(activity.start_time, activity.end_time, lang)}</p></div></div>
                    </div>
                </div>
                <div className="space-y-8 p-6 sm:p-8">
                    <section>
                        <h3 className="text-lg font-bold text-[rgb(var(--color-secondary))]">{lang === 'th' ? 'รายละเอียด' : 'Details'}</h3>
                        {details.length ? <ol className="mt-4 space-y-3">{details.map((detail, index) => <li key={detail.id} className="flex gap-4 rounded-xl bg-[rgb(var(--color-background))] p-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--color-primary))] text-sm font-bold text-white">{index + 1}</span><p className="pt-0.5 leading-relaxed">{detail.detail_text}</p></li>)}</ol> : <p className="mt-3 text-[rgb(var(--color-muted))]">{lang === 'th' ? 'ไม่มีรายละเอียดเพิ่มเติม' : 'No additional details'}</p>}
                    </section>
                    <section className="border-t border-[rgb(var(--color-border))] pt-7">
                        <h3 className="text-lg font-bold text-[rgb(var(--color-secondary))]">{lang === 'th' ? 'หมายเหตุ' : 'Note'}</h3>
                        <p className="mt-3 whitespace-pre-wrap leading-relaxed text-[rgb(var(--color-foreground))]">{activity.note || (lang === 'th' ? 'ไม่มีหมายเหตุ' : 'No note')}</p>
                    </section>
                </div>
            </article>
        </section>
    )
}
