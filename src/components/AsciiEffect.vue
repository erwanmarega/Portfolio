<template>
  <canvas ref="canvasEl" class="block w-full h-full" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { effects, createAsciiRenderer } from "../lib/ascii";

const props = defineProps({
  effect: { type: String, required: true },
  options: { type: Object, default: () => ({}) },
  params: { type: Object, default: () => ({}) },
});
const emit = defineEmits(["done"]);

const canvasEl = ref(null);
let renderer = null;

onMounted(() => {
  const factory = effects[props.effect];
  if (!factory) return;
  renderer = createAsciiRenderer(canvasEl.value, factory(props.options), {
    params: props.params,
    onDone: () => emit("done"),
  });
});

watch(
  () => props.params,
  (p) => renderer?.setParams(p),
  { deep: true },
);

onUnmounted(() => {
  renderer?.destroy();
  renderer = null;
});

defineExpose({ restart: () => renderer?.restart() });
</script>
