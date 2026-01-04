import { ICartItem } from "@/types/cart.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useProfile } from "./useProfile";
import { useGuestCartStore } from "@/stores/guest.store";
import cartService from "@/services/cart.service";
import { useMemo, useEffect } from "react";

export function useCart() {
    const { user, isLoading: isUserLoading } = useProfile();
    const guestItems = useGuestCartStore((s) => s.items);
    const clearGuestCart = useGuestCartStore((s) => s.clearCart);
    const queryClient = useQueryClient();

    const fetchCartItems = async (): Promise<ICartItem[]> => {
        try {
            const { data } = await cartService.getCart();
            return data?.items || [];
        } catch {
            return [];
        }
    };

    const { data = [], isLoading: isCartLoading } = useQuery({
        queryKey: ["cart", user.isLoggedIn],
        queryFn: fetchCartItems,
        enabled: Boolean(user.isLoggedIn),
    });
    
    useEffect(() => {
        async function mergeCart() {
            if (!user.isLoggedIn || guestItems.length === 0) return;

            try {
                await cartService.syncCart(
                    guestItems.map((item) => ({
                        product: { id: item.product.id },
                        quantity: item.quantity,
                        asSecondItem: item.product.isHasSecondDiscount || false,
                    })),
                );

                clearGuestCart();

                queryClient.invalidateQueries({
                    queryKey: ["cart", true],
                });
            } catch (e) {
                console.error("Cart sync failed:", e);
            }
        }

        mergeCart();
    }, [user.isLoggedIn]);

    const cartItems = useMemo(() => {
        if (isUserLoading) {
            return guestItems.length > 0 ? guestItems : [];
        }

        if (!user.isLoggedIn) return guestItems;

        if (isCartLoading && guestItems.length > 0) return guestItems;

        return data;
    }, [isUserLoading, user.isLoggedIn, isCartLoading, data, guestItems]);

    const totalCount = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);

    const isLoading = isUserLoading || (user.isLoggedIn && isCartLoading);

    return {
        cartItems,
        totalCount,
        isLoading,
    };
}