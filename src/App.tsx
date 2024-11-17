import React, { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ref, onValue, get } from "firebase/database";
import { Room, Song } from "./types";
import { useDarkMode } from "./hooks/useDarkMode";
import { useFirebaseAuth } from "./hooks/useFirebaseAuth";
import { useYouTubePlayer } from "./hooks/useYouTubePlayer";
import { auth, database } from "./config/firebase";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";
import { RoomHeader } from "./components/RoomHeader";
import { AddSongForm } from "./components/AddSongForm";
import { CreateRoomForm } from "./components/CreateRoomForm";
import { AvailableRooms } from "./components/AvailableRooms";
import { Playlist } from "./components/Playlist";
import {
  addSong,
  removeSong as removeSongService,
} from "./services/songService";
import {
  createRoom,
  joinRoom as joinRoomService,
  deleteRoom as deleteRoomService,
} from "./services/roomService";
import { convertYouTubeUrl, fetchVideoTitle } from "./utils/youtube";

const YoutubePlaylistApp = () => {
  const { user, isLoading: authLoading } = useFirebaseAuth();
  const [songs, setSongs] = useState<Song[]>([]);
  const [newSongUrl, setNewSongUrl] = useState<string>("");
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [newRoomName, setNewRoomName] = useState<string>("");
  const [roomPassword, setRoomPassword] = useState<string>("");
  const [showCreateRoom, setShowCreateRoom] = useState<boolean>(false);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [showRoomPassword, setShowRoomPassword] = useState<boolean>(false);
  const [showCreateRoomPassword, setShowCreateRoomPassword] =
    useState<boolean>(false);

  const [darkMode, setDarkMode] = useDarkMode();

  // Firebase listeners
  useEffect(() => {
    if (!currentRoom) return;

    const songsRef = ref(database, `rooms/${currentRoom}/songs`);
    const unsubscribe = onValue(songsRef, async (snapshot) => {
      const data = snapshot.val() as Record<string, Song> | null;
      if (!data) {
        setSongs([]);
        return;
      }

      const songList = await Promise.all(
        Object.values(data).map(async (song) => ({
          ...song,
          title: song.title || (await fetchVideoTitle(song.id)),
        }))
      );
      setSongs(songList.sort((a, b) => a.timestamp - b.timestamp));
    });

    return () => unsubscribe();
  }, [currentRoom]);

  useEffect(() => {
    const roomsRef = ref(database, "rooms");
    const unsubscribe = onValue(roomsRef, (snapshot) => {
      const data = snapshot.val() as Record<string, Omit<Room, "id">> | null;
      if (!data) {
        setAvailableRooms([]);
        return;
      }
      const roomsList = Object.entries(data).map(([roomId, room]) => ({
        ...room,
        id: roomId,
        participantsCount: room.songs ? Object.keys(room.songs).length : 0,
      }));
      setAvailableRooms(roomsList);
    });

    return () => unsubscribe();
  }, []);

  // Event handlers
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const handleAddSong = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newSongUrl || !currentRoom) return;

    const videoId = convertYouTubeUrl(newSongUrl);
    if (!videoId) {
      alert("Invalid YouTube URL");
      return;
    }

    const userSong = songs.find((song) => song.userId === user.uid);
    if (userSong) {
      alert(
        "You can only add one song at a time. Remove your existing song first."
      );
      return;
    }

    const newSong = {
      id: videoId,
      url: `https://www.youtube.com/embed/${videoId}`,
      userId: user.uid,
      userName: user.displayName || "Anonymous User",
      timestamp: Date.now(),
    };

    await addSong(currentRoom, newSong);
    setNewSongUrl("");
  };

  const handleJoinRoom = async (e: React.FormEvent, roomId: string) => {
    e.preventDefault();
    try {
      await joinRoomService(roomId, roomPassword);
      setCurrentRoom(roomId);
      setRoomPassword("");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to join room");
    }
  };

  const handleCreateRoomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newRoomName || !roomPassword) {
      alert("Please provide room name and password");
      return;
    }

    try {
      await createRoom({
        name: newRoomName,
        password: roomPassword,
        createdBy: user.uid,
        creatorName: user.displayName || "Anonymous User",
        timestamp: Date.now(),
      });

      setNewRoomName("");
      setRoomPassword("");
      setShowCreateRoom(false);
      setCurrentRoom(newRoomName);
    } catch (error) {
      alert("Failed to create room");
    }
  };

  const handleRemoveSong = async (songId: string, userId: string) => {
    if (!currentRoom || user?.uid !== userId) {
      alert("You can only remove your own song!");
      return;
    }
    await removeSongService(currentRoom, songId);
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (!user) return;

    try {
      const roomRef = ref(database, `rooms/${roomId}`);
      const snapshot = await get(roomRef);

      if (!snapshot.exists()) return;

      const roomData = snapshot.val() as Room;
      if (roomData.createdBy !== user.uid) {
        alert("You can only delete rooms you created!");
        return;
      }

      if (window.confirm("Are you sure you want to delete this room?")) {
        await deleteRoomService(roomId);
        if (currentRoom === roomId) {
          setCurrentRoom(null);
        }
      }
    } catch (error) {
      alert("Failed to delete room");
    }
  };

  const playerRef = useYouTubePlayer(isPlaying, songs, currentSongIndex, () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex((prev) => prev + 1);
      if (playerRef.current) {
        playerRef.current.loadVideoById(songs[currentSongIndex + 1].id);
      }
    } else {
      setIsPlaying(false);
      setCurrentSongIndex(0);
    }
  });

  if (authLoading) {
    return <Loader darkMode={darkMode} />;
  }

  return (
    <div
      className={`min-h-screen p-4 transition-colors duration-200 
      ${darkMode ? "bg-purple-950" : "bg-white"}`}
    >
      <div className="max-w-4xl mx-auto">
        <Header
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />

        {!currentRoom ? (
          !showCreateRoom ? (
            <AvailableRooms
              darkMode={darkMode}
              rooms={availableRooms}
              showRoomPassword={showRoomPassword}
              setShowRoomPassword={setShowRoomPassword}
              roomPassword={roomPassword}
              setRoomPassword={setRoomPassword}
              handleJoinRoom={handleJoinRoom}
              deleteRoom={handleDeleteRoom}
              currentUserId={user?.uid}
              onCreateRoom={() => setShowCreateRoom(true)}
            />
          ) : (
            <CreateRoomForm
              darkMode={darkMode}
              newRoomName={newRoomName}
              setNewRoomName={setNewRoomName}
              roomPassword={roomPassword}
              setRoomPassword={setRoomPassword}
              showCreateRoomPassword={showCreateRoomPassword}
              setShowCreateRoomPassword={setShowCreateRoomPassword}
              onSubmit={handleCreateRoomSubmit}
              onBack={() => setShowCreateRoom(false)}
            />
          )
        ) : (
          <div>
            <RoomHeader
              darkMode={darkMode}
              roomName={currentRoom}
              onLeave={() => setCurrentRoom(null)}
            />

            {user && (
              <AddSongForm
                darkMode={darkMode}
                newSongUrl={newSongUrl}
                setNewSongUrl={setNewSongUrl}
                onSubmit={handleAddSong}
              />
            )}

            {songs.length > 0 && !isPlaying && (
              <button
                onClick={() => setIsPlaying(true)}
                className={`w-full text-white px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg mb-8 ${
                  darkMode
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Start Playlist
              </button>
            )}

            <div className={isPlaying ? "mb-8 flex gap-4" : "mb-8"}>
              {isPlaying && songs[currentSongIndex] && (
                <div className="flex-1">
                  <h2
                    className={`text-xl mb-4 ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Now Playing: {songs[currentSongIndex].title}
                  </h2>
                  <div className="aspect-video">
                    <div
                      id="youtube-player"
                      className="w-full h-full rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              )}
              <Playlist
                songs={songs}
                currentSongIndex={currentSongIndex}
                isPlaying={isPlaying}
                darkMode={darkMode}
                currentUserId={user?.uid}
                onRemove={handleRemoveSong}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YoutubePlaylistApp;
