import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: () => import('../layout/AppLayout.vue'),
      redirect: { name: 'articles' },
      children: [
        {
          path: '/articles',
          name: 'articles',
          component: () => import('../views/Tables.vue')
        },
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
        }
      ]
    }
  ]
})

export default router
