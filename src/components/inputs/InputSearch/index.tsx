"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useClickOutside } from "@reactuses/core";
import { useDebounce } from "@/hooks/useDebouce";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/ui/Loader";
import { AxiosResponse } from "axios";

interface InputSearchProps<T> {
    className?: string;
    onSearch: (query: string) => Promise<AxiosResponse<T[]>>;
    renderItem: (item: T) => React.ReactNode;
    getItemKey: (item: T) => string | number;
    getItemHref: (item: T) => string;
}

export function InputSearch<T>(props: InputSearchProps<T>) {
    const { className, onSearch, renderItem, getItemKey, getItemHref } = props;
    const [searchQuery, setSearchQuery] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [focused, setFocused] = useState(false);
    const ref = useRef(null);

    const valueOnChange = useDebounce((value: string) => {
        setSearchQuery(value || "");
    }, 300);

    useClickOutside(ref, () => {
        setFocused(false);
    });

    const { data, isLoading, isFetching, isError } = useQuery({
        queryKey: ["search", searchQuery],
        queryFn: () => onSearch(searchQuery.trim()),
        select: (data) => data.data,
        enabled: !!searchQuery,
    });

    const onClickItem = () => {
        setFocused(false);
        setSearchQuery("");
        setInputValue("");
    };

    return (
        <>
            {focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}

            <div ref={ref} className={cn("flex rounded-2xl flex-1 justify-between relative h-11 z-30", className)}>
                <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
                <input
                    className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
                    type="text"
                    placeholder="Поиск"
                    value={inputValue}
                    onFocus={() => setFocused(true)}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        valueOnChange(e.target.value);
                    }}
                />

                {focused && searchQuery !== "" && (
                    <div
                        className={cn(
                            "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
                            "max-h-[496px] overflow-y-auto",
                            focused && "visible opacity-100 top-12",
                        )}
                    >
                        {(isLoading || isFetching) && (
                            <div className="py-2 text-center text-gray-500">
                                <Loader size="sm" fullScreen={false} />
                            </div>
                        )}

                        {isError && <div className="py-2 text-center text-red-500">Ошибка загрузки</div>}

                        {data && data.length === 0 && !isFetching && <div className="py-2 text-center text-gray-400">Ничего не найдено</div>}

                        {data && data.length > 0 && !isFetching && (
                            <>
                                {data.map((item: T) => (
                                    <Link
                                        onClick={onClickItem}
                                        key={getItemKey(item)}
                                        className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                                        href={getItemHref(item)}
                                    >
                                        {renderItem(item)}
                                    </Link>
                                ))}
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
