"use client";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PUBLIC_PAGES } from "@/constants/routes";
import ProductCardControls from "@/components/ProductCardControls";
import { useAddToCart } from "@/hooks/useAddToCart";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Price, PriceValue } from "@/components/ui/price";

export default function ProductItem(props: any) {
    const { id, name, price, images, category, className, slug, discountPrice, isHasSecondDiscount } = props;
    const product = { id, name, images, price, discountPrice, isHasSecondDiscount };

    const mutation = useAddToCart();

    const handleAddToCart = (quantity: number) => {
        mutation.mutate({
            product,
            quantity: quantity,
        });
    };

    return (
        <>
            <Link href={PUBLIC_PAGES.CATALOG.PRODUCT(slug, id)} id={id}>
                <Card className={cn("group pt-3 pb-6 px-3 lg:px-6 lg:pt-6 lg:pb-7 2xl:px-4 2xl:pt-4 2xl:pb-4", className)}>
                    <CardContent className="px-0 py-0">
                        <Badge className="absolute z-20">Предзаказ</Badge>
                        <div className="relative w-full h-full aspect-square">
                            <Image src={images[0]} alt={name} fill className="object-contain transition-transform duration-300 group-hover:scale-110" />
                        </div>
                    </CardContent>
                    <CardFooter className="px-0 py-0">
                        <div className="relative z-20 w-full flex flex-col justify-end h-27.5">
                            <span className="text-[14px] text-[#2f80ed] font-regular">{category}</span>
                            <div className="flex flex-col md:flex-row justify-between gap-2 mt-1">
                                <span className="text-[16px] font-bold">{name}</span>
                                <Price className="self-end">
                                    <PriceValue className="text-[18px] font-bold" price={price} currency="RUB" />
                                </Price>
                            </div>

                            <ProductCardControls className="mt-2.5" handleAddToCart={handleAddToCart} />
                        </div>
                    </CardFooter>
                </Card>
            </Link>
        </>
    );
}
