import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface userInfoState {
  userId: number | null;
  selectedDate: Date | undefined;
  currentLocation: string;
  favoriteLocations: string[];

  actions: {
    setSelectedDate: (arg1: Date) => void;

    initializeSelectedDate: () => void;

    setCurrentLocation: (currentLocation: string) => void;

    addFavoriteLocation: (location: string) => void;

    deleteFavoriteLocation: (location: string) => void;
  };
}

const userInfoStore: StateCreator<userInfoState> = (set) => ({
  userId: null,
  selectedDate: undefined,
  currentLocation: "",
  favoriteLocations: [],

  actions: {
    setSelectedDate: (date) => {
      set((state) => ({ ...state, selectedDate: date }));
    },

    initializeSelectedDate: () => {
      set((state) => ({ ...state, selectedDate: undefined }));
    },

    setCurrentLocation: (currentLocation) => {
      set((state) => ({ ...state, currentLocation: currentLocation }));
    },

    addFavoriteLocation: (location) => {
      set((state) => {
        if (location.trim() === "") {
          return { ...state };
        }

        let isOverlapped = false;

        state.favoriteLocations.forEach((favoriteLocation) => {
          if (favoriteLocation === location) {
            isOverlapped = true;
          }
        });

        if (isOverlapped) {
          return { ...state };
        }

        return {
          ...state,
          favoriteLocations: [...state.favoriteLocations, location],
        };
      });
    },

    deleteFavoriteLocation: (location) => {
      set((state) => {
        return {
          ...state,
          favoriteLocations: state.favoriteLocations.filter((favoriteLocation) => {
            return favoriteLocation !== location;
          }),
        };
      });
    },
  },
});

export const useUserInfoStore = create<userInfoState>()(devtools(userInfoStore, { name: "User Info Store" }));
