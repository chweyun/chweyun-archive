"use client";

import { useRouter } from "next/navigation";
import { CategoryButton } from "./CategoryButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/Select";

interface CategoryListProps {
    categoryList: string[];
    currentCategory?: string;
}

export default function CategoryList({ categoryList, currentCategory = "all" }: CategoryListProps) {
    const router = useRouter();

    const onCategoryChange = (value: string) => {
        return value === "all" ? router.push("/posts") : router.push(`/posts?category=${value}`);
    };

    return (
        <>
            <section className="mb-10 hidden sm:block">
                <ul className="flex gap-2 bg-red-200">
                    <CategoryButton isCurrent={currentCategory === "all"} displayName="all" onChange={onCategoryChange} />
                    {categoryList.map((cg) => (
                        <CategoryButton key={cg} displayName={cg} isCurrent={cg === currentCategory} onChange={onCategoryChange} />
                    ))}
                </ul>
            </section>
            <section className="mb-10 sm:hidden">
                <Select onValueChange={onCategoryChange} defaultValue={currentCategory}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">all</SelectItem>
                        {categoryList.map((cg) => (
                            <SelectItem key={cg} value={cg}>
                                {cg}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </section>
        </>
    );
}
