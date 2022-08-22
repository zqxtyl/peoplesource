import request from '@/utils/request'
/**
 * 
 * @returns 
 */
 export function getDeptsApi (){
    return request ({
        url:'/company/department',
    })
 }



/**
 * 
 * @param {treeNode.id} id 
 * @returns 
 */
 export function delDeptsApi (id){
    return request ({
        url:`/company/department/${id}`,
        method:'DELETE'
    })
 }
 /**
  * 
  * @param {treeNode的id} id 
  * @returns 
  */
 export function getDeptsInfoByIdApi (id){
    return request ({
        url:`/company/department/${id}`
    })
 }
/**
 * 
 * @param {treeNode的id} id 
 * @returns 
 */
 export function putEditDeptsInfoByIdApi (id,data){
    return request ({
        url:`/company/department/${id}`,
        method:'PUT',
        data
    })
 }