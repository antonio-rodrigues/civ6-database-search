import Vue from "vue";
import Vuex from "vuex";

import { getItem } from "@/utils";

import { VALUES } from "./constants";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    myValue: 123, // template file, not used
    lang: getItem("coa-lang") || VALUES.DEFAULT_LANG,
    queries: getItem("coa-queries") || [] // retrieve previous session queries
  },
  getters, // state values available to components, retrieve on computed methods
  mutations, // setters - possible mutations to state
  actions // actions to dispatch > commit mutation > change the state (use for async ops)
});
