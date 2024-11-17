import { useEffect, useRef, MutableRefObject } from 'react';
import { YouTubePlayer } from '../types/youtube';
import { Song } from '../types';
import { loadYouTubeAPI } from '../utils/youtube';

export const useYouTubePlayer = (
  isPlaying: boolean,
  songs: Song[],
  currentSongIndex: number,
  onVideoEnd: () => void
): MutableRefObject<YouTubePlayer | null> => {
  const playerRef = useRef<YouTubePlayer | null>(null);

  useEffect(() => {
    loadYouTubeAPI();
  }, []);

  useEffect(() => {
    if (typeof window.YT === "undefined") return;

    const createPlayer = () => {
      if (songs.length === 0 || !isPlaying) {
        if (playerRef.current) {
          playerRef.current.destroy();
          playerRef.current = null;
        }
        return;
      }

      // Destroy existing player if it exists
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }

      // Create new player
      playerRef.current = new window.YT.Player("youtube-player", {
        height: "100%",
        width: "100%",
        videoId: songs[currentSongIndex].id,
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
        },
        events: {
          onStateChange: (event) => {
            if (event.data === 0) {
              onVideoEnd();
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [isPlaying, songs, currentSongIndex, onVideoEnd]);

  return playerRef;
}; 