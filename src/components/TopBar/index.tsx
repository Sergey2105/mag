"use client";
import { Button } from "@/components/ui/button";
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useRouter } from "next/navigation";
import Filters from "@/components/Filters";

export default function TopBar(props: any) {
    const { className, count } = props;
    const router = useRouter();

    const [sort, setSort] = useQueryState(
        "sort",
        parseAsString.withDefault("").withOptions({
            shallow: true,
            clearOnDefault: true,
        }),
    );

    const resetAll = () => {
        router.replace(window.location.pathname);
        console.log(window.location.pathname);
    };

    return (
        <div className="flex flex-col md:flex-row justify-end gap-2 w-full">
            <div className="flex gap-2 flex-col md:flex-row">
                <div>
                    <Filters />
                </div>
                <div className="flex gap-2">
                    <Button className="flex-1 w-full" onClick={() => setSort("asc")} variant="outline">
                        <ArrowDownWideNarrow className="size-5" />
                        Дешевле
                    </Button>
                    <Button className="flex-1 w-full" onClick={() => setSort("desc")} variant="outline">
                        <ArrowUpNarrowWide className="size-5" />
                        Дороже
                    </Button>
                </div>
                <Button onClick={resetAll}>Сбросить</Button>
            </div>
        </div>
    );
}
