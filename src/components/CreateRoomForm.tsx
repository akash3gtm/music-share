import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface CreateRoomFormProps {
  darkMode: boolean;
  newRoomName: string;
  setNewRoomName: (name: string) => void;
  roomPassword: string;
  setRoomPassword: (password: string) => void;
  showCreateRoomPassword: boolean;
  setShowCreateRoomPassword: (show: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export const CreateRoomForm: React.FC<CreateRoomFormProps> = ({
  darkMode,
  newRoomName,
  setNewRoomName,
  roomPassword,
  setRoomPassword,
  showCreateRoomPassword,
  setShowCreateRoomPassword,
  onSubmit,
  onBack,
}) => {
  return (
    <div
      className={`max-w-md mx-auto p-6 rounded-lg transition-all backdrop-blur-sm border-2
        ${
          darkMode
            ? "bg-purple-900/20 border-purple-500/30"
            : "bg-white/60 border-purple-300/50"
        }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`text-2xl font-bold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Create New Room
        </h2>
        <button
          onClick={onBack}
          className={`${
            darkMode
              ? "text-gray-300 hover:text-white"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          ← Back
        </button>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="roomName"
            className={`block text-sm font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Room Name
          </label>
          <input
            id="roomName"
            type="text"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            placeholder="Enter room name"
            className={`w-full p-2 rounded-lg transition-all backdrop-blur-sm border-2
              ${
                darkMode
                  ? "bg-gray-900/30 border-purple-500/30 focus:border-purple-500/70 text-white placeholder-gray-400"
                  : "bg-white/30 border-blue-300/50 focus:border-blue-500/70 text-gray-800 placeholder-gray-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            required
          />
        </div>
        <div>
          <label
            htmlFor="roomPassword"
            className={`block text-sm font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Room Password
          </label>
          <div className="relative">
            <input
              id="roomPassword"
              type={showCreateRoomPassword ? "text" : "password"}
              value={roomPassword}
              onChange={(e) => setRoomPassword(e.target.value)}
              placeholder="Enter room password"
              className={`w-full p-2 rounded-lg transition-all backdrop-blur-sm border-2 pr-10
                ${
                  darkMode
                    ? "bg-gray-900/30 border-purple-500/30 focus:border-purple-500/70 text-white placeholder-gray-400"
                    : "bg-white/30 border-blue-300/50 focus:border-blue-500/70 text-gray-800 placeholder-gray-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowCreateRoomPassword(!showCreateRoomPassword)}
            >
              {showCreateRoomPassword ? (
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
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Room
        </button>
      </form>
    </div>
  );
}; 