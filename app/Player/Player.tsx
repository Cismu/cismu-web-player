"use client";

import React from "react";
import Controls from "./Controls";
import Options from "./Options";
import Slider from "./Slider";
import Metadata from "./Metadata";
import { ArtworkItem, Track, EData } from "./types";

const playground: Track = {
  title: "Playground (from the series Arcane League of Legends)",
  album: "Arcane League of Legends (Soundtrack from the Animated Series)",
  artist: ["Arcane", "Bea Miller", "Yung Baby Tate"],
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

  constructor(props: Props) {
    super(props);
    this.state = {
      isPlaying: false,
      isPaused: true,
      isReady: false,
      audioElement: undefined,
      videoElement: undefined,
      audioSourceNode: undefined,
      audioContext: undefined,
      isAnalyzer: false,
      queue: [],
    };
  }

  createEvent<EData>(eName: string, data?: EData): Event | CustomEvent<EData> {
    if (data) {
      return new CustomEvent<EData>(eName, { detail: data });
    }
    return new Event(eName);
  }

  componentDidMount(): void {
    if (this.state.audioElement === undefined) {
      let audio = document.createElement("audio");
      audio.src = playground.src;
      audio.crossOrigin = "anonymous";
      this.setState({
        audioElement: audio
      });
    }

    if (this.state.videoElement === undefined) {
      let video = document.createElement("video");
      video.src = playground.src;
      video.crossOrigin = "anonymous";
      this.setState({
        videoElement: video
      });
    }

    if (this.state.audioContext === undefined) {
      let audioContext = new AudioContext();
      this.setState({
        audioContext: audioContext
      });
    }

    if (this.state.audioSourceNode === undefined) {
      if (this.state.audioElement && this.state.audioContext) {
        let audio = this.state.audioElement;
        let audioNode = this.state.audioContext.createMediaElementSource(audio);
        this.setState({
          audioSourceNode: audioNode
        });
      }
    }


    if ("mediaSession" in navigator) {
      this.mediaSession();
    }

    document.addEventListener("playerplay", this.play.bind(this));
    document.addEventListener("playerpause", this.pause.bind(this));
  }

  play() {
    if (this.state.audioElement) {
      this.state.audioElement.play();
    }
  }

  pause() {
    if (this.state.audioElement) {
      this.state.audioElement.pause();
    }
  }

  toggleAnalyzer() {
    if (this.state.audioSourceNode && !this.state.isAnalyzer) {
      const customEventCount = new CustomEvent("playergetsource", {
        detail: this.state.audioSourceNode,
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

  mediaSession() {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: playground.title,
      artist: Array.isArray(playground.artist)
        ? playground.artist.toString()
        : playground.artist,
      album: playground.album,
      artwork: playground.artwork,
    });

    navigator.mediaSession.setActionHandler("play", () => this.play());
    navigator.mediaSession.setActionHandler("pause", () => this.pause());
    navigator.mediaSession.setActionHandler("stop", () => { });

    navigator.mediaSession.setActionHandler("seekbackward", () => {
      /* Code excerpted. */
    });
    navigator.mediaSession.setActionHandler("seekforward", () => {
      /* Code excerpted. */
    });
    navigator.mediaSession.setActionHandler("seekto", () => {
      /* Code excerpted. */
    });
    navigator.mediaSession.setActionHandler("previoustrack", () => {
      /* Code excerpted. */
    });
    navigator.mediaSession.setActionHandler("nexttrack", () => {
      /* Code excerpted. */
    });
  }

  render(): React.ReactNode {
    return (
      <div className="flex h-full flex-col items-center">
        <div className="w-full">
          <Slider />
        </div>
        <div className="h-full w-full">
          <div className="flex h-full flex-row">
            <Metadata track={playground} />
            <Controls />
            <Options />
          </div>
        </div>
        <button onClick={() => this.toggleAnalyzer()}>
          Active AudioMotion
        </button>
      </div>
    );
  }
}

export default Player;

interface Props { }
interface State {
  audioElement: HTMLAudioElement | undefined;
  videoElement: HTMLVideoElement | undefined;
  isPlaying: boolean;
  isPaused: boolean;
  isReady: boolean;
  audioSourceNode: MediaElementAudioSourceNode | undefined;
  audioContext: AudioContext | undefined;
  isAnalyzer: boolean;
  queue: Track[];
}
