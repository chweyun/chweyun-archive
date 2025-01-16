"use client";

import { useRouter } from "next/navigation";
import { CategoryButton } from "./CategoryButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/Select";
import { CategoryDetail } from "@/config/types";

interface CategoryListProps {
    categoryList: CategoryDetail[];
    allPostCount: number;
    currentCategory?: string;
}

export default function CategoryList({ categoryList, allPostCount, currentCategory = "all" }: CategoryListProps) {
    const router = useRouter();

    const onCategoryChange = (value: string) => {
        return value === "all" ? router.push("/posts") : router.push(`/posts/${value}`);
    };

    console.log(currentCategory);

    return (
        <>
            <section className="mb-10 hidden sm:block">
                <ul className="flex gap-3">
                    <CategoryButton href="/posts" isCurrent={currentCategory === "all"} displayName="All" count={allPostCount} />
                    {categoryList.map((cg) => (
                        <CategoryButton key={cg.dirName} href={`/posts/${cg.dirName}`} displayName={cg.publicName} isCurrent={cg.dirName === currentCategory} count={cg.count} />
                    ))}
                </ul>
            </section>
            <section className="mb-10 sm:hidden">
                <Select onValueChange={onCategoryChange} defaultValue={currentCategory}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All ({allPostCount})</SelectItem>
                        {categoryList.map((cg) => (
                            <SelectItem key={cg.dirName} value={cg.dirName}>
                                {cg.publicName} ({cg.count})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </section>
        </>
    );
}
