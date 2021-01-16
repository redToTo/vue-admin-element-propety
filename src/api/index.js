import { get } from './axiosget'

const getUser = get('http://localhost:8080/user')

export {
  getUser
}
