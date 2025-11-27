import prisma from "@/global/prisma/prisma-clint";
//серверная функция
export async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { id: "asc" },
        });
        return categories;
    } catch (error) {
        throw new Error("error fetching categories");
    }
}
