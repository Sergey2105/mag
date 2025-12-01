"use client";

import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { LinkList } from "./LinkList";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";

export function MenuMobile() {
    return (
        <div className="lg:hidden">
            <Sheet>
                <SheetTrigger>
                    <Button variant="outline" size="icon">
                        <MenuIcon className="size-5" />
                    </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-[300px] p-6">
                    <div className="flex flex-col gap-6 mt-6">
                        {/* Nav links */}
                        <LinkList className="flex flex-col gap-12" />

                        {/* Language & Theme */}
                    </div>
                    <SheetFooter>
                        <div className="flex items-center gap-3">
                            <LocaleSwitcher />
                            <ModeToggle />
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
