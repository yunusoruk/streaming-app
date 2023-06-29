'use client'

import { Song } from '@/types';
import type { FC } from 'react';
import MediaItem from './MediaItem';
import LikeButton from './LikeButton';
import useOnPlay from '@/hooks/useOnPlay';

interface SearchContentProps {
    songs: Song[]
}

const SearchContent: FC<SearchContentProps> = ({
    songs
}) => {

    const onPlay = useOnPlay(songs)

    if (songs.length === 0) {
        return (
            <div
                className='
                    flex
                    flex-col
                    gap-y-2
                    w-full
                    px-6
                    text-neutral-400
                '
            >
                No songs found!
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
            {songs.map((item) => (
                <div
                    key={item.id}
                    className='flex items-center gap-x-4 w-full'
                >
                    <div className="flex-1">
                        <MediaItem
                            data={item}
                            onClick={(id: string) => onPlay(id)}
                        />
                    </div>

                    <LikeButton
                        songId={item.id}
                    />
                </div>
            ))}
        </div>
    );
}
export default SearchContent;