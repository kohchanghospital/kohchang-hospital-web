import Link from 'next/link';

export function PublicHero({ title, eyebrow, description, image }: { title: string; eyebrow?: string; description?: string; image?: string }) {
  return (
    <header className="relative isolate overflow-hidden border-b border-[rgb(var(--color-border))] bg-[rgb(var(--color-secondary))]">
      {image && <div className="absolute inset-0 -z-20 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('${image}')` }} />}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,#211A3A_0%,#352650_45%,#4C2A6A_100%)]" />
      <div className="container-page py-14 sm:py-16 lg:py-20">
        <div className="max-w-3xl animate-soft-reveal">
          {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[.12em] text-[rgb(var(--color-primary-light))]">{eyebrow}</p>}
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h1>
          {description && <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">{description}</p>}
        </div>
      </div>
    </header>
  );
}

export function HubCard({ href, title, description, icon }: { href: string; title: string; description?: string; icon?: React.ReactNode }) {
  return (
    <Link href={href} className="group surface-card flex min-h-40 flex-col p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[rgb(var(--color-primary-border))] hover:shadow-[var(--shadow-md)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        {icon && <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--color-primary-light))] text-[rgb(var(--color-primary))]">{icon}</span>}
        <ArrowIcon />
      </div>
      <h2 className="mt-5 text-lg font-semibold leading-7 text-[rgb(var(--color-secondary))] group-hover:text-[rgb(var(--color-primary-hover))]">{title}</h2>
      {description && <p className="mt-2 line-clamp-3 text-sm leading-7 text-slate-600">{description}</p>}
    </Link>
  );
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="surface-card px-5 py-12 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500"><DocumentIcon /></span>
      <h2 className="mt-4 text-lg font-semibold text-[rgb(var(--color-secondary))]">{title}</h2>
      {description && <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-600">{description}</p>}
    </div>
  );
}

export function SectionHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div>
      <span className="mb-3 block h-1 w-10 rounded-full bg-[rgb(var(--color-primary))]" />
      <h2 className="text-2xl font-bold text-[rgb(var(--color-secondary))] sm:text-3xl">{title}</h2>
      {description && <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">{description}</p>}
    </div>
  );
}

function ArrowIcon() { return <svg className="ml-auto h-5 w-5 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-[rgb(var(--color-primary))]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function DocumentIcon() { return <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v5h5M9.5 13h5M9.5 17h5" strokeLinecap="round" /></svg>; }
