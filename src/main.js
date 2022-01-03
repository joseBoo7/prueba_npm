import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {BootstrapVue, IconsPlugin} from  'bootstrap-vue'

Vue.config.productionTip = false
Vue.prototype.$axios = axios.create({
  baseURL : 'http://localhost:8000/',
});
Vue.use (BootstrapVue)
Vue.use (IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
