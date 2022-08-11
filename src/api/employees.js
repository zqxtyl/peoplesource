import request from '@/utils/request'

//获取简单员工列表
export const getEmployeesApi=()=>{
    return request({
        url:'/sys/user/simple'
    })
}