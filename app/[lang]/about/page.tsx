import { languages, Lang } from '@/i18n';
import { HubCard, PublicHero } from '@/app/components/PublicUI';

export default async function AboutPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = languages[lang];
  const items = [
    [t.history_hos, `/${lang}/about/history`, 'ประวัติและความเป็นมาของโรงพยาบาล'],
    [t.management_team, `/${lang}/about/management`, 'คณะผู้บริหารและทีมงานของโรงพยาบาล'],
    [t.vision_head, `/${lang}/about/vision`, 'วิสัยทัศน์ พันธกิจ และค่านิยมองค์กร'],
    [t.activity_calendar, `/${lang}/about/calendar`, 'ตรวจสอบปฏิทินกิจกรรมของโรงพยาบาล'],
    [t.vehicle_calendar, `/${lang}/about/vehicle`, 'ตารางการใช้รถและรายละเอียดการเดินทาง'],
  ];
  return (
    <>
      <PublicHero title={t.about} eyebrow="Koh Chang Hospital" image="/images/ab1.png" />
      <section className="container-page py-10 sm:py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([title, href, description]) => <HubCard key={href} href={href} title={title} description={lang === 'th' ? description : undefined} icon={<InfoIcon />} />)}
        </div>
      </section>
    </>
  );
}

function InfoIcon() { return <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 11v5m0-8v.01" strokeLinecap="round" /></svg>; }
