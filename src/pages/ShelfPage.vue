<template>
  <section aria-labelledby="shelf-title">
    <h2 id="shelf-title" v-reveal class="section-label">Étagère</h2>
    <p v-reveal="80" class="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
      Des jeux et des livres qui m'ont marqué. Clique pour ouvrir.
    </p>

    <template v-for="group in groups" :key="group.type">
      <h3 class="mt-12 text-sm font-medium text-ink">{{ group.title }}</h3>
      <ul v-reveal class="mt-5 flex flex-wrap items-end gap-x-6 gap-y-10 border-b-2 border-line/15 pb-0">
        <li v-for="item in group.items" :key="item.id">
          <ShelfItem :item="item" />
        </li>
      </ul>
    </template>
  </section>
</template>

<script setup>
import ShelfItem from "../components/ShelfItem.vue";
import { shelf } from "../data/shelf.js";

const groups = [
  { type: "game", title: "Jeux vidéo" },
  { type: "book", title: "Livres" },
].map((g) => ({ ...g, items: shelf.filter((i) => i.type === g.type) }));
</script>
