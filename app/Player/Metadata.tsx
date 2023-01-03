import styles from "./styles.module.css";
import { Track } from "./types";
import Link from "next/link";

interface Props {
  track: Track;
}

export default function Metadata(props: Props) {
  return (
    <div className="flex-1 px-[72px]">
      <div className="m-auto w-4/5 max-w-[800px]">
        <div className="flex items-center">
          <div>Label</div>
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
          <div className="flex">
            <button>K</button>
            <button>L</button>
            <button>V</button>
            <button>N</button>
            <button>+</button>
          </div>
        </div>
        <div>
          <input className="w-full" type="range" />
        </div>
      </div>
    </div>
  );
}
