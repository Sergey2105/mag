"use client";
import { MENU } from "@/components/layout/Header/menu.data";
import { MenuItem } from "@/components/layout/Header/MenuItem";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { match } from "path-to-regexp";

export function Menu() {
    const pathname = usePathname();

    return (
        <>
            <div className="flex items-center gap-14">
                <nav className="flex items-center gap-12">
                    {MENU.map((menuItem) => (
                        <MenuItem key={menuItem.name} menuItem={menuItem} isActive={!!match(menuItem.href)(pathname)} />
                    ))}
                </nav>
                <nav className="flex items-center gap-6">
                    <Link href="/">
                        <Button variant="outline" size="icon">
                            <ShoppingCart className="size-5" />
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button variant="outline" size="icon">
                            <Heart className="size-5" />
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button variant="outline" size="icon">
                            <User className="size-5" />
                        </Button>
                    </Link>
                </nav>
                <div className="flex items-center gap-2">
                    <LocaleSwitcher />
                    <ModeToggle />
                </div>
            </div>
        </>
    );
}
