import ProductList from "@/app/(public)/catalog/[slug]/ProductList";
import BreadcrumbsServer from "@/components/Breadcrumbs/BreadcrumbsServer";
import TopBar from "@/components/TopBar";
import { Title } from "@/components/ui/title";
import productService from "@/services/product.service";
import Link from "next/link";

interface Props {
    params: {
        slug: string;
        id: string;
    };
}

const fetchProducts = async (slug: string) => {
    const response = await productService.getProductBySlug(slug);
    return response.data;
};

export default async function CategoryPage({ params }: Props) {
    const { slug, id } = await params;

    const { pagination, products } = await fetchProducts(slug);

    console.log(pagination);

    return (
        <div className="wrapper mt-10">
            <BreadcrumbsServer />
            <Title text="Каталог" size="lg" className="mt-6" />
            <div className="grid grid-cols-1 gap-2 md:gap-8 mt-10">
                <div className="h-full">
                    <TopBar />
                    <div className="mt-10">
                        <ProductList items={products} />
                        <div>Пагинация</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
