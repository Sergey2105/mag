import { unstable_cache } from "next/cache";

import axios from "axios";
//серверная

export const getProductsServer = unstable_cache(
    async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products", {
                withCredentials: false,
            });

            return res.data;
        } catch (error) {
            throw new Error("Error fetching products from Nest");
        }
    },
    ["products"],
    {
        revalidate: 3600,
        tags: ["products"],
    },
);

export const getProductByIdServer = unstable_cache(
    async (id: string) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/products/${id}`, {
                withCredentials: false,
            });

            return res.data;
        } catch (error) {
            throw new Error("Error fetching product by ID from Nest");
        }
    },
    ["product-by-id"],
    {
        revalidate: 3600,
        tags: ["products"],
    },
);

export const getProductBySlugServer = unstable_cache(
    async (slug: string) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/products/category/${slug}`);

            return res.data;
        } catch (error: any) {
            throw new Error("Failed to fetch product by slug");
        }
    },
    ["product-by-slug"],
    {
        revalidate: 3600,
        tags: ["products"],
    },
);
