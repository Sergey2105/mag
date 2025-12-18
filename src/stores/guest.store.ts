"use client";

import { ISimpleCartItem } from "@/types/cart.types";
import { TCartProduct } from "@/types/product.interface";
import { createId } from "@paralleldrive/cuid2";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IGuestCartStore {
    items: ISimpleCartItem[];
    addItem: (product: TCartProduct, quantity: number, asSecondItem?: boolean) => void;
    removeItem: (cartItemId: string) => void;
    clearCart: () => void;
}

export const useGuestCartStore = create(
    persist<IGuestCartStore>(
        (set, get) => ({
            items: [],
            addItem: (product, quantity, asSecondItem) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.product.id === product.id);

                if (existingItem) {
                    const updated = currentItems.map((item) =>
                        item.product.id === product.id
                            ? {
                                  ...item,
                                  quantity: item.quantity + quantity,
                                  asSecondItem,
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
                                quantity,
                                asSecondItem,
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
        }),
        {
            name: "guestCartStore",
        },
    ),
);
