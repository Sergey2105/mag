import Breadcrumbs from "@/components/Breadcrumbs";
import CatalogList from "@/components/CatalogList";
import { Title } from "@/components/ui/title";
import { getCategories } from "@/lib/db/getCategories";

const categories = [
    {
        id: 1,
        name: "Harry Potter",
        imageURL:
            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8157ca84/images/funko/upload/1/86434_HP_S18_HarryWHourglass_POP_GLAM-WEB.png?sw=346&sh=346",
    },
    {
        id: 2,
        name: "The Lord of the Rings",
        imageURL:
            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dwabd58c5e/images/funko/upload/1/86430_POP-PLUS_LOTR_S9_Frodo-Baggins(GW)_GLAM-1-WEB.png?sw=346&sh=346",
    },
    {
        id: 3,
        name: "The Lord of the Rings",
        imageURL:
            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dwabd58c5e/images/funko/upload/1/86430_POP-PLUS_LOTR_S9_Frodo-Baggins(GW)_GLAM-1-WEB.png?sw=346&sh=346",
    },
    {
        id: 4,
        name: "The Lord of the Rings",
        imageURL:
            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dwabd58c5e/images/funko/upload/1/86430_POP-PLUS_LOTR_S9_Frodo-Baggins(GW)_GLAM-1-WEB.png?sw=346&sh=346",
    },
    {
        id: 5,
        name: "The Lord of the Rings",
        imageURL:
            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dwabd58c5e/images/funko/upload/1/86430_POP-PLUS_LOTR_S9_Frodo-Baggins(GW)_GLAM-1-WEB.png?sw=346&sh=346",
    },
    {
        id: 6,
        name: "The Lord of the Rings",
        imageURL:
            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dwabd58c5e/images/funko/upload/1/86430_POP-PLUS_LOTR_S9_Frodo-Baggins(GW)_GLAM-1-WEB.png?sw=346&sh=346",
    },
    {
        id: 7,
        name: "The Lord of the Rings",
        imageURL:
            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dwabd58c5e/images/funko/upload/1/86430_POP-PLUS_LOTR_S9_Frodo-Baggins(GW)_GLAM-1-WEB.png?sw=346&sh=346",
    },
    {
        id: 8,
        name: "The Lord of the Rings",
        imageURL:
            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dwabd58c5e/images/funko/upload/1/86430_POP-PLUS_LOTR_S9_Frodo-Baggins(GW)_GLAM-1-WEB.png?sw=346&sh=346",
    },
    {
        id: 9,
        name: "The Lord of the Rings",
        imageURL:
            "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dwabd58c5e/images/funko/upload/1/86430_POP-PLUS_LOTR_S9_Frodo-Baggins(GW)_GLAM-1-WEB.png?sw=346&sh=346",
    },
];

export default async function Catalog() {
    const categories = await getCategories();
    console.log(categories);

    return (
        <>
            <div className="wrapper mt-10">
                <Breadcrumbs className="mt-16" />
                <Title text="Каталог" size="lg" className="mt-6" />
                <div className="grid gap-6 mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    <CatalogList list={categories} />
                </div>
            </div>
        </>
    );
}
