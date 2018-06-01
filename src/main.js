import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// baseURL: 'http://www.acloudfor4.com/civ6datasvc/Service1.svc/rest/civ6data.api'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
