<template>
  <button
    class="fixed top-4 left-4 z-30 lg:hidden w-9 h-9 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
    @click="mobileOpen = !mobileOpen"
    aria-label="Menu"
  >
    <font-awesome-icon :icon="mobileOpen ? ['fas', 'xmark'] : ['fas', 'bars']" class="text-sm" />
  </button>

  <div
    v-if="mobileOpen"
    class="fixed inset-0 bg-black/20 z-20 lg:hidden"
    @click="mobileOpen = false"
  />

  <nav
    class="fixed left-0 top-0 h-screen w-56 bg-white flex flex-col z-20 pt-7 pb-6 transition-transform duration-300 ease-in-out overflow-y-auto"
    :class="mobileOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full lg:translate-x-0'"
  >
    <div class="px-4 mb-6">
      <p class="text-sm font-bold text-gray-900">Erwan Marega</p>
      <p class="text-xs text-gray-400 mt-0.5">Développeur Fullstack</p>
    </div>

    <div class="px-4 mb-1">
      <p class="text-xs font-semibold text-gray-900 mb-1">Navigation</p>
    </div>
    <ul class="flex flex-col px-2 list-none m-0 p-0 mb-6">
      <li v-for="item in internalItems" :key="item.id">
        <a
          :href="item.href"
          class="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors duration-150 no-underline"
          :class="activeSection === item.href.slice(1)
            ? 'bg-gray-100 text-gray-900 font-medium'
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'"
          @click="handleNav(item.href.slice(1))"
        >
          <font-awesome-icon :icon="item.icon" class="w-3.5 flex-shrink-0 text-gray-400" />
          {{ item.label }}
        </a>
      </li>
    </ul>

    <div class="px-4 mb-1">
      <p class="text-xs font-semibold text-gray-900 mb-1">Liens</p>
    </div>
    <ul class="flex flex-col px-2 list-none m-0 p-0">
      <li v-for="item in externalItems" :key="item.id">
        <a
          :href="item.href"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors duration-150 no-underline"
        >
          <font-awesome-icon :icon="item.icon" class="w-3.5 flex-shrink-0 text-gray-400" />
          {{ item.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faBook,
  faPhone,
  faListCheck,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faHome, faBook, faGithub, faLinkedin, faTiktok, faListCheck, faPhone, faBars, faXmark);

export default {
  name: "Navbar",
  components: { FontAwesomeIcon },
  data() {
    return {
      activeSection: "home",
      mobileOpen: false,
      internalItems: [
        { id: 1, href: "#home",      label: "Accueil",   icon: ["fas", "home"] },
        { id: 2, href: "#about",     label: "À Propos",  icon: ["fas", "book"] },
        { id: 3, href: "#creations", label: "Créations", icon: ["fas", "list-check"] },
        { id: 4, href: "#contact",   label: "Contact",   icon: ["fas", "phone"] },
      ],
      externalItems: [
        { id: 5, href: "https://github.com/erwanmarega",            label: "GitHub",   icon: ["fab", "github"] },
        { id: 6, href: "https://www.linkedin.com/in/erwan-marega/", label: "LinkedIn", icon: ["fab", "linkedin"] },
        { id: 7, href: "https://www.tiktok.com/@445nuits._",        label: "TikTok",   icon: ["fab", "tiktok"] },
      ],
    };
  },
  methods: {
    handleNav(section) {
      this.activeSection = section;
      this.mobileOpen = false;
    },
    handleScroll() {
      const ids = this.internalItems.map((item) => item.href.slice(1));
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) current = id;
      }
      this.activeSection = current;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.handleScroll();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
