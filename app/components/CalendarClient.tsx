'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useRouter } from 'next/navigation'

export default function CalendarClient({
    events,
    lang,
    base,
}: {
    events: any[]
    lang: string
    base: string
}) {
    const router = useRouter()

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale={lang === 'th' ? 'th' : 'en-gb'}
            events={events}
            dayMaxEventRows={false}
            fixedWeekCount={false}
            height="auto"
            expandRows={true}
            eventClick={(info) => {
                router.push(`/${lang}/${base}/${info.event.id}`)
            }}
            eventContent={(arg) => (
                <div className="text-xs leading-snug whitespace-pre-line">
                    {arg.event.extendedProps.time} {arg.event.title}<br />{arg.event.extendedProps.detail}
                </div>
            )}
            eventColor="#8b5cf6"
            eventTextColor="#ffffff"
        />
    )
}
