import prisma from "@/global/prisma/prisma-clint";
import { Category, Product } from "@prisma/client";

export interface IProductWithCategory extends Product {
    category: Category;
}

const products: IProductWithCategory[] = await prisma.product.findMany({
    include: { category: true },
});
