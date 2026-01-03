"use client";
import { Button } from "@/components/ui/button";
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Filters from "@/components/Filters";

export default function TopBar(props: any) {
    const { className } = props;
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [sort, setSort] = useQueryState(
        "sort",
        parseAsString.withDefault("").withOptions({
            shallow: false,
            clearOnDefault: true,
        }),
    );

    const resetAll = () => {
        const params = new URLSearchParams(searchParams);
        params.forEach((_, key) => {
            if (key !== "page") params.delete(key);
        });

        const query = params.toString();

        router.replace(query ? `${pathname}?${query}` : pathname);
    };

    return (
        <div className="flex flex-col md:flex-row justify-end gap-2 w-full">
            <div className="flex gap-2 flex-col md:flex-row">
                <div>
                    <Filters />
                </div>
                <div className="flex gap-2">
                    <Button className="flex-1 w-full" onClick={() => setSort("asc")} variant={sort === "asc" ? "default" : "outline"}>
                        <ArrowDownWideNarrow className="size-5" />
                        Дешевле
                    </Button>
                    <Button className="flex-1 w-full" onClick={() => setSort("desc")} variant={sort === "desc" ? "default" : "outline"}>
                        <ArrowUpNarrowWide className="size-5" />
                        Дороже
                    </Button>
                </div>
                <Button onClick={resetAll}>Сбросить</Button>
            </div>
        </div>
    );
}
