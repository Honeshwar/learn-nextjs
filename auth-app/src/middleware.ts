import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  //find pathname
  const pathname = request.nextUrl.pathname;
  const isPublic = pathname === "/login" || pathname === "/signup"; //public path

  //cookies find user token
  const token = request.cookies.get("token")?.value || "";

  //if user is not login redirect to login
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  } else if (token && isPublic) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  //   return NextResponse.next();
}

// See "Matching Paths" below to learn more
// config obj match all path that we want to protect or before going to router path just set an intermidery layers between client and server
export const config = {
  matcher: ["/login", "/signup", "/", "/profile"],
};
