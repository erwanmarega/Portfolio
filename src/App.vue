<template>
  <div id="app">
    <navbar />
    <StaticChatbot />
  
    <div class="section" id="home">
      <home />
    </div>
    <div class="section" id="about">
      <about />
    </div>
    <div class="section" id="education">
      <education />
    </div>
    <div class="section" id="hard-skills">
      <Hard_skills />
    </div>
    <div class="section" id="veille">
      <veille />
    </div>
    <div class="section" id="texte">
      <Text />
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
import Créations from './views/créations.vue';
import Contact from './views/contact.vue';
import StaticChatbot from './components/StaticChatbot.vue';
import veille from './views/veille.vue';
import Text from './views/Text.vue';
import education from './views/education.vue';
</script>

<style scoped>
html, body {
  overflow-x: hidden;  
  margin: 0;
  padding: 0;
}

.section {
  max-width: 100vw;    
  overflow-x: hidden;   
  position: relative;

}



</style>
