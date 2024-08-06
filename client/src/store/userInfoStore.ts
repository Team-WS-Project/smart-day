import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { getFavorites } from "../apis/locationAPIs";

export type FavoriteLocation = {
  location_name: string;
};

interface userInfoState {
  userId: number | null;
  selectedDate: Date | undefined;
  currentLocation: string;
  favoriteLocations: FavoriteLocation[];
  nickname: string | null;

  actions: {
    setUserId: (userId: number | null) => void;

    setNickname: (nickname: string | null) => void;

    setSelectedDate: (date: Date) => void;

    initializeSelectedDate: () => void;

    setCurrentLocation: (currentLocation: string) => void;

    clearCurrentLocation: () => void;

    setFavoriteLocation: () => void;

    addFavoriteLocation: (location: string) => void;

    deleteFavoriteLocation: (location: string) => void;
  };
}

const userInfoStore: StateCreator<userInfoState> = (set) => ({
  userId: null,
  selectedDate: undefined,
  currentLocation: "",
  favoriteLocations: [],
  nickname: null,

  actions: {
    setUserId(userId) {
      set((state) => ({ ...state, userId }));
    },

    setNickname: (nickname) => {
      set((state) => ({ ...state, nickname }));
    },

    setSelectedDate: (date) => {
      set((state) => ({ ...state, selectedDate: date }));
    },

    initializeSelectedDate: () => {
      set((state) => ({ ...state, selectedDate: undefined }));
    },

    setCurrentLocation: (currentLocation) => {
      set((state) => ({ ...state, currentLocation: currentLocation }));
    },

    clearCurrentLocation: () => {
      set((state) => ({ ...state, currentLocation: "" }));
    },

    setFavoriteLocation: async () => {
      try {
        const res = await getFavorites();
        const favorites = res?.data;
        set((state) => {
          return { ...state, favoriteLocations: favorites };
        });
      } catch (err) {
        console.error(err);
      }
    },

    addFavoriteLocation: (location) => {
      set((state) => {
        if (location.trim() === "") {
          return { ...state };
        }

        const isOverlapped = state.favoriteLocations.some((favoriteLocation) => {
          favoriteLocation.location_name === location;
        });

        if (isOverlapped) {
          return { ...state };
        }

        return {
          ...state,
          favoriteLocations: [...state.favoriteLocations, { location_name: location }],
        };
      });
    },

    deleteFavoriteLocation: (location) => {
      set((state) => {
        return {
          ...state,
          favoriteLocations: state.favoriteLocations.filter((favoriteLocation) => {
            return favoriteLocation.location_name !== location;
          }),
        };
      });
    },
  },
});

export const useUserInfoStore = create<userInfoState>()(devtools(userInfoStore, { name: "User Info Store" }));
