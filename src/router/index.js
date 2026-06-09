import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import HardSkills from '@/views/HardSkills.vue';
import Creations from '@/views/Creations.vue';
import Contact from '@/views/Contact.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/hard-skills', name: 'HardSkills', component: HardSkills },
  { path: '/creations', name: 'Creations', component: Creations },
  { path: '/contact', name: 'Contact', component: Contact },
];

const router = createRouter({
  history: createWebHistory('/'),  
  routes,
});

export default router;
