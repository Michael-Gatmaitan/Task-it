import { PayloadAction as PA, current } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

import type { User, Project, AppState } from "../app/types";

interface EditProfilePayload {
  username: string;
  profileImageLink: string;
}

const usernameExists = (
  deviceAccounts: User[],
  newUsername: string
): boolean => {
  const hasPairUsername = deviceAccounts.filter(
    (deviceAccount) =>
      deviceAccount.username.toLowerCase() === newUsername.toLowerCase()
  );

  // if hasPairUsername is not empt
  return hasPairUsername.length !== 0;
};

const initialState: AppState = {
  activeUser: JSON.parse(localStorage.getItem("activeUser") || "{}"),

  accounts: JSON.parse(localStorage.getItem("users") || "[]"),
  userInputError: false,
  loggedIn: false,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,

  reducers: {
    // Adding new account
    addUserAccount(state: AppState, action: PA<User>) {
      if (usernameExists(state.accounts, action.payload.username)) {
        state.userInputError = true;
        return;
      }

      const { username, profileImageLink, userID } = action.payload;

      const newUser: User = {
        username: username,
        profileImageLink: profileImageLink,
        userID: userID,
        projects: [],
      };

      // Append users
      // const deviceAccountsTemp: User[] = [...accountsFromStorage, newUser];
      state.accounts.push(newUser);

      // localStorage.setItem("users", JSON.stringify(deviceAccountsTemp));
      console.log("from addueraccount");
      state.loggedIn = true;
    },

    setActiveUser(state: AppState, action: PA<User>) {
      // If input error occured, we will not set it as active user.
      if (state.userInputError) return;

      console.log("Setting active user: ", action.payload);

      // Set new user logged in
      const newActiveUser: User = action.payload;
      state.activeUser = newActiveUser;

      if (!state.loggedIn) state.loggedIn = true;
    },

    logoutUser(state: AppState) {
      const userLoggedout: User = {
        username: "",
        profileImageLink: "",
        userID: 0,
        projects: [],
      };

      state.activeUser = userLoggedout;

      // Reset data & Logout user
      state.loggedIn = false;
    },

    setUserInputError(state: AppState, action: PA<boolean>) {
      state.userInputError = action.payload;
    },

    setLoggedIn(state: AppState, action: PA<boolean>) {
      state.loggedIn = action.payload;
    },

    editProfileInformation(state: AppState, action: PA<EditProfilePayload>) {
      /* If the username already used in other account,
      this function will stop */
      if (usernameExists(state.accounts, action.payload.username)) {
        console.log(
          `Cannot replace the username: ${state.activeUser.username}
          with ${action.payload.username} because it is alreaady in use by another user
          in this device.`
        );

        return;
      }

      // Edit current user profile
      const item = state.accounts.find(
        (deviceAcc) => state.activeUser.userID === deviceAcc.userID
      );

      if (item != undefined) {
        let {
          username: editedUsername,
          profileImageLink: editedProfileImageLink,
        } = action.payload;

        const indexOfUserInDB = state.accounts.indexOf(item);

        // If edited image link value is empty, set it to previous value
        if (editedProfileImageLink === "")
          editedProfileImageLink = state.activeUser.profileImageLink;
        if (editedUsername === "") editedUsername = state.activeUser.username;

        // Change properties of user in DB
        state.accounts[indexOfUserInDB].username = editedUsername;
        state.accounts[indexOfUserInDB].profileImageLink =
          editedProfileImageLink;

        state.activeUser.username = editedUsername;
        state.activeUser.profileImageLink = editedProfileImageLink;
      }
    },

    // Project reducers
    addProject(state: AppState, action: PA<Project>) {
      if (state.activeUser.projects === undefined) {
        state.activeUser.projects = [];
      }

      const newProject: Project = action.payload;

      console.log(current(state.activeUser.projects));

      const indexOfUserInDB = state.accounts.findIndex(
        (acc) => acc.userID === state.activeUser.userID
      );

      state.activeUser.projects.push(newProject);
      state.accounts[indexOfUserInDB] = state.activeUser;
    },

    deleteProject(state: AppState, action: PA<Project>) {
      console.log("Project to delete: ", action.payload);

      const duplicateOfProjectToDelete = state.activeUser.projects.find(
        (e) => e.projectTitle === action.payload.projectTitle
      );

      if (!duplicateOfProjectToDelete) {
        console.log("Project on workspace not found.");
        return;
      }

      const indexOfProjectToDelete = state.activeUser.projects.indexOf(
        duplicateOfProjectToDelete
      );

      // Perfom deletion of item
      state.activeUser.projects.splice(indexOfProjectToDelete, 1);
    },
  },
});

// Reducers
export const {
  addUserAccount,
  setActiveUser,
  setUserInputError,
  logoutUser,
  setLoggedIn,
  editProfileInformation,

  // Projects
  addProject,
  deleteProject,
} = userSlice.actions;

// getters
export const getDeviceAccounts = (state: RootState) =>
  state.userReducer.accounts;
export const getActiveUser = (state: RootState) => state.userReducer.activeUser;
export const getUserInputError = (state: RootState) =>
  state.userReducer.userInputError;
export const getUserLoggedIn = (state: RootState) => state.userReducer.loggedIn;

export default userSlice.reducer;
