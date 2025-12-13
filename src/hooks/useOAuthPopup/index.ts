"use client";
import { useCallback, useRef } from "react";
import { saveTokenStorage, EnumTokens } from "@/services/auth/auth-token.service";

export function useOAuthPopup() {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const openPopup = useCallback((url: string) => {
        const width = 500;
        const height = 650;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        const popup = window.open(url, "oauth_popup", `width=${width},height=${height},top=${top},left=${left}`);

        if (!popup) {
            alert("Разрешите popup-окна для входа через социальные сети");
            return;
        }

        const handler = (event: MessageEvent) => {
            if (event.data?.type === "oauth_token" && event.data.token) {
                saveTokenStorage(event.data.token);
                window.removeEventListener("message", handler);
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                window.dispatchEvent(new CustomEvent("auth_update"));
                window.location.href = "/profile";
            }
        };

        window.addEventListener("message", handler);

        // Автоматическое закрытие обработчика через 5 минут
        timeoutRef.current = setTimeout(
            () => {
                window.removeEventListener("message", handler);
            },
            5 * 60 * 1000,
        );

        // Возвращаем функцию для очистки
        return () => {
            window.removeEventListener("message", handler);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return openPopup;
}
