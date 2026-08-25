import { languages, Lang } from '@/i18n';
import { getContent } from '@/app/lib/api';
import { PublicHero } from '@/app/components/PublicUI';

export default async function VisionPage({ params }: { params: { lang: Lang } }) {
  const lang = (await params).lang;
  const t = languages[lang];
  const [vision, mission, values] = await Promise.all([
    getContent('vision', lang),
    getContent('mission', lang),
    getContent('values', lang),
  ]);
  const sections = [[t.vision, vision.body], [t.mission, mission.body], [t.values, values.body]];
  return (
    <>
      <PublicHero title={t.vision_head} eyebrow="Vision & Mission" image="/images/vision.png" />
      <section className="container-page max-w-4xl space-y-5 py-10 sm:py-14">
        {sections.map(([title, body]) => (
          <article key={title} className="surface-card p-5 sm:p-8">
            <h2 className="text-2xl font-bold text-[rgb(var(--color-secondary))]">{title}</h2>
            <div className="prose mt-4 max-w-none" dangerouslySetInnerHTML={{ __html: body }} />
          </article>
        ))}
      </section>
    </>
  );
}
