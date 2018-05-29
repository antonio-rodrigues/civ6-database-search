import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home/home.vue";
import Search from "./views/search/search.vue";
import About from "./views/about/about.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/search",
      name: "search",
      component: Search
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});
