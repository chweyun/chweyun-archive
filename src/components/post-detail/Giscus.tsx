"use client";

import { useEffect, useRef } from "react";

const repoName = process.env.NEXT_PUBLIC_GISCUS_REPO_NAME || "";
const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "";
const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "";

export default function Giscus() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current || ref.current.hasChildNodes()) return;

        const scriptElem = document.createElement("script");
        scriptElem.src = "https://giscus.app/client.js";
        scriptElem.async = true;
        scriptElem.crossOrigin = "anonymous";

        scriptElem.setAttribute("data-repo", repoName);
        scriptElem.setAttribute("data-repo-id", repoId);
        scriptElem.setAttribute("data-category", "Comments");
        scriptElem.setAttribute("data-category-id", categoryId);
        scriptElem.setAttribute("data-mapping", "pathname");
        scriptElem.setAttribute("data-strict", "0");
        scriptElem.setAttribute("data-reactions-enabled", "1");
        scriptElem.setAttribute("data-emit-metadata", "0");
        scriptElem.setAttribute("data-input-position", "bottom");
        scriptElem.setAttribute("data-theme", "catppuccin_latte");
        scriptElem.setAttribute("data-lang", "ko");

        ref.current.appendChild(scriptElem);
    }, []);

    return <section ref={ref} className="mt-[100px]" />;
}
