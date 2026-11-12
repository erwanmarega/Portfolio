// Hero video clips: every .mp4 dropped in src/assets/videos/hero/ is picked up
// automatically and played in file-name order (prefix with 01-, 02-… to sort).
// Prepare clips with scripts/prepare-hero-clip.sh so they are small and cropped.
const files = import.meta.glob("../assets/videos/hero/*.mp4", {
  eager: true,
  query: "?url",
  import: "default",
});

export const heroClips = Object.keys(files)
  .sort()
  .map((path) => files[path]);

// Optional words shown over the clips, one per clip (cycled). Empty array = no text.
export const heroCaptions = [];
