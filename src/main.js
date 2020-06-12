import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import axios from 'axios';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Loading from "./components/lib/loading";
import CenterContainer from "./components/lib/center-container";
import router from "./router";
import VueFab from 'vue-float-action-button'
window.$ = window.jQuery = require('jquery')
import $ from 'jquery'
import 'bootstrap-notify';

$.notifyDefaults({
  // settings
  element: 'body',
  position: null,
  type: "danger",
  allow_dismiss: true,
  newest_on_top: false,
  showProgressbar: false,
  placement: {
    from: "top",
    align: "right"
  },
  offset: 20,
  spacing: 10,
  z_index: 2000,
  delay: 5000,
  timer: 1000,
  url_target: '_blank',
  mouse_over: null,
  animate: {
    enter: 'animated fadeInDown',
    exit: 'animated fadeOutUp'
  },
  onShow: null,
  onShown: null,
  onClose: null,
  onClosed: null,
  icon_type: 'class',
  template: `
<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">
    <button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>
    <span data-notify="icon"></span>
    <span data-notify="title"><b>{1}</b></span>
    <div class="progress" data-notify="progressbar">
        <div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
    </div>
    <a href="{3}" target="{4}" data-notify="url"></a>
</div>`
});
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueFab, /* {
  ----------------------
  // opitons 可选iconfont图标或MaterialIcons
  iconType: 'MaterialDesign'
  // iconType: 'iconfont'
} */)
Vue.component("loading", Loading);
Vue.component("center-container", CenterContainer);
axios.defaults.baseURL = 'http://usuario.kamaleon360.com/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
}


new Vue({
  render: h => h(App),
  router: router,
  store
}).$mount('#app')
