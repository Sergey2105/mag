import prisma from "@/global/prisma/prisma-clint";
import { unstable_cache } from "next/cache";
//серверная функция
export const getCategories = unstable_cache(
    async () => {
        try {
            const categories = await prisma.category.findMany({
                orderBy: { id: "asc" },
            });
            return categories;
        } catch (error) {
            throw new Error("error fetching categories");
        }
    },
    ["categories"], // cache key
    {
        revalidate: 3600, // 1 час
        tags: ["categories"], // для ручной инвалидации
    },
);
