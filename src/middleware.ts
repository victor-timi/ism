import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { ROUTES } from "@/lib/routes";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Protect account routes
  if (pathname.startsWith(ROUTES.saved) || pathname.startsWith(ROUTES.alerts) || pathname.startsWith(ROUTES.settings)) {
    if (!req.auth) {
      const signInUrl = new URL(ROUTES.signIn, req.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/saved/:path*", "/alerts/:path*", "/settings/:path*"],
};
