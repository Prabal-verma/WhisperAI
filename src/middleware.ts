import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = await fetch(`${req.nextUrl.origin}/api/auth/session`, {
    method: "GET",
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });

  const session = await res.json();
  const isAuth = session?.user; // Check if the user is authenticated

  // Redirect unauthenticated users to sign-in
  if (!isAuth && req.nextUrl.pathname !== "/sign-in" && req.nextUrl.pathname !== "/sign-up") {
    const newUrl = new URL("/sign-in", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  // Redirect authenticated users to home
  if (isAuth && (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/sign-up")) {
    const newUrl = new URL("/", req.nextUrl.origin); // Redirect to home page
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
