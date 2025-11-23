import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { AllStoresProvider } from "@/providers/AllStoresProvider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Header } from "@/components/layout/Header/Header";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({
    subsets: ["latin", "cyrillic"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Next Store",
    description: "Next Store mobile",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={inter.className}>
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
