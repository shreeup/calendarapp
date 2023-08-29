import { NextRequest, NextResponse } from "next/server";

// we are not exporting by default
// export async function middleware(req, ev) {
//   const token = req ? req.cookies?.token : null;
//   const profile = await getProfile(token);
//   // if profile exists you want to continue. Also
//   // maybe user sends request for log-in, and if a user wants to login, obviously it has no token
//   const { pathname } = req.nextUrl;
//   if (
//     // whatever your api route for login is
//     pathname.includes("/api/login") ||
//     profile
//   ) {
//     return NextResponse.next();
//   }

//   if (!profile && pathname !== "/login") {
//     // since you want to redirect the user to "/"
//     return NextResponse.redirect("/");
//   }
// }

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}
