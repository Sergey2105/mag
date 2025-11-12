import { LanguageOption } from "@/types/settings.interface";
import { useTranslations } from "next-intl";

export function useLanguagesSwitcherData(): LanguageOption[] {
    const t = useTranslations("LocaleSwitcher");
    return [
        { value: "ru", label: t("ru") },
        { value: "en", label: t("en") },
    ];
}
