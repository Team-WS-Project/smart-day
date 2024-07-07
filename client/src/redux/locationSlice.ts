// locationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sido: "",
  sigungu: "",
  eupmyeon: "",
  favoriteLocations: [],
  currentLocation: "",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSido(state, action) {
      state.sido = action.payload;
    },
    setSigungu(state, action) {
      state.sigungu = action.payload;
    },
    setEupmyeon(state, action) {
      state.eupmyeon = action.payload;
    },
    addFavoriteLocation(state, action) {
      state.favoriteLocations.push(action.payload);
    },
    setCurrentLocation(state, action) {
      state.currentLocation = action.payload;
    },
  },
});

export const { setSido, setSigungu, setEupmyeon, addFavoriteLocation, setCurrentLocation } = locationSlice.actions;

export default locationSlice.reducer;
