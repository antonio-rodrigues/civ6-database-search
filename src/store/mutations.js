// mutation setters - possible mutations to state

import { _getItem, setItem, _removeItem, clearStorage } from "@/utils";

export const ADD_QUERY = (state, payload) => {
  // add item to state
  state.queries.push(payload);
  // persist new array on storage
  setItem("coa-queries", state.queries);
};

export const REMOVE_QUERY = (state, id) => {
  // remove item from array
  const newQueries = state.queries.filter(item => item !== id);
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
