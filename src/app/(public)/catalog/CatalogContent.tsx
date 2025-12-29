import CatalogList from "@/app/(public)/catalog/CatalogList";
import { getCategoriesServer } from "@/lib/db/getCategories";
import categoryService from "@/services/category.service";

const fetchCategory = async () => {
    try {
        const response = await categoryService.fetchAll();
        return response.data;
    } catch (error) {
        return [];
    }
};

export default async function CatalogContent() {
    const categories = await fetchCategory();

    return (
        <>
            {!categories || categories.length === 0 ? (
                <div>Категории не найдены</div>
            ) : (
                <div className="grid gap-3 mt-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    <CatalogList list={categories} />
                </div>
            )}
        </>
    );
}
