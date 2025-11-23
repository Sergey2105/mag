"use client";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import { useTranslations } from "next-intl";
import Phone from "@/shared/img/Phone.png";
import Image from "next/image";
import Link from "next/link";
import { PAGES } from "@/constants/routes";

export default function Home() {
    const t = useTranslations("Home");

    return (
        <>
            <div className="bg-linear-to-r from-[#211C24] to-[#211C24] flex flex-col justify-center">
                <div className="wrapper flex items-center justify-between h-full">
                    <div className="flex flex-col gap-6 items-start">
                        <span className="text-[25px] text-white/80 font-semibold leading-8"> Pro.Beyond.</span>
                        <Title text="IPhone 14 Pro" size="2xl" className="text-white" />
                        <span className="text-[18px] text-[#909090] font-medium leading-6">Created to change everything for the better. For everyone</span>
                        <Button variant="transparent" size="lg" asChild>
                            <Link href={PAGES.CATALOG.ROOT}> Shop Now</Link>
                        </Button>
                    </div>
                    <div>
                        <Image src={Phone} alt={"Телефон"} className="w-[406px] h-[632px]" />
                    </div>
                </div>
            </div>
        </>
    );
}
