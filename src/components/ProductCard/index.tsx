import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBasket } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductCard(props: any) {
    const { id, name, price, images, category, className, slug } = props;
    return (
        <Link
            href={`/catalog/${slug}/${id}`}
            id={id}
            className={cn("relative cursor-pointer group rounded-2xl border border-amber-500 flex flex-col w-full pt-4 pb-6 px-4 md:px-6", className)}
        >
            <Badge className="absolute z-20">Предзаказ</Badge>

            <div className="relative w-full h-full aspect-square">
                <Image src={images[0]} alt={name} fill className="object-contain transition-transform duration-300 group-hover:scale-110" />
            </div>

            <div className="relative z-20 flex flex-col justify-end h-[110px] mt-2">
                <span className="text-[14px] text-[#2f80ed] font-regular">{category}</span>
                <div className="flex flex-col md:flex-row justify-between gap-2 mt-1">
                    <span className="text-[16px] font-bold">{name}</span>
                    <span className="text-[15px] font-bold self-end">{price}</span>
                </div>
                <div className="mt-2.5">
                    <Button className="w-full">
                        <ShoppingBasket className="size-5" />
                        Купить
                    </Button>
                </div>
            </div>
        </Link>
    );
}
