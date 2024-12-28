// import { NextResponse } from "next/server";

// export function middleware(request) {
//   return NextResponse.redirect(new URL("/about", request.url));
// }

//auth can also be used as a middleware
import { auth } from "@/app/_lib/auth";
export const middleware = auth;

// The middleware function is run before the route handler is run
// by configuring the matcher property, you can specify which routes should be run by the middleware
export const config = {
  matcher: ["/account"],
};
