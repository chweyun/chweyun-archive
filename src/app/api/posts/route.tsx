import { NextResponse } from "next/server";
import { getSortedPostList } from "@/lib/post";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const category = url.searchParams.get("category") || "";
    const startCursor = url.searchParams.get("startCursor");

    const postList = await getSortedPostList(startCursor, category);

    return NextResponse.json(postList);
}
