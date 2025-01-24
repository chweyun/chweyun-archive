import PostList from "@/components/post-list/PostList";

type Props = {
    searchParams: {
        category?: string;
    };
};

// export default async function Posts(searchParams: Promise<{ category?: string }>) {
export default async function Posts({ searchParams }: Props) {
    const category = (await searchParams!.category) || undefined;
    // const { category } = await searchParams;

    return <PostList category={category} />;
}
