<template>
    <div class="section" id="home"><Home /></div>
    <div class="section" id="about"><About /></div>
    <SharkPortal />
    <div class="section" id="skills"><Skills /></div>
    <div class="section" id="tech-watch"><TechWatch /></div>
    <div class="section" id="projects"><Projects /></div>
    <div class="section" id="contact"><Contact /></div>
    <SharkChase />
</template>

<script setup>
import Home from './views/Home.vue';
import About from './views/About.vue';
import Skills from './views/Skills.vue';
import Projects from './views/Projects.vue';
import Contact from './views/Contact.vue';
import TechWatch from './views/TechWatch.vue';
import SharkPortal from './components/SharkPortal.vue';
import SharkChase from './components/SharkChase.vue';

</script>

<style>
html, body {
  background: #f3f2ff;
  scrollbar-width: none;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}
html::-webkit-scrollbar, body::-webkit-scrollbar {
  display: none;
}
</style>

<style scoped>
.section {
  position: relative;
  max-width: 100vw;
  overflow-x: hidden;
}
</style>
