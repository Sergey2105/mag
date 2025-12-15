"use client";
//коллекцися для фильтров
import { useState, useCallback } from "react";

export function useSetState<T>(initial?: Iterable<T>) {
    const [set, setSet] = useState<Set<T>>(new Set(initial));

    const add = useCallback((item: T) => {
        setSet((prev) => new Set(prev).add(item));
    }, []);

    const remove = useCallback((item: T) => {
        setSet((prev) => {
            const newSet = new Set(prev);
            newSet.delete(item);
            return newSet;
        });
    }, []);

    const toggle = useCallback((item: T) => {
        setSet((prev) => {
            const newSet = new Set(prev);
            newSet.has(item) ? newSet.delete(item) : newSet.add(item);
            return newSet;
        });
    }, []);

    const reset = useCallback(() => {
        setSet(new Set());
    }, []);

    const setAll = useCallback((items: Iterable<T>) => {
        setSet(new Set(items));
    }, []);

    return { setValue: set, add, remove, toggle, reset, setAll };
}
