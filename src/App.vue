<template>
    <div class="section" id="home"><Home /></div>
    <div class="section" id="about"><About /></div>
    <div class="section" id="education"><Education /></div>
    <div class="section" id="hard-skills"><HardSkills /></div>
    <div class="section" id="veille"><Veille /></div>
    <div class="section" id="creations"><Creations /></div>
    <div class="section" id="contact"><Contact /></div>

</template>

<script setup>
import Home from './views/Home.vue';
import About from './views/About.vue';
import HardSkills from './views/HardSkills.vue';
import Creations from './views/Creations.vue';
import Contact from './views/Contact.vue';
import Veille from './views/Veille.vue';
import Education from './views/Education.vue';

</script>

<style>
html, body {
  background: #f3f2ff;
  scrollbar-width: none;
}
html::-webkit-scrollbar, body::-webkit-scrollbar {
  display: none;
}
</style>

<style scoped>
html, body {
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

.section {
  position: relative;
  max-width: 100vw;
  overflow-x: hidden;
}


</style>
