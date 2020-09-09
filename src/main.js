import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局样式
import './style/index.less'
// vant
import './plugins/vant'
// rem适配
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
