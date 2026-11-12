<template>
  <section aria-labelledby="about-title">
    <h2 id="about-title" v-reveal class="section-label">{{ t.home.title }}</h2>

    <p
      v-for="(paragraph, index) in paragraphs"
      :key="index"
      v-reveal="80 * (index + 1)"
      class="max-w-[62ch] text-lg leading-relaxed text-ink-soft"
      :class="index === 0 ? 'mt-6' : 'mt-4'"
    >
      <template v-for="(part, i) in paragraph" :key="i">
        <strong v-if="part.strong" class="font-medium text-ink">{{ part.text }}</strong>
        <template v-else>{{ part.text }}</template>
      </template>
    </p>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useLocale } from "../composables/useLocale.js";

const { t } = useLocale();

function emphasize(text) {
  return text
    .split(/\*\*(.+?)\*\*/)
    .map((part, i) => ({ text: part, strong: i % 2 === 1 }))
    .filter((part) => part.text);
}

const paragraphs = computed(() => [emphasize(t.value.home.p1), emphasize(t.value.home.p2)]);
</script>
