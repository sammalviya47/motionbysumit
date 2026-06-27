import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  return NextResponse.json({ ok: true, route: 'atlas-mori-portfolio' });
}

export async function POST(request) {
  try {
    const body = await request.json();
    return NextResponse.json({ ok: true, received: body });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}
