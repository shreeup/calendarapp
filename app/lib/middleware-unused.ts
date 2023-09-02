import { NextRequest, NextResponse } from "next/server";
import { getErrorResponse } from "./helpers";
import jwt from "jsonwebtoken";

let redirectToLogin = false;
export async function middleware(req: NextRequest) {
  // let token: string | null;
  // token = req.headers.get("authorization");
  // const response = NextResponse.next();
  // const secretKey = process.env.JWT_SECRET_KEY;
  // if (!secretKey) {
  //   console.log("Secret Key Not found");
  //   return;
  // }
  // try {
  //   if (token) {
  //     jwt.verify(token, secretKey, (err, decoded) => {
  //       if (err || !decoded || typeof decoded == "string")
  //         return getErrorResponse(403, "Failed To authorize");
  //       req.headers.set("user", decoded.username);
  //     });
  //   }
  // } catch (error) {
  //   redirectToLogin = true;
  //   if (req.nextUrl.pathname.startsWith("/api")) {
  //     return getErrorResponse(401, "Token is invalid or user doesn't exists");
  //   }
  // }
  // return response;
}

const protectedRoutes = ["/"];
const authRoutes = ["/login", "/signup"];
const publicRoutes = ["/about", "/"];

// export function middleware(request: NextRequest) {
//   const currentUser = request.cookies.get("authtoken")?.value;
//   if (
//     protectedRoutes.includes(request.nextUrl.pathname) &&
//     (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)
//   ) {
//     request.cookies.delete("authtoken");
//     const response = NextResponse.redirect(new URL("/login", request.url));
//     response.cookies.delete("authtoken");
//     return response;
//   }
//   if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }
// }

// export const config = {
//   matcher: ["/api/:path*"],
// };
