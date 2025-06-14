import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  console.log('✅ /api/auth/validate called');
  const body = await req.json();
  const { token } = body;

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ token: decoded.access_token });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
