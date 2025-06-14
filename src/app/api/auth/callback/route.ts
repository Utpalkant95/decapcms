import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code)
    return NextResponse.json({ error: "Missing code" }, { status: 400 });

  const tokenRes = await fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${process.env.BASE_URL}/api/auth/callback`, // ADD THIS
    }),
  });

  const { access_token } = await tokenRes.json();

  if (!access_token)
    return NextResponse.json({ error: "Token not received" }, { status: 500 });

  const jwtToken = jwt.sign({ access_token }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return NextResponse.redirect(
    `${process.env.BASE_URL}/admin?access_token=${jwtToken}` // ✅ query param
  );
}
