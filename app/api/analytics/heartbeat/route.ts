import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

const cookieName = 'visitor_uuid';
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.get('host')) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }

  const apiBase = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
  const ingestKey = process.env.ANALYTICS_INGEST_KEY;
  if (!apiBase || !ingestKey) {
    return NextResponse.json({ message: 'Analytics unavailable' }, { status: 503 });
  }

  const existing = request.cookies.get(cookieName)?.value;
  const visitorUuid = existing && uuidPattern.test(existing) ? existing.toLowerCase() : randomUUID();

  let status = 503;
  try {
    const upstream = await fetch(`${apiBase}/analytics/heartbeat`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Analytics-Key': ingestKey,
      },
      body: JSON.stringify({ visitor_uuid: visitorUuid }),
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });
    status = upstream.ok ? 204 : 503;
  } catch {
    // Visitors can still browse if analytics storage is temporarily unavailable.
  }

  const response = status === 204
    ? new NextResponse(null, { status: 204 })
    : NextResponse.json({ message: 'Analytics unavailable' }, { status });
  response.headers.set('Cache-Control', 'no-store');
  response.cookies.set(cookieName, visitorUuid, {
    httpOnly: true,
    secure: request.headers.get('x-forwarded-proto') === 'https' || request.nextUrl.protocol === 'https:',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}
