"use client";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DASHBOARD_PAGES, PUBLIC_PAGES } from "@/constants/routes";
import { useCart } from "@/hooks/useCart";
import { Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export function Menu() {
    const { totalCount } = useCart();

    return (
        <div className="flex items-center gap-2">
            <nav className="flex items-center gap-2">
                <Link href={DASHBOARD_PAGES.PROFILE}>
                    <Button variant="outline" size="icon">
                        <User className="size-5" />
                        <span className="sr-only">Профиль</span>
                    </Button>
                </Link>
                <Link href={PUBLIC_PAGES.FAVORITES}>
                    <Button variant="outline" size="icon">
                        <Heart className="size-5" />
                        <span className="sr-only">Избранное</span>
                    </Button>
                </Link>
                <Link href={PUBLIC_PAGES.CART} className="relative w-fit">
                    <Button variant="outline" size="icon">
                        <ShoppingCart className="size-5" />
                        <span className="sr-only">Корзина</span>
                        {totalCount > 0 && <Badge className="absolute -top-2.5 -right-2.5 h-5 min-w-5 px-1 tabular-nums">{totalCount}</Badge>}
                    </Button>
                </Link>
            </nav>
            <div className="lg:flex items-center gap-2 hidden">
                <LocaleSwitcher />
                <ThemeToggle />
            </div>
        </div>
    );
}
