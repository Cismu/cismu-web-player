import Link from "next/link"
export default function Page() {
  return (
    <>
      <Link href="/analyzer">Analyzer</Link>
    </>
  );
}


// const [isLoading, setLoading] = useState(true);
// const [audioMotion, setAudioMotion] = useState(null);
// useEffect(() => {
//   setLoading(false);
// });

// useEffect(() => {
//   document.addEventListener("playergetsource", Mount);
//   document.addEventListener("playersetsource", unMount);

//   return function cleanup() {
//     document.removeEventListener("playergetsource", Mount);
//     document.removeEventListener("playersetsource", unMount);
//   };
// }, [!isLoading]);

// function Mount(e: any) {
//   setAudioMotion(e.detail);
// }

// function unMount(e: any) {
//   setAudioMotion(null);
// }

// if (!isLoading) {
// }

// function Play() {
//   if (!isLoading) {
//     document.dispatchEvent(new Event("playerplay"));
//   }
// }

// function Pause() {
//   if (!isLoading) {
//     document.dispatchEvent(new Event("playerpause"));
//   }
// }

// let audioMotionC = null;

// if (!isLoading && audioMotion) {
//   audioMotionC = <AudioMotion source={audioMotion} />;
// }

// interface ArtworkItem_ {
//   url: string;
//   width: number;
//   height: number;
//   sizes: string;
//   type: string;
// }

// interface Trackk {
//   title: string;
//   artist: string | string[];
//   album: string;
//   artwork: ArtworkItem_[];
//   src: string;
//   id: string;
// }

// {
//   "album": {
//     "album_type": "compilation",
//     "total_tracks": 9,
//     "available_markets": [
//       "CA",
//       "BR",
//       "IT"
//     ],
//     "external_urls": {
//       "spotify": "string"
//     },
//     "href": "string",
//     "id": "2up3OPMp9Tb4dAKM2erWXQ",
//     "images": [
//       {
//         "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n",
//         "height": 300,
//         "width": 300
//       }
//     ],
//     "name": "string",
//     "release_date": "1981-12",
//     "release_date_precision": "year",
//     "restrictions": {
//       "reason": "market"
//     },
//     "type": "album",
//     "uri": "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
//     "album_group": "compilation",
//     "artists": [
//       {
//         "external_urls": {
//           "spotify": "string"
//         },
//         "href": "string",
//         "id": "string",
//         "name": "string",
//         "type": "artist",
//         "uri": "string"
//       }
//     ]
//   },
//   "artists": [
//     {
//       "external_urls": {
//         "spotify": "string"
//       },
//       "followers": {
//         "href": "string",
//         "total": 0
//       },
//       "genres": [
//         "Prog rock",
//         "Grunge"
//       ],
//       "href": "string",
//       "id": "string",
//       "images": [
//         {
//           "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n",
//           "height": 300,
//           "width": 300
//         }
//       ],
//       "name": "string",
//       "popularity": 0,
//       "type": "artist",
//       "uri": "string"
//     }
//   ],
//   "available_markets": [
//     "string"
//   ],
//   "disc_number": 0,
//   "duration_ms": 0,
//   "explicit": true,
//   "external_ids": {
//     "isrc": "string",
//     "ean": "string",
//     "upc": "string"
//   },
//   "external_urls": {
//     "spotify": "string"
//   },
//   "href": "string",
//   "id": "string",
//   "is_playable": true,
//   "restrictions": {
//     "reason": "string"
//   },
//   "name": "string",
//   "popularity": 0,
//   "preview_url": "string",
//   "track_number": 0,
//   "type": "string",
//   "uri": "string",
//   "is_local": true
// }
