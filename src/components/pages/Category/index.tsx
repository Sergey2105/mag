import CatalogList from "@/components/CatalogList";
import Filters from "@/components/Filters";
import ProductCard from "@/components/ProductCard";
import ProductList from "@/components/ProductList";
import SortPopup from "@/components/SortPopup";
import TopBar from "@/components/TopBar";
import { Title } from "@/components/ui/title";
import { useTranslations } from "next-intl";

export default function Category() {
    const t = useTranslations("Home");

    return (
        <>
            <div className="wrapper mt-10">
                <Title text="Каталог" size="lg" />
                <div className="grid grid-cols-[256px_1fr] gap-8 mt-10">
                    <div className="h-full">
                        <div className="sticky top-4">
                            <Filters />
                        </div>
                    </div>
                    <div className="h-full">
                        <TopBar />
                        <div className="mt-4">
                            <ProductList
                                title="Harry Potter"
                                items={[
                                    {
                                        id: 1,
                                        name: "Harry Potter with Hedwig",
                                        imageURL:
                                            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
                                        price: 2400,
                                        category: "Harry Potter",
                                    },
                                    {
                                        id: 2,
                                        name: "Harry Potter 111111111 111111111 1111 111 111111",
                                        imageURL:
                                            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
                                        price: 2400,
                                        category: "Harry Potter",
                                    },
                                    {
                                        id: 4,
                                        name: "Harry Potter",
                                        imageURL:
                                            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
                                        price: 2400,
                                    },
                                    {
                                        id: 5,
                                        name: "Harry Potter",
                                        imageURL:
                                            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
                                        price: 2400,
                                    },
                                    {
                                        id: 6,
                                        name: "Harry Potter",
                                        imageURL:
                                            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
                                        price: 2400,
                                    },
                                    {
                                        id: 7,
                                        name: "Harry Potter",
                                        imageURL:
                                            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
                                        price: 2400,
                                        category: "Harry Potter",
                                    },
                                    {
                                        id: 9,
                                        name: "Harry Potter",
                                        imageURL:
                                            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
                                        price: 2400,
                                    },
                                    {
                                        id: 10,
                                        name: "Harry Potter",
                                        imageURL:
                                            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
                                        price: 2400,
                                    },
                                    {
                                        id: 11,
                                        name: "Harry Potter",
                                        imageURL:
                                            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
                                        price: 2400,
                                    },
                                    {
                                        id: 12,
                                        name: "Harry Potter",
                                        imageURL:
                                            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
                                        price: 2400,
                                    },
                                    {
                                        id: 13,
                                        name: "Harry Potter",
                                        imageURL:
                                            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
                                        price: 2400,
                                    },
                                    {
                                        id: 14,
                                        name: "Harry Potter",
                                        imageURL:
                                            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
                                        price: 2400,
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
