<template>
  <div>
    <button
      type="button"
      class="cover cover-btn"
      :class="aspect"
      :style="coverStyle"
      aria-haspopup="dialog"
      :aria-label="`Ouvrir ${item.title}`"
      @click="open"
    >
      <span class="font-mono text-[10px] uppercase tracking-wider opacity-70">{{ typeLabel }}</span>
      <span class="text-sm font-semibold leading-tight">{{ item.title }}</span>
      <span class="text-[11px] opacity-80">{{ item.creator }}</span>
    </button>

    <dialog
      ref="dialogEl"
      class="shelf-dialog"
      :aria-label="item.title"
      @click="onBackdrop"
      @close="reset"
    >
      <div class="relative">
        <button
          type="button"
          class="absolute -top-7 right-0 rounded-sm text-sm text-white/90 outline-none hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          @click="dialogEl.close()"
        >
          Fermer
        </button>

        <div class="book flex" :class="{ 'is-open': isOpen }">
          <div class="page page-left" :class="aspect" :style="insideStyle" aria-hidden="true">
            <span class="page-left-title">{{ item.title }}</span>
          </div>

          <div class="page page-right bg-surface text-ink" :class="aspect">
            <p class="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
              {{ typeLabel }}
            </p>
            <h4 class="mt-1 font-semibold">{{ item.title }}</h4>
            <p class="text-xs text-ink-muted">{{ item.creator }} · {{ item.year }}</p>
            <p
              class="mt-3 text-sm leading-relaxed"
              :class="item.placeholder ? 'italic text-ink-muted' : 'text-ink-soft'"
            >
              {{ item.note }}
            </p>
          </div>

          <div class="front-cover" :class="aspect" aria-hidden="true">
            <div class="cover face" :class="aspect" :style="coverStyle">
              <span class="font-mono text-[10px] uppercase tracking-wider opacity-70">{{
                typeLabel
              }}</span>
              <span class="text-sm font-semibold leading-tight">{{ item.title }}</span>
              <span class="text-[11px] opacity-80">{{ item.creator }}</span>
            </div>
            <div class="face face-back" :style="insideStyle">
              <span class="page-left-title">{{ item.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({ item: { type: Object, required: true } });

const dialogEl = ref(null);
const isOpen = ref(false);

const typeLabel = computed(() => (props.item.type === "book" ? "Livre" : "Jeu"));
const aspect = computed(() => (props.item.type === "book" ? "aspect-[2/3]" : "aspect-[4/5]"));
const coverStyle = computed(() => ({ background: props.item.color, color: props.item.ink }));
const insideStyle = computed(() => ({ background: props.item.color, color: props.item.ink }));

function open() {
  dialogEl.value.showModal();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    isOpen.value = true;
    return;
  }
  requestAnimationFrame(() => requestAnimationFrame(() => (isOpen.value = true)));
}

function onBackdrop(event) {
  if (event.target === dialogEl.value) dialogEl.value.close();
}

function reset() {
  isOpen.value = false;
}
</script>

<style scoped>
.cover {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  width: 132px;
  padding: 12px 12px 12px 18px;
  text-align: left;
  border-radius: 2px 6px 6px 2px;
  box-shadow:
    inset 6px 0 0 rgb(0 0 0 / 0.18),
    0 6px 14px rgb(33 28 24 / 0.2);
}
.cover > span:nth-child(2) {
  margin-top: auto;
}
.cover-btn {
  cursor: pointer;
  border: 0;
  outline: none;
}
.cover-btn:focus-visible {
  outline: 2px solid rgb(var(--brand));
  outline-offset: 3px;
}
@media (prefers-reduced-motion: no-preference) {
  .cover-btn {
    transition: transform 200ms ease;
  }
  .cover-btn:hover,
  .cover-btn:focus-visible {
    transform: translateY(-6px);
  }
}

.shelf-dialog {
  background: transparent;
  border: 0;
  max-width: 100vw;
  max-height: 100vh;
  padding: 16px;
  margin: auto;
  overflow: visible;
}
.shelf-dialog::backdrop {
  background: rgb(33 28 24 / 0.45);
  backdrop-filter: blur(3px);
}

.book {
  position: relative;
  perspective: 1400px;
  transform-style: preserve-3d;
}
.page {
  position: relative;
  width: min(42vw, 240px);
  overflow: hidden;
}
.page-right {
  padding: 20px;
  overflow-y: auto;
  border-radius: 0 6px 6px 0;
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.3);
}
.page-left {
  visibility: hidden;
  border-radius: 6px 0 0 6px;
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.3);
}
.page-left::after,
.face-back::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgb(0 0 0 / 0.15);
}
.page-left-title {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.1;
  opacity: 0.25;
}

/* Front cover lies over the right page, hinged on the spine; its back face is the inside cover. */
.front-cover {
  position: absolute;
  top: 0;
  left: 50%;
  width: min(42vw, 240px);
  transform-origin: left center;
  transform-style: preserve-3d;
  transform: rotateY(0deg);
}
.face {
  position: absolute;
  inset: 0;
  width: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.face-back {
  transform: rotateY(180deg);
  border-radius: 6px 0 0 6px;
  overflow: hidden;
}
.is-open .front-cover {
  transform: rotateY(-180deg);
  transition: transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1);
}
@media (prefers-reduced-motion: reduce) {
  .is-open .front-cover {
    transition: none;
  }
}
</style>
