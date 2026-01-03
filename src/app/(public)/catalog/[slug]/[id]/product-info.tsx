"use client";

import ProductCardControls from "@/components/ProductCardControls";
import { Price, PriceValue } from "@/components/ui/price";
import { useAddToCart } from "@/hooks/useAddToCart";
import { cn } from "@/lib/utils";

interface ProductInfoProps {}

export default function ProductInfo(props: any) {
    const { id, name, images, price, description, discountPrice, isHasSecondDiscount, className } = props;

    const product = { id, name, images, price, discountPrice, isHasSecondDiscount };

    const mutation = useAddToCart();

    const handleAddToCart = (quantity: number) => {
        mutation.mutate({
            product,
            quantity: quantity,
        });
    };

    return (
        <div className={cn("space-y-8", className)}>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">{name}</h2>
            <div className="flex flex-col gap-1 border-b pb-2">
                <p className="text-[18px] font-normal text-neutral-400">Статус:</p>
                <p className="text-[16px] font-normal">Под заказ</p>
            </div>
            <div className="flex flex-col gap-1">
                {/* <p className="text-[32px] font-semibold">{price}</p> */}
                <Price>
                    <PriceValue className="text-[32px] font-semibold" price={price} currency="RUB" />
                </Price>
                <ProductCardControls handleAddToCart={handleAddToCart} quantityClassName="flex" />
            </div>
            <div className="">
                <p className="text-[18px] font-normal text-neutral-400">Описание:</p>
                <p className="text-[16px] font-normal">{description}</p>
            </div>
        </div>
    );
}
