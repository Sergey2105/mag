"use client";
import Link from "next/link";
import Image from "next/image";
import { PUBLIC_PAGES } from "@/constants/routes";
import { memo } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export interface ICatalogItemProps {
    name: string;
    slug: string;
    images: string;
}

export default memo(function CatalogItem(props: ICatalogItemProps) {
    const { name, images, slug } = props;

    return (
        <Link href={PUBLIC_PAGES.CATALOG.BY_SLUG(slug)}>
            <Card className="group gap-3 px-6 py-4">
                <CardContent className="px-0 py-0 flex items-center justify-center">
                    <div className="relative w-[clamp(120px,14vw,150px)] h-[clamp(120px,14vw,150px)] overflow-hidden aspect-square">
                        <Image src={images} alt={name} fill className="object-contain transition-transform duration-300 group-hover:scale-110" />
                    </div>
                </CardContent>
                <CardFooter className="px-0 py-0">
                    <div className="w-full flex flex-col items-center">
                        <span className="text-[16px] text-center font-semibold leading-5 h-[2.8em] overflow-hidden line-clamp-2">{name}</span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
});
