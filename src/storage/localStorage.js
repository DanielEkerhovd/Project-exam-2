export function setStorage(name, value) {
  localStorage.setItem(name, value);
}

export const getStorage = (key) => {
  const data = localStorage.getItem(key);
  return data;
};

export function removeStorage(name) {
  localStorage.removeItem(name);
}

export function clearStorage() {
  localStorage.clear();
}
