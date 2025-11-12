"use client";
import { cn } from "@/lib/utils";
import { IWrapper } from "@/types/settings.interface";

export default function Wrapper(props: IWrapper) {
    const { children, className, onClick = () => null } = props;
    return (
        <div
            onClick={onClick}
            className={cn("aspect-square w-min h-min flex items-center p-[24px] border bg-background shadow-xs dark:bg-input/30 dark:border-input rounded-md", className)}
            {...props}
        >
            {children}
        </div>
    );
}
