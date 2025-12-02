"use client";

import { useState } from "react";
import { CommandDialog, CommandInput, CommandList, CommandGroup, CommandItem, Command } from "@/components/ui/command";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebouce";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import Link from "next/link";
import { AxiosResponse } from "axios";

interface SearchDialogProps<T> {
    onSearch: (query: string) => Promise<AxiosResponse<T[]>>;
    renderItem: (item: T) => React.ReactNode;
    getItemKey: (item: T) => string | number;
    getItemHref: (item: T) => string;
    placeholder?: string;
}

export function SearchDialog<T>(props: SearchDialogProps<T>) {
    const { onSearch, renderItem, getItemKey, getItemHref, placeholder = "Поиск..." } = props;

    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const valueOnChange = useDebounce((value: string) => {
        setSearchQuery(value || "");
    }, 300);

    const { data, isLoading, isFetching, isError } = useQuery({
        queryKey: ["dialog-search", searchQuery],
        queryFn: () => onSearch(searchQuery.trim()),
        select: (d) => d.data,
        enabled: !!searchQuery,
    });

    return (
        <>
            <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
                <Search className="w-4 h-4" />
            </Button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <Command shouldFilter={false}>
                    <CommandInput placeholder={placeholder} onValueChange={(value) => valueOnChange(value)} />

                    <CommandList>
                        <CommandGroup heading="Результаты">
                            {(isLoading || isFetching) && (
                                <div className="py-4 text-center text-gray-500">
                                    <Loader size="sm" fullScreen={false} />
                                </div>
                            )}

                            {isError && <div className="py-4 text-center text-red-500">Ошибка загрузки</div>}

                            {data && data.length === 0 && !isFetching && <div className="py-4 text-center text-gray-400">Ничего не найдено</div>}

                            {data &&
                                data?.map((item: T) => (
                                    <CommandItem key={getItemKey(item)} value={String(getItemKey(item))} asChild>
                                        <Link href={getItemHref(item)} onClick={() => setOpen(false)} className="flex items-center gap-3 py-2">
                                            {renderItem(item)}
                                        </Link>
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CommandDialog>
        </>
    );
}
