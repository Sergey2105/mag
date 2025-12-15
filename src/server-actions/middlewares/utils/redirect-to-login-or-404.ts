import { NextRequest } from "next/server";
import { nextRedirect } from "./next-redirect";
import { ADMIN_PAGES, PUBLIC_PAGES } from "@/constants/routes";

export const redirectToLoginOrNotFound = (request: NextRequest) => {
    const pathname = request.nextUrl.pathname;
    const isAdminPage = pathname.startsWith(ADMIN_PAGES.HOME) || pathname.startsWith(ADMIN_PAGES.MANAGER);

    return nextRedirect(isAdminPage ? "/404" : PUBLIC_PAGES.LOGIN, request.url);
};
