"use client";

import styles from "./styles.module.css";
import Metadata from "./Metadata";
import Controls from "./Controls";
import { Track } from "./types";
import Options from "./Options";
import React from "react";

class Player extends React.Component<Props, State> {
  state: State;
  audioElement?: HTMLAudioElement;
  videoElement?: HTMLVideoElement;
  audioSourceNode?: MediaElementAudioSourceNode;
  audioMap?: WeakMap<object, MediaElementAudioSourceNode>;
  audioContext?: AudioContext;
  storage?: Storage;
  controller?: AbortController;

  constructor(props: Props) {
    super(props);

    this.state = {
      isPlaying: false,
      isPlayable: false,
      isReady: false,
      isAnalyzer: false,
      queue: [],
      track: undefined,
      track_status: "normal",
    };

    if (typeof window !== "undefined") {
      this.audioElement = document.createElement("audio");
      this.videoElement = document.createElement("video");
      this.videoElement.crossOrigin = "anonymous";
      this.videoElement.autoplay = true;
      this.videoElement.loop = false;
      this.videoElement.muted = true;

      this.audioContext = new AudioContext();
      this.audioMap = new WeakMap();

      if (this.audioMap.has(this.audioElement)) {
        this.audioSourceNode = this.audioMap.get(this.audioElement)!; // Non-null assertion operator ! https://stackoverflow.com/q/70723319
      } else {
        this.audioSourceNode = this.audioContext.createMediaElementSource(
          this.audioElement
        );
        this.audioMap.set(this.audioElement, this.audioSourceNode);
      }

      this.audioSourceNode.connect(this.audioContext.destination);
      this.storage = window.localStorage;
      this.pause = this.pause.bind(this);
      this.play = this.play.bind(this);

      // Events
      this.e_load = this.e_load.bind(this);
    }
  }

  componentDidMount(): void {
    // Event syntaxt cismu:
    document.addEventListener("cismu:play", this.play);
    document.addEventListener("cismu:pause", this.pause);
    document.addEventListener("cismu:load", this.e_load);

    // if (this.storage) {
    //   if (!this.state.track) {
    //     let track = this.storage.getItem("last_track");
    //     this.setState({ track: track ? JSON.parse(track) : undefined });
    //   }
    // }
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

  async loadTrack(track: Track) {
    let canceled = !document.dispatchEvent(
      this.createEvent("cismu:load", { cancelable: true })
    );

    if (canceled) {
      this.setState({ track_status: "changing" });
      try {
        this.controller = new AbortController();
        let response = await fetch(track.src, {
          signal: this.controller.signal,
        });
        this.setState({ track });
        console.log("Download complete", response);
      } catch (error: any) {
        console.error(`Download error: ${error.message}`);
      }

      this.setState({ track_status: "normal" });
    } else {
      try {
        this.controller = new AbortController();
        let response = await fetch(track.src, {
          signal: this.controller.signal,
        });
        this.setState({ track });
        console.log("Download complete", response);
      } catch (error: any) {
        console.error(`Download error: ${error.message}`);
      }

      this.setState({ track_status: "normal" });
      // new Blob(data, {
      //   type: "audio/mp3",
      // });
    }

    // if ("mediaSession" in navigator) {
    //   this.mediaMetadata();
    //   this.mediaSession();
    // }
  }

  // Internal Events

  createEvent<EData>(
    eName: string,
    options: EventInit,
    data?: EData
  ): Event | CustomEvent<EData> {
    if (data) {
      return new CustomEvent<EData>(eName, { detail: data });
    }
    return new Event(eName, options);
  }

  e_load(e: Event) {
    if (this.state.track_status === "changing") {
      if (this.controller) {
        this.controller.abort();
      }
      e.preventDefault();
    } else {
      this.setState({ track_status: "changing" });
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
      track: this.state.track,
    };

    return (
      <div className={`${styles["player"]} flex h-[80px] items-center px-6`}>
        {/* <button onClick={() => this.loadTrack(playground)}>Playground</button>
        {"  |  "}
        <button onClick={() => this.loadTrack(hatsune)}>Hatsune Miku</button> */}
        <Controls {...ControlProps} />
        <Metadata {...MetadataProps} />
        <Options />
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
      // image.src = String(playground.artwork.src);

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
  track_status: "changing" | "normal";
}
