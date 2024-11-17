import { Song } from "../types";

interface PlaylistItemProps {
  song: Song;
  isCurrentSong: boolean;
  isPlaying: boolean;
  darkMode: boolean;
  currentUserId?: string;
  onRemove: (songId: string, userId: string) => void;
}

export const PlaylistItem: React.FC<PlaylistItemProps> = ({
  song,
  isCurrentSong,
  isPlaying,
  darkMode,
  currentUserId,
  onRemove,
}) => {
  return (
    <div
      className={`p-3 rounded-lg transition-all backdrop-blur-sm border 
        ${isCurrentSong && isPlaying
          ? darkMode
            ? "bg-purple-800/40 border-purple-500/70 text-white"
            : "bg-blue-100 border-blue-300 text-gray-800"
          : darkMode
          ? "bg-purple-900/20 border-purple-700/30 text-purple-100 hover:bg-purple-800/30"
          : "bg-white border-blue-200/50 text-gray-800 hover:bg-white"
        }`}
    >
      <p className="font-medium truncate">{song.title}</p>
      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        {song.userName}
      </p>
      {currentUserId === song.userId && (
        <button
          onClick={() => onRemove(song.id, song.userId)}
          className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-sm"
        >
          Remove
        </button>
      )}
    </div>
  );
}; 