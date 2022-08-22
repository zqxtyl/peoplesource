import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
// 自定义指令
import * as directives from '@/directive/index.js'
// 遍历所有的导出的指令对象 完成自定义全局注册
Object.keys(directives).forEach(key => {
  // 注册自定义指令
  Vue.directive(key, directives[key])
})
import Print from 'vue-print-nb'
// Global instruction 
Vue.use(Print);

// 同一注册过滤器
 import * as filters from '@/filters/index.js'
 for(let key in filters){
  console.log(key)
   Vue.filter(key,filters[key])

 }
// Object.keys(filters).forEach(key=>{
//   Vue.filter(key,filters[key])
// })
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// 利用mock模拟假数据
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
// 注册element ui
Vue.use(ElementUI, { locale } )
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// production 生产  打包上线 （除掉一些报错）
// dev :devwlopment 开发
// test 测试

// 引入全局组件
import components from '@/components'
Vue.use(components)


Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
