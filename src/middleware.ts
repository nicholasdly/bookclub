import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth({ providers: [] });

// All routes that are not part of the API are protected by default.
// To make a route public, it needs to be added to here.
const publicRoutes = ["/", "/home"];

// All routes that a user should not be able to access unless logged out.
const authRoutes = ["/auth/login", "/auth/register"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiRoute = nextUrl.pathname.startsWith("/api/");
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow all API routes.
  if (isApiRoute) return undefined;

  // Allow all routes related to authentication and authorization, unless
  // user is already logged in.
  if (isAuthRoute) {
    return isLoggedIn
      ? NextResponse.redirect(new URL("/home", nextUrl))
      : undefined;
  }

  // Redirect user to login page if attempting to visit unauthorized page.
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return undefined;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
