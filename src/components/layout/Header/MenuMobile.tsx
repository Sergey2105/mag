"use client";

import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { LinkList } from "./LinkList";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "../../../shared/icon/Logo.svg";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface MenuMobileProps {
    className?: string;
}

export function MenuMobile(props: MenuMobileProps) {
    const { className } = props;
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className={cn("", className)}>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <MenuIcon className="size-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-75">
                    <SheetHeader>
                        <SheetTitle>
                            <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                                <Logo className="text-black dark:text-white" />
                            </Link>
                        </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-2.5 p-4 pt-0">
                        <LinkList className="flex flex-col gap-4" onClick={() => setOpen(false)} />
                    </div>
                    <SheetFooter>
                        <div className="flex justify-end gap-3">
                            <LocaleSwitcher />
                            <ModeToggle />
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
