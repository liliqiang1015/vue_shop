// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/fonts/iconfont.css'
import './assets/css/global.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

// 配置axios
axios.defaults.baseURL = 'https://www.escook.cn:8888/api/private/v1/'
// 全局配置 axios 的 request 拦截器
axios.interceptors.request.use(config => {
  // 通过拦截request 请求 主动为 请求头 追加新属性Authorization 等于 token 值 config.headers['请求头'] = 'token字符换'
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
