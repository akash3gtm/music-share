import React from 'react';

interface RoomHeaderProps {
  darkMode: boolean;
  roomName: string;
  onLeave: () => void;
}

export const RoomHeader: React.FC<RoomHeaderProps> = ({
  darkMode,
  roomName,
  onLeave,
}) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <h2
        className={`text-2xl font-bold ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Room: {roomName}
      </h2>
      <button
        onClick={onLeave}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Leave Room
      </button>
    </div>
  );
}; 