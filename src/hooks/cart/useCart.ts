import { ICartItem } from "@/types/cart.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useProfile } from "../useProfile";
import { useGuestCartStore } from "@/stores/guestCart.store";
import cartService from "@/services/cart.service";
import { useMemo, useEffect, useRef } from "react";

interface normalizedGuestCartItem {
    quantity: number;
    product: {
        id: string;
        name: string;
        images: string[];
        price: number;
        discountPrice: number;
        isAvailable: boolean;
        stock: number;
    };
}

export function useCart() {
    const { user, isLoading: isUserLoading } = useProfile();
    const guestItems = useGuestCartStore((s) => s.items); // вот
    const removeGuestItem = useGuestCartStore((s) => s.removeItem);
    const setGuestItems = useGuestCartStore((s) => s.setItems);
    const clearGuestCart = useGuestCartStore((s) => s.clearCart);
    const queryClient = useQueryClient();
    const normalizedRef = useRef(false);

    const fetchCartItems = async (): Promise<ICartItem[]> => {
        try {
            const { data } = await cartService.getCart();
            return data?.items || [];
        } catch {
            return [];
        }
    };

    const fetchNormalizedItems = async (items: { items: { productId: string; quantity: number }[] }): Promise<normalizedGuestCartItem[]> => {
        try {
            const { data } = await cartService.normalizeGuestCart(items);
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

    const { data: normalizedItems, isLoading: isValidating } = useQuery({
        queryKey: ["normalize-guest-cart", guestItems.map((i) => `${i.product.id}-${i.quantity}`).join(",")],
        queryFn: () =>
            fetchNormalizedItems({
                items: guestItems.map((item) => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                })),
            }),
        enabled: !user.isLoggedIn && guestItems.length > 0,
        refetchInterval: 30_000,
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        if (!normalizedItems || normalizedItems.length === 0) return;

        const oldItemsMap = new Map(guestItems.map((item) => [item.product.id, item.id]));

        const nextItems = normalizedItems.map((item) => ({
            id: oldItemsMap.get(item.product.id) ?? crypto.randomUUID(),
            product: {
                id: item.product.id,
                name: item.product.name,
                images: item.product.images,
                price: item.product.price,
                discountPrice: item.product.discountPrice,
                isAvailable: item.product.isAvailable,
                stock: item.product.stock,
            },
            quantity: Math.min(item.quantity, item.product.stock),
        }));

        // сделат ьчтобы обновдление былот толкьо если данные изменилсь
        setGuestItems(nextItems);
    }, [normalizedItems]);

    useEffect(() => {
        async function mergeCart() {
            if (!user.isLoggedIn || guestItems.length === 0) return;

            try {
                await cartService.syncCart(
                    guestItems.map((item) => ({
                        product: { id: item.product.id },
                        quantity: item.quantity,
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
