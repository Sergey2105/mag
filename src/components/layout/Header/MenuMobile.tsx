"use client";

import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { MenuList } from "./MenuList";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "../../../shared/icon/Logo.svg";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PUBLIC_PAGES } from "@/constants/routes";

interface MenuMobileProps {
    className?: string;
}

export function MenuMobile(props: MenuMobileProps) {
    const { className } = props;
    const [open, setOpen] = useState<boolean>(false);
    const pathname = usePathname();

    useEffect(() => {
        setOpen(false);
    }, [pathname]);
    return (
        <div className={cn("", className)}>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <MenuIcon className="size-5" />
                        <span className="sr-only">Меню</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-75">
                    <SheetHeader>
                        <SheetTitle>
                            <Link href={PUBLIC_PAGES.HOME} className="flex items-center gap-3">
                                <Logo className="text-black dark:text-white" />
                                <span className="sr-only">Логотип</span>
                            </Link>
                        </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-2.5 p-4 pt-0">
                        <MenuList className="flex flex-col gap-4" />
                    </div>
                    <SheetFooter>
                        <div className="flex justify-end gap-3">
                            <LocaleSwitcher />
                            <ThemeToggle />
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
