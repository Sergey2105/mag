import { unstable_cache } from "next/cache";
//серверная
export const getCategoriesServer = unstable_cache(
    async () => {
        try {
            const res = await fetch("http://localhost:5000/api/category", {
                method: "GET",
                cache: "no-store",
            });

            if (!res.ok) throw new Error("Failed to fetch");

            return await res.json();
        } catch (error) {
            throw new Error("Error fetching categories from Nest");
        }
    },
    ["categories"],
    {
        revalidate: 3600,
        tags: ["categories"],
    },
);
