import PostList from "@/components/post-list/PostList";

type Props = Promise<{ category?: string }>;

export default async function Posts(props: { searchParams: Props }) {
    const params = await props.searchParams;
    const category = params.category;
    return <PostList category={category} />;
}
