import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/auth";

export async function POST(req) {
  const form = await req.formData();
  const pass = form.get("password");
  const ok = pass && pass === process.env.ADMIN_PASSWORD;

  const url = new URL(ok ? "/admin" : "/admin/login?error=1", req.url);
  const res = NextResponse.redirect(url, { status: 303 });
  if (ok) {
    res.cookies.set(ADMIN_COOKIE, pass, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 días
    });
  }
  return res;
}
