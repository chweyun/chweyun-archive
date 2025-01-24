interface Props {
    post: {
        id: string;
        title: string;
        date: string;
        desc: string;
        thumbnail: string;
        content: string;
    };
}

export const PostHeader = ({ post }: Props) => {
    return (
        <header className="mt-40 mb-20 text-center">
            <h1 className="mb-5 text-3xl">{post.title}</h1>
            <div className="flex justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                    <span>{post.date}</span>
                </div>
            </div>
        </header>
    );
};
