"use client";
import { useCart } from "@/hooks/useCart";
import { useProfile } from "@/hooks/useProfile";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CartItemsList } from "./CartItemsList";
import { PromoSection } from "./PromoSection";
import { SecondItemModal } from "./SecondItemModal";
import { useCheckout } from "./useCheckout";
import { IProduct } from "@/types/product.interface";
import { Button } from "@/components/ui/button";

interface Props {
    products: IProduct[];
}

export function Cart({ products }: Props) {
    const { cartItems } = useCart();
    console.log(cartItems);
    const { user } = useProfile();

    const router = useRouter();

    const [isShowSecondItemModal, setIsShowSecondItemModal] = useState(false);

    const [promoCode, setPromoCode] = useState("");
    const [discountValue, setDiscountValue] = useState(0);

    const subTotal = cartItems.reduce((acc, item) => acc + (item.asSecondItem ? item.product.discountPrice : item.product.price) * item.quantity, 0);

    const finalTotal = subTotal - subTotal * (discountValue / 100);

    const [notInCartProducts, setNotInCartProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        if (isShowSecondItemModal) {
            const cartIds = new Set(cartItems.map((item) => item.product.id));
            const filtered = products.filter((product) => !cartIds.has(product.id)); //удаляем элменты которые есть в карзине
            setNotInCartProducts(filtered.slice(0, 3)); //3 элента покзываем
        }
    }, [isShowSecondItemModal, cartItems, products]);

    const { checkout, isPending } = useCheckout({
        promoCode,
    });

    return (
        <div className="wrapper">
            <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>

            <CartItemsList cartItems={cartItems} onShowSecondItemModal={() => setIsShowSecondItemModal(true)} />

            {!!cartItems.length && (
                <div className="mt-4 border-t pt-4">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subTotal.toFixed(2)}</span>
                    </div>
                    {user.isLoggedIn && (
                        <PromoSection subTotal={subTotal} discountValue={discountValue} promoCode={promoCode} setPromoCode={setPromoCode} setDiscountValue={setDiscountValue} />
                    )}
                    <div className="flex justify-between mt-4 text-lg font-semibold">
                        <span>Total</span>
                        <span>${finalTotal.toFixed(2)}</span>
                    </div>
                </div>
            )}

            {!!cartItems.length &&
                (user.isLoggedIn ? (
                    <div className="mt-6">
                        <Button className="w-full" onClick={() => checkout()} disabled={isPending}>
                            {isPending ? "Processing..." : "Checkout"}
                        </Button>
                    </div>
                ) : (
                    <div className="mt-6">
                        <Button className="w-full" onClick={() => router.push("/login")}>
                            Login to checkout
                        </Button>
                    </div>
                ))}

            {isShowSecondItemModal && <SecondItemModal notInCartProducts={notInCartProducts} setIsShowSecondItemModal={setIsShowSecondItemModal} />}
        </div>
    );
}
