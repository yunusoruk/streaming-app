'use client'
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import qs from 'query-string'
import { useState, type FC, useEffect } from 'react';
import Input from './Input';

interface SearchInputProps { }

const SearchInput: FC<SearchInputProps> = ({ }) => {

    const router = useRouter()

    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 250)

    useEffect(() => {
        const query = {
            title: debouncedValue
        }

        const url = qs.stringifyUrl({
            url: '/search',
            query: query
        })

        router.push(url)
    }, [router, debouncedValue])


    return (
        <Input
            placeholder='What do you want to listen?'
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}
export default SearchInput;