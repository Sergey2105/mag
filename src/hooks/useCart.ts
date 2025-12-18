import { ICartItem } from "@/types/cart.types";
import { useQuery } from "@tanstack/react-query";
import { useProfile } from "./useProfile";
import { useGuestCartStore } from "@/stores/guest.store";
import cartService from "@/services/cart.service";
import { useMemo } from "react";

export function useCart() {
    const { user } = useProfile();

    const guestItems = useGuestCartStore((s) => s.items);

    const fetchCartItems = async (): Promise<ICartItem[]> => {
        try {
            const { data } = await cartService.getCart();
            return data?.items || [];
        } catch {
            return [];
        }
    };

    const { data = [], isLoading } = useQuery({
        queryKey: ["cart", user.isLoggedIn],
        queryFn: fetchCartItems,
        enabled: Boolean(user.isLoggedIn),
    });

    const cartItems = useMemo(() => {
        if (user.isLoggedIn) {
            return data ?? [];
        }
        return guestItems;
    }, [user.isLoggedIn, data, guestItems]);

    const totalCount = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);

    return {
        cartItems,
        totalCount,
        isLoading,
    };
}
