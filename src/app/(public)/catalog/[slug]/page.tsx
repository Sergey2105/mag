import ProductList from "@/app/(public)/catalog/[slug]/ProductList";
import BreadcrumbsServer from "@/components/Breadcrumbs/BreadcrumbsServer";
import { ProductPagination } from "@/components/Pagination";
import TopBar from "@/components/TopBar";
import { Title } from "@/components/ui/title";
import productService from "@/services/product.service";
import { notFound } from "next/navigation";

interface Props {
    params: {
        slug: string;
        id: string;
    };
    searchParams: {
        sort?: "asc" | "desc";
        priceFrom?: string;
        priceTo?: string;
        page?: string;
    };
}

const fetchProducts = async (slug: string, sort?: "asc" | "desc", priceFrom?: number, priceTo?: number, page?: number) => {
    try {
        const options = {
            sortBy: sort ? ("price" as const) : ("createdAt" as const),
            sortOrder: sort || ("desc" as const),
            minPrice: priceFrom,
            maxPrice: priceTo,
            page: page || 1,
            limit: 20,
        };

        const response = await productService.getProductBySlug(slug, options);
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 404) {
            notFound();
        }
        throw error;
    }
};

export default async function CategoryPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { sort, priceFrom, priceTo, page } = await searchParams;

    const minPrice = priceFrom ? Number(priceFrom) : undefined;
    const maxPrice = priceTo ? Number(priceTo) : undefined;
    const currentPage = page ? Number(page) : 1;

    const { category, pagination, products } = await fetchProducts(slug, sort, minPrice, maxPrice, currentPage);

    return (
        <div className="wrapper mt-10">
            <BreadcrumbsServer />
            <Title text="Каталог" size="lg" className="mt-6" />
            <div className="grid grid-cols-1 gap-2 md:gap-8 mt-10">
                <div className="h-full">
                    <TopBar />
                    <div className="mt-10">
                        <ProductList items={products} />
                        <ProductPagination pagination={pagination} className="mt-10" />
                    </div>
                </div>
            </div>
        </div>
    );
}
