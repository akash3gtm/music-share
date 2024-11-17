export interface YouTubePlayer {
  destroy: () => void;
  loadVideoById: (videoId: string) => void;
}

export interface YouTubeEvent {
  data: number;
}

export interface YouTubePlayerConfig {
  height: string;
  width: string;
  videoId: string;
  playerVars?: {
    autoplay?: number;
    controls?: number;
    modestbranding?: number;
  };
  events?: {
    onStateChange?: (event: YouTubeEvent) => void;
  };
}

declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, config: YouTubePlayerConfig) => YouTubePlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
} 