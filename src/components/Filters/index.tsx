"use client";
import { Input } from "@/components/ui/input";
import { Title } from "@/components/ui/title";
import { RangeSlider } from "@/components/RangeSlider";
import { FiltersCheckboxGroup } from "@/components/FiltersCheckboxGroup";
import { useEffect, useState } from "react";
import { useSetState } from "@/hooks/useSet";
import { useDebounce } from "@/hooks/useDebouce";
import { useQueryState, parseAsInteger, parseAsArrayOf, parseAsString } from "nuqs";

const MIN_PRICE = 0;
const MAX_PRICE = 20000;

export default function Filters() {
    const [priceFrom, setPriceFrom] = useQueryState(
        "priceFrom",
        parseAsInteger.withDefault(MIN_PRICE).withOptions({
            shallow: true,
            clearOnDefault: true,
        }),
    );

    const debouncedSetPriceFrom = useDebounce(setPriceFrom, 300);

    const [priceTo, setPriceTo] = useQueryState(
        "priceTo",
        parseAsInteger.withDefault(MAX_PRICE).withOptions({
            shallow: true,
            clearOnDefault: true,
        }),
    );

    const debouncedSetPriceTo = useDebounce(setPriceTo, 300);

    const [price, setPrice] = useState({
        priceFrom: priceFrom,
        priceTo: priceTo,
    });

    const [stockQuery, setStockQuery] = useQueryState(
        "stock",
        parseAsArrayOf(parseAsString).withDefault(["all"]).withOptions({
            shallow: true,
            clearOnDefault: true,
        }),
    );

    const debouncedSetStockQuery = useDebounce(setStockQuery, 300);

    const stock = useSetState<string>(stockQuery);

    useEffect(() => {
        const values = Array.from(stock.setValue);
        debouncedSetStockQuery(values.length ? values : ["all"]);
    }, [stock.setValue]);

    return (
        <div>
            <Title text="Фильтрация" size="sm" />
            <div className="flex flex-col gap-4 mt-6">
                <FiltersCheckboxGroup
                    name="stock"
                    selected={stock.setValue}
                    onClickCheckbox={stock.toggle}
                    items={[
                        { text: "Все", value: "all" },
                        { text: "В наличии", value: "stock" },
                        { text: "Предзаказ", value: "preorder" },
                    ]}
                />
            </div>
            <div className="mt-5">
                <p className="font-bold mb-2">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder={MIN_PRICE.toString()}
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        value={String(price.priceFrom)}
                        onChange={(e) => {
                            debouncedSetPriceFrom(Number(e.target.value));
                            setPrice((prev) => ({
                                ...prev,
                                priceFrom: Number(e.target.value),
                            }));
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
                            setPrice((prev) => ({
                                ...prev,
                                priceTo: Number(e.target.value),
                            }));
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
            {/* <FiltersCheckboxGroup
                title={"Производитель"}
                className="mt-10"
                limit={6}
                defaultItems={[
                    { text: "Apple", value: "1" },
                ]}
                items={[
                    { text: "Apple", value: "1" },
                ]}
            /> */}
        </div>
    );
}
