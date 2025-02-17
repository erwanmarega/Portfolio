<template>
  <nav class="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-100 p-4 rounded-full shadow-2xl backdrop-blur-lg z-20">
    <ul class="flex justify-center items-center gap-6 m-0 p-0 list-none">
      <li class="group relative">
        <a
          href="#home"
          class="zoom-icon flex flex-col items-center justify-center text-black text-2xl transition-transform"
        >
          <font-awesome-icon :icon="['fas', 'home']" />
          <span class="absolute bottom-full mb-2 hidden group-hover:block text-xs text-black bg-gray-200 px-2 py-1 rounded-lg">
            Accueil
          </span>
        </a>
      </li>
      <li class="group relative">
        <a
          href="#about"
          class="zoom-icon flex flex-col items-center justify-center text-black text-2xl transition-transform"
        >
          <font-awesome-icon :icon="['fas', 'book']" />
          <span class="absolute bottom-full mb-2 hidden group-hover:block text-xs text-black bg-gray-200 px-2 py-1 rounded-lg">
            À Propos
          </span>
        </a>
      </li>
      <li class="group relative">
        <a
          href="#creations"
          class="zoom-icon flex flex-col items-center justify-center text-black text-2xl transition-transform"
        >
          <font-awesome-icon :icon="['fas', 'list-check']" />
          <span class="absolute bottom-full mb-2 hidden group-hover:block text-xs text-black bg-gray-200 px-2 py-1 rounded-lg">
            Créations
          </span>
        </a>
      </li>
      <li class="group relative">
        <a
          href="#contact"
          class="zoom-icon flex flex-col items-center justify-center text-black text-2xl transition-transform"
        >
          <font-awesome-icon :icon="['fas', 'phone']" />
          <span class="absolute bottom-full mb-2 hidden group-hover:block text-xs text-black bg-gray-200 px-2 py-1 rounded-lg">
            Contact
          </span>
        </a>
      </li>
      <li class="group relative">
        <a
          href="https://github.com/erwanmarega"
          target="_blank"
          rel="noopener noreferrer"
          class="zoom-icon flex flex-col items-center justify-center text-black text-2xl transition-transform"
        >
          <font-awesome-icon :icon="['fab', 'github']" />
          <span class="absolute bottom-full mb-2 hidden group-hover:block text-xs text-black bg-gray-200 px-2 py-1 rounded-lg">
            GitHub
          </span>
        </a>
      </li>
      <li class="group relative">
        <a
          href="https://www.linkedin.com/in/erwan-marega/"
          target="_blank"
          rel="noopener noreferrer"
          class="zoom-icon flex flex-col items-center justify-center text-black text-2xl transition-transform"
        >
          <font-awesome-icon :icon="['fab', 'linkedin']" />
          <span class="absolute bottom-full mb-2 hidden group-hover:block text-xs text-black bg-gray-200 px-2 py-1 rounded-lg">
            LinkedIn
          </span>
        </a>
      </li>
      <li class="group relative">
        <a
          href="https://www.tiktok.com/@445nuits._"
          target="_blank"
          rel="noopener noreferrer"
          class="zoom-icon flex flex-col items-center justify-center text-black text-2xl transition-transform"
        >
          <font-awesome-icon :icon="['fab', 'tiktok']" />
          <span class="absolute bottom-full mb-2 hidden group-hover:block text-xs text-black bg-gray-200 px-2 py-1 rounded-lg">
            TikTok
          </span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faBook, faPhone, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faHome, faBook, faGithub, faLinkedin, faTiktok, faListCheck, faPhone);

export default {
  name: "Navbar",
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style scoped>
.zoom-icon {
  transition: transform 0.3s ease-in-out;
}
.zoom-icon:hover {
  transform: scale(1.25);
}
</style>