import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define public routes that don't need authentication
  const isPublicRoute = pathname === "/sign-in";

  // Check for auth cookies
  const refreshToken = request.cookies.get("refresh_token");

  // If no tokens and trying to access a protected route, redirect to sign-in
  if (!refreshToken && !isPublicRoute) {
    const signInUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
  }

  // If already authenticated and trying to access sign-in, redirect to dashboard
  if (refreshToken && pathname === "/sign-in") {
    const dashboardUrl = new URL("/", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public assets)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
