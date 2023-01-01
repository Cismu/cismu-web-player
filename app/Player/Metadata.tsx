import Cover from "../../src/img/cover.jpg";
import Image from "next/image";
import { Track } from "./types";

interface Props {
  track: Track;
}

export default function Metadata(props: Props) {
  return (
    <div className="w-[30%]">
      <div className="flex flex-row items-center justify-center">
        <div className="relative">
          <div className="h-[56px] w-[56px]">
            <Image width={56} height={56} src={Cover} alt="Cover" />
          </div>
        </div>
        <div className="">
          <div>
            <span>{props.track.title}</span>
          </div>
          <div>{props.track.artist}</div>
        </div>
        <div className="">
          <div>like</div>
          <div>options</div>
        </div>
      </div>
    </div>
  );
}
