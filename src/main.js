import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import axios from 'axios';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:82/api';
// axios.defaults.headers.common['Authorization'] = 'Bearer '+ this.$store.state.user.token;
axios.defaults.headers.post['Content-Type'] = 'application/json';
const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
}

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
