<template>
  <span class="shark-text"
    ><slot /><span ref="overlay" class="shark-text__overlay" aria-hidden="true"
      ><slot /></span
  ></span>
</template>

<script setup>
// Renders its content twice: the real text, plus a white copy clipped to the
// solid shark cells (see useSharkMask) for a knockout effect.
import { ref } from "vue";
import { useSharkMaskTarget } from "../composables/useSharkMask";

const overlay = ref(null);
useSharkMaskTarget(overlay);
</script>

<style scoped>
.shark-text {
  position: relative;
  display: block;
}

.shark-text__overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  user-select: none;
  clip-path: inset(0 0 100% 0);
  color: #fff !important;
  /* Keeps white glyphs readable over the pale belly cells. */
  text-shadow: 0 0 3px rgba(131, 24, 67, 0.55);
}

.shark-text__overlay :deep(*) {
  color: #fff !important;
}

/* Without path() clipping the overlay would hide the real text. */
@supports not (clip-path: path("M0 0")) {
  .shark-text__overlay {
    display: none;
  }
}
</style>
