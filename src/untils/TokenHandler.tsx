// "use client";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { saveTokenStorage } from "@/services/auth/auth-token.service";

// export default function TokenHandler() {
//     const searchParams = useSearchParams();
//     const router = useRouter();

//     useEffect(() => {
//         const accessToken = searchParams.get("accessToken");
//         if (accessToken) {
//             saveTokenStorage(accessToken);
//             router.replace("/profile");
//         }
//     }, [searchParams, router]);

//     return null;
// }

"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveTokenStorage } from "@/services/auth/auth-token.service";

export default function TokenHandler() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const accessToken = searchParams.get("accessToken");

        if (accessToken) {
            saveTokenStorage(accessToken);
        }

        if (window.opener) {
            window.opener.postMessage({ type: "oauth_token", accessToken }, "*");
            setTimeout(() => window.close(), 50);
        } else {
            // mobile
            window.history.replaceState({}, "", window.location.pathname);
            router.replace("/profile");
        }
    }, [searchParams, router]);

    return null;
}
