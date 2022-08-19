import request from '@/utils/request'

/**
 *  获取角色列表
 * @param {*} params 
 * @returns 
 */
export function getRolesApi(params) {
	return request ({
		url:'/sys/role',
		params
	})
}

/** *
 * 新增角色
 * ***/
 export function addRole(data) {
	return request({
	  url: '/sys/role',
	  data,
	  method: 'post'
	})
  }