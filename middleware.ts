import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { POST_ROUTE, LOGIN_ROUTE } from "./constants/routes";
import { parseUrl } from "./libs/utils";

export async function middleware(req: NextRequest) {
  const { path } = parseUrl(req);

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session && path.includes("posts")) {
    return NextResponse.redirect(`${process.env.BASE_URL}${LOGIN_ROUTE}`);
  } else if (!!session && path === LOGIN_ROUTE) {
    console.log(`${process.env.BASE_URL}${POST_ROUTE}`);
    return NextResponse.redirect(`${process.env.BASE_URL}${POST_ROUTE}`);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};
