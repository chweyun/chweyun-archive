import { NextResponse } from "next/server";
import { getPostDetail } from "@/lib/post";

export async function GET(request: Request, { params }: { params: { pageId: string } }) {
    const { pageId } = params;

    const postDetail = await getPostDetail(pageId);
    return NextResponse.json(postDetail);
}
