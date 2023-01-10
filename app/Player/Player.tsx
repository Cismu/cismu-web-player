"use client";

import styles from "./styles.module.css";
import Metadata from "./Metadata";
import Controls from "./Controls";
import { Track } from "./types";
import Options from "./Options";
import React from "react";

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

class Player extends React.Component<Props, State> {
  state: State;
  audioElement?: HTMLAudioElement;
  videoElement?: HTMLVideoElement;
  audioSourceNode?: MediaElementAudioSourceNode;
  AudioMap?: WeakMap<object, MediaElementAudioSourceNode>;
  audioContext?: AudioContext;
  storage?: Storage;

  constructor(props: Props) {
    super(props);

    this.state = {
      isPlaying: false,
      isPlayable: false,
      isReady: false,
      isAnalyzer: false,
      queue: [],
      track: undefined,
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
      this.storage = window.localStorage;
      this.pause = this.pause.bind(this);
      this.play = this.play.bind(this);
      this.onLoadTrack = this.onLoadTrack.bind(this);
    }
  }

  componentDidMount(): void {
    // Event syntaxt cismu:
    document.addEventListener("cismu:play", this.play);
    document.addEventListener("cismu:pause", this.pause);
    document.addEventListener("cismu:load", this.onLoadTrack);

    if (this.storage) {
      if (!this.state.track) {
        let track = this.storage.getItem("last_track");
        this.setState({ track: track ? JSON.parse(track) : undefined });
      }
    }
  }

  mediaMetadata() {
    if (this.state.track) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.state.track.title,
        artist: this.state.track.artist,
        album: this.state.track.album,
        artwork: this.state.track.artworks,
      });
    }
  }

  mediaSession() {
    type ActionTypes = [MediaSessionAction, () => void];
    const actionHandlers: ActionTypes[] = [
      ["play", this.play],
      ["pause", this.pause],
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

  async play() {
    if (this.audioElement) {
      await this.audioElement.play();
      this.setState({ isPlaying: true });
      navigator.mediaSession.playbackState = "playing";
    }

    // if (this.videoElement) await this.videoElement.play();
  }

  pause() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.setState({ isPlaying: false });
      navigator.mediaSession.playbackState = "paused";
    }

    // if (this.videoElement) this.videoElement.pause();
  }

  loadTrack(track: Track) {
    let canceled = !document.dispatchEvent(
      new Event("onLoadTrack", { cancelable: true })
    );

    if (canceled) {
      // A handler called preventDefault
      console.log("canceled");
    } else {
      // None of the handlers called preventDefault
      console.log("not canceled");
    }
  }

  // Internal Events

  createEvent<EData>(eName: string, data?: EData): Event | CustomEvent<EData> {
    if (data) {
      return new CustomEvent<EData>(eName, { detail: data });
    }
    return new Event(eName);
  }

  onLoadTrack() {
    if ("mediaSession" in navigator) {
      this.mediaMetadata();
      this.mediaSession();
    }
  }

  render(): React.ReactNode {
    let ControlProps = {
      play: this.play,
      pause: this.pause,
      isPlaying: this.state.isPlaying || false,
    };

    let MetadataProps = {
      pip: () => this.PictureinPicture(),
      track: playground,
    };

    return (
      <div className={`${styles["player"]} flex h-[80px] items-center px-6`}>
        <Controls {...ControlProps} />
        <Metadata {...MetadataProps} />
        <Options />
        <button onClick={() => this.loadTrack(playground)}>Load Playground</button>
      </div>
    );
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
      image.src = String(playground.artwork.src);

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
}

export default Player;

interface Props {}

interface State {
  isPlaying: boolean;
  isPlayable: boolean;
  isReady: boolean;
  isAnalyzer: boolean;
  queue: Track[];
  track: Track | undefined;
}
