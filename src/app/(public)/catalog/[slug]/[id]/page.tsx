import BreadcrumbsServer from "@/components/Breadcrumbs/BreadcrumbsServer";
import { getProductByIdServer } from "@/lib/db/getProducts";
import ProductImage from "@/app/(public)/catalog/[slug]/[id]/product-image";
import ProductInfo from "@/app/(public)/catalog/[slug]/[id]/product-info";
import { notFound } from "next/navigation";

interface Props {
    params: { id: string };
}

export default async function CatalogProductPage({ params }: Props) {
    const { id } = await params;

    const product = await getProductByIdServer(id);

    console.log(product);

    if (!product) {
        return notFound();
    }

    return (
        <div className="wrapper mt-10">
            <BreadcrumbsServer lastLabel={product?.name} />

            <div className="flex mt-10 gap-1 flex-row items-stretch">
                <ProductInfo id={product?.id} name={product?.name} images={product?.images} description={product?.description} price={product?.price} className={"flex-[50_1]"} />
                <ProductImage images={product?.images} name={product?.name} className={"flex-[50_1] h-150"} />
            </div>
        </div>
    );
}
