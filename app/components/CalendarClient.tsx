'use client'

import { useCallback, useMemo, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { EventInput, EventSourceFunc } from '@fullcalendar/core'
import { useRouter } from 'next/navigation'

type CalendarRecord = {
    id: number
    activity_date?: string
    schedule_date?: string
    start_time: string | null
    end_time: string | null
    title: string
}

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api'

function normalizeRecords(payload: unknown): CalendarRecord[] {
    if (Array.isArray(payload)) return payload as CalendarRecord[]
    if (!payload || typeof payload !== 'object' || !('data' in payload)) return []

    const data = (payload as { data?: unknown }).data
    if (Array.isArray(data)) return data as CalendarRecord[]
    if (data && typeof data === 'object' && 'data' in data && Array.isArray((data as { data?: unknown }).data)) {
        return (data as { data: CalendarRecord[] }).data
    }

    return []
}

function mapRecordToEvent(record: CalendarRecord): EventInput {
    const localDate = (record.activity_date ?? record.schedule_date ?? '').slice(0, 10)
    const startTime = record.start_time?.trim()
    const endTime = record.end_time?.trim()
    const allDay = !startTime

    return {
        id: String(record.id),
        title: record.title,
        start: allDay ? localDate : `${localDate}T${startTime}`,
        ...(!allDay && endTime ? { end: `${localDate}T${endTime}` } : {}),
        allDay,
        extendedProps: { time: startTime?.slice(0, 5) ?? '' },
    }
}

export default function CalendarClient({ events, lang, base, compact = false, resource = 'activities' }: { events?: EventInput[]; lang: string; base: string; compact?: boolean; resource?: 'activities' | 'vehicle-schedules' }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const loadEvents = useCallback<EventSourceFunc>(async (range, success, failure) => {
        setError(false)
        try {
            const start = range.startStr.slice(0, 10)
            const end = range.endStr.slice(0, 10)
            const response = await fetch(`${apiBase}/${resource}?start=${start}&end=${end}`, { cache: 'no-store' })
            if (!response.ok) throw new Error('Calendar request failed')
            const records = normalizeRecords(await response.json())
            success(records.filter((record) => record.activity_date || record.schedule_date).map(mapRecordToEvent))
        } catch (requestError) {
            setError(true)
            failure(requestError as Error)
        }
    }, [resource])

    const calendarEvents = useMemo(() => events ?? loadEvents, [events, loadEvents])

    return (
        <div className="relative min-h-96">
            {loading && <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/70" role="status"><div className="h-9 w-9 animate-spin rounded-full border-4 border-teal-100 border-t-teal-700" /><span className="sr-only">Loading</span></div>}
            {error && <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">{lang === 'th' ? 'โหลดข้อมูลปฏิทินไม่สำเร็จ กรุณาลองใหม่' : 'Could not load calendar data. Please try again.'}</div>}
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale={lang === 'th' ? 'th' : 'en-gb'}
                events={calendarEvents}
                loading={setLoading}
                timeZone="local"
                dayMaxEventRows={compact ? 3 : false}
                moreLinkContent={(arg) =>
                    lang === 'th' ? `+${arg.num} เพิ่มเติม` : `+${arg.num} more`
                }
                fixedWeekCount={false}
                height="auto"
                expandRows
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: '',
                }}
                eventClick={(info) =>
                    router.push(`/${lang}/${base}/${info.event.id}`)
                }
                eventContent={(arg) => (
                    <div
                        className={`min-w-0 text-xs font-medium leading-snug text-white ${compact ? 'truncate' : 'whitespace-pre-line'
                            }`}
                        title={arg.event.title}
                    >
                        {arg.event.extendedProps.time && (
                            <span className="mr-1 font-bold text-white">
                                {arg.event.extendedProps.time}
                            </span>
                        )}

                        {arg.event.title}

                        {!compact && arg.event.extendedProps.detail && (
                            <>
                                <br />
                                {arg.event.extendedProps.detail}
                            </>
                        )}
                    </div>
                )}
                eventColor="#087780"
                eventTextColor="#ffffff"
                eventClassNames={() => [
                    'cursor-pointer',
                    'rounded-md',
                    'border-0',
                    'shadow-sm',
                ]}
            />
        </div>
    )
}
