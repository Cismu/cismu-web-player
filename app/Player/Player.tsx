"use client";

import React from "react";
import Controls from "./Controls";
import Options from "./Options";
import Slider from "./Slider";
import Metadata from "./Metadata";
import { ArtworkItem, Track, EData } from "./types";
import styles from "./styles.module.css";

const playground: Track = {
  title: "Playground (from the series Arcane League of Legends)",
  album: "Arcane League of Legends (Soundtrack from the Animated Series)",
  artist: "Bea Miller",
  artists: ["Arcane", "Bea Miller", "Yung Baby Tate"],
  artwork: [
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

class Player extends React.Component<Props, State> {
  state: State;
  audioElement?: HTMLAudioElement;
  videoElement?: HTMLVideoElement;
  audioSourceNode?: MediaElementAudioSourceNode;
  AudioMap?: WeakMap<object, MediaElementAudioSourceNode>;
  audioContext?: AudioContext;

  constructor(props: Props) {
    super(props);
    this.state = {
      isPlaying: false,
      isPaused: true,
      isReady: false,
      isAnalyzer: false,
      queue: [],
    };

    if (typeof window !== "undefined") {
      this.audioElement = document.createElement("audio");
      this.videoElement = document.createElement("video");
      this.videoElement.crossOrigin = "anonymous";
      this.videoElement.autoplay = true;
      this.videoElement.loop = false;
      this.videoElement.muted = true;

      this.audioContext = new AudioContext();
      this.AudioMap = new WeakMap();

      if (this.AudioMap.has(this.audioElement)) {
        this.audioSourceNode = this.AudioMap.get(this.audioElement)!; // Non-null assertion operator ! https://stackoverflow.com/q/70723319
      } else {
        this.audioSourceNode = this.audioContext.createMediaElementSource(
          this.audioElement
        );
        this.AudioMap.set(this.audioElement, this.audioSourceNode);
      }

      this.audioSourceNode.connect(this.audioContext.destination);
    }
  }

  createEvent<EData>(eName: string, data?: EData): Event | CustomEvent<EData> {
    if (data) {
      return new CustomEvent<EData>(eName, { detail: data });
    }
    return new Event(eName);
  }

  componentDidMount(): void {
    document.addEventListener("playerplay", this.play.bind(this));
    document.addEventListener("playerpause", this.pause.bind(this));

    if ("mediaSession" in navigator) {
      this.mediaSession();
      this.mediaMetadata();
    }

    if (this.audioElement) {
      this.audioElement.crossOrigin = "anonymous";
      this.audioElement.src = playground.src;
    }
  }

  async play() {
    if (this.audioElement) {
      await this.audioElement.play();
      navigator.mediaSession.playbackState = "playing";
    }
  }

  pause() {
    if (this.audioElement) {
      this.audioElement.pause();
      navigator.mediaSession.playbackState = "paused";
    }
  }

  PictureinPicture() {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
      const source = document.createElement("canvas");
      source.height = 260;
      source.width = 260;
      const ctx = source.getContext("2d");
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = String(playground.artwork.at(-1)?.src);

      if (ctx) {
        image.onload = () => {
          ctx.drawImage(image, 0, 0, source.width, source.height);
        };
      }

      const stream = source.captureStream(25);
      if (this.videoElement) {
        this.videoElement.srcObject = stream;
        this.videoElement.onloadedmetadata = () => {
          if (this.videoElement) {
            this.videoElement.requestPictureInPicture();
            this.videoElement.play();
          }
        };
      }
    }
  }

  toggleAnalyzer() {
    if (this.audioSourceNode && !this.state.isAnalyzer) {
      const customEventCount = new CustomEvent("playergetsource", {
        detail: this.audioSourceNode,
      });

      document.dispatchEvent(customEventCount);
      this.setState({
        isAnalyzer: true,
      });
    } else {
      document.dispatchEvent(new Event("playersetsource"));
      this.setState({
        isAnalyzer: false,
      });
    }
  }

  mediaMetadata() {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: playground.title,
      artist: Array.isArray(playground.artist)
        ? playground.artist.toString()
        : playground.artist,
      album: playground.album,
      artwork: playground.artwork,
    });
  }

  mediaSession() {
    type ActionTypes = [MediaSessionAction, () => void];
    const actionHandlers: ActionTypes[] = [
      [
        "play",
        async () => {
          if (this.audioElement) {
            await this.audioElement.play();
          }
          if (this.videoElement) await this.videoElement.play();
          navigator.mediaSession.playbackState = "playing";
        },
      ],
      [
        "pause",
        () => {
          if (this.audioElement) {
            this.audioElement.pause();
          }
          if (this.videoElement) this.videoElement.pause();
          navigator.mediaSession.playbackState = "paused";
        },
      ],
      ["previoustrack", () => {}],
      ["nexttrack", () => {}],
    ];

    for (const [action, handler] of actionHandlers) {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch (error) {
        console.log(
          `The media session action "${action}" is not supported yet.`
        );
      }
    }
  }

  render(): React.ReactNode {
    let ControlProps = {
      play: () => this.play,
      pause: () => this.pause,
      paused: this.audioElement?.paused || false,
    };
    return (
      <div className={`${styles["player"]} flex h-[80px] items-center px-6`}>
        <Controls {...ControlProps} />
        <Metadata track={playground} />
        <Options />
      </div>
    );
  }
}

export default Player;

interface Props {}
interface State {
  isPlaying: boolean;
  isPaused: boolean;
  isReady: boolean;
  isAnalyzer: boolean;
  queue: Track[];
}
