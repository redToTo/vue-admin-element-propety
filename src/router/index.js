import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = () => import('@/view/login/index.vue')
const des = () => import('@/view/des/index')
export const constantRoutes = [
    {
      path: '/login',
      component: login,
      hidden: true
    },
    {
      path: '/',
      name: 'des',
      redirect:'/des',
      component:des,
      hidden: true
    }
  ]
  
const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router