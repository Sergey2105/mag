//серверная

// это не использую
export async function getProductsServer() {
    const res = await fetch("http://localhost:5000/api/products");

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}

// для получение 1 товара
export async function getProductByIdServer(id: string) {
    const res = await fetch(`http://localhost:5000/api/products/${id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}

// export async function getProductBySlugServer(slug: string) {
//     const res = await fetch(`http://localhost:5000/api/products/by-slug/${slug}`);

//     if (!res.ok) {
//         throw new Error("Failed to fetch products");
//     }

//     return res.json();
// }

interface Options {
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
    sortBy?: "name" | "price" | "createdAt";
    sortOrder?: "asc" | "desc";
}

export async function getProductsBySlugServer(slug: string, options: Options = {}) {
    const params = new URLSearchParams();

    Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined) {
            params.append(key, String(value));
        }
    });

    const res = await fetch(`http://localhost:5000/api/products/by-slug/${slug}?${params.toString()}`, {
        next: {
            revalidate: 60,
            tags: [`products-${slug}`],
        },
    });

    if (res.status === 404) {
        return null;
    }

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}

// для полуечния продуктов без пагинации
export async function getProductWithoutPaginationServer() {
    const res = await fetch(`http://localhost:5000/api/products/without-pagination`);

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}
