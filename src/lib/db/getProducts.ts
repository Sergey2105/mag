//серверная

export async function getProductsServer() {
    const res = await fetch("http://localhost:5000/api/products");

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}

export async function getProductByIdServer(id: string) {
    const res = await fetch(`http://localhost:5000/api/products/${id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}

export async function getProductBySlugServer(slug: string) {
    const res = await fetch(`http://localhost:5000/api/products/category/${slug}`);

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}
