import { unstable_cache } from "next/cache";

import axios from "axios";
//серверная

export async function getProductsServer() {
    const res = await fetch("http://localhost:5000/api/products", {
        next: {
            revalidate: 3600,
            tags: ["products"],
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}

export async function getProductByIdServer(id: string) {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        next: {
            revalidate: 3600,
            tags: ["product-by-id"],
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}

export async function getProductBySlugServer(slug: string) {
    const res = await fetch(`http://localhost:5000/api/products/category/${slug}`, {
        next: {
            revalidate: 3600,
            tags: ["products-by-slag"],
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}
