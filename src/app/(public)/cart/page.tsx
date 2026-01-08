import type { Metadata } from "next";
import { Cart } from "./Cart";
import BreadcrumbsServer from "@/components/Breadcrumbs/BreadcrumbsServer";
import { Title } from "@/components/ui/title";
import { getProductWithoutPaginationServer } from "@/lib/db/getProducts";

export const metadata: Metadata = {
    title: "Корзина",
};

export default async function CartPage() {
    const products = await getProductWithoutPaginationServer();

    console.log(products);

    return (
        <div className="wrapper mt-10">
            <BreadcrumbsServer lastLabel="Корзина" />
            <Title text="Корзина" size="lg" className="mt-6" />
            <div className="mt-10">
                <Cart products={products} />
            </div>
        </div>
    );
}
