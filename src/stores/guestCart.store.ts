"use client";

import { ISimpleCartItem } from "@/types/cart.types";
import { TCartProduct } from "@/types/product.interface";
import { createId } from "@paralleldrive/cuid2";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IGuestCartStore {
    items: ISimpleCartItem[];
    addItem: (product: TCartProduct, quantity: number) => void;
    removeItem: (cartItemId: string) => void;
    clearCart: () => void;
    incrementItem: (cartItemId: string) => void;
    decrementItem: (cartItemId: string) => void;
    setItems: (items: ISimpleCartItem[]) => void;
}

export const useGuestCartStore = create(
    persist<IGuestCartStore>(
        (set, get) => ({
            items: [],
            addItem: (product, quantity) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.product.id === product.id);

                if (existingItem) {
                    const updated = currentItems.map((item) =>
                        item.product.id === product.id
                            ? {
                                  ...item,
                                  quantity: Math.min(item.quantity + quantity, item.product.stock),
                              }
                            : item,
                    );

                    set({ items: updated });
                } else {
                    set({
                        items: [
                            ...currentItems,
                            {
                                id: createId(),
                                product,
                                quantity: Math.min(quantity, product.stock),
                            },
                        ],
                    });
                }
            },
            removeItem: (cartItemId: string) => {
                set({
                    items: get().items.filter((item) => item.id !== cartItemId),
                });
            },
            clearCart: () => {
                set({ items: [] });
            },
            incrementItem: (cartItemId: string) => {
                set({
                    items: get().items.map((item) => {
                        if (item.id !== cartItemId) return item;
                        if (item.quantity >= item.product.stock) return item;
                        return { ...item, quantity: item.quantity + 1 };
                    }),
                });
            },
            decrementItem: (cartItemId: string) => {
                const { items, removeItem } = get();
                const item = items.find((item) => item.id === cartItemId);

                if (!item) return;

                if (item.quantity === 1) {
                    removeItem(cartItemId);
                    return;
                }
                set({
                    items: items.map((item) => (item.id === cartItemId ? { ...item, quantity: item.quantity - 1 } : item)),
                });
            },
            setItems: (items) => {
                set({ items });
            },
        }),
        {
            name: "guestCartStore",
        },
    ),
);
