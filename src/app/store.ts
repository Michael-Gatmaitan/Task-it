import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    userReducer: UserReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
