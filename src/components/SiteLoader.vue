<template>
  <Transition name="loader-fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-page"
    >
      <div class="h-[30vh] w-full" aria-hidden="true">
        <AsciiEffect effect="pixelShark" :options="{ loop: true }" />
      </div>
      <p role="status" aria-live="polite" class="font-mono text-sm text-ink-soft">chargement…</p>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import AsciiEffect from "./AsciiEffect.vue";

const MIN_MS = 600;
const MAX_MS = 2000;

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const visible = ref(!reduced);

const start = performance.now();
let loaded = document.readyState === "complete";
let minTimer = 0;
let maxTimer = 0;

function hide() {
  visible.value = false;
  cleanup();
}

function tryHide() {
  if (!loaded) return;
  const wait = MIN_MS - (performance.now() - start);
  if (wait <= 0) hide();
  else {
    clearTimeout(minTimer);
    minTimer = setTimeout(hide, wait);
  }
}

function onLoad() {
  loaded = true;
  tryHide();
}

function cleanup() {
  window.removeEventListener("load", onLoad);
  clearTimeout(minTimer);
  clearTimeout(maxTimer);
}

onMounted(() => {
  if (!visible.value) return;
  if (loaded) tryHide();
  else window.addEventListener("load", onLoad);
  maxTimer = setTimeout(hide, MAX_MS);
});

onUnmounted(cleanup);
</script>

<style scoped>
.loader-fade-leave-active {
  transition: opacity 300ms ease;
}
.loader-fade-leave-to {
  opacity: 0;
}
</style>
