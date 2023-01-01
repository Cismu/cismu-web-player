"use client";

import { useEffect, useState, useRef } from "react";
import AudioMotionAnalyzer from "audiomotion-analyzer";

type Motion = AudioMotionAnalyzer | null;

function AudioMotion(props: any) {
  const [isLoad, setLoad] = useState(false);
  const [audioMotion, setAudioMotion] = useState<Motion>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoad(true);
  });

  if (isLoad && !audioMotion) {
    let motionContainer = !container.current ? undefined : container.current;

    let motion = new AudioMotionAnalyzer(motionContainer, {
      source: props.source,
    });
    motion.height = 500;
    setAudioMotion(motion);
  }

  return <div ref={container}></div>;
}

export default function Page() {
  const [isLoading, setLoading] = useState(true);
  const [audioMotion, setAudioMotion] = useState(null);
  useEffect(() => {
    setLoading(false);

    document.addEventListener("playergetsource", (e: any) => {
      setAudioMotion(e.detail);
    });
  });

  function Play() {
    if (!isLoading) {
      document.dispatchEvent(new Event("playerplay"));
    }
  }

  function Pause() {
    if (!isLoading) {
      document.dispatchEvent(new Event("playerpause"));
    }
  }

  return (
    <>
      {audioMotion ? <AudioMotion source={audioMotion} /> : null}
      <button onClick={Play}>play</button>
      <button onClick={Pause}>pause</button>
    </>
  );
}
