"use client";

import { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Funnel } from "lucide-react";
import FiltersContent from "@/components/Filters/FiltersContent";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function Filters() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <div className="sm:hidden">
                <Button onClick={() => setIsOpen(true)} className="w-full">
                    <Funnel className="size-5" /> Фильтры
                </Button>
                <Drawer open={isOpen} onOpenChange={setIsOpen}>
                    <DrawerContent className="pb-6 px-4">
                        <DrawerHeader className="sr-only">
                            <DrawerTitle>Фильтры</DrawerTitle>
                        </DrawerHeader>
                        <FiltersContent className="py-6" />
                    </DrawerContent>
                </Drawer>
            </div>

            <div className="hidden sm:block">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="w-full">
                            <Funnel className="size-5" /> Фильтры
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[320px] pb-6">
                        <FiltersContent />
                    </PopoverContent>
                </Popover>
            </div>
        </>
    );
}
