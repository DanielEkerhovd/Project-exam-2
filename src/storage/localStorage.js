export function setStorage(name, value) {
  localStorage.setItem(name, value);
}

export function getToken(name) {
  return localStorage.getItem(name);
}

export function removeToken(name) {
  localStorage.removeItem(name);
}

export function clearStorage() {
  localStorage.clear();
}
