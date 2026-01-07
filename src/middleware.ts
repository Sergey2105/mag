import { NextRequest, NextResponse } from "next/server";
import { protectLoginPages } from "@/server-actions/middlewares/protect-login.middleware";
import { protectAdminPages } from "@/server-actions/middlewares/protect-admin.middleware";
import { protectDashboardPages } from "@/server-actions/middlewares/protect-dashboard.middleware";
import { ADMIN_PAGES, DASHBOARD_PAGES, PUBLIC_PAGES } from "@/constants/routes";

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const pathname = request.nextUrl.pathname;

    console.log("Middleware triggered for path:", pathname);

    if (pathname.startsWith(PUBLIC_PAGES.LOGIN) || pathname.startsWith(PUBLIC_PAGES.REGISTER)) {
        return protectLoginPages(request);
    }

    // if (pathname.startsWith(PREMIUM_PAGES.HOME)) {
    //     return protectPremiumPages(request);
    // }

    // if (pathname.startsWith(ADMIN_PAGES.HOME) || pathname.startsWith(ADMIN_PAGES.MANAGER)) {
    //     return protectAdminPages(request);
    // }
    if (pathname.startsWith(ADMIN_PAGES.HOME)) {
        return protectAdminPages(request);
    }

    if (pathname.startsWith(DASHBOARD_PAGES.HOME)) {
        return protectDashboardPages(request);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/auth/:path*", "/admin/:path*", "/login", "/register"],
};
