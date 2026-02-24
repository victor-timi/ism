import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Protect account routes
  if (pathname.startsWith("/saved") || pathname.startsWith("/alerts") || pathname.startsWith("/settings")) {
    if (!req.auth) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Protect Sanity Studio — require authenticated user
  if (pathname.startsWith("/studio")) {
    if (!req.auth) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/saved/:path*", "/alerts/:path*", "/settings/:path*", "/studio/:path*"],
};
