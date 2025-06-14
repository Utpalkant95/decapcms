import { NextResponse } from 'next/server';

export async function GET() {
  const client_id = process.env.GITHUB_CLIENT_ID!;
  const redirect_uri = `${process.env.BASE_URL}/api/auth/callback`;

  return NextResponse.redirect(`https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=repo`);
}
