import CategoryList from "./CategoryList";
import PostCards from "./PostCards";
import MorePostCards from "./MorePostCards";

interface PostListProps {
    category?: string;
}

export default async function PostList({ category }: PostListProps) {
    const queryParams = new URLSearchParams({
        startCursor: "",
        category: category ?? "",
    }).toString();

    const postsApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?${queryParams}`);
    const postList = await postsApi.json();

    const categoryApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
    const categoryList = await categoryApi.json();

    return (
        <section className="mx-auto mt-40 w-full max-w-[950px] px-4">
            <CategoryList categoryList={categoryList.result} currentCategory={category} />

            <section>
                <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
                    <PostCards postList={postList.posts} currentCategory={category} />
                    {postList.has_more && <MorePostCards currentCategory={category} nextCursor={postList.next_cursor} />}
                </ul>
            </section>
        </section>
    );
}
