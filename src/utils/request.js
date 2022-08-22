import axios from 'axios'
import { Message } from 'element-ui';
import store from '@/store';
import router from '@/router';
import { getTokenTime } from './auth.js';
console.log(getTokenTime)
// create an axios instance
const service = axios.create({
  baseURL:process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})


// request interceptor
service.interceptors.request.use(
  // 每次请求都会返回config配置
  config => {
    if (store.state.user.token) {
      // 判断token有没有过期
      const currentTime = Date.now()
      const times= 1000*1000000
      if(currentTime-getTokenTime()>times){
        console.log('跳到登录页面')
       store.dispatch('user/logout').then(
       router.push('/login')
     )
       return Promise.reject(new Error('登录过期'));

      }else{
         config.headers['Authorization'] = 'Bearer '+ store.state.user.token
     }
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  } 
)

// 响应拦截器
service.interceptors.response.use((res)=>{
 // console.log(res)
  const { success , message , data } = res.data
  if(success){
    return data
  }
  console.log(132)
  Message.error(message);
  return Promise.reject(new Error(message));
},
(error)=>{
  if(error?.response?.status===401){
  // console.log('响应回来的',error)
  Message.error('登录过期')
  store.dispatch('user/logout').then(
    router.push('/login'))
  }else{
    // console.dir('token过期',error)
    Message.error(error.message)
  }
  return Promise.reject(error);
}

/**
     * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
/*   response => {

    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  } */
)

export default service
