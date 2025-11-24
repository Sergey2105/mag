import prisma from "@/global/prisma/prisma-clint";

export async function getCategories() {
    return await prisma.category.findMany({
        orderBy: { id: "asc" },
    });
}
