import request from '@/utils/request'
// 获取公司用户信息
export function getCompanyInfoApi (id){
    return request({
        url:`/company/${id}`,
    })
}