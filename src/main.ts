import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'normalize.css'
import './style/main.scss'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

Vue.component('v-select', vSelect)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
