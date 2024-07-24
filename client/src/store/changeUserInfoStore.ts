import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface changeUserUnfoState {
  email: string | null;
  nickname: string | null;
  location: string | null;

  actions: {
    setEmail: (email: string | null) => void;
    setNickname: (nickname: string | null) => void;
    setLocation: (location: string | null) => void;
  };
}

const changeUserInfoStore: StateCreator<changeUserUnfoState> = (set) => ({
  email: null,
  nickname: null,
  location: null,

  actions: {
    setEmail: (email) => {
      set((state) => ({ ...state, email }));
    },

    setNickname: (nickname) => {
      set((state) => ({ ...state, nickname }));
    },

    setLocation: (location) => {
      set((state) => ({ ...state, location }));
    },
  },
});

export const useChangeUserInfoStore = create<changeUserUnfoState>()(
  devtools(changeUserInfoStore, { name: "Change User Info Store" }),
);
