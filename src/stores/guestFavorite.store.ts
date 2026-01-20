"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IGuestFavoriteStore {
    items: string[];
    toggle: (product: string) => void;
}

export const useGuestFavoriteStore = create(
    persist<IGuestFavoriteStore>(
        (set, get) => ({
            items: [],
            toggle: (productId) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((itemId) => itemId === productId);

                if (existingItem) {
                    set({
                        items: get().items.filter((itemId) => itemId !== productId),
                    });
                } else {
                    set({
                        items: [...currentItems, productId],
                    });
                }
            },
        }),
        {
            name: "guestFavoriteStore",
        },
    ),
);
