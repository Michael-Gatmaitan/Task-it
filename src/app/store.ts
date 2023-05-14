import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../slices/userSlice";
import TreeStateReducer from "../slices/treeStateSlice";

export const store = configureStore({
  reducer: {
    userReducer: UserReducer,
    treeStateReducer: TreeStateReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
