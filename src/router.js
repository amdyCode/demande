import { createRouter, createWebHistory } from 'vue-router'
import NewRequest from './views/NewRequest.vue'
import Home from './views/Home.vue'
import TraitementDemande from './views/TraitementDemande.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/nouvelle-demande',
    name: 'NewRequest',
    component: NewRequest
  },
  {
    path: '/traitement',
    name: 'Traitement',
    component: TraitementDemande
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router