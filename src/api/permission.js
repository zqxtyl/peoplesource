import request from '@/utils/request'
// 获取权限
export function getPermissionList() {
    return request({
      url: '/sys/permission'
    })
  }
  // 添加权限
  export function addPermission(data) {
    return request({
      url: '/sys/permission',
      method:'post',
      data
    })
  }