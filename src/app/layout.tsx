import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { AllStoresProvider } from "@/providers/AllStoresProvider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Header } from "@/components/layout/Header/Header";
import QueryProvider from "@/providers/QueryProvider";
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/seo.constants";

const proximaNova = localFont({
    src: [
        {
            path: "../shared/fonts/ProximaNova-Regular.woff2",
            weight: "400",
            style: "normal",
            //font-normal
        },
        {
            path: "../shared/fonts/ProximaNova-Medium.woff2",
            weight: "500",
            style: "normal",
            //font-medium
        },
        {
            path: "../shared/fonts/ProximaNova-Semibold.woff2",
            weight: "600",
            style: "normal",
            //font-semibold
        },
        {
            path: "../shared/fonts/ProximaNova-Semibold.woff2",
            weight: "700",
            style: "normal",
            //font-bold
        },
    ],
    variable: "--font-proxima",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        absolute: SITE_NAME,
        template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={proximaNova.className}>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                    <NextIntlClientProvider>
                        <AllStoresProvider>
                            <QueryProvider>
                                <main className="min-h-screen">
                                    <Header />
                                    <NuqsAdapter>{children}</NuqsAdapter>
                                </main>
                            </QueryProvider>
                        </AllStoresProvider>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
