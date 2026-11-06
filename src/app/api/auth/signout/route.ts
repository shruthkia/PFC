import { NextResponse, type NextRequest } from "next/server";
import { isSameOrigin } from "@/lib/auth/request";
import { clearSessionCookie, deleteSession, SESSION_COOKIE } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin request refused." }, { status: 403 });
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (token) await deleteSession(token);

  const response = NextResponse.json({ ok: true });
  clearSessionCookie(response);
  return response;
}
