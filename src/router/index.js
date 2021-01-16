import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login/index.vue'
import des from '@/view/des/Index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/des',
      name: 'des',
      component: des
    }
  ]
})
