import { MdxComponents } from '../mdx';
import { Post } from '@/config/types';
// @ts-expect-error no types
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import Image from "next/image";

interface Props {
    post: Post;
}

export const PostBody = ({ post }: Props) => {
    return (
        <>
            {post.thumbnail && <Image src={post.thumbnail} className="mx-auto w-[80%] mb-20 rounded-2xl border border-black"  alt={'thumbnail'} width="1000" height="1000"
                   layout="intrinsic" />}

            <MDXRemote
                source={post.content}
                options={{
                    mdxOptions: {
                        remarkPlugins: [
                            // 깃허브 Flavored 마크다운 지원 추가 (version downgrade)
                            remarkGfm,
                            // 이모티콘 접근성 향상
                            remarkA11yEmoji,
                            // mdx 1줄 개행 지원
                            remarkBreaks,
                        ],
                        rehypePlugins: [
                            // pretty code block
                            [
                                rehypePrettyCode,
                                {
                                    theme: { dark: 'github-dark-dimmed', light: 'github-light' },
                                },
                            ],
                            // toc id를 추가하고 제목을 연결
                            rehypeSlug,
                        ],
                    },
                }}
                components={MdxComponents}
            />
        </>
    );
};