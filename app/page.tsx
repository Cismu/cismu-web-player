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
    document.addEventListener("playersetsource", unMount);

    return function cleanup() {
      document.removeEventListener("playergetsource", Mount);
      document.removeEventListener("playersetsource", unMount);
    };
  }, [!isLoading]);

  function Mount(e: any) {
    setAudioMotion(e.detail);
  }

  function unMount(e: any) {
    setAudioMotion(null);
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
