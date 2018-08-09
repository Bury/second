// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/iconfont.css'
import '../static/css/home.css'
import '../static/css/main.css'
import '../static/font/iconfont.css'
import http from './api/http.js'

import 'babel-polyfill'

import App from './App'
import router from './router'
import axios from 'axios'
import * as filters from './filters'
import './config/constants'
import Moment from 'moment'
import globalFunction from '@/assets/js/globalFunction'

Vue.prototype.moment = Moment


Vue.use(ElementUI)
Vue.use(globalFunction);
Vue.filter('date', filters.dateFilter)
Vue.filter('numberFilter', filters.numberFilter)
Vue.filter('numbersFilter', filters.numbersFilter)
Vue.filter('numThousand', filters.numThousand)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  render: h => h(App)
}).$mount('#app')
