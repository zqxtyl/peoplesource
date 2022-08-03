import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons"; // icon
import "@/permission"; // permission control
import * as directives from '@/directives'

if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;
// 参数1 自定义指令的名称  不需要+v-
// 2  是配置对象
for(let key in directives){
  Vue.directive(key,directives[key])
}

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
