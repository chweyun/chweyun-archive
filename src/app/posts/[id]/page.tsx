import { Metadata } from "next";

import { PostHeader } from "@/components/post-detail/PostHeader";
import TocSidebar from "@/components/post-detail/TableOfContentSidebar";
import TocTop from "@/components/post-detail/TableOfContentTop";
import { baseDomain } from "@/config/const";
import { parseToc } from "@/lib/post";
import Giscus from "@/components/post-detail/Giscus";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import "highlight.js/styles/base16/dracula.min.css";

type Props = Promise<{ id: string }>;

export const dynamicParams = false;

export async function generateMetadata(props: { params: Props }): Promise<Metadata> {
    const params = await props.params;
    const postApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${params.id}`);
    const result = await postApi.json();

    if (!result) {
        return {};
    }

    const title = `${result.title.slice(0, 17)}...`;
    const imageURL = `${baseDomain}${result.thumbnail}`;

    return {
        title: title,
        description: result.desc,

        openGraph: {
            title: title,
            description: result.desc,
            type: "article",
            publishedTime: result.date,
            url: `${baseDomain}/posts/${params.id}`,
            images: [imageURL],
        },
        twitter: {
            title: title,
            description: result.desc,
            images: [imageURL],
        },
    };
}

export default async function PostDetail(props: { params: Props }) {
    const params = await props.params;
    const postApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${params.id}`);
    const result = await postApi.json();

    if (!result) {
        return <></>;
    }

    const toc = parseToc(result.content);

    return (
        <div className="prose mx-auto w-full max-w-[750px] px-5 dark:prose-invert sm:px-6">
            <PostHeader post={result} />
            <TocTop toc={toc} />
            <article className="relative">
                <TocSidebar toc={toc} />
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkRehype]} rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings]}>
                    {result.content}
                </ReactMarkdown>
                <Giscus />
            </article>
            <hr />
        </div>
    );
}
