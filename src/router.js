import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
      meta: { title: "Erwan Marega | Portfolio Développeur Web Full Stack" },
    },
    {
      path: "/now",
      name: "now",
      component: () => import("./pages/NowPage.vue"),
      meta: { title: "En ce moment — Erwan Marega" },
    },
    {
      path: "/shelf",
      name: "shelf",
      component: () => import("./pages/ShelfPage.vue"),
      meta: { title: "Étagère — Erwan Marega" },
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved;
    if (to.hash) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      return { el: to.hash, top: 72, behavior: reduce ? "auto" : "smooth" };
    }
    return { top: 0 };
  },
});

router.afterEach((to) => {
  if (to.meta.title) document.title = to.meta.title;
});

export default router;
