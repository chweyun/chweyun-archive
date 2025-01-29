import { pageSize } from "@/config/const";
import React from "react";

interface SkeletonCardsProps {
    hasMore: boolean;
}

const SkeletonCards = React.forwardRef<HTMLDivElement, SkeletonCardsProps>(({ hasMore }, ref) => {
    return (
        <>
            {hasMore ? (
                Array.from({ length: pageSize }).map((_, index) => (
                    <div key={index} ref={index === 1 ? ref : null}>
                        <li className="flex h-full flex-col gap-3 overflow-hidden rounded-2xl transition border dark:border-slate-300">
                            <div className="relative aspect-video w-100 rounded-t-md bg-stone-200" />
                            <div className="flex flex-1 flex-col justify-between p-4 pt-1">
                                <div>
                                    <div className="mb-2" />
                                    <h2 className="mb-3 mt-1 min-h-[50px] w-[80%] rounded-sm bg-stone-200" />
                                    <p className="mb-3 mt-1 min-h-[20px] rounded-sm bg-stone-200" />
                                </div>
                                <div className="flex justify-between gap-3 min-h-[20px] w-[20%] rounded-sm bg-stone-200" />
                            </div>
                        </li>
                    </div>
                ))
            ) : (
                <div ref={ref} />
            )}
        </>
    );
});

SkeletonCards.displayName = "SkeletonCards";
export default SkeletonCards;
