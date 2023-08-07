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
      component: () => import('../views/order/index.vue')
    },

    {
      path: '/order',
      name: 'orderInfo',
      component: () => import('../views/order/OrderInfo.vue')
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue')
    },

    {
      path: '/products',
      name: 'products',
      component: () => import('../views/products/index.vue')
    },

    {
      path: '/product',
      name: 'product',
      component: () => import('../views/products/ProductInfo.vue')
    },

    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/category/index.vue')
    },

    {
      path: '/banners',
      name: 'banners',
      component: () => import('../views/banners/index.vue')
    },

    {
      path: '/types',
      name: 'types',
      component: () => import('../views/types/index.vue')
    },

    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/contact/index.vue')
    },

    {
      path: '/images',
      name: 'images',
      component: () => import('../views/images/index.vue')
    },

    {
      path: '/socials',
      name: 'socials',
      component: () => import('../views/socials/index.vue')
    },

    {
      path: '/password',
      name: 'password',
      component: () => import('../views/password/index.vue')
    }
  ]
})

export default router
