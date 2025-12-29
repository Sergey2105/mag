import { getUserLocale } from "@/services/locale.service";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
    const locale = await getUserLocale();

    return {
        locale,
        timeZone: "Europe/Moscow",
        messages: (await import(`../../messages/${locale}.json`)).default,
    };
});
