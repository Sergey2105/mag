"use client";

import cartService from "@/services/cart.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProfile } from "./useProfile";
import { TCartProduct } from "@/types/product.interface";
import { useGuestCartStore } from "@/stores/guest.store";

interface AddToCartArgs {
    product: TCartProduct;
    quantity: number;
    asSecondItem?: boolean;
}

export function useAddToCart() {
    const { user } = useProfile();
    const queryClient = useQueryClient();

    const { addItem } = useGuestCartStore();

    const mutation = useMutation({
        mutationFn: async ({ product, quantity, asSecondItem }: AddToCartArgs) => {
            if (!user.isLoggedIn) {
                addItem(product, quantity, asSecondItem);

                return { status: "guest-added" };
            } else {
                const { data } = await cartService.addToCart(product.id, quantity, asSecondItem);
                return data;
            }
        },
        onSuccess: () => {
            if (user.isLoggedIn) {
                queryClient.invalidateQueries({
                    queryKey: ["cart", user.isLoggedIn],
                });
            }
        },
    });

    return mutation;
}
