import CatalogList from "@/components/CatalogList";
import { getCategories } from "@/lib/db/getCategories";
import { Category } from "@prisma/client";

export default async function CatalogContent() {
    try {
        const categories: Category[] = await getCategories();

        return (
            <div className="grid gap-6 mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <CatalogList list={categories} />
            </div>
        );
    } catch (error) {
        return <div className="text-center text-red-500 mt-10">Не удалось загрузить категории. Попробуйте позже.</div>;
    }
}
