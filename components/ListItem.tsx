'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { FaPlay } from 'react-icons/fa'

interface ListItemProps {
    image: string
    name: string
    href: string
}

const ListItem: FC<ListItemProps> = ({
    image,
    name,
    href
}) => {

    const router = useRouter()

    const onclick = () => {
        //add authentication before push
        router.push(href)
    }


    return (
        <button
            onClick={onclick}
            className='
            relative
            group
            flex
            items-center
            rounded-md
            overflow-hidden
            gap-x-4
            bg-neutral-100/10
            hover:bg-neutral-100/20
            transition
            pr-4
        '
        >
            <div
                className="
            relative
            min-h-[64px]
            min-w-[64px]
            ">
                <Image
                    className='object-cover'
                    fill
                    src={image}
                    alt='image'
                />
            </div>
            <p className='font-medium truncate py-5'>
                {name}
            </p>
            {/* down; we used p-4 for the size of the object when it is p-4 it was scaled as 4 px for r */}
            <div className="
                absolute
                transition
                opacity-0
                rounded-full
                flex
                items-center
                justify-center
                bg-green-500
                p-4
                right-5
                drop-shadow-md
                group-hover:opacity-100
                hover:scale-110
            ">
                <FaPlay
                    className='text-black'
                />
            </div>


        </button>
    );
}
export default ListItem;