import prisma from "@/global/prisma/prisma-clint";

export async function getProductByID(id: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
        });

        if (!product) {
            return null; 
        }

        return product;
    } catch (error) {
        console.error("Ошибка при получении продукта:", error);
        throw new Error("Ошибка на сервере");
    }
}
