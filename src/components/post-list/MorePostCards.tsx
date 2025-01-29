"use client";

import type { Post } from "@/config/types";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PostCards from "@/components/post-list/PostCards";
import { delay } from "@/lib/utils";
import SkeletonCards from "@/components/post-list/SkeletonCards";

interface Props {
    currentCategory?: string;
    nextCursor: string;
}

export default function MorePostCards({ currentCategory, nextCursor }: Props) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [next, setNext] = useState(nextCursor);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView();

    const loadMorePosts = async () => {
        if (!hasMore) {
            return;
        }

        await delay(2000);
        const queryParams = new URLSearchParams({
            startCursor: next,
            category: currentCategory ?? "",
        }).toString();

        const postsApi = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?${queryParams}`);
        const newPostList = await postsApi.json();

        setPosts((prev: Post[]) => [...prev, ...newPostList.posts]);
        setNext(() => newPostList.next_cursor);
        setHasMore(() => newPostList.has_more);
    };

    useEffect(() => {
        if (inView) {
            loadMorePosts();
        }
    }, [inView]);

    return (
        <>
            <PostCards postList={posts} currentCategory={currentCategory} />
            <SkeletonCards ref={ref} hasMore={hasMore} />
        </>
    );
}
