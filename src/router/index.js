import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import ChartsPage from "../views/ChartsPage.vue";
import TopGenresPage from "../views/TopGenresPage.vue";

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
      meta: {
        title: "Musycharts - Your music taste like you've never seen it",
      },
    },
    {
      path: "/stats",
      name: "stats",
      component: ChartsPage,
      meta: { title: "My Charts | Musycharts" },
    },
    {
      path: "/top-genres/:chart_type/:time_limit/tracks=:is_track",
      name: "top-genres",
      component: TopGenresPage,
      props: true,
      meta: { title: "Top Genres | Musycharts" },
    },
  ],
});

router.afterEach((to) => {
  const title = to.meta?.title;
  if (title) {
    document.title = title;
  }
});

export default router;

