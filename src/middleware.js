import { NextResponse } from "next/server";

export function middleware(request) {
    const response = NextResponse.next();
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/upload/")) {
        response.headers.set(
            "Cache-Control",
            "public, max-age=31536000, stale-while-revalidate=86400, immutable"
        );
    }

    const lang = request.cookies.get("lang");

    if (!lang) {
        response.cookies.set("lang", "en");
    }

    return response;
}
