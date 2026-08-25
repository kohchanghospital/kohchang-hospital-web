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
export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

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
