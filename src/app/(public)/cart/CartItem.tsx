import { Price, PriceValue } from "@/components/ui/price";
import { useRemoveFromCart } from "@/hooks/cart/useRemoveFromCart";
import { ISimpleCartItem } from "@/types/cart.types";
import { Heart, Trash2 } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { QuantityButton } from "@/components/ui/buttons/QuantityButton";
import { Button } from "@/components/ui/button";
import { useQuantityIncrementInCart } from "@/hooks/cart/useQuantityIncrementInCart";
import { useQuantityDecrementInCart } from "@/hooks/cart/useQuantityDecrementInCart";

interface CartItemProps {
    info: ISimpleCartItem;
}

export function CartItem(props: CartItemProps) {
    const { info } = props;
    const remove = useRemoveFromCart();
    const increment = useQuantityIncrementInCart();
    const decrement = useQuantityDecrementInCart();

    const changeQuantityIncrement = () => {
        if (info.quantity < info.product.stock) {
            increment.mutate(info.id);
        }
    };

    return (
        <Card className="pt-3 pb-6 px-3 lg:px-6 lg:pt-6 lg:pb-7 2xl:px-4 2xl:pt-4 2xl:pb-4 flex flex-col md:flex-row items-start md:items-center justify-between">
            <CardContent className="flex items-center  w-full gap-4 px-0 py-0">
                <Image src={info.product.images[0]} alt={info.product.name} width={100} height={100} />
                <div className="flex flex-col md:flex-row  gap-2">
                    <span className="text-[16px] font-bold">{info.product.name}</span>
                    <Price>
                        <PriceValue className="text-[18px] font-bold" price={Number(info.product.price.toFixed(2))} currency="RUB" />
                    </Price>
                </div>
            </CardContent>
            <CardFooter className="px-0 py-0 gap-2 w-full justify-end">
                <Button variant="outline" size="icon" onClick={() => remove.mutate(info.id)}>
                    <Trash2 className="size-5" />
                    <span className="sr-only">Удалить</span>
                </Button>
                <Button variant="outline" size="icon">
                    <Heart className="size-5" />
                    <span className="sr-only">Избранное</span>
                </Button>
                <QuantityButton value={info.quantity} changePlus={changeQuantityIncrement} changeMinus={() => decrement.mutate(info.id)} />
            </CardFooter>
        </Card>
    );
}
