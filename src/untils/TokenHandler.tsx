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
        // 1) Попытка взять токен из URL (для мобильных)
        const accessToken = searchParams.get("accessToken");
        if (accessToken) {
            saveTokenStorage(accessToken);
            router.replace("/profile");
            return;
        }

        // 2) Ожидание токена через postMessage (popup)
        const handler = (event: MessageEvent) => {
            if (event.data?.type === "oauth_token" && event.data.token) {
                saveTokenStorage(event.data.token);
                router.replace("/profile");
            }
        };

        window.addEventListener("message", handler);

        return () => window.removeEventListener("message", handler);
    }, [searchParams, router]);

    return null;
}
