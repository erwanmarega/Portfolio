<template>
  <div>
    <div id="home" class="section"><Home /></div>
    <div id="projects" class="section mt-20 sm:mt-24"><Projects /></div>
    <div id="journey" class="section mt-20 sm:mt-24"><Journey /></div>
    <div id="skills" class="section mt-20 sm:mt-24"><Skills /></div>
    <div id="contact" class="section mt-20 sm:mt-24"><Contact /></div>
  </div>
</template>

<script setup>
import Home from "../views/Home.vue";
import Journey from "../views/Journey.vue";
import Skills from "../views/Skills.vue";
import Projects from "../views/Projects.vue";
import Contact from "../views/Contact.vue";
</script>
