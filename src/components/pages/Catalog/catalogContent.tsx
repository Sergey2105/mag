import CatalogList from "@/components/CatalogList";
import { getCategories } from "@/lib/db/getCategories";

export default async function CatalogContent() {
    try {
        const categories = await getCategories();

        console.log(categories);

        return (
            <div className="grid gap-6 mt-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <CatalogList list={categories} />
            </div>
        );
    } catch (error) {
        return <div className="text-center text-red-500 mt-10">Не удалось загрузить категории. Попробуйте позже.</div>;
    }
}
