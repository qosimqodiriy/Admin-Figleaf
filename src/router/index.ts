import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  strict: true,
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/400',
      name: '400',
      component: () => import('../views/errors/400.vue')
    },
    {
      path: '/403',
      name: '403',
      component: () => import('../views/errors/403.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/errors/404.vue')
    },
    {
      path: '/500',
      name: '500',
      component: () => import('../views/errors/500.vue')
    },
    
    {
      path: '/',
      name: 'home',
      component: () => import('../views/index.vue')
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue')
    }
  ]
})

export default router
