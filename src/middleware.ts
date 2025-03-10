import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Routes } from "@/lib/routes";

export function middleware(request: NextRequest) {
  const isAuthenticated = false; 

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL(Routes.SIGNIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
}; 