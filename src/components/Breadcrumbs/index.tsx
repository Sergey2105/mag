// "use client";

// import { MENU } from "@/components/layout/Header/menu.data";
// import { cn } from "@/lib/utils";
// import { useTranslations } from "next-intl";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function Breadcrumbs(props: any) {
//     const { className, lastLabel } = props;
//     const t = useTranslations("Navigation");
//     const pathname = usePathname();

//     const segments = pathname.split("/").filter(Boolean);

//     const crumbs = segments.map((segment, index) => {
//         const href = "/" + segments.slice(0, index + 1).join("/");

//         // ищем в MENU
//         const found = MENU.find((item) => item.href === href);

//         let label = found ? found.name : segment.charAt(0).toUpperCase() + segment.slice(1);

//         // если это последний элемент и есть кастомный label → заменяем
//         if (index === segments.length - 1 && lastLabel) {
//             label = lastLabel;
//         }

//         return { href, label };
//     });

//     return (
//         <div className={cn("flex items-center space-x-2 text-sm", className)}>
//             <Link href="/" className="text-gray-500 hover:text-black transition">
//                 {t("Home")}
//             </Link>

//             {crumbs.map((item, index) => (
//                 <div key={item.href} className="flex items-center space-x-2">
//                     <span className="text-gray-400">/</span>

//                     {index === crumbs.length - 1 ? (
//                         <span className="font-medium text-black">
//                             {item.label === lastLabel ? item.label : MENU.find((m) => m.href === item.href) ? t(item.label) : item.label}
//                         </span>
//                     ) : (
//                         <Link href={item.href} className="text-gray-500 hover:text-black transition">
//                             {MENU.find((m) => m.href === item.href) ? t(item.label) : item.label}
//                         </Link>
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// }

"use client";

import { MENU } from "@/components/layout/Header/menu.data";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbsProps {
    className?: string;
    lastLabel?: string;
}

export default function Breadcrumbs({ className, lastLabel }: BreadcrumbsProps) {
    const t = useTranslations("Navigation");
    const pathname = usePathname();

    const segments = pathname.split("/").filter(Boolean);

    const crumbs = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");

        const found = MENU.find((item) => item.href === href);

        let label = found ? found.name : segment.charAt(0).toUpperCase() + segment.slice(1);

        if (index === segments.length - 1 && lastLabel) {
            label = lastLabel;
        }

        return { href, label };
    });

    return (
        <Breadcrumb className={cn("text-sm", className)}>
            <BreadcrumbItem>
                <Link href="/" className="text-gray-500 hover:text-black transition">
                    {t("Home")}
                </Link>
            </BreadcrumbItem>

            {crumbs.map((item, index) => {
                const isLast = index === crumbs.length - 1;

                return (
                    <BreadcrumbItem key={item.href}>
                        {isLast ? (
                            <span className="font-medium text-black">{item.label}</span>
                        ) : (
                            <Link href={item.href} className="text-gray-500 hover:text-black transition">
                                {item.label}
                            </Link>
                        )}
                    </BreadcrumbItem>
                );
            })}
        </Breadcrumb>
    );
}
