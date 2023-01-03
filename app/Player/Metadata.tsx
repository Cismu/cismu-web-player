import styles from "./styles.module.css";
import { Track } from "./types";
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
          <div>
            <div className="mr-1 h-[28px] w-[28px]">
              <Image
                className="rounded-sm"
                width={260}
                height={260}
                src={props.track.artwork.src}
                alt="Artwork"
              />
            </div>
          </div>
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
            <button>K</button>
            <button>L</button>
            <button>V</button>
            <button>N</button>
            <button>+</button>
          </div>
        </div>
        <div>
          <input className={`${styles["slider-track"]}`} type="range" />
        </div>
      </div>
    </div>
  );
}
