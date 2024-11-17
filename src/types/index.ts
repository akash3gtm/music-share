import { User as FirebaseUser } from 'firebase/auth';

export interface Room {
  id: string;
  name: string;
  password: string;
  createdBy: string;
  creatorName: string;
  timestamp: number;
  participantsCount?: number;
  songs?: { [key: string]: Song };
}

export interface Song {
  id: string;
  url: string;
  userId: string;
  userName: string;
  timestamp: number;
  title: string;
}

export interface User extends FirebaseUser {
  uid: string;
  displayName: string | null;
  email: string | null;
}

export interface AppState {
  user: User | null;
  songs: Song[];
  newSongUrl: string;
  currentSongIndex: number;
  isPlaying: boolean;
  currentRoom: string | null;
  newRoomName: string;
  roomPassword: string;
  showCreateRoom: boolean;
  availableRooms: Room[];
  showRoomPassword: boolean;
  showCreateRoomPassword: boolean;
  isLoading: boolean;
  darkMode: boolean;
}

// Add YouTube types
declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          height: string;
          width: string;
          videoId: string;
          playerVars?: {
            autoplay?: number;
            controls?: number;
            modestbranding?: number;
          };
          events?: {
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => {
        destroy: () => void;
        loadVideoById: (videoId: string) => void;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
} 