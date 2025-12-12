import { useCallback } from "react";

export function useOAuthPopup() {
    const openPopup = useCallback((url: string, name = "oauth_popup") => {
        const width = 500;
        const height = 650;

        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        // На телефонах popup невозможен → открываем вкладку
        if (isMobile) {
            window.open(url, "_blank");
            return;
        }

        // Центрированное popup окно
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        const popup = window.open(
            url,
            name,
            `popup=yes,toolbar=no,location=no,status=no,menubar=no,
      scrollbars=yes,resizable=no,
      width=${width},height=${height},top=${top},left=${left}`,
        );

        if (!popup) {
            alert("Браузер блокирует popup. Разреши окна.");
        }
    }, []);

    return openPopup;
}
