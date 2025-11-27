import prisma from "@/global/prisma/prisma-clint";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { id: "asc" },
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.error("Ошибка при получении категорий:", error);
        return NextResponse.json({ message: "Не удалось загрузить категории" }, { status: 500 });
    }
}
