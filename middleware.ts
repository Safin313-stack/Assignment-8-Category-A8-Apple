import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/my-profile", "/update-profile", "/tile"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPrivate = privateRoutes.some((r) => pathname.startsWith(r));

  if (isPrivate) {
    const sessionCookie =
      request.cookies.get("better-auth.session_token") ||
      request.cookies.get("__Secure-better-auth.session_token");

    if (!sessionCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-profile/:path*", "/update-profile/:path*", "/tile/:path*"],
};
