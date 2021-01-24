import { getToken,setToken,removeToken } from '@/utils/auth.js'
import { getUser,getInfo,logout } from '@/api/index.js'
import { resetRouter } from '@/router'


 //获取当前在浏览器中cookie的值（token）
const getDefultState = () => {
  return {
    token : getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefultState()

const mutations = {
  RESET_STATE: (state) => {
    // 拷贝当cookie中的值给state，达到更新作用
    Object.assign(state,getDefultState())
  },
  SET_TOKEN: (state,token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}
 
const actions = {
  login(context,userInfo){
    const { username,password } = userInfo
    return new Promise((resolve,reject) => {
      getUser({username : username.trim(), password : password}).then((res) => {
        const { data } = res
        context.commit('SET_TOKEN',data.token)
        setToken(data.token)
        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  },
  //获取用户info信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then((res) => {
        var str = JSON.stringify(res); 
        const  { data }  = res
        if (!data) {
          return reject('验证失败，请重新登录')
        }
        const { name, avatar } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // 要先移除当前的token
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },  
  //重置token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // 要先移除当前的token，才进行token更新
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}