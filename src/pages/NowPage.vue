<template>
  <section aria-labelledby="now-title">
    <h2 id="now-title" v-reveal class="section-label">En ce moment</h2>
    <p v-reveal="80" class="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
      Ce qui m'occupe ces temps-ci.
    </p>

    <dl class="mt-8">
      <div
        v-for="item in now"
        :key="item.label"
        v-reveal
        class="grid gap-x-6 gap-y-1 border-t border-line/10 py-5 first:border-t-0 first:pt-0 sm:grid-cols-[7.5rem_minmax(0,1fr)]"
      >
        <dt class="text-[15px] text-ink-muted">{{ item.label }}</dt>
        <dd
          class="text-[15px] leading-relaxed"
          :class="item.placeholder ? 'text-ink-muted italic' : 'text-ink'"
        >
          {{ item.text }}
        </dd>
      </div>
    </dl>

    <p class="mt-8 font-mono text-xs text-ink-muted">Mis à jour : {{ updated }}</p>
  </section>
</template>

<script setup>
import { now, updated } from "../data/now.js";
</script>
