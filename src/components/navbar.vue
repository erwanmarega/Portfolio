<template>
  <nav class="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-900/30 via-gray-800/20 to-gray-900/30 backdrop-blur-2xl p-3 rounded-xl shadow-2xl z-20 border border-gray-700/20 transition-all duration-500 hover:shadow-neon w-auto max-w-md mx-auto animate-float flex justify-center items-center">
    <ul class="flex justify-center items-center gap-3 sm:gap-5 m-0 p-0 list-none">
      <li v-for="item in navItems" :key="item.id" class="group relative">
        <a
          :href="item.href"
          :target="item.external ? '_blank' : undefined"
          :rel="item.external ? 'noopener noreferrer' : undefined"
          class="flex flex-col items-center justify-center text-white/90 text-xl sm:text-2xl transition-all duration-300 group-hover:text-cyan-300 group-hover:scale-125"
          :class="{ 'text-cyan-400 scale-125': activeSection === item.href.slice(1) }"
          @click="setActiveSection(item.href.slice(1))"
        >
          <font-awesome-icon :icon="item.icon" class="drop-shadow-lg" />
          <span class="absolute bottom-full mb-3 hidden group-hover:block text-xs font-semibold text-white bg-gray-800/70 px-2 py-1 rounded-xl shadow-md backdrop-blur-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            {{ item.label }}
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
  data() {
    return {
      activeSection: 'home',
      navItems: [
        { id: 1, href: '#home', label: 'Accueil', icon: ['fas', 'home'], external: false },
        { id: 2, href: '#about', label: 'À Propos', icon: ['fas', 'book'], external: false },
        { id: 3, href: '#creations', label: 'Créations', icon: ['fas', 'list-check'], external: false },
        { id: 4, href: '#contact', label: 'Contact', icon: ['fas', 'phone'], external: false },
        { id: 5, href: 'https://github.com/erwanmarega', label: 'GitHub', icon: ['fab', 'github'], external: true },
        { id: 6, href: 'https://www.linkedin.com/in/erwan-marega/', label: 'LinkedIn', icon: ['fab', 'linkedin'], external: true },
        { id: 7, href: 'https://www.tiktok.com/@445nuits._', label: 'TikTok', icon: ['fab', 'tiktok'], external: true },
      ],
    };
  },
  methods: {
    setActiveSection(section) {
      this.activeSection = section;
    },
    handleScroll() {
      const sections = this.navItems
        .filter(item => !item.external)
        .map(item => item.href.slice(1));
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          current = section;
        }
      }
      this.activeSection = current || 'home';
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
@keyframes float {
  0% { transform: translate(-50%, 0) translateY(0); }
  50% { transform: translate(-50%, 0) translateY(-5px); }
  100% { transform: translate(-50%, 0) translateY(0); }
}
.animate-float {
  animation: float 3s ease-in-out infinite;
}
.shadow-neon {
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3), 0 0 30px rgba(0, 255, 255, 0.1);
}
</style>