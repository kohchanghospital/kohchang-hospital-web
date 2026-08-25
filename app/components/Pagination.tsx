import Link from 'next/link';

export default function Pagination({ currentPage, last_page, lang, path }: { currentPage: number; last_page: number; lang: string; path: string }) {
  if (last_page <= 1) return null;
  const href = (page: number) => `/${lang}${path}?page=${page}`;

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-1.5" aria-label={lang === 'th' ? 'การแบ่งหน้า' : 'Pagination'}>
      <PageLink href={href(currentPage - 1)} disabled={currentPage <= 1} label={lang === 'th' ? 'หน้าก่อนหน้า' : 'Previous'}>‹</PageLink>
      {getSmartPagination(currentPage, last_page).map((page, index) =>
        typeof page === 'string' ? <span key={`ellipsis-${index}`} className="flex h-10 min-w-8 items-center justify-center text-slate-400" aria-hidden="true">…</span> :
        <Link key={page} href={href(page)} aria-current={page === currentPage ? 'page' : undefined} className={`flex h-10 min-w-10 items-center justify-center rounded-lg border px-2 text-sm font-medium transition ${page === currentPage ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))] text-white' : 'border-[rgb(var(--color-border))] bg-white text-slate-600 hover:border-teal-300 hover:bg-teal-50'}`}>{page}</Link>
      )}
      <PageLink href={href(currentPage + 1)} disabled={currentPage >= last_page} label={lang === 'th' ? 'หน้าถัดไป' : 'Next'}>›</PageLink>
    </nav>
  );
}

function PageLink({ href, disabled, label, children }: { href: string; disabled: boolean; label: string; children: React.ReactNode }) {
  if (disabled) return <span className="flex h-10 min-w-10 cursor-not-allowed items-center justify-center rounded-lg border border-[rgb(var(--color-border))] bg-slate-50 text-slate-300" aria-disabled="true">{children}</span>;
  return <Link href={href} aria-label={label} className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-[rgb(var(--color-border))] bg-white text-lg text-slate-600 hover:border-teal-300 hover:bg-teal-50">{children}</Link>;
}

function getSmartPagination(current: number, total: number, delta = 1) {
  const range: (number | string)[] = [];
  if (total <= 7) { for (let page = 1; page <= total; page++) range.push(page); return range; }
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);
  range.push(1);
  if (left > 2) range.push('...');
  for (let page = left; page <= right; page++) range.push(page);
  if (right < total - 1) range.push('...');
  range.push(total);
  return range;
}
