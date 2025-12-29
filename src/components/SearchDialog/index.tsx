"use client";

import { useState } from "react";
import { CommandDialog, CommandInput, CommandList, CommandGroup, CommandItem, Command, CommandEmpty } from "@/components/ui/command";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebouce";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/ui/Loader";
import Link from "next/link";
import { AxiosResponse } from "axios";

interface SearchDialogProps<T, C> {
    onSearch: (query: string) => Promise<AxiosResponse<T[]>>;
    renderItem: (item: T) => React.ReactNode;
    getItemKey: (item: T) => string | number;
    getItemHref: (item: T) => string;
    placeholder?: string;

    initialData?: {
        onSearch: () => Promise<AxiosResponse<C[]>>;
        renderItem: (item: C) => React.ReactNode;
        getItemKey: (item: C) => string | number;
        getItemHref: (item: C) => string;
        searchLabel?: string;
    };
    searchLabel?: string;
}

export function SearchDialog<T, C>(props: SearchDialogProps<T, C>) {
    const { onSearch, renderItem, getItemKey, getItemHref, initialData, searchLabel = "Результат", placeholder = "Поиск..." } = props;

    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const valueOnChange = useDebounce((value: string) => {
        setSearchQuery(value || "");
    }, 300);

    const {
        data: categoriesData,
        isLoading: categoriesLoading,
        isError: categoriesError,
    } = useQuery({
        queryKey: ["dialog-initial-data"],
        queryFn: () => initialData!.onSearch(),
        select: (d) => d.data,
        enabled: !!initialData && open,
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });

    const { data, isLoading, isFetching, isError } = useQuery({
        queryKey: ["dialog-search", searchQuery],
        queryFn: () => onSearch(searchQuery.trim()),
        select: (d) => d.data,
        enabled: !!searchQuery,
    });

    const showCategories = !searchQuery && initialData;
    const showSearchResults = !!searchQuery;

    return (
        <>
            <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
                <Search className="w-4 h-4" />
                <span className="sr-only">Поиск</span>
            </Button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <Command shouldFilter={false}>
                    <CommandInput placeholder={placeholder} onValueChange={(value) => valueOnChange(value)} />
                    <CommandList>
                        {showCategories && (
                            <CommandGroup heading={initialData.searchLabel || "Категории"}>
                                {categoriesLoading && (
                                    <div className="py-4 text-center text-gray-500">
                                        <Loader size="sm" fullScreen={false} />
                                    </div>
                                )}

                                {categoriesError && <div className="py-4 text-center text-red-500">Ошибка загрузки</div>}

                                {categoriesData && categoriesData.length === 0 && <CommandEmpty>Категории не найдены</CommandEmpty>}

                                {categoriesData?.map((item: C) => (
                                    <CommandItem key={initialData.getItemKey(item)} value={String(initialData.getItemKey(item))} asChild>
                                        <Link href={initialData.getItemHref(item)} onClick={() => setOpen(false)} className="flex items-center gap-3 py-2">
                                            {initialData.renderItem(item)}
                                        </Link>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}

                        {showSearchResults && (
                            <CommandGroup heading={searchLabel}>
                                {(isLoading || isFetching) && (
                                    <div className="py-4 text-center text-gray-500">
                                        <Loader size="sm" fullScreen={false} />
                                    </div>
                                )}

                                {isError && <div className="py-4 text-center text-red-500">Ошибка загрузки</div>}

                                {data && data.length === 0 && !isFetching && <CommandEmpty>Ничего не найдено</CommandEmpty>}

                                {data?.map((item: T) => (
                                    <CommandItem key={getItemKey(item)} value={String(getItemKey(item))} asChild>
                                        <Link href={getItemHref(item)} onClick={() => setOpen(false)} className="flex items-center gap-3 py-2">
                                            {renderItem(item)}
                                        </Link>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </CommandDialog>
        </>
    );
}
