import prisma from "@/global/prisma/prisma-clint";
import { NextRequest, NextResponse } from "next/server";

export async function GET(id: string) {
    try {
        const product = await prisma.category.findMany({
            where: { id: Number(id) },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("Ошибка при получении продукта:", error);
        return NextResponse.json({ message: "Не удалось загрузить продукт" }, { status: 500 });
    }
}
