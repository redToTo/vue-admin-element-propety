import { get } from './axiosget'

const getUser = get('http://localhost:8080/user/login')
const getInfo = get('http://localhost:8080/user/info')
const logout = get('http://localhost:8080/user/logout')

export {
  getUser,
  getInfo,
  logout
}
