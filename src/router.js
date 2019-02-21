import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home/home.vue";
import About from "./views/about/about.vue";
import Civ1 from "./views/page/civ1.vue";
import Civ2 from "./views/page/civ2.vue";
import Civ3 from "./views/page/civ3.vue";
import Civ4 from "./views/page/civ4.vue";
import Civ5 from "./views/page/civ5.vue";
import Civ6 from "./views/page/civ6.vue";
import NotFoundComponent from "./views/page/NotFound";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/civ/1",
      name: "civ1",
      component: Civ1
    },
    {
      path: "/civ/2",
      name: "civ2",
      component: Civ2
    },
    {
      path: "/civ/3",
      name: "civ3",
      component: Civ3
    },
    {
      path: "/civ/4",
      name: "civ4",
      component: Civ4
    },
    {
      path: "/civ/5",
      name: "civ5",
      component: Civ5
    },
    {
      path: "/civ/6",
      name: "civ6",
      component: Civ6
    },
    // catch all, 404 not found
    { path: "*", component: NotFoundComponent }
  ]
});
