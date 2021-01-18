import { get } from './axiosget'

const getUser = get('http://localhost:8080/user/login')
const getInfo = get('http://localhost:8080/user/info')

export {
  getUser,
  getInfo
}
