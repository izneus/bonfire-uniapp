import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import store from './store'
import dict from './components/Dict'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(uView)
Vue.prototype.$store = store
Vue.use(dict)

const app = new Vue({
  store,
  ...App
})

// 引入请求封装，将app参数传递到配置中
require('@/utils/request.js')(app)

// 引入自定义的页面跳转拦截，实现登录才可查看页面
require('@/utils/navi-guards')(app)

app.$mount()
