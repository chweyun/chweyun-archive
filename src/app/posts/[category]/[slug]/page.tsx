import {Metadata} from 'next';

import FloatingButton from '@/components/common/FloatingButton';
import {PostBody} from '@/components/post-detail/PostBody';
import {PostHeader} from '@/components/post-detail/PostHeader';
import TocSidebar from '@/components/post-detail/TableOfContentSidebar';
import TocTop from '@/components/post-detail/TableOfContentTop';
import {baseDomain} from '@/config/const';
import {getPostDetail, getPostPaths, parsePostAbstract, parseToc} from '@/lib/post';

type Props = {
    params: { category: string; slug: string };
};

export const dynamicParams = false;

export async function generateMetadata({ params: { category, slug } }: Props): Promise<Metadata> {
    const post = await getPostDetail(category, slug);

    const title = `${post.title} | CHWEYUN ARCHIVE`;
    const imageURL = `${baseDomain}${post.thumbnail}`;

    return {
        title,
        description: post.desc,

        openGraph: {
            title,
            description: post.desc,
            type: 'article',
            publishedTime: post.date.toISOString(),
            url: `${baseDomain}${post.url}`,
            images: [imageURL],
        },
        twitter: {
            title,
            description: post.desc,
            images: [imageURL],
        },
    };
}

export function generateStaticParams() {
    const postPaths: string[] = getPostPaths();
    return postPaths
        .map((path) => parsePostAbstract(path))
        .map((item) => ({category: item.categoryPath, slug: item.slug}));
}

export default async function PostDetail ({ params: { category, slug } }: Props){
    const post = await getPostDetail(category, slug);
    const toc = parseToc(post.content);

    return (
        <div className='prose mx-auto w-full max-w-[950px] px-5 dark:prose-invert sm:px-6'>
            <PostHeader post={post} />
            <TocTop toc={toc} />
            <article className='relative'>
                <TocSidebar toc={toc} />
                <PostBody post={post} />
            </article>
            <hr />
            <FloatingButton />
        </div>
    );
};