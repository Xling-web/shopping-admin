import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import {ElMessage } from 'element-plus'
import store from '@/store'
const routes: Array<RouteRecordRaw> = [
  {
    path:"/login",
    name:'login',
    component:()=>import('@/pages/login/index.vue')
  },{
    path: '/',
    name: 'layout',
    component: () => import('@/components/layout/index.vue'),
    redirect:'/',
    children:[
      {
        path: '/',
        name: 'home',
        component: () => import('@/pages/home/index.vue'),
      },{
        path: '/rotation',
        name: 'rotation',
        component: () => import('@/pages/rotation/index.vue'),
      },{
        path: '/good',
        name: 'good',
        component: () => import('@/pages/good/index.vue'),
      },{
        path: '/sort',
        name: 'sort',
        component: () => import('@/pages/sort/index.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局前置守卫
const whiteRoute:Array<string> = ['/login']
router.beforeEach((to,from,next)=>{
  const state:any = store.state
  if(state.persist.token === ''){
    if(whiteRoute.indexOf(to.path) === -1){
      next('/login')
      ElMessage.warning("登录失效，请重新登录")
    }else{
      next()
    }
  }else{
    next()
  }
})


export default router

