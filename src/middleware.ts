import { EnumTokens } from "@/services/auth/auth-token.service";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/", "/about", "/contact"];
const AUTH_ROUTES = ["/auth", "/register"];
const PROTECTED_ROUTES = ["/dashboard", "/profile"];

function startsWithAny(path: string, list: string[]) {
    return list.some((route) => {
        if (route === "/" && path === "/") return true;
        if (route === "/") return false;
        return path === route || path.startsWith(route + "/");
    });
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

    const isPublicRoute = startsWithAny(pathname, PUBLIC_ROUTES);
    const isAuthRoute = startsWithAny(pathname, AUTH_ROUTES);
    const isProtectedRoute = startsWithAny(pathname, PROTECTED_ROUTES);

    // Пропускаем публичные роуты (кроме auth)
    if (isPublicRoute && !isAuthRoute) {
        return NextResponse.next();
    }

    // Авторизованный пользователь
    if (refreshToken) {
        if (isAuthRoute) {
            return NextResponse.redirect(new URL("/profile", request.url));
        }
        return NextResponse.next();
    }

    // Неавторизованный пользователь
    if (isAuthRoute) {
        return NextResponse.next();
    }

    if (isProtectedRoute) {
        const authUrl = new URL("/auth", request.url);
        authUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(authUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
