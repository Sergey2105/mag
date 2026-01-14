import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/ui/buttons/BackButton";
import { getTranslations } from "next-intl/server";
import { DASHBOARD_PAGES, PUBLIC_PAGES } from "@/constants/routes";

export default async function NotFound() {
    const t = await getTranslations("NotFound");

    return (
        <div className="wrapper flex-1 flex items-center justify-center">
            <div className="max-w-md w-full text-center">
                <div className="relative mb-8">
                    <h1 className="text-9xl font-bold text-gray-200 select-none">404</h1>
                </div>
                <div className="space-y-4 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{t("title")}</h2>
                    <p className="text-gray-600 dark:text-gray-200 leading-relaxed">{t("description")}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="outline" size="lg" asChild>
                        <Link href={PUBLIC_PAGES.HOME}>
                            <Home size={18} className="text-black dark:text-white" />
                            {t("home")}
                        </Link>
                    </Button>

                    <BackButton>{t("back")}</BackButton>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t("popularity")}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        <Badge variant="secondary" asChild>
                            <Link href={PUBLIC_PAGES.CONTACTS}>{t("contact")}</Link>
                        </Badge>
                        <Badge variant="secondary" asChild>
                            <Link href={PUBLIC_PAGES.ABOUT}>{t("about")}</Link>
                        </Badge>
                        <Badge variant="secondary" asChild>
                            <Link href={DASHBOARD_PAGES.PROFILE}>{t("profile")}</Link>
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    );
}
