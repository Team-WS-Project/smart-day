import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface weatherStore {
  weatherData: Record<string, number>;
  actions: {
    setWeatherData: (newWeatherArray: Record<string, number>) => void;
    clearWeatherData: () => void;
  };
}

const weatherStore: StateCreator<weatherStore> = (set) => ({
  weatherData: {},
  actions: {
    setWeatherData(newWeatherData) {
      const convertedData: Record<string, number> = {};
      for (const [key, value] of Object.entries(newWeatherData)) {
        convertedData[key] = Number(value);
      }
      set((state) => ({ ...state, weatherData: convertedData }));
    },
    clearWeatherData() {
      set((state) => ({ ...state, weatherData: {} }));
    },
  },
});

export const useWeatherStore = create<weatherStore>()(devtools(weatherStore, { name: "Weather Store" }));
