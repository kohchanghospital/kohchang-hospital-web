import { languages, Lang } from "@/i18n";
import CalendarClient from '@/app/components/CalendarClient'
import { PublicHero } from '@/app/components/PublicUI'

export default async function CalendarPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
    const { lang } = await params;
    const t = languages[lang];
    return (
        <>
            <PublicHero title={t.activity_calendar} eyebrow="Calendar" image="/images/calendar.png" />
            <div>
                <section className="container-page max-w-6xl py-10 sm:py-14">
                    <div className="surface-card overflow-x-auto p-3 sm:p-6">
                        <CalendarClient lang={lang} base="about/calendar" compact />
                    </div>
                </section>
            </div>
        </>
    );
}
