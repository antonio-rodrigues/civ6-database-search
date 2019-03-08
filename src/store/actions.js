// actions to dispatch > commit mutation > change the state - use for async ops

// Query list
export const addQuery = (context, payload) => {
  context.commit("ADD_QUERY", payload);
};

export const removeQuery = (context, payload) => {
  context.commit("REMOVE_QUERY", payload);
};

// globals
export const setLocale = (context, payload) => {
  context.commit("SET_LOCALE", payload);
};

export const appReset = (context, payload) => {
  context.commit("APP_RESET", payload);
};

export const loading = context => {
  context.commit("LOADING");
};

export const success = context => {
  context.commit("SUCCESS");
};

export const error = context => {
  context.commit("ERROR");
};

export const clearError = context => {
  context.commit("CLEAR_ERROR");
};
