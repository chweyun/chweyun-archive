import { Client } from "@notionhq/client";
import { HeadingItem, PostCard } from "@/config/types";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY });
const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;

export const getSortedPostList = async (category?: string): Promise<PostCard[]> => {
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
    });

    return await Promise.all(
        response.results.map(async (item: any) => {
            return {
                id: item.id,
                title: item.properties.title.title[0].text.content,
                date: item.properties.createdAt.date.start,
                desc: item.properties.description?.rich_text[0]?.text.content,
                category: item.properties.category.multi_select.map((c: any) => {
                    return c.name;
                }),
                thumbnail: item.properties.thumbnail?.files[0]?.file?.url,
            };
        }),
    );
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
    const mdBlocks = await n2m.pageToMarkdown(pageId);

    return {
        id: page.id,
        title: page.properties?.title?.title[0]?.plain_text,
        date: page.properties?.createdAt?.date?.start,
        desc: page.properties?.description?.rich_text[0]?.text.content,
        thumbnail: page.properties?.thumbnail?.files[0].file.url,
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
