import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getLocale, getMessages } from "next-intl/server";
import { Header } from "@/components/layout/Header/Header";
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/seo.constants";
import { Providers } from "@/providers/Providers";

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
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={proximaNova.className}>
                <main className="flex flex-col min-h-screen">
                    <Providers locale={locale} messages={messages}>
                        {children}
                    </Providers>
                </main>
            </body>
        </html>
    );
}
