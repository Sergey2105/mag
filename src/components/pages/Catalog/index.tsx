import Breadcrumbs from "@/components/Breadcrumbs";
import CatalogList from "@/components/CatalogList";
import { Title } from "@/components/ui/title";
import { getCategories } from "@/lib/db/getCategories";

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
