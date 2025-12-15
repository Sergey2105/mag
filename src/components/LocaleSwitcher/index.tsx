"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { setUserLocale } from "@/services/locale.services";
import { Locale } from "@/i18n/config";
import { useLanguagesSwitcherData } from "@/hooks/useLanguagesSwitcherData";

export function LocaleSwitcher() {
    const LANGUAGES = useLanguagesSwitcherData();

    const switchLanguage = (value: Locale) => {
        setUserLocale(value);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Languages className="h-[1.2rem] w-[1.2rem] transition-all" />
                    <span className="sr-only">Язык</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {LANGUAGES.map((lang) => (
                    <DropdownMenuItem key={lang.value} onClick={() => switchLanguage(lang.value)}>
                        {lang.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
