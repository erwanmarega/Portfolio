import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home.vue';
import About from '@/views/about.vue';
import HardSkills from '@/views/hard_skills.vue';
import Outils from '@/views/outils.vue';
import Creations from '@/views/créations.vue';
import Contact from '@/views/contact.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/hard-skills', name: 'HardSkills', component: HardSkills },
  { path: '/outils', name: 'Outils', component: Outils },
  { path: '/creations', name: 'Creations', component: Creations },
  { path: '/contact', name: 'Contact', component: Contact },
];

const router = createRouter({
  history: createWebHistory('/'),  
  routes,
});

export default router;
