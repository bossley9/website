import { assertTimestamp } from "@/_utils/assertions.ts";

type MediaProps = {
  src: string;
  originalSrc?: string;
  preload?: "auto" | "metadata" | "none";
};

type InlineVideoProps = MediaProps & {
  captions?: string;
  // builtin opts
  poster: string;
  id?: string;
  height?: string | number;
  width?: string | number;
};

export function InlineVideo({
  src,
  originalSrc,
  captions,
  preload = "none",
  ...restProps
}: InlineVideoProps) {
  let srcType = "video/mp4";
  if (src.endsWith(".webm")) {
    srcType = "video/webm";
  }

  return (
    <>
      <video controls crossorigin="anonymous" preload={preload} {...restProps}>
        <source src={src} type={srcType} />
        {captions && (
          <track
            default
            kind="captions"
            label="English"
            srclang="en"
            src={captions}
          />
        )}
        <p class="err">
          Your browser does not support video.{" "}
          <a download href={src}>Download this video</a> instead.
        </p>
      </video>
      {originalSrc && (
        <blockquote>
          Original source: <a href={originalSrc}>{originalSrc}</a>
        </blockquote>
      )}
    </>
  );
}

export function InlineAudio({
  src,
  originalSrc,
  preload = "none",
}: MediaProps) {
  return (
    <>
      <audio controls crossorigin="anonymous" preload={preload}>
        <source src={src} type="audio/mpeg" />
        <p class="err">
          Your browser does not support audio.{" "}
          <a download href={src}>Download this audio</a> instead.
        </p>
      </audio>
      {originalSrc && (
        <blockquote>
          Original source: <a href={originalSrc}>{originalSrc}</a>
        </blockquote>
      )}
    </>
  );
}

function calcSeconds(timestamp: string): number {
  const segments = timestamp.split(":").reverse();

  return segments.reduce((acc, segment, index) => {
    return acc + Number.parseInt(segment) * (60 ** index);
  }, 0);
}
type TimestampProps = {
  id?: string;
  t: string;
  showStamp?: boolean;
  children: string;
};
export function Timestamp(
  { id = "player", t, showStamp = true, children }: TimestampProps,
) {
  assertTimestamp(t);
  const seconds = calcSeconds(t);

  const onClickHandler =
    `document.getElementById('${id}').currentTime=${seconds};document.getElementById('${id}').play();`;

  return (
    <a href={`#${id}`} onclick={onClickHandler}>
      {children}
      {showStamp ? ` (${t})` : ""}
    </a>
  );
}
