// app/api/versions/route.ts
import { NextResponse } from 'next/server';
import { versionHistory } from '@/lib/store';

export async function GET() {
  // This simply returns the array of history we have stored in memory
  return NextResponse.json(versionHistory);
}