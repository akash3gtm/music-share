import React from 'react';
import { Song } from '../types';
import { PlaylistItem } from './PlaylistItem';

interface PlaylistProps {
  songs: Song[];
  currentSongIndex: number;
  isPlaying: boolean;
  darkMode: boolean;
  currentUserId?: string;
  onRemove: (songId: string, userId: string) => void;
}

export const Playlist: React.FC<PlaylistProps> = ({
  songs,
  currentSongIndex,
  isPlaying,
  darkMode,
  currentUserId,
  onRemove,
}) => {
  return (
    <div className={isPlaying ? "w-80" : "w-full"}>
      <h2 className={`text-xl mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
        Playlist
      </h2>
      <div className="space-y-2 max-h-[60vh] overflow-y-auto">
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <PlaylistItem
              key={song.id}
              song={song}
              isCurrentSong={currentSongIndex === index}
              isPlaying={isPlaying}
              darkMode={darkMode}
              currentUserId={currentUserId}
              onRemove={onRemove}
            />
          ))
        ) : (
          <div
            className={`p-4 rounded-lg border-2 text-center ${
              darkMode
                ? "bg-purple-900/20 border-purple-500/30 text-gray-300"
                : "bg-white/60 border-blue-300/50 text-gray-600"
            }`}
          >
            No songs in playlist
          </div>
        )}
      </div>
    </div>
  );
}; 