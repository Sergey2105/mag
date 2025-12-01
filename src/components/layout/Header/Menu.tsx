"use client";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export function Menu() {
    return (
        <div className="flex items-center gap-2">
            <nav className="flex items-center gap-2">
                <Link href="/">
                    <Button variant="outline" size="icon">
                        <User className="size-5" />
                    </Button>
                </Link>
                <Link href="/">
                    <Button variant="outline" size="icon">
                        <Heart className="size-5" />
                    </Button>
                </Link>
                <Link href="/">
                    <Button variant="outline" size="icon">
                        <ShoppingCart className="size-5" />
                    </Button>
                </Link>
            </nav>
            <div className="flex items-center gap-2">
                <LocaleSwitcher />
                <ModeToggle />
            </div>
        </div>
    );
}
