import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/admin", "/cars/detail"];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isLogin = !!session?.user;
  const role = session?.user.role;
  const { pathname } = request.nextUrl;

  // Kalau route butuh login dan user belum login → redirect ke signin
  if (!isLogin && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Kalau login tapi role bukan admin, cegah akses /admin
  if (isLogin && role !== "admin" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Kalau user sudah login, cegah buka /signin lagi
  if (
    isLogin &&
    (pathname.startsWith("/signin") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
