"use client";

import { AllStoresProvider } from "@/providers/AllStoresProvider";
import QueryProvider from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextIntlClientProvider } from "next-intl";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

type ProvidersProps = PropsWithChildren & {
    locale: string;
    messages: Record<string, any>;
};

export function Providers({ children, locale, messages }: ProvidersProps) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <AllStoresProvider>
                    <QueryProvider>
                        <Toaster />
                        <NuqsAdapter>{children}</NuqsAdapter>
                    </QueryProvider>
                </AllStoresProvider>
            </NextIntlClientProvider>
        </ThemeProvider>
    );
}
