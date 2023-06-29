'use client'
import * as Slider from '@radix-ui/react-slider';

import type { FC } from 'react';

interface SliderContentProps {
    value?: number
    onChange: (value: number) => void
}

const SliderContent: FC<SliderContentProps> = ({ value = 1, onChange }) => {

    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0])
    }

    return (


        <Slider.Root defaultValue={[1]} max={1} step={0.1}
            className='relative w-full h-10 flex items-center  select-none touch-none'
            onValueChange={handleChange}
            value={[value]}
            aria-label='Volume'
        >
            <Slider.Track className='
            relative 
            bg-neutral-600
            grow
            rounded-full
            h-[3px]
             ' >
                <Slider.Range className='absolute rounded-full h-full bg-white' />
            </Slider.Track>
            <Slider.Thumb className='
            block
            w-[8px] 
            h-[8px] 
            rounded-full
            bg-neutral-400
            hover:bg-white
            '
                aria-label="Volume" />
        </Slider.Root>



    );
}
export default SliderContent;