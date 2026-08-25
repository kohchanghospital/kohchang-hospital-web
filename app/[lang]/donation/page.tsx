import { languages, Lang } from '@/i18n';
import { HubCard, PublicHero } from '@/app/components/PublicUI';

export default async function DonationPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = languages[lang];
  return (
    <>
      <PublicHero title={t.donation} eyebrow={lang === 'th' ? 'ร่วมสร้างโอกาสทางการรักษา' : 'Support patient care'} image="/images/donation.png" description={lang === 'th' ? 'ทุกการให้มีส่วนช่วยพัฒนาการดูแลผู้ป่วยและบริการสาธารณสุขของชุมชนเกาะช้าง' : 'Every contribution supports patient care and healthcare services for the Koh Chang community.'} />
      <section className="container-page py-10 sm:py-14">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          <HubCard href={`/${lang}/donation/cash`} title={t.cash_donation} description={t.cash_donation_description} icon={<HeartIcon />} />
          <HubCard href={`/${lang}/donation/organ`} title={t.organ_donation} description={t.organ_donation_description} icon={<HeartIcon />} />
        </div>
      </section>
    </>
  );
}

function HeartIcon() { return <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 6.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z" /></svg>; }
