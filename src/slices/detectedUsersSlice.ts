import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, DetectedUsers } from "../app/types";

const initialState: DetectedUsers = {
  detectedUsers: [],
};

const detectedUsersSlice = createSlice({
  name: "detectedUsers",
  initialState,
  reducers: {
    updateUsers: (state: DetectedUsers, action: PayloadAction<User>) => {
      state.detectedUsers.push(action.payload);
    },
  },
});

export const { updateUsers } = detectedUsersSlice.actions;
export default detectedUsersSlice.reducer;
