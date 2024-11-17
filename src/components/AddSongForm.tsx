import React from 'react';

interface AddSongFormProps {
  darkMode: boolean;
  newSongUrl: string;
  setNewSongUrl: (url: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AddSongForm: React.FC<AddSongFormProps> = ({
  darkMode,
  newSongUrl,
  setNewSongUrl,
  onSubmit,
}) => {
  return (
    <div className="mb-8">
      <form onSubmit={onSubmit} className="flex gap-4">
        <input
          type="text"
          value={newSongUrl}
          onChange={(e) => setNewSongUrl(e.target.value)}
          placeholder="Paste YouTube URL here"
          className={`flex-1 p-2 rounded-lg transition-all backdrop-blur-sm border-2 
            ${
              darkMode
                ? "bg-purple-900/20 border-purple-500/30 focus:border-purple-500/70 text-white placeholder-purple-300/50"
                : "bg-white/60 border-blue-300/50 focus:border-blue-500/70 text-gray-800 placeholder-blue-500/50"
            } focus:outline-none focus:ring-2 ${
            darkMode ? "focus:ring-purple-500/20" : "focus:ring-blue-500/20"
          }`}
          required
        />
        <button
          type="submit"
          className={`text-white px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg ${
            darkMode
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Add Song
        </button>
      </form>
    </div>
  );
}; 