import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import layout from '@/layout/main.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path: '/tabs/',
    component: layout,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: 'goods',
        component: () => import('@/views/goods/index.vue')
      },
      {
        path: 'my',
        component: () => import('@/views/my/index.vue')
      }
    ]
  },
  {
    path: '/safetyCenter',
    component: () => import('@/views/safetyCenter/index.vue')
  },
  {
    path: '/safetyCenter/changePassword',
    component: () => import('@/views/safetyCenter/changePassword.vue')
  },
  {
    path: '/safetyCenter/setAvatar',
    component: () => import('@/views/safetyCenter/setAvatar.vue')
  },
  {
    path: '/safetyCenter/changeNickname',
    component: () => import('@/views/safetyCenter/changeNickname.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
