'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

let inFlight: Promise<void> | null = null;
let lastSentAt = 0;

function heartbeat() {
  if (inFlight || Date.now() - lastSentAt < 5_000) return;

  const send = async () => {
    if (Date.now() - lastSentAt < 5_000) return;
    const response = await fetch('/api/analytics/heartbeat', {
      method: 'POST',
      credentials: 'same-origin',
      cache: 'no-store',
      keepalive: true,
    });
    if (response.ok) lastSentAt = Date.now();
  };

  inFlight = (async () => {
    // Serialize the first request across tabs so they all receive the same cookie.
    if ('locks' in navigator) {
      await navigator.locks.request('kohchang-visitor-heartbeat', send);
    } else {
      await send();
    }
  })().catch(() => {
    // Tracking failures must not interrupt public pages.
  }).finally(() => { inFlight = null; });
}

export function VisitorHeartbeat() {
  const pathname = usePathname();

  useEffect(() => {
    if (/^\/(th|en)\/admin(?:\/|$)/.test(pathname)) return;

    const send = () => {
      if (document.visibilityState !== 'visible') return;
      heartbeat();
    };

    send();
    const interval = window.setInterval(send, 60_000);
    document.addEventListener('visibilitychange', send);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', send);
    };
  }, [pathname]);

  return null;
}
