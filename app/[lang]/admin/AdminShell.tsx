'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const lang = pathname.split('/')[1] || 'th';

  const sidebar = (
    <div className="flex h-full flex-col bg-[rgb(var(--color-secondary))] text-white">
      <Link href={`/${lang}/admin`} className="flex min-h-20 items-center gap-3 border-b border-white/10 px-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 p-1.5">
          <Image src="/images/logo_w.png" width={36} height={36} alt="" className="h-full w-full object-contain" />
        </span>
        <span className="min-w-0"><strong className="block truncate text-sm">โรงพยาบาลเกาะช้าง</strong><span className="text-xs text-slate-300">ระบบผู้ดูแลเว็บไซต์</span></span>
      </Link>
      <nav className="flex-1 p-3" aria-label="เมนูผู้ดูแลระบบ">
        <p className="px-3 pb-2 pt-3 text-[.7rem] font-semibold uppercase tracking-[.16em] text-slate-400">ภาพรวม</p>
        <Link href={`/${lang}/admin`} className="flex min-h-11 items-center gap-3 rounded-lg bg-white/10 px-3 py-2.5 text-sm font-medium text-white" aria-current="page">
          <DashboardIcon /> แดชบอร์ด
        </Link>
      </nav>
      <div className="border-t border-white/10 p-3">
        <Link href={`/${lang}`} className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white">
          <GlobeIcon /> ดูเว็บไซต์
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[rgb(var(--color-background))] lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[17rem] lg:block">{sidebar}</aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-slate-950/45" onClick={() => setOpen(false)} aria-label="ปิดเมนู" />
          <aside className="absolute inset-y-0 left-0 w-[min(86vw,17rem)] animate-modal">{sidebar}</aside>
        </div>
      )}
      <div className="min-w-0 lg:col-start-2">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[rgb(var(--color-border))] bg-white/95 px-4 backdrop-blur sm:px-6">
          <button className="flex h-11 w-11 items-center justify-center rounded-lg border border-[rgb(var(--color-border))] lg:hidden" onClick={() => setOpen(true)} aria-label="เปิดเมนู"><MenuIcon /></button>
          <div className="min-w-0">
            <p className="text-xs text-slate-500">ระบบผู้ดูแลเว็บไซต์</p>
            <p className="truncate text-sm font-semibold text-[rgb(var(--color-secondary))]">แดชบอร์ด</p>
          </div>
          <span className="ml-auto status-badge bg-emerald-50 text-emerald-700"><span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />พร้อมใช้งาน</span>
        </header>
        <main id="main-content" className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

function DashboardIcon() { return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>; }
function GlobeIcon() { return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.4 3 14.6 0 18M12 3c-3 3.4-3 14.6 0 18" /></svg>; }
function MenuIcon() { return <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" /></svg>; }
