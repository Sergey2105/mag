"use client";
import Link from "next/link";
import Image from "next/image";
import { PUBLIC_PAGES } from "@/constants/routes";
import { memo } from "react";

export interface ICatalogItemProps {
    name: string;
    slug: string;
    images: string;
}

export default memo(function CatalogItem(props: ICatalogItemProps) {
    const { name, images, slug } = props;

    return (
        <Link
            href={PUBLIC_PAGES.CATALOG.BY_SLUG(slug)}
            className="group flex flex-col items-center gap-3 rounded-2xl px-6 py-4 h-full w-full bg-[#EDEDED] dark:bg-[rgba(47,128,237,0.5)]"
        >
            <div className="relative w-[clamp(120px,14vw,150px)] h-[clamp(120px,14vw,150px)] overflow-hidden">
                <Image src={images} alt={name} fill className="object-contain transition-transform duration-300 group-hover:scale-110" />
            </div>

            <span className="text-[16px] text-center font-semibold leading-5 h-[2.8em] overflow-hidden line-clamp-2">{name}</span>
        </Link>
    );
});
