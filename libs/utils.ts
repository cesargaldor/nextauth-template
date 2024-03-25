import clsx from "clsx";
import { ClassValue } from "clsx";
import { NextRequest } from "next/server";
import { twMerge } from "tailwind-merge";

export function parseUrl(req: NextRequest) {
  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = req.nextUrl.pathname;

  return { hostname, path };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
