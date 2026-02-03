import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  // Define public paths that don't require authentication
  const publicPaths = ["/sign-in"];

  // check if the path is public
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // If the user has a token and tries to access a public path, redirect to dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the user doesn't have a token and tries to access a protected path, redirect to sign-in
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
