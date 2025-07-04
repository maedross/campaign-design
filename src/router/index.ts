import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/ModelView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/games-list',
      name: 'games-list',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GamesListView.vue'),
    },
  ],
})

export default router
