import { IMenuItem } from "@/components/layout/Header/menu.data";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface Props {
    menuItem: IMenuItem;
    isActive: boolean;
}

export function MenuItem(props: Props) {
    const { menuItem, isActive } = props;
    const t = useTranslations("Navigation");

    return (
        <Link className={cn("transition-colors text-[16px] font-medium", !isActive ? "opacity-60" : "text-black dark:text-white")} href={menuItem.href}>
            {t(menuItem.name)}
        </Link>
    );
}
