'use client';

import { useState } from 'react';

export function SafeImage({ src, fallback, alt, className }: { src: string; fallback: string; alt: string; className?: string }) {
  const [currentSrc, setCurrentSrc] = useState(src || fallback);
  return <img src={currentSrc} onError={() => setCurrentSrc(fallback)} className={className} alt={alt} />;
}
