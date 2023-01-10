import { NextApiRequest, NextApiResponse } from "next";

const playground: Track = {
  title: "Playground (from the series Arcane League of Legends)",
  album: "Arcane League of Legends (Soundtrack from the Animated Series)",
  artist: "Bea Miller",
  artists: ["Arcane", "Bea Miller", "Yung Baby Tate"],
  artwork: {
    src: "https://i.ibb.co/ccxt65y/cover-256x256.png",
    sizes: "256x256",
    type: "image/png",
  },
  artworks: [
    {
      src: "https://i.ibb.co/vhKy16K/cover-96x96.png",
      sizes: "96x96",
      type: "image/png",
    },
    {
      src: "https://i.ibb.co/7yqc2sh/cover-128x128.png",
      sizes: "128x128",
      type: "image/png",
    },
    {
      src: "https://i.ibb.co/ccxt65y/cover-256x256.png",
      sizes: "256x256",
      type: "image/png",
    },
    {
      src: "https://i.ibb.co/MSJqrFr/cover-384x384.png",
      sizes: "384x384",
      type: "image/png",
    },
    {
      src: "https://i.ibb.co/JzjNZn4/cover-4-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
  src: "https://dl.dropboxusercontent.com/s/26we5rwpi1pefpr/Playground%20%28from%20the%20series%20Arcane%20League%20of%20Legends%29.flac?dl=0",
};

const hatsune: Track = {
  title: "Unhappy Refrain",
  album: "Musical Album of Wowaka",
  artist: "Wowaka",
  artists: ["Wowaka", "Hatsune Miku"],
  artwork: {
    src: "https://i.ibb.co/HXX5LbK/3.jpg",
    sizes: "256x256",
    type: "image/jpg",
  },
  artworks: [
    {
      src: "https://i.ibb.co/0MXqfCL/1.jpg",
      sizes: "96x96",
      type: "image/jpg",
    },
    {
      src: "https://i.ibb.co/vX8BB4y/2.jpg",
      sizes: "128x128",
      type: "image/jpg",
    },
    {
      src: "https://i.ibb.co/HXX5LbK/3.jpg",
      sizes: "256x256",
      type: "image/jpg",
    },
    {
      src: "https://i.ibb.co/pWKRCND/4.jpg",
      sizes: "384x384",
      type: "image/jpg",
    },
    {
      src: "https://i.ibb.co/r3j9Wp4/5.jpg",
      sizes: "512x512",
      type: "image/jpg",
    },
  ],
  src: "https://dl.dropboxusercontent.com/s/oskguhklr1j2a04/Unhappy%20Refrain.mp3?dl=0",
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: "John Doe" });
}

interface ArtworkItem {
  src: string;
  sizes: "96x96" | "128x128" | "256x256" | "384x384" | "512x512";
  type: string;
}

interface Track {
  title: string;
  artist: string;
  artists: string[];
  album: string;
  artwork: {
    src: string;
    type: string;
    sizes: "256x256";
  };
  artworks: ArtworkItem[];
  src: string;
}
