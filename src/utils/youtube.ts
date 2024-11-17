export const convertYouTubeUrl = (url: string): string | null => {
  const videoId = url.match(
    /(?:youtu.be\/|youtube.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^/&]{10,12})/
  );
  return videoId ? videoId[1] : null;
};

export const fetchVideoTitle = async (videoId: string): Promise<string> => {
  try {
    const response = await fetch(
      `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`
    );
    const data = await response.json();
    return data.title;
  } catch (error) {
    console.error("Error fetching video title:", error);
    return "Unknown Title";
  }
};

export const loadYouTubeAPI = (): void => {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  if (firstScriptTag && firstScriptTag.parentNode) {
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  } else {
    document.head.appendChild(tag);
  }
};
