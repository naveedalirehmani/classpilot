import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Routes } from "@/lib/routes";

export function middleware(request: NextRequest) {
  // Check if the user is authenticated
  const isAuthenticated = false; // Replace with your actual authentication logic

  if (!isAuthenticated) {
    // Redirect to the sign-in page if not authenticated
    return NextResponse.redirect(new URL(Routes.SIGNIN, request.url));
  }

  // Continue to the requested page if authenticated
  return NextResponse.next();
}

// Specify the paths that should be handled by this middleware
export const config = {
  matcher: ["/"], // Add more paths if needed
}; 