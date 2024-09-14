import NextAuth from "next-auth";
import authConfig from "./server/auth.config";

const { auth } = NextAuth(authConfig);

const publicRoutes = ["/", "/home"];
const authRoutes = ["/auth/login", "/auth/register"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow all API routes related to authenication and authorization.
  if (isApiAuthRoute) {
    return undefined;
  }

  // Allow all routes related to authentication and authorization, unless
  // user is already logged in.
  if (isAuthRoute) {
    return isLoggedIn
      ? Response.redirect(new URL("/home", nextUrl))
      : undefined;
  }

  // Redirect user to login page if attempting to visit unauthorized page.
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
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
