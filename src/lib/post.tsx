import { Client } from "@notionhq/client";
import { HeadingItem, Post } from "@/config/types";
import { NotionToMarkdown } from "notion-to-md";
import { pageSize } from "@/config/const";

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY });
const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;

export const getSortedPostList = async (startCursor: string | null, category?: string): Promise<{ posts: Post[]; next_cursor: string | null; has_more: boolean }> => {
    const filters: any[] = [
        {
            property: "releasable",
            checkbox: {
                equals: true,
            },
        },
    ];

    if (category) {
        filters.push({
            property: "category",
            multi_select: {
                contains: category,
            },
        });
    }

    const response = await notion.databases.query({
        database_id: databaseId!,
        filter: {
            and: filters,
        },
        sorts: [
            {
                property: "createdAt",
                direction: "descending",
            },
        ],
        start_cursor: startCursor ? startCursor : undefined,
        page_size: pageSize,
    });

    return {
        posts: await Promise.all(
            response.results.map(async (item: any) => {
                return {
                    id: item.id,
                    title: item.properties.title.title[0]?.text.content || "",
                    date: item.properties.createdAt.date?.start || "",
                    desc: item.properties.description?.rich_text[0]?.text.content || "",
                    category: item.properties.category.multi_select.map((c: any) => c.name),
                    thumbnail: item.properties.thumbnail?.files[0]?.file?.url || null,
                };
            }),
        ),
        next_cursor: response.next_cursor,
        has_more: response.has_more,
    };
};

export const getCategoryList = async (): Promise<string[]> => {
    const databaseInfo = await notion.databases.retrieve({
        database_id: databaseId!,
    });

    const categoryProperty = databaseInfo.properties["category"];

    if (!categoryProperty || categoryProperty.type !== "multi_select") {
        return [];
    }

    return categoryProperty.multi_select.options.map((option) => option.name);
};

export const getPostDetail = async (pageId: string) => {
    const n2m = new NotionToMarkdown({
        notionClient: notion,
    });

    const page = await notion.pages.retrieve({
        page_id: pageId,
    });

    let pageTitle = "";
    let pageDate = "";
    let pageDesc = "";
    let pageThumbnail = "";
    const mdBlocks = await n2m.pageToMarkdown(pageId);

    if ("properties" in page) {
        if ("title" in page.properties.title) {
            pageTitle = page.properties.title.title[0].plain_text;
        }

        if ("date" in page.properties.createdAt) {
            pageDate = page.properties?.createdAt?.date?.start ?? "";
        }

        if ("rich_text" in page.properties.description) {
            const tempDesc = page.properties.description.rich_text[0];
            if ("text" in tempDesc) {
                pageDesc = tempDesc.text.content;
            }
        }

        if ("files" in page.properties.thumbnail) {
            const tempThumbnail = page.properties.thumbnail.files[0];
            if ("file" in tempThumbnail) {
                const tempThumbnailV2 = tempThumbnail.file;
                if ("url" in tempThumbnailV2) {
                    pageThumbnail = tempThumbnailV2.url;
                }
            }
        }
    }

    return {
        id: page.id,
        title: pageTitle,
        date: pageDate,
        desc: pageDesc,
        thumbnail: pageThumbnail,
        content: n2m.toMarkdownString(mdBlocks).parent,
    };
};

export const parseToc = (content: string): HeadingItem[] => {
    const regex = /^(##|###) (.*$)/gim;
    const headingList = content.match(regex);
    return (
        headingList?.map((heading: string) => ({
            text: heading.replace("##", "").replace("#", ""),
            link:
                "#" +
                heading
                    .replace("# ", "")
                    .replace("#", "")
                    .replace(/[\[\]:!@#$/%^&*()+=,.]/g, "")
                    .replace(/ /g, "-")
                    .toLowerCase()
                    .replace("?", ""),
            indent: (heading.match(/#/g)?.length || 2) - 2,
        })) || []
    );
};
