import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Ensures all public application routes use a supported locale prefix.
 *
 * Existing behavior is intentionally preserved:
 * - /th and /en routes continue without a redirect.
 * - Unprefixed routes are redirected to the equivalent /th route.
 * - API, Next.js internals, images, the favicon, and file-like paths are skipped.
 */
export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (/^\/(th|en)\/admin(?:\/|$)/.test(pathname)) {
        const apiBase = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/api\/?$/, '').replace(/\/$/, '');
        const loginBase = process.env.ADMIN_LOGIN_URL || 'http://localhost:5173';
        const headers = { cookie: request.headers.get('cookie') || '', accept: 'application/json', origin: request.nextUrl.origin };
        if (apiBase) {
            try {
                const session = await fetch(`${apiBase}/two-factor/session`, { headers, cache: 'no-store', redirect: 'manual' });
                if (session.ok) return;
                const pending = await fetch(`${apiBase}/two-factor/challenge`, { headers, cache: 'no-store' });
                const status = pending.ok ? await pending.json() as { next?: string } : {};
                return NextResponse.redirect(new URL(status.next || '/login', loginBase));
            } catch { /* Fail closed if the API is unavailable. */ }
        }
        return NextResponse.redirect(new URL('/login', loginBase));
    }

    const pathnameHasLocale =
        pathname === '/th' ||
        pathname.startsWith('/th/') ||
        pathname === '/en' ||
        pathname.startsWith('/en/');

    if (pathnameHasLocale) {
        return;
    }

    if (
        pathname.includes('.') ||
        pathname.startsWith('/_next') ||
        pathname === '/favicon.ico'
    ) {
        return;
    }

    request.nextUrl.pathname = `/th${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
