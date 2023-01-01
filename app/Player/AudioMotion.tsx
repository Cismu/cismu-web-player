"use client";

import { useState, useRef, useEffect } from "react";
import AudioMotion from "audiomotion-analyzer";

export default function AudioMotionAnalyzer(props: any) {
  const [isLoad, setLoad] = useState(false);
  const [motion, setMotion] = useState<AudioMotion | null>(null);
  let containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoad(true);
  });

  useEffect(() => {
    if (isLoad) {
      let container = !containerRef.current ? undefined : containerRef.current;

      let options = {
        source: props.source,
      };
      setMotion(new AudioMotion(container, options));
    }
  }, [!isLoad]);

  if (motion) {
    motion.height = 500;
  }

  return <div ref={containerRef}></div>;
}
