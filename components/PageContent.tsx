'use client'

import { Song } from '@/types';
import type { FC } from 'react';
import SongItem from './SongItem';
import useOnPlay from '@/hooks/useOnPlay';

interface PageContentProps {
    songs: Song[]
}

const PageContent: FC<PageContentProps> = ({
    songs
}) => {

    const onPlay = useOnPlay(songs)

    return (
        <div
            className='
                    grid
                    grid-cols-2
                    sm:grid-cols-3
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-8
                    gap-4
                    mt-4
                '
        >
            {songs.map((item) => (
                <SongItem
                    key={item.id}
                    onClick={(id) => onPlay(id)}
                    data={item}
                />
            ))}

        </div>
    );
}
export default PageContent;