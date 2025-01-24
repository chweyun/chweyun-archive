import CategoryList from "./CategoryList";
import PostCard from "./PostCard";
import { getCategoryList, getSortedPostList } from "@/lib/post";

interface PostListProps {
    category?: string;
}

export default async function PostList({ category }: PostListProps) {
    const postList = await getSortedPostList(category);
    const categoryList = await getCategoryList();

    return (
        <section className="mx-auto mt-40 w-full max-w-[950px] px-4">
            <CategoryList categoryList={categoryList} currentCategory={category} />
            <section>
                <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
                    {postList.map((post) => (
                        <PostCard key={post.id} post={post} currentCategory={category} />
                    ))}
                </ul>
            </section>
        </section>
    );
}
