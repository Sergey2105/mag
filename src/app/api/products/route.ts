import prisma from "@/global/prisma/prisma-clint";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const categoryId = url.searchParams.get("categoryId");

    let products;

    if (!categoryId || categoryId === "1") {
        // "1" = All
        products = await prisma.product.findMany({
            include: { category: true },
        });
    } else {
        products = await prisma.product.findMany({
            where: { categoryID: Number(categoryId) },
            include: { category: true },
        });
    }

    return NextResponse.json(products);
}
