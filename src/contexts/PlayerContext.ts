import { createContext } from "react";

interface Episode {
  title: string
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

interface PlayerContextData {
  episodeList: Episode[]
  currentEpisodeIndex: number
}

export const PlayerContext = createContext({} as PlayerContextData)