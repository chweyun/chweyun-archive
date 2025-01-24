import Image from "next/image";
import Link from "next/link";
import type { PostCard } from "@/config/types";
import { Button } from "@/components/common/Button";

interface Props {
    post: PostCard;
    currentCategory?: string;
}

export default function PostCard({ post, currentCategory }: Props) {
    return (
        <Link href={`/posts/${post.id}`}>
            <li className="flex h-full flex-col gap-3 overflow-hidden rounded-2xl border transition dark:border-slate-700">
                <div className="relative aspect-video w-full rounded-t-md border-b">
                    <Image
                        src={post.thumbnail ?? "/posts/default.png"}
                        alt={`thumbnail for ${post.title}`}
                        sizes="(max-width: 1000px) 50vw, 450px"
                        fill
                        priority
                        style={{
                            objectFit: "cover",
                        }}
                    />
                </div>
                <div className="flex flex-1 flex-col justify-between p-4 pt-1">
                    <div>
                        <div className="mb-2">
                            <ul className="flex gap-2">
                                {post.category.map((cg) => (
                                    <Button asChild key={cg} size="xs" variant={cg === currentCategory ? "destructive" : "outline"}>
                                        <div>{cg}</div>
                                    </Button>
                                ))}
                            </ul>
                        </div>
                        <h2 className="mb-3 mt-1 text-lg font-bold sm:text-xl md:text-lg">{post.title}</h2>
                        <p className="mb-3 mt-1 text-sm">{post.desc}</p>
                    </div>
                    <div className="flex justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                            <span>{post.date}</span>
                        </div>
                    </div>
                </div>
            </li>
        </Link>
    );
}
