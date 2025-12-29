"use client";

import { Button } from "@/components/ui/button";
import promoService from "@/services/promo.service";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
    subTotal: number;
    promoCode: string;
    setPromoCode: (promoCode: string) => void;
    discountValue: number;
    setDiscountValue: Dispatch<SetStateAction<number>>;
}

export function PromoSection({ subTotal, promoCode, setPromoCode, discountValue, setDiscountValue }: Props) {
    const promoDiscount = subTotal * (discountValue / 100);

    const [promoError, setPromoError] = useState<string | null>(null);

    const { mutate: checkPromo, isPending: isCheckingPromo } = useMutation({
        mutationFn: (code: string) => promoService.checkPromo(code),
        onSuccess: (data) => {
            const discount = data?.data;
            if (discount) {
                setDiscountValue(discount);
                setPromoError(null);
            } else {
                setDiscountValue(0);
                setPromoError("Promo code is invalid");
            }
        },
        onError: () => {
            setDiscountValue(0);
            setPromoError("Error checking promo code");
        },
    });

    return (
        <div>
            {discountValue > 0 && (
                <div className="flex justify-between text-green-600">
                    <span>Promo discount</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                </div>
            )}
            <div className="mt-6">
                <label className="block mb-2 font-medium">Promo code:</label>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button
                        onClick={() => {
                            setPromoError(null);
                            checkPromo(promoCode);
                        }}
                        disabled={isCheckingPromo}
                    >
                        {isCheckingPromo ? "Checking..." : "Apply"}
                    </Button>
                    <Button onClick={() => setDiscountValue(0)}>Сбросить</Button>
                </div>
                {promoError && <div className="mt-2 text-red-500">{promoError}</div>}
            </div>
        </div>
    );
}
