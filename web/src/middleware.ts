import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/", 
    "/(pages)/(auth)/sign-in/:path*", // adjust to your route layout if needed
    "/signin",
    "/signup",
    "/otp",
    "/assets/:path*",
  ],
});

export const config = {
  matcher: ["/account/:path*", "/profile/:path*"],
};