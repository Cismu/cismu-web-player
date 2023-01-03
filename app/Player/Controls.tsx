"use client";

import { useState } from "react";
import Image from "next/image";
import Play from "../../src/img/play.svg";
import Pause from "../../src/img/pause.svg";

interface Props {
  play: () => void;
  pause: () => void;
  paused: boolean;
}

export default function Controls(props: Props) {
  const [paused, setPaused] = useState(props.paused);

  function PlayPause() {
    if (paused) {
      props.play();
      setPaused(false);
    } else {
      props.pause();
      setPaused(true);
    }
  }

  // className="h-6 w-6 fill-current text-white"

  return (
    <div className="flex items-center">
      <button className="overflow-hidden rounded-[50%] p-2 text-base">
        <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 16 16">
          <path d="M15 0v16L2 8.802V16H1V0h1v7.198L15 0z"></path>
        </svg>
      </button>
      <button
        onClick={PlayPause}
        className="ml-1 overflow-hidden rounded-[50%] p-2 text-xl"
      >
        <Image
          width={16}
          height={16}
          src={paused ? Play : Pause}
          alt="play-pause"
        />
      </button>
      <button className="ml-1 overflow-hidden rounded-[50%] p-2 text-base">
        <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 16 16">
          <path d="M1 1v14l11-6.217V15h1V1h-1v6.217L1 1z"></path>
        </svg>
      </button>
    </div>
  );
}

// ppacity: .12; in deactivate
