"use client";
import { useCart } from "@/hooks/cart/useCart";
import { useProfile } from "@/hooks/useProfile";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CartItemsList } from "./CartItemsList";
import { PromoSection } from "./PromoSection";
import { useCheckout } from "./useCheckout";
import { IProduct } from "@/types/product.interface";
import { Button } from "@/components/ui/button";
import { Price, PriceValue } from "@/components/ui/price";
import { PUBLIC_PAGES } from "@/constants/routes";
import { cn } from "@/lib/utils";

interface CartProps {
    className?: string;
}

export function Cart(props: CartProps) {
    const { className } = props;
    const router = useRouter();
    const { user } = useProfile();
    const { cartItems } = useCart();
    console.log(cartItems);

    const [promoCode, setPromoCode] = useState("");
    const [discountValue, setDiscountValue] = useState(0);

    const subTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const finalTotal = subTotal - subTotal * (discountValue / 100);

    const { checkout, isPending } = useCheckout({
        promoCode,
    });

    return (
        <div className={cn("", className)}>
            <CartItemsList cartItems={cartItems} />

            {!!cartItems.length && (
                <div className="mt-4 border-t pt-4">
                    <div className="flex justify-between">
                        <span>Товары</span>
                        <Price>
                            <PriceValue className="text-[18px] font-bold" price={Number(subTotal.toFixed(2))} currency="RUB" />
                        </Price>
                    </div>
                    {user.isLoggedIn && (
                        <PromoSection subTotal={subTotal} discountValue={discountValue} promoCode={promoCode} setPromoCode={setPromoCode} setDiscountValue={setDiscountValue} />
                    )}
                    <div className="flex justify-between mt-4 text-lg font-semibold">
                        <span>Итог</span>
                        <Price>
                            <PriceValue className="text-[18px] font-bold" price={Number(finalTotal.toFixed(2))} currency="RUB" />
                        </Price>
                    </div>
                </div>
            )}

            {!!cartItems.length &&
                (user.isLoggedIn ? (
                    <div className="mt-6">
                        <Button className="w-full" onClick={() => checkout()} disabled={isPending}>
                            {isPending ? "Processing..." : "Заказать"}
                        </Button>
                    </div>
                ) : (
                    <div className="mt-6">
                        <Button className="w-full" onClick={() => router.push(PUBLIC_PAGES.LOGIN)}>
                            Войдите чтобы оформить заказ
                        </Button>
                    </div>
                ))}
        </div>
    );
}
