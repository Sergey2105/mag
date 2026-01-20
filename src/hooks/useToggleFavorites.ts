"use client";

import cartService from "@/services/cart.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TCartProduct } from "@/types/product.interface";
import { useGuestCartStore } from "@/stores/guestCart.store";
import { AuthTokenService } from "@/services/auth/auth-token.service";
import { useProfile } from "./useProfile";
import { useGuestFavoriteStore } from "@/stores/guestFavorite.store";
import favoritesService from "@/services/favorites.service";

interface AddToCartArgs {
    productId: string;
}

export function useToggleFavorites() {
    const { user, isLoading: isUserLoading } = useProfile();
    const queryClient = useQueryClient();

    const { toggle } = useGuestFavoriteStore();

    const mutation = useMutation({
        mutationFn: async ({ productId }: AddToCartArgs) => {
            const hasToken = Boolean(AuthTokenService());
            const isLoggedIn = hasToken && user.isLoggedIn;

            if (!isLoggedIn) {
                toggle(productId);
                return { status: "favorites-added" };
            } else {
                const { data } = await favoritesService.toggleFavorites(productId);
                return data;
            }
        },
        onSuccess: (data, variables) => {
            const hasToken = Boolean(AuthTokenService());
            if (hasToken && user.isLoggedIn) {
                queryClient.invalidateQueries({
                    queryKey: ["favorites", user.isLoggedIn],
                });
            }
        },
    });

    return mutation;
}
