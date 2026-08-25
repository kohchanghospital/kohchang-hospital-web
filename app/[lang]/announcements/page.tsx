import { languages, Lang } from '@/i18n';
import { HubCard, PublicHero } from '@/app/components/PublicUI';

export default async function AnnouncementsPage({ params }: { params: { lang: Lang } | Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = languages[lang];
  return (
    <>
      <PublicHero title={t.announcements} eyebrow="Information Center" image="/images/announcement.png" />
      <section className="container-page py-10 sm:py-14">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          <HubCard href={`/${lang}/announcements/news`} title={t.news} description={lang === 'th' ? 'ข่าวกิจกรรมและข่าวประชาสัมพันธ์ของโรงพยาบาล' : 'Hospital news, activities and public information'} icon={<NewsIcon />} />
          <HubCard href={`/${lang}/announcements/procurement`} title={t.procurement} description={lang === 'th' ? 'ประกาศจัดซื้อจัดจ้าง TOR และผลการจัดซื้อ' : 'Procurement notices, terms of reference and results'} icon={<DocumentIcon />} />
        </div>
      </section>
    </>
  );
}

function NewsIcon() { return <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" strokeLinecap="round" /></svg>; }
function DocumentIcon() { return <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 3h7l4 4v14H7zM14 3v5h5M9 13h6M9 17h6" strokeLinecap="round" /></svg>; }
