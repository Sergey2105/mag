import { ICartItem } from "@/types/cart.types";
import { useQuery } from "@tanstack/react-query";
import { useProfile } from "./useProfile";
import { useGuestCartStore } from "@/stores/guest.store";
import cartService from "@/services/cart.service";
import { useMemo } from "react";

export function useCart() {
    const { user, isLoading: isUserLoading } = useProfile();

    const guestItems = useGuestCartStore((s) => s.items);

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

    const cartItems = useMemo(() => {
        if (isUserLoading) {
            return [];
        }

        if (user.isLoggedIn) {
            if (isCartLoading) {
                return [];
            }
            return data ?? [];
        }
        return guestItems;
    }, [user.isLoggedIn, data, guestItems, isUserLoading, isCartLoading]);

    const totalCount = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);

    const isLoading = isUserLoading || (user.isLoggedIn && isCartLoading);

    return {
        cartItems,
        totalCount,
        isLoading,
    };
}
// import CartService from "@/services/cart.service";

// export function useCart() {
//     const { user } = useProfile();

//     const guestItems = useGuestCartStore((s) => s.items);

//     const fetchCartItems = async (): Promise<ICartItem[]> => {
//         try {
//             const { data } = await CartService.getCart();
//             return data?.items || [];
//         } catch {
//             return [];
//         }
//     };

//     const { data = [], isLoading } = useQuery({
//         queryKey: ["cart", user.isLoggedIn],
//         queryFn: fetchCartItems,
//         enabled: Boolean(user.isLoggedIn),
//     });

//     const cartItems = user.isLoggedIn ? data : guestItems;

//     return {
//         cartItems,
//         isLoading,
//     };
// }
