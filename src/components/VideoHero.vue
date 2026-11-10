<template>
  <div ref="wrap" class="video-hero relative overflow-hidden rounded-2xl bg-surface-strong" aria-hidden="true">
    <!-- Two stacked players: the hidden one preloads the next clip, then they cross-fade. -->
    <video
      v-for="slot in 2"
      :key="slot"
      :ref="(el) => (players[slot - 1] = el)"
      class="absolute inset-0 h-full w-full object-cover"
      :class="{ 'is-front': front === slot - 1 }"
      muted
      playsinline
      loop
      preload="none"
      tabindex="-1"
    ></video>

    <!-- Ink tint over the footage; fades out on hover to show the real colors. -->
    <div class="tint absolute inset-0"></div>

    <Transition name="caption">
      <p v-if="caption" :key="caption" class="caption absolute inset-0 flex items-center justify-center px-6 text-center">
        {{ caption }}
      </p>
    </Transition>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { heroClips, heroCaptions } from "../data/heroClips.js";

const CLIP_MS = 6000;

const wrap = ref(null);
const players = [];
const front = ref(0);
const index = ref(0);

const caption = computed(() =>
  heroCaptions.length ? heroCaptions[index.value % heroCaptions.length] : ""
);

let timer = 0;
let visible = true;
let reduced = false;
let observer = null;

const load = (player, clipIndex) => {
  player.src = heroClips[clipIndex % heroClips.length];
  player.preload = "auto";
  player.load();
};

const playFront = () => {
  // Autoplay can be refused (data saver, low power): the first frame stays as a still.
  players[front.value]?.play().catch(() => {});
};

const next = () => {
  if (heroClips.length < 2) return;
  const incoming = 1 - front.value;
  const outgoing = front.value;
  index.value = (index.value + 1) % heroClips.length;
  front.value = incoming;
  players[incoming].currentTime = 0;
  playFront();
  // Once the fade is over, stop the old clip and line up the one after.
  setTimeout(() => {
    players[outgoing]?.pause();
    if (players[outgoing]) load(players[outgoing], index.value + 1);
  }, 1300);
};

const start = () => {
  if (reduced || !visible || document.hidden) return;
  playFront();
  if (!timer) timer = setInterval(next, CLIP_MS);
};

const stop = () => {
  clearInterval(timer);
  timer = 0;
  players.forEach((player) => player?.pause());
};

const sync = () => (visible && !document.hidden ? start() : stop());

onMounted(() => {
  reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  load(players[0], 0);
  if (reduced) return; // first frame only, no playback
  if (heroClips.length > 1) load(players[1], 1);

  observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  observer.observe(wrap.value);
  document.addEventListener("visibilitychange", sync);
});

onUnmounted(() => {
  stop();
  observer?.disconnect();
  document.removeEventListener("visibilitychange", sync);
});
</script>

<style scoped>
.video-hero {
  /* Clips are cropped to this ratio by scripts/prepare-hero-clip.sh. */
  aspect-ratio: 8 / 3;
  min-height: 220px;
  isolation: isolate;
}
/* Same rule as the project thumbnails: tinted only where hover exists, touch
   screens always show the real colors. */
.tint {
  display: none;
  pointer-events: none;
  background: rgb(var(--ink));
  mix-blend-mode: color;
  transition: opacity 0.5s ease;
}
@media (hover: hover) {
  .tint {
    display: block;
  }
  .video-hero:hover .tint {
    opacity: 0;
  }
}
video {
  opacity: 0;
  transition: opacity 1.2s ease;
}
video.is-front {
  opacity: 1;
}
.caption {
  font-family: ui-serif, Georgia, "Times New Roman", serif;
  font-size: clamp(1.5rem, 4vw, 3rem);
  color: #fff;
  text-shadow: 0 1px 24px rgb(0 0 0 / 0.45);
}
.caption-enter-active,
.caption-leave-active {
  transition: opacity 0.9s ease;
}
.caption-enter-from,
.caption-leave-to {
  opacity: 0;
}
</style>
