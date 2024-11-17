import React from "react";
import { User } from "../types";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  toggleDarkMode,
  user,
  onLogin,
  onLogout,
}) => {
  return (
    <div className="mb-8 flex justify-between items-center">
      <button
        onClick={toggleDarkMode}
        className={`p-2 rounded-lg ${
          darkMode
            ? "bg-purple-800 text-white hover:bg-purple-700"
            : "bg-blue-100 text-blue-900 hover:bg-blue-200"
        }`}
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
      <div className="flex items-center gap-4">
        {!user ? (
          <button
            onClick={onLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Login with Google
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <p className={darkMode ? "text-white" : "text-gray-800"}>
              Welcome, {user.displayName}
            </p>
            <button
              onClick={onLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
