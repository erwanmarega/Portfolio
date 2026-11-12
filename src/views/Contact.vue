<template>
  <section aria-labelledby="contact-title">
    <h2 id="contact-title" v-reveal class="section-label">{{ t.contact.title }}</h2>
    <p v-reveal="80" class="mt-6 text-[17px] leading-relaxed text-ink-soft">
      {{ t.contact.text }}
    </p>
    <div v-reveal="160">
      <a
        href="mailto:maregaerwan@gmail.com"
        class="text-link mt-4 inline-block text-xl font-medium tracking-tight sm:text-2xl"
      >
        maregaerwan@gmail.com
      </a>
    </div>
  </section>
</template>

<script setup>
import { useLocale } from "../composables/useLocale.js";

const { t } = useLocale();
</script>
