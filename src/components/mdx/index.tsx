import { Callout } from "./Callout";
import { Image } from "./Image";
import { ExternalLink } from "./Link";
import { MDXComponents } from "mdx/types";

export const MdxComponents: MDXComponents = {
    a: ExternalLink as never,
    img: Image as never,
    blockquote: Callout,
    Callout,
};
