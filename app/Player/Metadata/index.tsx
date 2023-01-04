import styles from "./styles.module.css";
import { Track } from "../types";
import Link from "next/link";
import Image from "next/image";

interface Props {
  track: Track;
}

export default function Metadata(props: Props) {
  return (
    <div className="flex-1 px-[72px]">
      <div className="m-auto w-4/5 max-w-[800px]">
        <div className="flex items-center">
          <div className="felx-1 mr-1 overflow-hidden">
            <div className="relative overflow-hidden whitespace-nowrap">
              <span
                className={`${styles["title-gradient"]} ${styles["left"]}`}
              />
              <div className={`${styles["track-title-effect"]}`}>
                <Link href={"/artist"}>{props.track.title}</Link>
                {" · "}
                <Link href={"/artist"}>{props.track.artist}</Link>
              </div>
              <span
                className={`${styles["title-gradient"]} ${styles["right"]}`}
              />
            </div>
          </div>
          <div className="flex w-full">
            <button>
              <svg
                className="h-4 w-4 fill-current text-white"
                viewBox="0 0 16 16"
              >
                <path d="M15 4.5a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0zm1 0a4.5 4.5 0 0 1-5.099 4.46L3.048 15 0 12l7-7.58v.08a4.5 4.5 0 1 1 9 0zM7.166 5.715l-5.774 6.252 1.736 1.71 6.57-5.053a4.511 4.511 0 0 1-2.532-2.91z"></path>
              </svg>
            </button>
            <button>
              <svg
                viewBox="0 0 16 16"
                focusable="false"
                className="h-4 w-4 fill-current"
              >
                <path d="M8 3.266C2.837-2.68-2.564 4.578 1.328 8.516 5.22 12.451 8 15 8 15s2.78-2.548 6.672-6.485C18.564 4.501 13.162-2.679 8 3.265z"></path>
              </svg>
            </button>
            <button>
              <svg
                viewBox="0 0 16 16"
                focusable="false"
                className="h-4 w-4 fill-current "
              >
                <path d="M9 0H8v7H1v1h7v7h1V8h7V7H9V0z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div>
          <input className={`${styles["slider-track"]}`} type="range" />
        </div>
      </div>
    </div>
  );
}
