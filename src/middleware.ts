import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/", "/api/webhooks(.*)"],
  afterAuth(auth, req) {
    const isLoggedIn = auth.userId != null;

    // Handle users who aren't authenticated
    if (!isLoggedIn && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // If the user is logged in and trying to access the landing page, redirect to their home page
    if (isLoggedIn && req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/home", req.url));
    }

    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
  // debug: true,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
