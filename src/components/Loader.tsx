interface LoaderProps {
  darkMode: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ darkMode }) => {
  return (
    <div className={`min-h-screen ${darkMode ? "bg-purple-950" : "bg-white"}`}>
      <div className="h-screen flex items-center justify-center">
        <div className="relative">
          <div
            className={`w-16 h-16 rounded-full absolute 
              ${darkMode ? "border-purple-500" : "border-blue-500"} 
              border-4 border-t-transparent animate-spin`}
          />
          <div
            className={`w-12 h-12 rounded-full absolute top-2 left-2
              ${darkMode ? "border-purple-400" : "border-blue-400"} 
              border-4 border-t-transparent animate-spin`}
            style={{ animationDuration: "1.5s" }}
          />
          <div
            className={`w-8 h-8 rounded-full absolute top-4 left-4
              ${darkMode ? "border-purple-300" : "border-blue-300"} 
              border-4 border-t-transparent animate-spin`}
            style={{ animationDuration: "2s" }}
          />
        </div>
      </div>
    </div>
  );
}; 