import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import charts from '../views/charts.vue'
import topGenres from '../views/top-genres.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/stats',
      name: 'stats',
      component: charts
    },
    {
      path: '/top-genres',
      name: 'top-genres',
      component: topGenres
    }
  ]
})

export default router
