import { Song } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"


const getLikedSongs = async(): Promise<Song[]> => {

    

    const supabaseClient = createServerComponentClient({
        cookies: cookies
    })

    // Get session so we can see which user we work with
    const {
        data: {
            session
        }
    } = await supabaseClient.auth.getSession()

    const { data, error } = await supabaseClient
        .from('liked_songs')
        // Select all and also all songs related to the like due to foreign key
        .select('*, songs(*)')
        .eq('user_id', session?.user?.id)
        .order('created_at', {ascending: false})

    if(error) {
        console.log(error);
        return []
    }

    if(!data) {
        return []
    }

    return data.map((item) => ({
        ...item.songs
    }))

}

export default getLikedSongs