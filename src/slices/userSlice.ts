import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

import type { AppState } from "../app/types";

// Combining reducers
import projectReducers from "./reducers/projectReducers";
import userReducers from "./reducers/userReducers";

const initialState: AppState = {
  activeUser: JSON.parse(localStorage.getItem("activeUser") || "{}"),

  accounts: JSON.parse(localStorage.getItem("users") || "[]"),
  userInputError: false,
  loggedIn: JSON.parse(localStorage.getItem("loggedIn") || "false"),
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,

  reducers: {
    //User reducers
    ...userReducers,

    // Project reducers
    ...projectReducers,
  },
});

// Reducers
export const {
  // User reducers
  updateAccounts,
  addUserAccount,
  setActiveUser,
  setUserInputError,
  logoutUser,
  setLoggedIn,
  editProfileInformation,

  // Project reducers
  addProject,
  editProject,
  deleteProject,

  // Board reducers
  addBoard,
  editBoardTitleOnBlur,
} = userSlice.actions;

// getters
export const getDeviceAccounts = (state: RootState) =>
  state.userReducer.accounts;
export const getActiveUser = (state: RootState) => state.userReducer.activeUser;
export const getUserInputError = (state: RootState) =>
  state.userReducer.userInputError;
export const getUserLoggedIn = (state: RootState) => state.userReducer.loggedIn;

export default userSlice.reducer;
