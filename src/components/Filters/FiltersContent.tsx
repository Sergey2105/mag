"use client";
import { Input } from "@/components/ui/input";
import { RangeSlider } from "@/components/ui/RangeSlider";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebouce";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import { GroupVariants } from "@/components/GroupVariants";
import { cn } from "@/lib/utils";

const MIN_PRICE = 0;
const MAX_PRICE = 20000;

interface FiltersContentProps {
    className?: string;
}

export default function FiltersContent(props: FiltersContentProps) {
    const { className } = props;
    const [priceFrom, setPriceFrom] = useQueryState(
        "priceFrom",
        parseAsInteger.withDefault(MIN_PRICE).withOptions({
            shallow: false,
            clearOnDefault: true,
        }),
    );

    const [priceTo, setPriceTo] = useQueryState(
        "priceTo",
        parseAsInteger.withDefault(MAX_PRICE).withOptions({
            shallow: false,
            clearOnDefault: true,
        }),
    );

    const debouncedSetPriceFrom = useDebounce(setPriceFrom, 300);
    const debouncedSetPriceTo = useDebounce(setPriceTo, 300);

    const [price, setPrice] = useState({
        priceFrom: priceFrom,
        priceTo: priceTo,
    });

    useEffect(() => {
        setPrice({
            priceFrom,
            priceTo,
        });
    }, [priceFrom, priceTo]);

    const [stockQuery, setStockQuery] = useQueryState(
        "stock",
        parseAsString.withDefault("all").withOptions({
            shallow: false,
            clearOnDefault: true,
        }),
    );

    return (
        <div className={cn(className, "flex flex-col gap-4")}>
            <GroupVariants
                value={String(stockQuery)}
                items={[
                    { name: "Все", value: "all" },
                    { name: "В наличии", value: "stock" },
                    { name: "Предзаказ", value: "preorder" },
                ]}
                onClick={(value) => setStockQuery(value)}
            />

            <div>
                <p className="font-bold mb-2">Цена от и до:</p>
                <div className="flex gap-3 mb-5 w-full">
                    <Input
                        type="number"
                        placeholder={MIN_PRICE.toString()}
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        value={String(price.priceFrom)}
                        onChange={(e) => {
                            debouncedSetPriceFrom(Number(e.target.value));
                            setPrice((prev) => ({ ...prev, priceFrom: Number(e.target.value) }));
                        }}
                    />
                    <Input
                        type="number"
                        placeholder={MAX_PRICE.toString()}
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        value={String(price.priceTo)}
                        onChange={(e) => {
                            debouncedSetPriceTo(Number(e.target.value));
                            setPrice((prev) => ({ ...prev, priceTo: Number(e.target.value) }));
                        }}
                    />
                </div>
                <RangeSlider
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={100}
                    value={[price.priceFrom || MIN_PRICE, price.priceTo || MAX_PRICE]}
                    onValueChange={([from, to]) => {
                        setPrice({ priceFrom: from, priceTo: to });
                        debouncedSetPriceFrom(from === MIN_PRICE ? MIN_PRICE : from);
                        debouncedSetPriceTo(to === MAX_PRICE ? MAX_PRICE : to);
                    }}
                />
            </div>
        </div>
    );
}
