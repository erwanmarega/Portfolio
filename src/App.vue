<template>
    <EiffelBackground />
    <BlueprintFrame />
    <div class="page-shell">
    <div class="section" id="home"><Home /></div>
    <div class="section" id="about"><About /></div>
    <div class="section" id="journey"><Journey /></div>
    <div class="section" id="skills"><Skills /></div>
    <div class="section" id="tech-watch"><TechWatch /></div>
    <div class="section" id="projects"><Projects /></div>
    <div class="section" id="contact"><Contact /></div>
    </div>
    <SharkEasterEgg />
    <SiteLoader />
</template>

<script setup>
import Home from './views/Home.vue';
import About from './views/About.vue';
import Journey from './views/Journey.vue';
import Skills from './views/Skills.vue';
import Projects from './views/Projects.vue';
import Contact from './views/Contact.vue';
import TechWatch from './views/TechWatch.vue';
import SharkEasterEgg from './components/SharkEasterEgg.vue';
import SiteLoader from './components/SiteLoader.vue';
import EiffelBackground from './components/EiffelBackground.vue';
import BlueprintFrame from './components/BlueprintFrame.vue';

</script>

<style>
html {
  background: rgb(var(--page));
}
html, body {
  scrollbar-width: none;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}
body {
  color: rgb(var(--ink));
}
html::-webkit-scrollbar, body::-webkit-scrollbar {
  display: none;
}
</style>

<style scoped>
.page-shell {
  padding: calc(var(--frame-inset) + var(--bar-h)) var(--frame-gutter) calc(var(--frame-inset) + var(--foot-h));
}
.section {
  position: relative;
  max-width: 100%;
  overflow-x: hidden;
  scroll-margin-top: calc(var(--frame-inset) + var(--bar-h));
}
</style>
