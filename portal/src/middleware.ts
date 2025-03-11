import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://192.168.1.16:4000/v1/user/current-user";
const SIGN_IN_PATH = "/signin";
const COOKIE_HEADER = "cookie";
const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (cookieHeader) {
    const items = cookieHeader.split(";");
    items.forEach((item: string) => {
      const [key, value] = item.split("=");
      cookies[key.trim()] = value?.trim();
    });
  }
  return cookies;
}

export async function middleware(request: NextRequest) {
  console.log("middleware");
  try {
    const cookieHeader = request.headers.get(COOKIE_HEADER) || "";
    const cookies = parseCookies(cookieHeader);
    console.log("cookies", cookies);
    const accessToken = cookies[ACCESS_TOKEN];
    const refreshToken = cookies[REFRESH_TOKEN];
    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);
    // If no tokens are found, redirect to sign-in
    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(new URL(SIGN_IN_PATH, request.url));
    }

    // Validate tokens by calling the "current user" API
    const apiResponse = await fetch(API_URL, {
      headers: {
        Cookie: `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`,
      },
      credentials: "include",
    });

    // Log the response data
    const data = await apiResponse.json();
    console.log("apiResponse data", data);

    // If API response is not OK, redirect to sign-in
    if (!apiResponse.ok) {
      return NextResponse.redirect(new URL(SIGN_IN_PATH, request.url));
    }

    // Proceed if validation passes
    return NextResponse.next();
  } catch (error: any) {
    console.error("Middleware error:", error?.message);
    return NextResponse.redirect(new URL(SIGN_IN_PATH, request.url));
  }
}

// Apply middleware to protected routes
export const config = {
  matcher: [
    // Protect user-related routes
    "/user/:path*", // e.g., /user/profile, /user/settings

    // Protect dashboard-related routes
    "/dashboard/:path*", // e.g., /dashboard/overview, /dashboard/stats

    // Protect settings-related routes
    "/settings/:path*" // e.g., /settings/account, /settings/privacy
  ],
};