import PostList from '@/components/post-list/PostList';
import {getCategoryList, getCategoryPublicName} from '@/lib/post';
import {Metadata} from "next";
import {baseDomain, blogName, blogThumbnailURL} from "@/config/const";

type Props = {
    params: { category: string };
};

export const dynamicParams = false;

export async function generateMetadata({ params: { category } }: Props): Promise<Metadata> {
    const cg = getCategoryPublicName(category);
    const title = `${cg} | ${blogName}`;
    const url = `${baseDomain}/${category}`;

    return {
        title,
        openGraph: {
            title,
            url,
            images: [blogThumbnailURL],
        },
        twitter: {
            title,
            images: [blogThumbnailURL],
        },
    };
}

export function generateStaticParams() {
    const categoryList = getCategoryList();
    return categoryList.map((category) => ({category}));
}

export default async function CategoryPage ({ params }: Props){
    return <PostList category={params.category} />;
};