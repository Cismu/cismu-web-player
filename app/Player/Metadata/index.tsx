import styles from "../styles.module.css";
import uuid from "uuid-browser/v4";
import { Track } from "../types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  track: Track;
  pip: () => void;
}

function MusicData(props: Props) {
  return (
    <div className="flex items-center">
      <div style={{ boxShadow: "0 0 10px rgb(0 0 0 / 30%)" }} className="mr-2">
        <div>
          <Image
            width={46}
            height={46}
            src={props.track.artwork.src}
            alt="portada"
          />
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="relative overflow-hidden whitespace-nowrap">
          <span className={`${styles["title-gradient"]} ${styles["left"]}`} />
          <div className={`${styles["track-title-effect"]}`}>
            <Link href={"/artist"}>{props.track.title}</Link>
          </div>
          <span className={`${styles["title-gradient"]} ${styles["right"]}`} />
        </div>
        <div className="justify-left flex">
          {props.track.artists.map((artist, index) => {
            return (
              <div key={uuid()}>
                <Link href={"/artist"}>{artist}</Link>
                {index !== props.track.artists.length - 1 ? ", " : ""}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="grid auto-cols-auto grid-flow-col gap-x-4">
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
              className="h-4 w-4 fill-current "
            >
              <path d="M9 0H8v7H1v1h7v7h1V8h7V7H9V0z"></path>
            </svg>
          </button>
          <button onClick={props.pip}>
            <svg
              className="h-4 w-4 fill-current text-white"
              viewBox="0 0 12 12"
            >
              <path d="M0 9.5V11h1.5c0-.83-.67-1.5-1.5-1.5Z"></path>
              <path d="M0 7.5v1A2.5 2.5 0 0 1 2.5 11h1c0-1.935-1.565-3.5-3.5-3.5Z"></path>
              <path d="M0 5.5v1A4.5 4.5 0 0 1 4.5 11h1A5.5 5.5 0 0 0 0 5.5Z"></path>
              <path d="M2 3v1.815A6.517 6.517 0 0 1 6.185 9H10V3H2Z"></path>
              <path d="M1 1c-.55 0-1 .45-1 1v2h1V2h10v8H7v1h4c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1H1Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function Slider() {
  return (
    <div>
      <input className={`${styles["slider-track"]}`} type="range" />
    </div>
  );
}

export default function Metadata(props: Props) {
  return (
    <div className="flex-1 px-[72px]">
      <div className="m-auto w-4/5 max-w-[800px]">
        <Slider />
        <MusicData {...props} />
      </div>
    </div>
  );
}
