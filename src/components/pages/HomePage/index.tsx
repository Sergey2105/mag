"use client";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import { useTranslations } from "next-intl";
import Phone from "@/shared/img/Phone.png";
import Image from "next/image";
import Link from "next/link";
import { ADMIN_PAGES, DASHBOARD_PAGES, PREMIUM_PAGES, PUBLIC_PAGES } from "@/constants/routes";
import { useQuery } from "@tanstack/react-query";
const pages = [PUBLIC_PAGES.LOGIN, DASHBOARD_PAGES.PROFILE, PREMIUM_PAGES.HOME, ADMIN_PAGES.HOME, ADMIN_PAGES.MANAGER];

export default function HomePage() {
    const t = useTranslations("Home");

    return (
        <div>
            <h1 className="mt-4">Home Page</h1>
            <br />
            <p>Для проверки, есть страницы:</p>
            <br />
            <ul className="space-y-2">
                {pages.map((page) => (
                    <li key={page}>
                        <Link className="text-primary hover:underline" href={page}>
                            {page}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
