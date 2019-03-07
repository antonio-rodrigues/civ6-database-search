/* eslint-disable no-restricted-globals */

// Old versions of IE11 have the `localStorage` methods as strings
// and any attempts to overwrite those functions fail as they are
// cast back into strings. Using these functions ensures no hard-to-debug
// errors occur.
// https://stackoverflow.com/questions/21155137/javascript-localstorage-object-broken-in-ie11-on-windows-7

const normaliseSetItem = value =>
  value && value.length ? JSON.stringify(value) : null;

const normaliseGetItem = value =>
  value && value.length ? JSON.parse(value) : null;

export const setItem = (item, value) => {
  if (typeof localStorage.setItem !== "function") {
    return Storage.prototype.setItem.call(
      localStorage,
      item,
      normaliseSetItem(value)
    );
  }

  localStorage.setItem(item, normaliseSetItem(value));
};

export const getItem = item => {
  if (typeof localStorage.getItem !== "function") {
    return normaliseGetItem(Storage.prototype.getItem.call(localStorage, item));
  }

  return normaliseGetItem(localStorage.getItem(item));
};

export const removeItem = item => {
  if (typeof localStorage.removeItem !== "function") {
    return Storage.prototype.removeItem.call(localStorage, item);
  }

  return localStorage.removeItem(item);
};

export const clearStorage = () => {
  /// Warning: destructive action, wipes out *ALL* localStorage data
  return localStorage.clear();
};
