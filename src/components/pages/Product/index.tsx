import Breadcrumbs from "@/components/Breadcrumbs";
import ProductImage from "@/components/pages/Product/product-image";
import ProductInfo from "@/components/pages/Product/product-info";
import { getProductByID } from "@/lib/db/getProduct";
import { notFound } from "next/navigation";

export default async function Product(props: any) {
    const { id } = props;
    const product = await getProductByID(id);
    console.log(product);

    if (!product) {
        return notFound();
    }

    return (
        <div className="wrapper mt-10">
            <Breadcrumbs lastLabel={product?.name} />
            <div className="flex flex-col mt-10">
                <ProductInfo name={product?.name} description={product?.description} price={product?.price} />
                <ProductImage imageURL={product?.imageURL} />
            </div>
        </div>
    );
}
