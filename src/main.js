import Vue from 'vue'
import App from './App'
import router from './router'

// 引入静态资源
import '@/assets/base.css'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 将axios绑定到Vue的原型上
import axios from 'axios'
Vue.prototype.axios = axios

// 设置基准地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 请求拦截器，设置请求头
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 设置响应拦截器，处理响应回来的数据
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response.data
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
