import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${process.env.BASE_URL}/api/auth/callback`,
    }),
  });

  const { access_token } = await tokenRes.json();

  if (!access_token) {
    return NextResponse.json({ error: "Token not received" }, { status: 500 });
  }

  // ✅ Just return the token in hash for frontend
  return NextResponse.redirect(
    `${process.env.BASE_URL}/admin/auth-bridge#access_token=${access_token}`
  );
}
