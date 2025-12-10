import { unstable_cache } from "next/cache";

export const getProducts = unstable_cache(
    async () => {
        try {
            const res = await fetch("http://localhost:5000/products", {
                method: "GET",
                cache: "no-store",
            });

            if (!res.ok) throw new Error("Failed to fetch");

            return await res.json();
        } catch (error) {
            throw new Error("Error fetching categories from Nest");
        }
    },
    ["products"],
    {
        revalidate: 3600,
        tags: ["products"],
    },
);

export async function getProductBySlug(slug: string) {
    const res = await fetch(`http://localhost:5000/products/category/${slug}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }

    return res.json();
}
