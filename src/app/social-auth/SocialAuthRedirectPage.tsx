"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import SocialEmailForm from "./SocialEmailForm";
import { LoaderCircleIcon } from "lucide-react";
import { PUBLIC_PAGES } from "@/constants/routes";
import { AuthToken } from "@/services/auth/auth.types";
import { saveAccessToken } from "@/services/auth/auth-token.service";

export function SocialAuthRedirectPage() {
    const searchParams = useSearchParams();
    const needEmail = searchParams.get("needEmail");

    const router = useRouter();

    useEffect(() => {
        const accessToken = searchParams.get(AuthToken.ACCESS_TOKEN);
        if (accessToken) saveAccessToken(accessToken);

        if (!needEmail) router.replace(PUBLIC_PAGES.HOME);
    }, []);

    if (needEmail) {
        return <SocialEmailForm />;
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <LoaderCircleIcon className="animate-spin" />
        </div>
    );
}
