"use client";

import { MENU } from "@/components/layout/Header/menu.data";
import { MenuItem } from "@/components/layout/Header/MenuItem";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ModeToggle } from "@/components/ModeToggle";
import { usePathname } from "next/navigation";
import { match } from "path-to-regexp";

export function Menu() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center gap-6">
            {MENU.map((menuItem) => (
                <MenuItem key={menuItem.name} menuItem={menuItem} isActive={!!match(menuItem.href)(pathname)} />
            ))}
            <div className="flex items-center gap-2">
                <LocaleSwitcher />
                <ModeToggle />
            </div>
        </nav>
    );
}
