"use client";

import { cn } from "@/lib/utils";
import React from "react";

export type Variant = {
    name: string;
    value: string;
    disabled?: boolean;
};

interface Props {
    items: readonly Variant[];
    onClick?: (value: Variant["value"]) => void;
    value?: Variant["value"];
    className?: string;
}

export const GroupVariants: React.FC<Props> = ({ items, onClick, className, value }) => {
    return (
        <div className={cn("flex justify-between rounded-3xl select-none h-fit w-full", "bg-[#F3F3F7] dark:bg-[#1A1A1C]", className)}>
            {items.map((item) => (
                <button
                    key={item.name}
                    onClick={() => onClick?.(item.value)}
                    className={cn("flex items-center justify-center cursor-pointer h-[30px] px-3 flex-1 rounded-3xl transition-all duration-400 text-sm", {
                        "bg-white shadow dark:bg-[#2A2A2C] dark:shadow-md": item.value === value,

                        "text-gray-500 opacity-50 pointer-events-none dark:text-gray-400": item.disabled,
                    })}
                >
                    {item.name}
                </button>
            ))}
        </div>
    );
};
