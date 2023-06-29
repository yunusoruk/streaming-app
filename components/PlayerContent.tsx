'use client'

import { Song } from '@/types';
import { useState, type FC, useEffect } from 'react';
import { AiFillBackward, AiFillForward, AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';
import MediaItem from './MediaItem';
import LikeButton from './LikeButton';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import SliderContent from './SliderContent';
import usePlayer from '@/hooks/usePlayer';
import useSound from 'use-sound';

interface PlayerContentProps {
    song: Song
    songUrl: string
}

const PlayerContent: FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {

    const player = usePlayer()
    const [volume, setVolume] = useState(1)
    const [isPlaying, setIsPlaying] = useState(false)

    const Icon = isPlaying ? AiFillPauseCircle : AiFillPlayCircle
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

    const playOnNext = () => {
        if (player.ids.length === 0) {
            return
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId)
        const nextSongId = player.ids[currentIndex + 1]

        if (!nextSongId) {
            return player.setId(player.ids[0])
        }

        player.setId(nextSongId)

    }

    const playOnPrevious = () => {
        if (player.ids.length === 0) {
            return
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId)
        const previousSongId = player.ids[currentIndex - 1]

        if (!previousSongId) {
            return player.setId(player.ids[0])
        }

        player.setId(previousSongId)

    }

    const [play, { pause, sound }] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false)
                playOnNext()
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    )

    useEffect(() => {
        sound?.play()

        return () => {
            sound?.unload()
        }

    }, [sound])

    const handlePlay = () => {
        if (!isPlaying) {
            play()
        }
        else {
            pause()
        }
    }

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1)
        }
        else {
            setVolume(0)
        }
    }


    return (
        <div
            className='
                grid
                grid-cols-2
                md:grid-cols-3
                h-full
            '
        >
            <div className="flex w-full justify-start">
                {/* Put the song with the like button */}
                <div
                    className='flex flex-row items-center gap-x-4'
                >
                    <MediaItem data={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>
            <div className="flex md:hidden cols-auto w-full justify-end items-center">
                <Icon size={40}
                    onClick={handlePlay}
                    className='
                    cursor-pointer
                    text-neutral-400
                    hover:text-white
                    transition
                '
                />
            </div>
            <div
                className='
                    hidden
                    h-full
                    md:flex
                    justify-center
                    items-center
                    w-full
                    max-w-[722px]
                    gap-x-6
                '
            >
                <AiFillBackward size={30}
                    onClick={playOnPrevious}
                    className='
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    '
                />

                <Icon size={40}
                    onClick={handlePlay}
                    className='
                        cursor-pointer
                        text-neutral-400
                        hover:text-white
                        transition
                    '
                />
                <AiFillForward size={30}
                    onClick={playOnNext}

                    className='
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    '/>
            </div>
            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon
                        onClick={toggleMute}
                        size={25}
                        className='
                            text-neutral-400
                            cursor-pointer
                            hover:text-white
                            transition
                        '
                    />
                    <SliderContent
                        value={volume}
                        onChange={(value) => setVolume(value)}
                    />
                </div>
            </div>
        </div>
    );
}
export default PlayerContent;