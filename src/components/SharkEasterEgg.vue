<template>
  <div v-if="active" class="pointer-events-none fixed inset-0 z-50" aria-hidden="true">
    <AsciiEffect
      effect="pixelShark"
      :options="{ loop: false, speed: 40, bubbles: true }"
      @done="active = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import AsciiEffect from "./AsciiEffect.vue";

const WORD = "shark";
const active = ref(false);
let typed = "";

function isEditable(el) {
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
}

function onKeydown(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (isEditable(document.activeElement) || isEditable(e.target)) {
    typed = "";
    return;
  }
  if (active.value || e.key.length !== 1) return;
  typed = (typed + e.key.toLowerCase()).slice(-WORD.length);
  if (typed === WORD) {
    typed = "";
    active.value = true;
  }
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => window.removeEventListener("keydown", onKeydown));
</script>
