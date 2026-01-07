import CatalogList from "@/app/(public)/catalog/CatalogList";
import { getCategoriesServer } from "@/lib/db/getCategories";
import categoryService from "@/services/category.service";

export default async function CatalogContent() {
    const categories = await categoryService.getAllCategory();

    return (
        <>
            {!categories || categories.length === 0 ? (
                <div>Категории не найдены</div>
            ) : (
                <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    <CatalogList list={categories} />
                </div>
            )}
        </>
    );
}
