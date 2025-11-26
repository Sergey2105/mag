// import prisma from "@/global/prisma/prisma-clint";

// export async function getProducts(slug?: string, query?: string) {
//     let categoryId: number | undefined = undefined;

//     if (slug && slug !== "all") {
//         const category = await prisma.category.findFirst({ where: { slug } });
//         if (category) {
//             categoryId = category.id;
//         } else {
//             return [];
//         }
//     }

//     const products = await prisma.product.findMany({
//         where: {
//             categoryID: categoryId,
//             OR: query ? [{ name: { contains: query, mode: "insensitive" } }, { description: { contains: query, mode: "insensitive" } }] : undefined,
//         },
//         include: { category: true },
//     });

//     return products;
// }

import prisma from "@/global/prisma/prisma-clint";
//серверная функция для получения продуктов с возможностью фильтрации по категории и поисковому запросу
export async function getProducts(slug?: string, query?: string) {
    let categoryData = null;
    let categoryId: number | undefined = undefined;

    if (slug && slug !== "all") {
        const category = await prisma.category.findFirst({ where: { slug } });
        if (!category) return { category: null, products: [] };
        categoryData = category;
        categoryId = category.id;
    }

    const products = await prisma.product.findMany({
        where: {
            categoryID: categoryId,
            OR: query ? [{ name: { contains: query, mode: "insensitive" } }, { description: { contains: query, mode: "insensitive" } }] : undefined,
        },
        include: { category: true },
    });

    return { category: categoryData, products };
}
