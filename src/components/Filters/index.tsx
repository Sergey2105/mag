"use client";
import FilterCheckbox from "@/components/FilterCheckbox";
import { Input } from "@/components/ui/input";
import { Title } from "@/components/ui/title";
import { RangeSlider } from "@/components/RangeSlider";
import { FiltersCheckboxGroup } from "@/components/FiltersCheckboxGroup";
import { useEffect, useState } from "react";
import { useSetState } from "@/hooks/useSet";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebouce";

const MIN_PRICE = 0;
const MAX_PRICE = 20000;

export default function Filters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [price, setPrice] = useState({ priceFrom: Number(searchParams.get("priceFrom")) || undefined, priceTo: Number(searchParams.get("priceTo")) || undefined });

    const stock = useSetState<string>(["All"]);

    const handlePriceChange = (name: string, value: number) => {
        setPrice({
            ...price,
            [name]: value,
        });
    };

    const updateUrl = (filters: any) => {
        const query = qs.stringify(filters, { arrayFormat: "comma", skipNulls: true });
        router.replace(`?${query}`);
    };

    const debouncedUpdateUrl = useDebounce(updateUrl, 300);

    useEffect(() => {
        const filters = {
            priceFrom: price.priceFrom || undefined,
            priceTo: price.priceTo || undefined,
            stock: stock.setValue.has("All") ? undefined : Array.from(stock.setValue),
        };

        debouncedUpdateUrl(filters);
    }, [price, stock, searchParams]);

    return (
        <div>
            <Title text="Фильтрация" size="sm" />
            <div className="flex flex-col gap-4 mt-6">
                <FiltersCheckboxGroup
                    name="stock"
                    selected={stock.setValue}
                    onClickCheckbox={stock.toggle}
                    items={[
                        { text: "Все", value: "All" },
                        { text: "В наличии", value: "Stock" },
                        { text: "Предзаказ", value: "Preorder" },
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
                        onChange={(e) => handlePriceChange("priceFrom", Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        placeholder={MAX_PRICE.toString()}
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        value={String(price.priceTo)}
                        onChange={(e) => handlePriceChange("priceTo", Number(e.target.value))}
                    />
                </div>
                <RangeSlider
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={100}
                    value={[price.priceFrom || MIN_PRICE, price.priceTo || 20000]}
                    onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom: priceFrom, priceTo: priceTo })}
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
