"use client";

import { ReactNode } from "react";
import { createContext, useContext } from "react";

import { cn } from "@/lib/utils";

const PriceContext = createContext<{ onSale?: boolean }>({ onSale: false });
export const usePriceContext = () => useContext(PriceContext);

interface PriceProps {
    className?: string;
    children: ReactNode;
    onSale?: boolean;
}

interface PriceValueProps {
    price?: number;
    currency?: string;
    variant?: "regular" | "sale";
    className?: string;
    locale?: string;
    minus?: boolean;
}

export type PriceType = {
    currency?: string;
    regular: number;
    sale?: number;
};

const formatterCache = new Map<string, Intl.NumberFormat>();

function formatCurrency(value: number, currency = "RUB", locale = "ru-RU") {
    const key = `${locale}-${currency}`;
    if (!formatterCache.has(key)) {
        formatterCache.set(key, new Intl.NumberFormat(locale, { style: "currency", currency }));
    }
    return formatterCache.get(key)!.format(value);
}

const Price = ({ className, children, onSale }: PriceProps) => {
    return (
        <PriceContext.Provider value={{ onSale }}>
            <div className={cn("flex flex-wrap items-center gap-x-2", className)}>{children}</div>
        </PriceContext.Provider>
    );
};

const PriceValue = ({ price, currency = "RUB", locale = "ru-RU", variant = "regular", className, minus = false }: PriceValueProps) => {
    const { onSale } = usePriceContext();

    if (price == null) return null;

    return (
        <span className={cn("leading-tight", variant === "regular" ? (onSale ? "text-muted-foreground line-through" : "text-foreground") : "text-foreground", className)}>
            {minus ? "- " : ""}
            {formatCurrency(price, currency, locale)}
        </span>
    );
};

export { Price, PriceValue };
