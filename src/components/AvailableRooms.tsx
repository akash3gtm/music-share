import React from 'react';
import { Room } from '../types';
import { RoomCard } from './RoomCard';

interface AvailableRoomsProps {
  darkMode: boolean;
  rooms: Room[];
  showRoomPassword: boolean;
  setShowRoomPassword: (show: boolean) => void;
  roomPassword: string;
  setRoomPassword: (password: string) => void;
  handleJoinRoom: (e: React.FormEvent, roomId: string) => void;
  deleteRoom: (roomId: string) => void;
  currentUserId?: string;
  onCreateRoom: () => void;
}

export const AvailableRooms: React.FC<AvailableRoomsProps> = ({
  darkMode,
  rooms,
  showRoomPassword,
  setShowRoomPassword,
  roomPassword,
  setRoomPassword,
  handleJoinRoom,
  deleteRoom,
  currentUserId,
  onCreateRoom,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
          Available Rooms
        </h2>
        <button
          onClick={onCreateRoom}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create New Room
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            darkMode={darkMode}
            showRoomPassword={showRoomPassword}
            setShowRoomPassword={setShowRoomPassword}
            roomPassword={roomPassword}
            setRoomPassword={setRoomPassword}
            handleJoinRoom={handleJoinRoom}
            deleteRoom={deleteRoom}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
}; 