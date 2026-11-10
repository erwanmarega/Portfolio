<template>
  <div>
    <div class="section" id="home"><Home /></div>
    <div class="section mt-20 sm:mt-24" id="projects"><Projects /></div>
    <div class="section mt-20 sm:mt-24" id="journey"><Journey /></div>
    <div class="section mt-20 sm:mt-24" id="skills"><Skills /></div>
    <div class="section mt-20 sm:mt-24" id="contact"><Contact /></div>
  </div>
</template>

<script setup>
import Home from "../views/Home.vue";
import Journey from "../views/Journey.vue";
import Skills from "../views/Skills.vue";
import Projects from "../views/Projects.vue";
import Contact from "../views/Contact.vue";
</script>
