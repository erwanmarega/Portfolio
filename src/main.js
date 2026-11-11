import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import "./assets/main.css";
import { reveal } from "./directives/reveal.js";

const app = createApp(App);

app.use(router);
app.directive("reveal", reveal);

app.mount("#app");
