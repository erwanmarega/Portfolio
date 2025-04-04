import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBots } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faBots);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router).mount('#app');
