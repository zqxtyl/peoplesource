import Cookies from 'js-cookie'
// 引入cookies 方便了对cookies的操作
const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setTokenTime() {
  return Cookies.set("setTokenTime", Date.now())
}

export function getTokenTime() {
  return Cookies.get('setTokenTime')
}