import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Room } from "../types";

interface RoomCardProps {
  room: Room;
  darkMode: boolean;
  showRoomPassword: boolean;
  setShowRoomPassword: (show: boolean) => void;
  roomPassword: string;
  setRoomPassword: (password: string) => void;
  handleJoinRoom: (e: React.FormEvent, roomId: string) => void;
  deleteRoom: (roomId: string) => void;
  currentUserId?: string;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  darkMode,
  showRoomPassword,
  setShowRoomPassword,
  roomPassword,
  setRoomPassword,
  handleJoinRoom,
  deleteRoom,
  currentUserId,
}) => {
  return (
    <div
      className={`p-4 rounded-lg transition-all backdrop-blur-sm border-2
        ${
          darkMode
            ? "bg-purple-900/20 border-purple-500/30 hover:border-purple-500/70"
            : "bg-white border-blue-300/50 hover:border-blue-500/70"
        }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <h3
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {room.name}
          </h3>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Songs: {room.participantsCount}
          </p>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Created by: {room.creatorName}
          </p>
        </div>
        <div className="flex flex-col gap-3 ml-8 flex-shrink-0">
          <form
            onSubmit={(e) => handleJoinRoom(e, room.id)}
            className="flex gap-2"
          >
            <div className="relative">
              <input
                type={showRoomPassword ? "text" : "password"}
                placeholder="Room Password"
                className={`p-2 rounded-lg transition-all backdrop-blur-sm border-2 pr-10 w-44
                  ${
                    darkMode
                      ? "bg-gray-900/30 border-purple-500/30 focus:border-purple-500/70 text-white placeholder-gray-400"
                      : "bg-white/30 border-blue-300/50 focus:border-blue-500/70 text-gray-800 placeholder-gray-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                onChange={(e) => setRoomPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowRoomPassword(!showRoomPassword)}
              >
                {showRoomPassword ? (
                  <EyeSlashIcon
                    className={`h-5 w-5 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                ) : (
                  <EyeIcon
                    className={`h-5 w-5 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 h-10 rounded hover:bg-blue-600 self-center"
            >
              Join
            </button>
          </form>
          {currentUserId === room.createdBy && (
            <button
              onClick={() => deleteRoom(room.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-max self-end"
            >
              Delete Room
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 