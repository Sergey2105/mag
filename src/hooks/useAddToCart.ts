"use client";

import cartService from "@/services/cart.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProfile } from "./useProfile";
import { TCartProduct } from "@/types/product.interface";
import { useGuestCartStore } from "@/stores/guest.store";
import { AuthTokenService } from "@/services/auth/auth-token.service";

interface AddToCartArgs {
    product: TCartProduct;
    quantity: number;
    asSecondItem?: boolean;
}

export function useAddToCart() {
    const { user, isLoading: isUserLoading } = useProfile();
    const queryClient = useQueryClient();

    const { addItem } = useGuestCartStore();

    const mutation = useMutation({
        mutationFn: async ({ product, quantity, asSecondItem }: AddToCartArgs) => {
            const hasToken = Boolean(AuthTokenService());
            const isLoggedIn = hasToken && user.isLoggedIn;

            if (!isLoggedIn) {
                addItem(product, quantity, asSecondItem);
                return { status: "guest-added" };
            } else {
                const { data } = await cartService.addToCart(product.id, quantity, asSecondItem);
                return data;
            }
        },
        onSuccess: (data, variables) => {
            const hasToken = Boolean(AuthTokenService());
            if (hasToken && user.isLoggedIn) {
                queryClient.invalidateQueries({
                    queryKey: ["cart", user.isLoggedIn],
                });
            }
        },
    });

    return mutation;
}
