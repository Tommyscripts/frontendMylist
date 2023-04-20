import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import AdminView from '../views/AdminView.vue'
import UserProfile from '../views/ProfileUserView.vue'
import Soporte from '../views/Soporte.vue'
import Categorias from '../views/TodosLosProductosView.vue'
import Carnes from '../views/CarnesView.vue'
import Pescados from '../views/pescaderiaView.vue'
import Congelados from '../views/CongeladosView.vue'
import Arroz from '../views/ArrocesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path:'/admin',
      name:'admin',
      component: AdminView
    },
    {
      path:'/profile',
      name:'profile',
      component: UserProfile
    },
    {
      path:'/soporte',
      name:'soporte',
      component: Soporte
    },
    {
      path:'/categorias',
      name:'categorias',
      component: Categorias
    },
    {
      path:'/carnes',
      name:'carnes',
      component: Carnes
    },
    {
      path: '/pescados',
      name:'pescados',
      component: Pescados
    },
    {
      path: '/congelados',
      name:'congelados',
      component: Congelados
    },
    {
      path:'/arroces',
      name:'arroces',
      component: Arroz
    }
    
  ]
})

export default router