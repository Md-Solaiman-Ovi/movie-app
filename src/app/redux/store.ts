// app/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
