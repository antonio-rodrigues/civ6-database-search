import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import VueScrollProgressBar from "vue-scroll-progressbar";
import BackToTop from "vue-backtotop";

// external libs
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
// import "vue-material/dist/theme/default.css";
// import "vue-material/dist/theme/black-green-dark.css";

Vue.use(VueMaterial);
Vue.use(VueScrollProgressBar);
Vue.use(BackToTop);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
