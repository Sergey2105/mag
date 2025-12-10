//серверный компонент
import BreadcrumbsServer from "@/components/Breadcrumbs/BreadcrumbsServer";
import ProductList from "@/components/ProductList";
import TopBar from "@/components/TopBar";
import { Title } from "@/components/ui/title";
import { getProductBySlug } from "@/lib/db/getProducts";

export default async function Category(props: any) {
    const { slug } = props;

    const { category, pagination, products } = await getProductBySlug(slug);

    console.log(category, pagination, products);

    return (
        <>
            <div className="wrapper mt-10">
                <BreadcrumbsServer />
                <Title text="Каталог" size="lg" className="mt-6" />
                <div className="grid grid-cols-1 gap-2 md:gap-8 mt-10">
                    <div className="h-full">
                        <TopBar />
                        <div className="mt-10">
                            <ProductList items={products} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
