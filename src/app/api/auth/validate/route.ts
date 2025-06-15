import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { token } = body;

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ token: decoded.access_token }); // ✅ return GitHub token directly
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
