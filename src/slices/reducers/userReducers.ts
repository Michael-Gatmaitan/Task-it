import { PayloadAction as PA } from "@reduxjs/toolkit";
import type { User, AppState } from "../../app/types";

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

  // if hasPairUsername is not empty
  // return state.deviceAccounts.find(acc => acc.username === newUsername) !== undefined
  return hasPairUsername.length !== 0;
};

const userReducers = {
  updateAccounts(state: AppState) {
    const { activeUser, accounts } = state;
    let index;

    if (accounts.length === 0) {
      index = 0;
      localStorage.setItem("users", JSON.stringify([]));
      return;
    } else {
      index = accounts.findIndex((acc) => activeUser.userID === acc.userID);
    }

    // Update the accounts if there's change in activeUser state
    // console.log(current(activeUser), state.loggedIn);

    state.accounts[index] = activeUser;
    localStorage.setItem("users", JSON.stringify(accounts));
  },

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
    state.accounts.push(newUser);
    console.log("from add user account");
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

      // const indexOfUserInDB = state.accounts.indexOf(item);

      // If edited image link value is empty, set it to previous value
      if (editedProfileImageLink === "")
        editedProfileImageLink = state.activeUser.profileImageLink;
      if (editedUsername === "") editedUsername = state.activeUser.username;

      state.activeUser.username = editedUsername;
      state.activeUser.profileImageLink = editedProfileImageLink;
    }
  },
};

export default userReducers;
