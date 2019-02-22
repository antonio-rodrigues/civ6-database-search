import Vue from "vue";
import Router from "vue-router";
import Home from "./views/pages/home/home.vue";
import About from "./views/pages/about/about.vue";
import Civ1 from "./views/pages/civ1/civ1.vue";
import Civ2 from "./views/pages/civ2/civ2.vue";
import Civ3 from "./views/pages/civ3/civ3.vue";
import Civ4 from "./views/pages/civ4/civ4.vue";
import Civ5 from "./views/pages/civ5/civ5.vue";
import Civ6 from "./views/pages/civ6/civ6.vue";
import NotFoundComponent from "./views/pages/NotFound";

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
