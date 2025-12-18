"use client";

import cartService from "@/services/cart.service";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProfile } from "./useProfile";
import { useGuestCartStore } from "@/stores/guest.store";

export function useRemoveFromCart() {
    const { user } = useProfile();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (cartItemId: string) => {
            if (!user.isLoggedIn) {
                useGuestCartStore.getState().removeItem(cartItemId);
                return useGuestCartStore.getState().items;
            } else {
                const { data } = await cartService.removeFromCart(cartItemId);
                return data.items;
            }
        },
        onSuccess: (updatedCart) => {
            if (!user.isLoggedIn) {
                queryClient.setQueryData(["cart", false], updatedCart);
            } else {
                queryClient.invalidateQueries({
                    queryKey: ["cart", true],
                });
            }
        },
    });

    return mutation;
}
