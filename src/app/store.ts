import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../slices/userSlice";
import StateReducer from "../slices/stateSlice";

export const store = configureStore({
  reducer: {
    userReducer: UserReducer,
    stateReducer: StateReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
