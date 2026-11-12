const files = import.meta.glob("../assets/videos/hero/*.mp4", {
  eager: true,
  query: "?url",
  import: "default",
});

export const heroClips = Object.keys(files)
  .sort()
  .map((path) => files[path]);

export const heroCaptions = [];
