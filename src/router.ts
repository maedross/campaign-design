import { createWebHashHistory, createRouter } from 'vue-router'

import GamesListView from './views/GamesListView.vue'
import ModelView from './views/ModelView.vue'
import GameView from './views/GameView.vue'

const routes = [
  { path: '/', component: ModelView },
  { path: '/model', component: ModelView },
  { path: '/games', component: GamesListView },
  { path: '/games/:gameId', component: GameView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
