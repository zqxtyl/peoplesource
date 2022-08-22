import request from '@/utils/request'
/**
 * 
 * @param {Object} data password mobile
 * @returns 
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
/**
 * 获取用户信息
 * @returns  promise
 */
export function getUserInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export function getUserDetailInfoApi(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'get'
  })
}


export function saveUserDetailInfoApi(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
