import { NextRequest, NextResponse } from "next/server";
import pdf from "pdf-parse";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        const buffer = Buffer.from(await file.arrayBuffer());
        const data = await pdf(buffer);

        return NextResponse.json({ text: data.text });
    } catch (error) {
        return NextResponse.json({ error: "Ошибка обработки PDF" }, { status: 500 });
    }
}
