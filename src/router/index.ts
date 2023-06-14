import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: () => import('../layout/AppLayout.vue'),
      redirect: { name: 'home' },
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/Home.vue')
        },
        {
          path: '/about_view',
          name: 'about-view',
          component: () => import('../views/AboutView.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/About.vue')
        },
        {
          path: '/customers',
          name: 'customers',
          component: () => import('../views/Cards.vue')
        },
        {
          path: '/clients',
          name: 'clients',
          component: () => import('../views/Tables.vue')
        }
      ]
    }
  ]
})

export default router
