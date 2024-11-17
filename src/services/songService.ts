import { database } from "../config/firebase";
import { ref, set, remove } from "firebase/database";
import { Song } from "../types";
import { fetchVideoTitle } from "../utils/youtube";

export const addSong = async (roomId: string, songData: Omit<Song, "title">) => {
  const title = await fetchVideoTitle(songData.id);
  await set(ref(database, `rooms/${roomId}/songs/${songData.id}`), {
    ...songData,
    title,
  });
};

export const removeSong = async (roomId: string, songId: string) => {
  await remove(ref(database, `rooms/${roomId}/songs/${songId}`));
}; 