import { parsePlaylist } from "@/_utils/playlists.ts";
import type { Playlist } from "@/_types/posts.ts";

const years = [2023, 2022, 2021, 2018, 2017];

const memesByYear = years.reduce<Record<number, Playlist>>((dict, year) => {
  const rawContent = Deno.readTextFileSync(
    `./src/_data/memes/memes-${year}.m3u`,
  );
  dict[year] = parsePlaylist(rawContent);
  return dict;
}, {});

export default { memesByYear };
