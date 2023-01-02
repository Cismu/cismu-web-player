export interface ArtworkItem {
  src: string;
  sizes: "96x96" | "128x128" | "256x256" | "384x384" | "512x512";
  type: string;
}

export interface Track {
  title: string;
  artist: string;
  artists: string[];
  album: string;
  artwork: ArtworkItem[];
  src: string;
}

export type EData = { [key: string]: string };
