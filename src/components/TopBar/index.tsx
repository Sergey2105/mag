"use client";
import { Button } from "@/components/ui/button";
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useRouter } from "next/navigation";

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
        <div className="flex justify-end w-full">
            <div className="flex gap-2 flex-col md:flex-row w-full">
                <div className="flex gap-2">
                    <Button className="flex-1 w-full" onClick={() => setSort("asc")}>
                        <ArrowDownWideNarrow className="size-5" />
                        Дешевле
                    </Button>
                    <Button className="flex-1 w-full" onClick={() => setSort("desc")}>
                        <ArrowUpNarrowWide className="size-5" />
                        Дороже
                    </Button>
                </div>
                <Button onClick={resetAll}>Сбросить</Button>
            </div>
        </div>
    );
}
