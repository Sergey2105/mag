import FilterCheckbox from "@/components/FilterCheckbox";
import { Input } from "@/components/ui/input";
import { Title } from "@/components/ui/title";
import { RangeSlider } from "@/components/RangeSlider";
import { FiltersCheckboxGroup } from "@/components/FiltersCheckboxGroup";

export default function Filters() {
    return (
        <div>
            <Title text="Фильтрация" size="sm" />
            <div className="flex flex-col gap-4 mt-6">
                <FilterCheckbox text="Все" value="1" />
                <FilterCheckbox text="В наличии" value="2" />
                <FilterCheckbox text="Предзаказ" value="3" />
            </div>
            <div className="mt-5">
                <p className="font-bold mb-2">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input type="number" placeholder="0" min={0} max={99999} />
                    <Input type="number" placeholder="99 999" min={0} max={99999} />
                </div>
                <RangeSlider min={0} max={99999} step={100} value={[0, 99999]} />
            </div>
            <FiltersCheckboxGroup
                title={"Производитель"}
                className="mt-10"
                limit={6}
                defaultItems={[
                    { text: "Apple", value: "1" },
                    { text: "Vivo", value: "2" },
                    { text: "Samsung", value: "3" },
                    { text: "Xiaomi", value: "4" },
                    { text: "Huawei", value: "5" },
                    { text: "OnePlus", value: "6" },
                    { text: "Google", value: "7" },
                    { text: "Sony", value: "8" },
                    { text: "Nokia", value: "9" },
                    { text: "Motorola", value: "10" },
                    { text: "Lenovo", value: "11" },
                    { text: "Asus", value: "12" },
                    { text: "Acer", value: "13" },
                    { text: "Microsoft", value: "14" },
                    { text: "Honor", value: "15" },
                    { text: "Realme", value: "16" },
                    { text: "OPPO", value: "17" },
                    { text: "ZTE", value: "18" },
                    { text: "Alcatel", value: "19" },
                    { text: "Meizu", value: "20" },
                    { text: "LG", value: "21" },
                ]}
                items={[
                    { text: "Apple", value: "1" },
                    { text: "Vivo", value: "2" },
                    { text: "Samsung", value: "3" },
                    { text: "Xiaomi", value: "4" },
                    { text: "Huawei", value: "5" },
                    { text: "OnePlus", value: "6" },
                    { text: "Google", value: "7" },
                    { text: "Sony", value: "8" },
                    { text: "Nokia", value: "9" },
                    { text: "Motorola", value: "10" },
                    { text: "Lenovo", value: "11" },
                    { text: "Asus", value: "12" },
                    { text: "Acer", value: "13" },
                    { text: "Microsoft", value: "14" },
                    { text: "Honor", value: "15" },
                    { text: "Realme", value: "16" },
                    { text: "OPPO", value: "17" },
                    { text: "ZTE", value: "18" },
                    { text: "Alcatel", value: "19" },
                    { text: "Meizu", value: "20" },
                    { text: "LG", value: "21" },
                ]}
            />
        </div>
    );
}
