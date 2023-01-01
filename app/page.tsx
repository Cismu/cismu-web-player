"use client";

import { useEffect, useState } from "react";
import AudioMotion from "./Player/AudioMotion";

export default function Page() {
  const [isLoading, setLoading] = useState(true);
  const [audioMotion, setAudioMotion] = useState(null);
  useEffect(() => {
    setLoading(false);
  });

  useEffect(() => {
    document.addEventListener("playergetsource", Mount);

    return function cleanup() {
      document.removeEventListener("playergetsource", Mount);
    };
  }, [!isLoading]);

  function Mount(e: any) {
    setAudioMotion(e.detail);
  }

  if (!isLoading) {
  }

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

  let audioMotionC = null;

  if (!isLoading && audioMotion) {
    audioMotionC = <AudioMotion source={audioMotion} />;
  }

  return (
    <>
      {audioMotionC}
      <button onClick={Play}>play</button>
      <button onClick={Pause}>pause</button>
    </>
  );
}
