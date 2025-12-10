import BreadcrumbsServer from "@/components/Breadcrumbs/BreadcrumbsServer";
import ProductImage from "@/components/pages/Product/product-image";
import ProductInfo from "@/components/pages/Product/product-info";
// import { getProductByID } from "@/lib/db/getProduct";
import { notFound } from "next/navigation";

export default async function Product(props: any) {
    const { id } = props;
    // const product = await getProductByID(id);
    const product: any = [];

    console.log(product);

    if (!product) {
        return notFound();
    }

    return (
        <div className="wrapper mt-10">
            <BreadcrumbsServer lastLabel={product?.name} />

            <div className="flex mt-10 gap-1 flex-row items-stretch">
                <ProductInfo name={product?.name} description={product?.description} price={product?.price} className={"flex-[50_1]"} />
                <ProductImage images={product?.images} name={product?.name} className={"flex-[50_1] h-[600px]"} />
            </div>
        </div>
    );
}
