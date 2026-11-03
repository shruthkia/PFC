/**
 * Reject mutating requests that did not originate from this site.
 * Combined with SameSite=Lax cookies and JSON-only bodies, this blocks
 * cross-site form posts from acting on a signed-in session.
 */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
