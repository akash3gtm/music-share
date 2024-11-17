import { database } from "../config/firebase";
import { ref, set, remove, get } from "firebase/database";
import { Room, User } from "../types";

export const createRoom = async (roomData: Omit<Room, "id">) => {
  const roomRef = ref(database, `rooms/${roomData.name}`);
  await set(roomRef, roomData);
};

export const deleteRoom = async (roomId: string) => {
  const roomRef = ref(database, `rooms/${roomId}`);
  await remove(roomRef);
};

export const joinRoom = async (roomName: string, password: string) => {
  const roomRef = ref(database, `rooms/${roomName}`);
  const snapshot = await get(roomRef);
  if (!snapshot.exists()) {
    throw new Error("Room not found");
  }
  const roomData = snapshot.val();
  if (roomData.password !== password) {
    throw new Error("Incorrect password");
  }
  return roomData;
};

export const storeUserInfo = async (user: User) => {
  await set(ref(database, `users/${user.uid}`), {
    displayName: user.displayName,
    email: user.email,
  });
};

// Add other room-related functions 