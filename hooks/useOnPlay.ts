import { Song } from "@/types";
import usePlayer from "./usePlayer";
import { useUser } from "./useUser";
import useAuthModal from "./useAuthModal";
import useSubscribeModal from "./useSubscribeModal";

const useOnPlay = (songs: Song[]) => {
    const player = usePlayer()
    const { user, subscription } = useUser()
    const authModal = useAuthModal()
    const subscribeModal = useSubscribeModal()

    const onPlay = (id: string) => {
        if(!user) {
            return authModal.onOpen()
        }

        if(!subscription){
            return subscribeModal.onOpen()
        }

        player.setId(id)
        player.setIds(songs.map((song) => song.id))
    }

    return onPlay

}

export default useOnPlay