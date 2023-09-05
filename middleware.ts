import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { redirect } from "next/navigation";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: "/api/:function*",
};

export function middleware(request: NextRequest) {
  // Call our authentication function to check the request
  //   let isAuthenticated =
  //     request.cookies.get("authtoken")?.value ||
  //     request.headers.get("authorization")?.value ||
  //     "";
  //   if (!isAuthenticated) {
  //     // Respond with JSON indicating an error message
  //     // return new NextResponse(
  //     //   JSON.stringify({ success: false, message: "authentication failed" }),
  //     //   { status: 401, headers: { "content-type": "application/json" } }
  //     // );
  //     //return NextResponse.redirect(new URL("/login", request.url));
  //     response.writeHead(302, {
  //       Location: "/login",
  //     });
  //     response.end();
  //   }
}
