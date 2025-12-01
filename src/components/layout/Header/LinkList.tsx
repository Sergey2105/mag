"use client";
import { MENU } from "@/components/layout/Header/menu.data";
import { MenuItem } from "@/components/layout/Header/MenuItem";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { match } from "path-to-regexp";

export function LinkList(props: { className?: string }) {
    const { className } = props;
    const pathname = usePathname();

    return (
        <nav className={cn("", className)}>
            {MENU.map((menuItem) => (
                <MenuItem key={menuItem.name} menuItem={menuItem} isActive={!!match(menuItem.href)(pathname)} />
            ))}
        </nav>
    );
}
