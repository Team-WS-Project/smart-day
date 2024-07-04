// store.js
import { configureStore } from '@reduxjs/toolkit';
import locationReducer from '../redux/locationSlice';

export const store = configureStore({
  reducer: {
    location: locationReducer,
  },
});
