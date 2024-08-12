import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server"

export { default } from "next-auth/middleware"


export async function middleware(req: NextRequest){
    const token =await getToken({req});
    const {nextUrl} = req;
    const publicPaths = ["/login"]; // These are public paths
    const isPublicPath = publicPaths.includes(nextUrl.pathname);
    if (token && isPublicPath) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
  
    return NextResponse.next();
  
  }
  
  export const config = {
      matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
    }