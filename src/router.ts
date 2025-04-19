import { createMemoryHistory, createRouter } from 'vue-router'

import GamesList from './views/GamesListView.vue'
import ModelView from './views/ModelView.vue'
import GameView from './views/GameView.vue'

const routes = [
  { path: '/', component: GamesList },
  { path: '/about', component: ModelView },
  { path: '/games/:gameId', component: GameView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
