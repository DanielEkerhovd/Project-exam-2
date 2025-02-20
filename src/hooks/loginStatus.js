import { create } from 'zustand';
import { getStorage, removeStorage } from '../storage/localStorage';

const status = getStorage('user') !== null ? true : false;

export const useLoginStatus = create((set) => ({
  isLoggedIn: status,
  setLoggedIn: () => {
    set({ isLoggedIn: true });
    window.dispatchEvent(new Event('storage'));
  },
  setLoggedOut: () => {
    removeStorage('user');
    set({ isLoggedIn: false });
    window.dispatchEvent(new Event('storage'));
  },
  setLoginStatus: (status) => {
    set({ isLoggedIn: status });
    window.dispatchEvent(new Event('storage'));
  },
}));
