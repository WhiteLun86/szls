import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard/page1'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard/index.vue'),
    children: [
      {
        path: '',
        redirect: 'page1' // 设置默认重定向到 page1
      },
      {
        path: 'page1',
        name: 'Page1',
        component: () => import('@/views/Page1/index.vue')
      },
      {
        path: 'page2',
        name: 'Page2',
        component: () => import('@/views/Page2/index copy.vue')
      },
      {
        path: 'page3',
        name: 'Page3',
        component: () => import('@/views/Page3/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/404',
    name: 'Page404',
    component: () => import('@/views/NotFound/index.vue')
  },
  {
    path: '*',
    redirect: '/404'
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
