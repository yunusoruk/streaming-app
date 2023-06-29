import { Song } from "@/types"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useEffect, useMemo, useState } from "react"
import { toast } from "react-hot-toast"

// create a function that takes id and get the song with the same id
const useGetSongById = (id?:string) => {

    // use isLoading state to 
    const [isLoading, setIsLoading] = useState(false)
    // use song state to store the song
    const [ song, setSong] = useState<Song | undefined>(undefined)

    // Why did we use useSessionContext? when we want only the user to able to change data we use this.
    const {supabaseClient } = useSessionContext()

    useEffect(() => {
        
        if(!id) { 
            return
        }

        setIsLoading(true)

        const fetchData = async() => {
            const {data, error} = await supabaseClient
                .from('songs')
                .select('*')
                .eq('id', id)
                .single()

            if(error){
                setIsLoading(false)
                return toast.error(error.message)

            }
            setSong(data as Song)
            setIsLoading(false)

        }

        fetchData()

    }, [id, supabaseClient])


    // return object with useMemo so it can remember
    return useMemo(() => ({
        isLoading, 
        song
    }), [isLoading, song])


}

export default useGetSongById