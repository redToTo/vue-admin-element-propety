import store from './store'
import router from './router'
import { getToken } from '@/utils/auth.js'
import { Message } from 'element-ui'

/* to：即将前往的路由，from：即将离开的路由，
next：路由的控制参数，有如下四种调用方式：
next()：如果一切正常，则调用这个方法进入下一个钩子。
next(false)：取消导航（即路由不发生改变）
next('/login')：当前的导航被中断，然后进行一个新的导航（路径可自由指定）。
next(error)：如果一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。 */
 const whiteList = ['/login']

router.beforeEach(async(to,from,next) => {
  // 查询当前浏览器中是否有对应cookie
  const hasToken = getToken()
  if(hasToken){
    if(to.path === '/login'){
      next({ path:'/' })
    }else{
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      }else{
        try{
          //因为上面没有userInfo，再此通过vuex拿到userinfo
          await store.dispatch('user/getInfo')
          next()
        }catch(err){
          //删除当前的token，然后转到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(err || 'Has Error')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  }else{
    //没有token的时候
    //当我们的准备前往路由是‘/login’时，我们不需要操作，继续下一个钩子的执行
    if(whiteList.indexOf(to.path) !== -1){
      next()
    }else{
      next(`/login?redirect=${to.path}`)
    }
  }
})