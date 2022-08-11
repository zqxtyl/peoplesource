import request from '@/utils/request'
// 获取列表
export const getDepts=()=>{
    return request({
        url:'/company/department'
    })
}

// 删除
export const deleteDepts=(id)=>{
    return request({
        url:`/company/department/${id}`,
        method:'delete'
    })
}
// 新增部门
export const addDepartment = (data) => {
    return request({
      url: '/company/department',
      method: 'post',
      data
    })
  }

  // 根据id获取部门详情
  export const getDeptById=(id)=>{
    return request({
        url:`/company/department/${id}`
    })
  }

  // 更改部门
export const updateDepartment = (data) => {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
