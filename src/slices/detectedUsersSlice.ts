import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, DetectedUsers } from "../app/types";

const initialState: DetectedUsers = JSON.parse(
  localStorage.getItem("users") || "[]"
) && {
  detectedUsers: [],
};

const detectedUsersSlice = createSlice({
  name: "detectedUsers",
  initialState,
  reducers: {
    addUser: (state: DetectedUsers, action: PayloadAction<User>) => {
      state.detectedUsers.push(action.payload);
    },
  },
});

export const { addUser } = detectedUsersSlice.actions;
export default detectedUsersSlice.reducer;
