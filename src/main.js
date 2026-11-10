import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import "./assets/main.css";
import { reveal } from "./directives/reveal.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBots } from "@fortawesome/free-brands-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faBots, faTriangleExclamation);

const app = createApp(App);

app.use(router);
app.directive("reveal", reveal);
app.component("FontAwesomeIcon", FontAwesomeIcon);

app.mount("#app");
