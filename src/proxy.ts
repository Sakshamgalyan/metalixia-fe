import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_ROUTES = ["/sign-in"];
const NO_ACCESS_ROUTE = "/not-access";
const PUBLIC_ROUTES = ["/sign-in", "/not-found"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isNoAccessRoute = pathname.startsWith(NO_ACCESS_ROUTE);
  const isProtectedRoute = pathname.startsWith("/");

  const refreshToken = request.cookies.get("refresh_token");
  const hasRefreshToken = !!refreshToken;

  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(
    /\/$/, "",
  );

  if (!hasRefreshToken) {
    if (isPublicRoute || isNoAccessRoute) {
      return NextResponse.next();
    }

    if (isProtectedRoute) {
      const signInUrl = new URL("/sign-in", request.url);
      return NextResponse.redirect(signInUrl);
    }

    if (pathname === "/") {
      const signInUrl = new URL("/sign-in", request.url);
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  }

  try {
    const profileResponse = await fetch(`${apiBaseUrl}/auth/profile`, {
      method: "GET",
      headers: {
        Cookie: request.headers.get("cookie") || "",
      },
      credentials: "include",
    });

    if (profileResponse.status === 401 || profileResponse.status === 403) {
      if (!isAuthRoute) {
        const signInUrl = new URL("/sign-in", request.url);
        const response = NextResponse.redirect(signInUrl);
        response.cookies.delete("refresh_token");
        response.cookies.delete("access_token");
        return response;
      }
      const response = NextResponse.next();
      response.cookies.delete("refresh_token");
      response.cookies.delete("access_token");
      return response;
    }

    if (profileResponse.ok) {
      const profileData = await profileResponse.json();
      const userRole = profileData?.user?.role;

      if (isAuthRoute) {
        if (userRole === "user") {
          const noAccessUrl = new URL(NO_ACCESS_ROUTE, request.url);
          return NextResponse.redirect(noAccessUrl);
        }

        const dashboardUrl = new URL("/", request.url);
        return NextResponse.redirect(dashboardUrl);
      }

      if (pathname === "/") {
        if (userRole === "user") {
          const noAccessUrl = new URL(NO_ACCESS_ROUTE, request.url);
          return NextResponse.redirect(noAccessUrl);
        }
        return NextResponse.next();
      }

      if (userRole === "user" && isProtectedRoute && !isNoAccessRoute) {
        const noAccessUrl = new URL(NO_ACCESS_ROUTE, request.url);
        return NextResponse.redirect(noAccessUrl);
      }
      return NextResponse.next();
    }

    if (!isAuthRoute) {
      const signInUrl = new URL("/sign-in", request.url);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  } catch (error) {
    if (isProtectedRoute && !isAuthRoute) {
      const signInUrl = new URL("/sign-in", request.url);
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
