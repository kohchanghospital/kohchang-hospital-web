import type { Lang } from '@/i18n'

export function formatCalendarDate(date: string, lang: Lang) {
    const [year, month, day] = date.slice(0, 10).split('-').map(Number)
    const safeDate = new Date(Date.UTC(year, month - 1, day, 12))
    return new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', {
        day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Bangkok',
    }).format(safeDate)
}

export function formatCalendarTime(startTime: string | null, endTime: string | null, lang: Lang) {
    const start = startTime?.slice(0, 5)
    const end = endTime?.slice(0, 5)
    if (start && end) return `${start} - ${end}`
    if (start) return start
    if (end) return end
    return lang === 'th' ? 'ตลอดวัน' : 'All day'
}
