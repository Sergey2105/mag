import Breadcrumbs from "@/components/Breadcrumbs";
import Filters from "@/components/Filters";
import ProductList from "@/components/ProductList";
import TopBar from "@/components/TopBar";
import { Title } from "@/components/ui/title";
import { getProducts } from "@/lib/db/getProducts";

export default async function Category(props: any) {
    const { slug } = props;

    const { category, products } = await getProducts(slug);

    console.log(category, products);
    return (
        <>
            <div className="wrapper mt-10">
                <Breadcrumbs className="mt-16" lastLabel={category?.name} />
                <Title text="Каталог" size="lg" className="mt-6" />
                <div className="grid grid-cols-[256px_1fr] gap-8 mt-10">
                    <div className="h-full">
                        <div className="sticky top-4">
                            <Filters />
                        </div>
                    </div>
                    <div className="h-full">
                        <TopBar count={products.length} />
                        <div className="mt-4">
                            <ProductList items={products} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
