export interface Post {
    id: string;
    title: string;
    date: string;
    desc: string;
    category: string[];
    thumbnail: string;
}

export interface HeadingItem {
    text: string;
    link: string;
    indent: number;
}
