import { NextResponse } from "next/server";
import { getProducts } from "@/lib/db/getProducts";
import prisma from "@/global/prisma/prisma-clint";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const slug = url.searchParams.get("category");
    const query = url.searchParams.get("query");

    const result = await getProducts(slug || undefined, query || undefined);

    if (query) {
        return NextResponse.json({
            products: result.products || [],
        });
    }

    return NextResponse.json(result);
}
