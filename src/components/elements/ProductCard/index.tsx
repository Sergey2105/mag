import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBasket } from "lucide-react";
import { cn } from "@/lib/utils";
import { PUBLIC_PAGES } from "@/constants/routes";
import ProductControls from "@/components/ProductControls";

export default function ProductCard(props: any) {
    const { id, name, price, images, category, className, slug } = props;
    return (
        <Link
            href={PUBLIC_PAGES.CATALOG.PRODUCT(slug, id)}
            id={id}
            className={cn(
                "relative cursor-pointer group rounded-2xl border border-amber-500 flex flex-col w-full pt-3 pb-6 px-3 lg:px-6 lg:pt-6 lg:pb-7 2xl:px-4 2xl:pt-4 2xl:pb-4",
                className,
            )}
        >
            <Badge className="absolute z-20">Предзаказ</Badge>

            <div className="relative w-full h-full aspect-square">
                <Image src={images[0]} alt={name} fill className="object-contain transition-transform duration-300 group-hover:scale-110" />
            </div>

            <div className="relative z-20 flex flex-col justify-end h-[110px] mt-2">
                <span className="text-[14px] text-[#2f80ed] font-regular">{category}</span>
                <div className="flex flex-col md:flex-row justify-between gap-2 mt-1">
                    <span className="text-[16px] font-bold">{name}</span>
                    <span className="text-[18px] font-bold self-end">{price}</span>
                </div>

                <ProductControls className="mt-2.5" />
            </div>
        </Link>
    );
}
