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

      this.audioContext = new AudioContext();
      this.AudioMap = new WeakMap()

      if (this.AudioMap.has(this.audioElement)) {
        this.audioSourceNode = this.AudioMap.get(this.audioElement)!; // Non-null assertion operator ! https://stackoverflow.com/q/70723319
      } else {
        this.audioSourceNode = this.audioContext.createMediaElementSource(this.audioElement);
        this.AudioMap.set(this.audioElement, this.audioSourceNode);
      }

      this.audioSourceNode.connect(this.audioContext.destination)

      if ("mediaSession" in navigator) {
        this.mediaSession();
      }
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

    this.mediaMetadata()
  }

  play() {
    if (this.audioElement) {
      console.log("Ok desu")
      this.audioElement.src = playground.src;
      this.audioElement.crossOrigin = "anonymous";
      this.audioElement.onloadeddata = () => {
        if (this.audioElement) {
          this.audioElement.play();
        }
      }
    }
  }

  pause() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  PictureinPicture() {
    if (this.videoElement) {
      const target = this.videoElement;
      target.crossOrigin = "anonymous"
      target.loop = false
      target.autoplay = true
      const source = document.createElement('canvas');
      source.height = 260
      source.width = 260
      const ctx = source.getContext('2d');
      const image = new Image();
      image.crossOrigin = "anonymous"
      image.src = String(playground.artwork.at(-1)?.src);

      document.body.appendChild(target)
      document.body.appendChild(source)

      if (ctx) {
        image.onload = () => {
          ctx.drawImage(image, 0, 0, source.width, source.height);
        }
      }
      const stream = source.captureStream(1);
      target.srcObject = stream;

      target.onloadedmetadata = () => {
        if (document.pictureInPictureElement) {
          document.exitPictureInPicture();
        } else if (document.pictureInPictureEnabled) {
          target.requestPictureInPicture();
        }
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
    type ActionTypes = [MediaSessionAction, () => void]

    const actionHandlers: ActionTypes[] = [
      [
        'play',
        async () => {
          if (this.audioElement) {
            await this.audioElement.play();
            navigator.mediaSession.playbackState = "playing";
          }
        }
      ],
      [
        'pause',
        () => {
          if (this.audioElement) {
            this.audioElement.pause();
            navigator.mediaSession.playbackState = "paused";
          }
        }
      ],
    ]

    for (const [action, handler] of actionHandlers) {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch (error) {
        console.log(`The media session action "${action}" is not supported yet.`);
      }
    }
  }

  render(): React.ReactNode {
    return (
      <>
        <button onClick={() => this.PictureinPicture()}>
          Picture-in-Picture API
        </button>
        <button onClick={() => this.play()}>
          play
        </button>
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
      </>
    );
  }
}

export default Player;

interface Props { }
interface State {

  isPlaying: boolean;
  isPaused: boolean;
  isReady: boolean;
  isAnalyzer: boolean;
  queue: Track[];
}
