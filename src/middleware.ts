// src/middleware.ts
import { NextResponse } from "next/server"

export async function middleware(req) {
  const res = await fetch(`${req.nextUrl.origin}/api/auth/session`, {
    method: "GET",
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  })

  const session = await res.json()

  if (!session?.user && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
