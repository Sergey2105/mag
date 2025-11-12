import { ModeOption } from "@/types/settings.interface";
import { useTranslations } from "next-intl";

export function useLanguageModeToggleData(): ModeOption[] {
    const t = useTranslations("ModeToggler");
    return [
        { value: "dark", label: t("dark") },
        { value: "light", label: t("light") },
        // { value: "system", label: t("system") },
    ];
}
