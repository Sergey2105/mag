"use client";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import { useTranslations } from "next-intl";
import Phone from "@/shared/img/Phone.png";
import Image from "next/image";
import Link from "next/link";
import { PAGES } from "@/constants/routes";

export default function HomePage() {
    const t = useTranslations("Home");

    return <div className="wrapper">Главная</div>;
}
