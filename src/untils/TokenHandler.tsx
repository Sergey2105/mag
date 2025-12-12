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
        if (!accessToken) return;

        // Сохраняем токен через auth-token.service
        saveTokenStorage(accessToken);

        if (window.opener && !window.opener.closed) {
            // Desktop popup: передаем токен родителю и закрываем
            window.opener.postMessage({ type: "oauth_token", token: accessToken }, "*");
            setTimeout(() => window.close(), 100);
        } else {
            // Mobile / обычная вкладка: чистим URL и редиректим
            window.history.replaceState({}, "", window.location.pathname);
            router.replace("/profile");
        }
    }, [searchParams, router]);

    return null;
}
