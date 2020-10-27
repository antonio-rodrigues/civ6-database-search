import Vue from "vue";
import Router from "vue-router";
import search from "./views/pages/search/search.vue";
import NotFound from "./views/pages/NotFound";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: search
    },
    {
      path: "/civ6/search",
      name: "civ6-search",
      component: search
    },
    // catch all, 404 not found
    { path: "*", component: NotFound }
  ]
});
