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

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
