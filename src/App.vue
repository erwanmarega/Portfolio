<template>
  <EiffelBackground />
  <BlueprintFrame />
  <div class="page-shell">
    <div id="home" class="section"><Home /></div>
    <div id="about" class="section"><About /></div>
    <div id="journey" class="section"><Journey /></div>
    <div id="skills" class="section"><Skills /></div>
    <div id="tech-watch" class="section"><TechWatch /></div>
    <div id="projects" class="section"><Projects /></div>
    <div id="contact" class="section"><Contact /></div>
  </div>
  <SharkEasterEgg />
  <SiteLoader />
</template>

<script setup>
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Journey from "./views/Journey.vue";
import Skills from "./views/Skills.vue";
import Projects from "./views/Projects.vue";
import Contact from "./views/Contact.vue";
import TechWatch from "./views/TechWatch.vue";
import SharkEasterEgg from "./components/SharkEasterEgg.vue";
import SiteLoader from "./components/SiteLoader.vue";
import EiffelBackground from "./components/EiffelBackground.vue";
import BlueprintFrame from "./components/BlueprintFrame.vue";
</script>

<style>
html {
  background: rgb(var(--page));
}
html,
body {
  scrollbar-width: none;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}
body {
  color: rgb(var(--ink));
}
html::-webkit-scrollbar,
body::-webkit-scrollbar {
  display: none;
}
</style>

<style scoped>
.page-shell {
  padding: calc(var(--frame-inset) + var(--bar-h)) var(--frame-gutter)
    calc(var(--frame-inset) + var(--foot-h));
}
.section {
  position: relative;
  max-width: 100%;
  overflow-x: hidden;
  scroll-margin-top: calc(var(--frame-inset) + var(--bar-h));
}
</style>
