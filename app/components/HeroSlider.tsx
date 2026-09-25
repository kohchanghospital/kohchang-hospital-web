'use client';

import { useEffect, useRef, useState } from 'react';
import { Lang, languages } from '@/i18n';
import { publicStorageUrl } from '../lib/api';

export type HeroSlide = {
  id: number; title: string | null; subtitle: string | null; alt_text: string | null;
  desktop_image: string; mobile_image: string | null; button_text: string | null;
  button_url: string | null; text_alignment: 'left' | 'center' | 'right'; overlay_enabled: boolean;
};

export default function HeroSlider({ slides, lang }: { slides: HeroSlide[]; lang: Lang }) {
  const t = languages[lang];
  const items: HeroSlide[] = slides.length ? slides : [{ id: 0, title: t.hos_name, subtitle: t.sub_about,
    alt_text: '', desktop_image: '/images/kohchang-hero.webp', mobile_image: '/images/kohchang-hero-mobile.webp', button_text: t.about,
    button_url: `/${lang}/about`, text_alignment: 'left', overlay_enabled: true }];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [cycle, setCycle] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const active = index % items.length;
  const label = (th: string, en: string) => lang === 'th' ? th : en;
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    const visibility = () => setHidden(document.hidden);
    update(); visibility();
    media.addEventListener('change', update);
    document.addEventListener('visibilitychange', visibility);
    return () => { media.removeEventListener('change', update); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  useEffect(() => {
    if (items.length < 2 || paused || hovered || focused || hidden || reduced) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => window.clearTimeout(timer);
  }, [index, cycle, items.length, paused, hovered, focused, hidden, reduced]);
  const go = (next: number) => { setIndex((next + items.length) % items.length); setCycle((n) => n + 1); };
  const src = (path: string) => path.startsWith('/images/') ? path : publicStorageUrl(path);
  return (
    <section className="hero-slider" aria-roledescription="carousel" aria-label={label('เรื่องเด่นโรงพยาบาล', 'Hospital highlights')}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
      onTouchStart={(e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
      onTouchEnd={(e) => { if (touch.current) { const dx = e.changedTouches[0].clientX - touch.current.x; const dy = e.changedTouches[0].clientY - touch.current.y; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(active + (dx < 0 ? 1 : -1)); touch.current = null; } }}>
      {items.map((slide, i) => (
        <div key={slide.id} className={`hero-slide ${i === active ? 'is-active' : ''}`} inert={i !== active} aria-hidden={i !== active}
          role="group" aria-roledescription="slide" aria-label={`${i + 1} / ${items.length}`}>
          {(i === active || i === 0 || i === (active + 1) % items.length) && <picture>
            {slide.mobile_image && <source media="(max-width: 640px)" srcSet={src(slide.mobile_image)} />}
            {/* API uploads use the existing public storage origin. */}
            <img src={src(slide.desktop_image)} alt={slide.alt_text || ''} className="hero-image" loading={i === active || i === (active + 1) % items.length ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : 'auto'} decoding="async" />
          </picture>}
          {slide.overlay_enabled && <div className={`hero-overlay hero-overlay-${slide.text_alignment}`} />}
          <div className={`container-page hero-content hero-align-${slide.text_alignment}`}>
            <div className={slide.overlay_enabled ? 'hero-copy' : 'hero-copy hero-copy-panel'}>
              <span className="hero-eyebrow">KOH CHANG HOSPITAL</span>
              {slide.title && (i === 0 ? <h1>{slide.title}</h1> : <h2>{slide.title}</h2>)}
              {slide.subtitle && <p>{slide.subtitle}</p>}
              {slide.button_text && slide.button_url && <a href={slide.button_url} className="hero-cta">{slide.button_text}<span aria-hidden="true">↗</span></a>}
            </div>
          </div>
        </div>
      ))}
      {items.length > 1 && <div className="container-page hero-controls">
        <div className="hero-dots">{items.map((slide, i) => <button key={slide.id} onClick={() => go(i)} aria-label={label(`ไปสไลด์ ${i + 1}`, `Go to slide ${i + 1}`)} aria-current={active === i ? 'true' : undefined}><span /></button>)}</div>
        <div className="flex items-center gap-2">
          <span className="mr-2 text-sm tabular-nums" aria-live="off">{String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
          {!reduced && <button className="hero-control" onClick={() => { if (paused) { setFocused(false); setHovered(false); } setPaused(!paused); setCycle(n => n + 1); }} aria-label={paused ? label('เล่นสไลด์', 'Play slideshow') : label('หยุดสไลด์', 'Pause slideshow')}>{paused ? '▷' : 'Ⅱ'}</button>}
          <button className="hero-control" onClick={() => go(active - 1)} aria-label={label('สไลด์ก่อนหน้า', 'Previous slide')}>←</button>
          <button className="hero-control" onClick={() => go(active + 1)} aria-label={label('สไลด์ถัดไป', 'Next slide')}>→</button>
        </div>
      </div>}
    </section>
  );
}

