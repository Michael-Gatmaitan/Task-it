import { createSlice } from "@reduxjs/toolkit";
import { User } from "../app/types";

const initialState: User = JSON.parse(localStorage.getItem("user") || "{}") || {
  firstName: "",
  lastName: "",
  profileImageLink: "",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,

  reducers: {
    // set first name
    setFirstName(state: User, action) {
      state.firstName = action.payload;

      localStorage.setItem("user", JSON.stringify(state));
    },
    setLastName(state: User, action) {
      state.lastName = action.payload;

      localStorage.setItem("user", JSON.stringify(state));
    },
    setProfileImageLink(state: User, action) {
      state.profileImageLink = action.payload;

      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

export const { setFirstName, setLastName } = userSlice.actions;
export default userSlice.reducer;
