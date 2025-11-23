"use client";

import { Smartphone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CatalogItem(props: any) {
    const { name, imageURL } = props;

    const link = name
        .toLowerCase()
        .trim()
        .replace(/[\s\_]+/g, "-")
        .replace(/[^\p{L}\p{N}\-]+/gu, "")
        .replace(/\-+/g, "-");

    return (
        <>
            <Link href={`/catalog/${link}`} className="group flex flex-col items-center gap-3 rounded-2xl bg-[#EDEDED] px-6 py-4 h-full w-full">
                <div className="relative w-[clamp(120px,14vw,150px)] h-[clamp(120px,14vw,150px)] overflow-hidden">
                    <Image src={imageURL} alt={name} fill className="object-contain transition-transform duration-300 group-hover:scale-110" />
                </div>

                <span className="text-[16px] text-center font-medium leading-5 h-[2.8em] overflow-hidden line-clamp-2">{name}</span>
            </Link>
        </>
    );
}
