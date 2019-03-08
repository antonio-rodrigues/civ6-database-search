// mutation setters - possible mutations to state

import { setItem, clearStorage } from "@/utils";

export const ADD_QUERY = (state, payload) => {
  if (payload && state.queries.indexOf(payload) === -1) {
    // add item to state, if not in list
    state.queries.push(payload);
    // re-sort array
    state.queries.sort();
    // persist new array on storage
    setItem("coa-queries", state.queries);
  }
};

export const REMOVE_QUERY = (state, key) => {
  // remove by matching value...
  // const newQueries = state.queries.filter(item => item !== id);
  // remove item from array by key
  const newQueries = state.queries
    .slice(0, key)
    .concat(state.queries.slice(key + 1, state.queries.length));
  // update state
  state.queries = newQueries;
  // persist new array on storage
  setItem("coa-queries", newQueries);
};

// App global
export const APP_RESET = state => {
  clearStorage();
  state.queries = []; // reset
};

export const LOADING = state => {
  state.status = {
    loading: true,
    success: false,
    error: false
  };
};

export const SUCCESS = state => {
  state.status = {
    loading: false,
    success: true,
    error: false
  };
};

export const ERROR = (state, payload) => {
  state.status = {
    loading: false,
    success: false,
    error: payload
  };
};

export const CLEAR_ERROR = state => {
  state.status = {
    loading: false,
    success: false,
    error: false
  };
};
