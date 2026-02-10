import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the user is trying to access dashboard routes
  const isDashboardRoute = pathname.startsWith('/dashboard') ||
    pathname.startsWith('/employee') ||
    pathname.startsWith('/admin') ||
    (!pathname.startsWith('/sign-in') &&
      !pathname.startsWith('/api') &&
      !pathname.startsWith('/_next') &&
      pathname !== '/' &&
      !pathname.startsWith('/not-access'));

  if (isDashboardRoute) {
    try {
      // Call the profile API to check user authentication and verification status
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
      const response = await fetch(`${baseUrl}/auth/profile`, {
        method: 'GET',
        headers: {
          'Cookie': request.headers.get('cookie') || '',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        // User is not authenticated, redirect to sign-in
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }

      const data = await response.json();
      const user = data.user;

      // Check if user exists and email is verified
      if (!user || !user.isEmailVerified) {
        // User is not verified, redirect to not-access page
        return NextResponse.redirect(new URL('/not-access', request.url));
      }

      // User is authenticated and verified, allow access
      return NextResponse.next();
    } catch (error) {
      // On error, redirect to sign-in for safety
      console.error('Proxy middleware error:', error);
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
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
