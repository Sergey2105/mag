"use client";
import { MENU } from "@/components/layout/Header/menu.data";
import { MenuItem } from "@/components/layout/Header/MenuItem";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { match } from "path-to-regexp";

interface LinkListProps {
    className?: string;
    onClick?: () => void;
}

export function LinkList(props: LinkListProps) {
    const { className, onClick } = props;
    const pathname = usePathname();
    const rootSegment = "/" + pathname.split("/")[1];

    return (
        <nav className={cn("", className)}>
            {MENU.map((menuItem) => (
                <MenuItem key={menuItem.name} menuItem={menuItem} isActive={!!match(menuItem.href)(rootSegment)} onClick={onClick} />
            ))}
        </nav>
    );
}
