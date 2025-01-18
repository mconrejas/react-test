import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Configure Redux store with userReducer and optional middleware
const store = configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Optional: Customize middleware
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>; // Represents the entire state
export type AppDispatch = typeof store.dispatch; // Use this type in dispatch

export default store;
