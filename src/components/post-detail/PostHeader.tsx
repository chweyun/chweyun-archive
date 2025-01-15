import { Post } from '@/config/types';
import { Clock3 } from 'lucide-react';

interface Props {
    post: Post;
}

export const PostHeader = ({ post }: Props) => {
    return (
        <header className='mt-40 mb-20 text-center'>
            <h1 className='mb-5 text-3xl'>{post.title}</h1>
            <div className='flex justify-center gap-3 text-sm text-gray-500 dark:text-gray-400'>
                <div className='flex items-center gap-1'>
                    <span>{post.dateString}</span>
                </div>
                <div className='flex items-center gap-1'>
                    <Clock3 className='w-3.5' />
                    <span>{post.readingMinutes}m</span>
                </div>
            </div>
        </header>
    );
};
