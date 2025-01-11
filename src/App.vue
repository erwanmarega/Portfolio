<template>
  <div id="app">
    <navbar />

    <div class="section" id="home">
      <home />
    </div>
    <div class="section" id="about">
      <about />
    </div>
    <div class="section" id="hard-skills">
      <Hard_skills />
    </div>
    <div class="section" id="outils">
      <Outils />
    </div>
    <div class="section" id="creations">
      <Créations />
    </div>
    <div class="section" id="contact">
      <Contact />
    </div>
  </div>
</template>

<script setup>
import navbar from './components/navbar.vue';
import home from './views/home.vue';
import about from './views/about.vue';
import Hard_skills from './views/hard_skills.vue';
import Outils from './views/outils.vue';
import Créations from './views/créations.vue';
import Contact from './views/contact.vue';
</script>

<style scoped>

</style>
