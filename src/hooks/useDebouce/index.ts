export interface DebounceFunc<T extends (...args: any[]) => any> {
    (...args: Parameters<T>): ReturnType<T> | void;
}

export default function debounce<T extends (...args: any[]) => any>(func: T, timeout = 100): DebounceFunc<T> {
    let timer;

    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            // @ts-ignore
            func.apply(this, args);
        }, timeout);
    };
}
import { useLatest } from "../useLatest";
import { useMemo } from "react";

export const useDebounce = <T extends (...args: any) => any>(cb: T, ms: number): DebounceFunc<T> => {
    const cbRef = useLatest(cb);
    return useMemo(() => {
        return debounce(cbRef.current, ms);
    }, [cbRef, ms]);
};
