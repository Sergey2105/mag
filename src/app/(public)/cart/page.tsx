import productService from "@/services/product.service";
import type { Metadata } from "next";
import { Cart } from "./Cart";

export const metadata: Metadata = {
    title: "Cart",
};

const fetchProducts = async () => {
    //try
    const response = await productService.fetchAllWithoutPagination();
    return response.data;
};

export default async function CartPage() {
    const products = await fetchProducts();

    console.log(products);

    return <Cart products={products} />;
}
