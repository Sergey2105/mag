import { unstable_cache } from "next/cache";
//серверная

export async function getCategoriesServer() {
    const res = await fetch("http://localhost:5000/api/category", {
        next: {
            revalidate: 60,
            tags: ["category"],
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch category");
    }

    return res.json();
}
