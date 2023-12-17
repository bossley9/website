export type Playlist = { file: string; comment?: string }[];

export function parsePlaylist(data: string): Playlist {
  return data
    .split("\n")
    .filter((line) => line.trim().length > 0 && !line.startsWith("#"))
    .map((line) => {
      const commentIndex = line.indexOf("#");
      let file = line;
      let comment: string | undefined;

      if (commentIndex > 0) {
        file = line.substring(0, commentIndex);
        comment = line.substring(commentIndex + 1).trim();
      }

      return {
        file: file.trim(),
        ...(comment && { comment }),
      };
    });
}
