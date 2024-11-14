<template>
  <nav class="fixed bottom-5 right-1/2 translate-x-1/2 bg-gray-100 p-3 rounded-full shadow-xl transform transition-transform hover:scale-110 z-10">
    <ul class="flex justify-center items-center gap-4 m-0 p-0 list-none">
      <li class="text-2xl cursor-pointer transform transition-transform hover:scale-110 active:scale-100">
        <a href="#home">
          <font-awesome-icon :icon="['fas', 'home']" />
        </a>
      </li>
      <li class="text-2xl cursor-pointer transform transition-transform hover:scale-110 active:scale-100">
        <a href="#about">
          <font-awesome-icon :icon="['fas', 'book']" />
        </a>
      </li>
      <li class="text-2xl cursor-pointer transform transition-transform hover:scale-110 active:scale-100">
        <a href="https://github.com/erwanmarega" target="_blank" rel="noopener noreferrer">
          <font-awesome-icon :icon="['fab', 'github']" />
        </a>
      </li>
      <li class="text-2xl cursor-pointer transform transition-transform hover:scale-110 active:scale-100">
        <a href="https://www.linkedin.com/in/erwan-marega-9a8970256/" target="_blank" rel="noopener noreferrer">
          <font-awesome-icon :icon="['fab', 'linkedin']" />
        </a>
      </li>
      <li class="text-2xl cursor-pointer transform transition-transform hover:scale-110 active:scale-100">
        <a href="#twitter">
          <font-awesome-icon :icon="['fab', 'twitter']" />
        </a>
      </li>
      <li class="text-2xl cursor-pointer transform transition-transform hover:scale-110 active:scale-100">
        <a href="#youtube">
          <font-awesome-icon :icon="['fab', 'youtube']" />
        </a>
      </li>
      <li class="text-2xl cursor-pointer transform transition-transform hover:scale-110 active:scale-100">
        <a href="#contact">
          <font-awesome-icon :icon="['fas', 'phone']" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faBook, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faHome, faBook, faGithub, faLinkedin, faTwitter, faYoutube, faPhone);

export default {
  components: {
    FontAwesomeIcon
  }
}
</script>

<style scoped>
/* Ajoutez ici des styles si nécessaire pour votre navbar */
</style>
