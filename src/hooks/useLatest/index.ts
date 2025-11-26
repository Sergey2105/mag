import { MutableRefObject, useEffect, useRef } from "react";

export const useLatest = <T>(value: T): MutableRefObject<T> => {
    const valueRef = useRef(value);

    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    return valueRef;
};