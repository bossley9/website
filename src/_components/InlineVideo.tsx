type Props = {
  src: string;
  originalSrc?: string;
  captions?: string;
  preload?: boolean;
  poster?: string;
  height?: number;
};

export function InlineVideo({
  src,
  originalSrc,
  captions,
  preload,
  ...restProps
}: Props) {
  let srcType = "video/mp4";
  if (src.endsWith(".webm")) {
    srcType = "video/webm";
  }

  return (
    <video
      controls
      crossorigin="anonymous"
      {...preload && { preload: "auto" }}
      {...restProps}
    >
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
      {originalSrc && (
        <p class="err">
          You can also view this video from its{" "}
          <a href={originalSrc}>original source</a>.
        </p>
      )}
    </video>
  );
}
