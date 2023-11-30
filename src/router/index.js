import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import charts from '../views/charts.vue'
import topGenres from '../views/top-genres.vue'

const router = createRouter({
  history: createWebHistory(),
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
      path: '/top-genres/:chart_type/:time_limit/tracks=:is_track',
      name: 'top-genres',
      component: topGenres,
      props: true
    }
  ]
})

export default router
