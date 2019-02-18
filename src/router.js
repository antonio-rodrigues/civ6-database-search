import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home/home.vue";
import Search from "./views/search/search.vue";
import About from "./views/about/about.vue";
import Page from "./views/page/page.vue";

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
    },
    {
      path: "/civ/1",
      name: "civ1",
      component: Page
    },
    {
      path: "/civ/2",
      name: "civ2",
      component: Page
    },
    {
      path: "/civ/3",
      name: "civ3",
      component: Page
    },
    {
      path: "/civ/4",
      name: "civ4",
      component: Page
    },
    {
      path: "/civ/5",
      name: "civ5",
      component: Page
    },
    {
      path: "/civ/6",
      name: "civ6",
      component: Page
    }
  ]
});
