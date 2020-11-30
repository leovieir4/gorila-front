import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'
import Vue from 'vue'
import App from './App.vue'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted'
Vue.use(Toasted)
Vue.use(Chartkick.use(Chart))
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
