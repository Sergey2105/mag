import prisma from "@/global/prisma/prisma-clint";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const category = await prisma.category.findMany({});

    return NextResponse.json(category);
}
