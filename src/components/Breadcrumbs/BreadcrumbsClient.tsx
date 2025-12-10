"use client";

import { MENU } from "@/components/layout/Header/menu.data";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import Link from "next/link";
import { SlashIcon } from "lucide-react";

interface BreadcrumbsClientProps {
    className?: string;
    lastLabel?: string;
    categories: any[];
}

export default function BreadcrumbsClient(props: BreadcrumbsClientProps) {
    const { className, lastLabel, categories } = props;
    const t = useTranslations("Navigation");
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    const crumbs = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");

        const found = MENU.find((item) => item.href === href);

        const category = categories?.find((cat) => cat.slug === segment);

        let label = found ? found.name : category ? category.name : segment.charAt(0).toUpperCase() + segment.slice(1);

        if (index === segments.length - 1 && lastLabel) {
            label = lastLabel;
        }

        return { href, label, isCategory: !!category };
    });

    return (
        <Breadcrumb className={cn("text-sm", className)}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">{t("Home")}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {crumbs.map((item, index) => {
                    const isLast = index === crumbs.length - 1;
                    const menuItem = MENU.find((m) => m.href === item.href);

                    return (
                        <Fragment key={item.href}>
                            <BreadcrumbSeparator>
                                <SlashIcon />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{item.label === lastLabel ? item.label : menuItem ? t(item.label) : item.label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={item.href}>{menuItem ? t(item.label) : item.label}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
