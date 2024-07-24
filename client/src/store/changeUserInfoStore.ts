import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface changeUserUnfoState {
  nickname: string | null;
  // location: string | null;

  actions: {
    setNickname: (nickname: string | null) => void;
    // setLocation: (location: string | null) => void;
  };
}

const changeUserInfoStore: StateCreator<changeUserUnfoState> = (set) => ({
  nickname: null,
  // location: null,

  actions: {
    setNickname: (nickname) => {
      set((state) => ({ ...state, nickname }));
    },

    // setLocation: (location) => {
    //   set((state) => ({ ...state, location }));
    // },
  },
});

export const useChangeUserInfoStore = create<changeUserUnfoState>()(
  devtools(changeUserInfoStore, { name: "Change User Info Store" }),
);
