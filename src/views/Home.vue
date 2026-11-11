<template>
  <section aria-labelledby="about-title">
    <h2 id="about-title" v-reveal class="section-label">{{ t.home.title }}</h2>

    <p v-reveal="80" class="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
      {{ t.home.p1 }}
    </p>
    <p v-reveal="160" class="mt-4 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
      {{ t.home.p2 }}
    </p>
  </section>
</template>

<script setup>
import { useLocale } from "../composables/useLocale.js";

const { t } = useLocale();
</script>
