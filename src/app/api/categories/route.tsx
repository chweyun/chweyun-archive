import { NextResponse } from "next/server";
import { getCategoryList } from "@/lib/post";

export async function GET() {
    const result = await getCategoryList();
    return NextResponse.json({ result });
}
