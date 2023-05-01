import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../slices/userSlice";
import DetectedUsers from "../slices/detectedUsersSlice";

export const store = configureStore({
  reducer: {
    userReducer: UserReducer,
    userListReducer: DetectedUsers,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
