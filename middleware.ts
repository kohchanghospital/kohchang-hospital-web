import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. ตรวจสอบว่า Path ขึ้นต้นด้วยภาษาที่เรากำหนดไว้หรือไม่
    const pathnameHasLocale = pathname.startsWith('/th/') || pathname === '/th' ||
        pathname.startsWith('/en/') || pathname === '/en';

    if (pathnameHasLocale) return;

    // 2. ถ้าไม่ใช่ /th หรือ /en (เช่น /jp/about หรือ /abc)
    // ให้ Redirect ไปที่ /th พร้อมคง Path ส่วนที่เหลือไว้
    const segments = pathname.split('/');
    const langCandidate = segments[1]; // ตัวอย่าง: 'jp' หรือ 'abc'

    // ตรวจสอบว่าไม่ใช่ไฟล์ Static (เช่นรูปภาพ /images/...)
    if (
        pathname.includes('.') ||
        pathname.startsWith('/_next') ||
        pathname === '/favicon.ico'
    ) {
        return;
    }

    // ทำการ Redirect ไปที่ /th
    request.nextUrl.pathname = `/th${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    // กำหนดให้ Middleware ทำงานกับทุก Path ยกเว้นไฟล์ระบบ
    matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};