import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../app/types";
import { RootState } from "../app/store";

interface UserDeviceDB {
  activeUser: User;
  deviceAccounts: User[];

  userInputError: boolean;
  loggedIn: boolean;
}

interface EditProfilePayload {
  username: string;
  profileImageLink: string;
}

const isUsernameAlreadyExists = (
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

const initialState: UserDeviceDB = {
  activeUser: JSON.parse(localStorage.getItem("activeUser") || "{}"),

  deviceAccounts: JSON.parse(localStorage.getItem("users") || "[]"),
  userInputError: false,
  loggedIn: false,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,

  reducers: {
    // Adding new account
    addUserAccount(state: UserDeviceDB, action: PayloadAction<User>) {
      if (
        isUsernameAlreadyExists(state.deviceAccounts, action.payload.username)
      ) {
        state.userInputError = true;
        return;
      }

      // const accountsFromStorage = JSON.parse(
      //   localStorage.getItem("users") || "[]"
      // );
      const { username, profileImageLink, userID } = action.payload;

      const newUser: User = {
        username: username,
        profileImageLink: profileImageLink,
        userID: userID,
      };

      // Append users
      // const deviceAccountsTemp: User[] = [...accountsFromStorage, newUser];
      state.deviceAccounts.push(newUser);

      // localStorage.setItem("users", JSON.stringify(deviceAccountsTemp));
      console.log("from addueraccount");
      state.loggedIn = true;
    },

    setActiveUser(state: UserDeviceDB, action: PayloadAction<User>) {
      // If input error occured, we will not set it as active user.
      if (state.userInputError) return;

      console.log("Setting active user: ", action.payload);

      const newActiveUser: User = {
        username: action.payload.username,
        profileImageLink: action.payload.profileImageLink,
        userID: action.payload.userID,
      };

      state.activeUser = newActiveUser;

      console.log("new user?");

      if (!state.loggedIn) state.loggedIn = true;
    },

    logoutUser(state: UserDeviceDB) {
      const userLoggedout: User = {
        username: "",
        profileImageLink: "",
        userID: 0,
      };

      console.log(state.loggedIn);

      state.activeUser = userLoggedout;

      // Set logged in as false
      state.loggedIn = false;
    },

    setUserInputError(state: UserDeviceDB, action: PayloadAction<boolean>) {
      state.userInputError = action.payload;
    },

    setLoggedIn(state: UserDeviceDB, action: PayloadAction<boolean>) {
      state.loggedIn = action.payload;
    },

    editProfileInformation(
      state: UserDeviceDB,
      action: PayloadAction<EditProfilePayload>
    ) {
      /* If the username already used in other account,
      this function will stop */
      if (
        isUsernameAlreadyExists(state.deviceAccounts, action.payload.username)
      ) {
        console.log(
          `Cannot replace the username: ${state.activeUser.username}
          with ${action.payload.username} because it is alreaady in use by another user
          in this device.`
        );

        return;
      }

      // Edit current user profile
      const item = state.deviceAccounts.find(
        (account) => account.username === state.activeUser.username
      );

      if (item != undefined) {
        let {
          username: editedUsername,
          profileImageLink: editedProfileImageLink,
        } = action.payload;

        const indexOfUserInDB = state.deviceAccounts.indexOf(item);

        // If edited image link value is empty, set it to previous value
        if (editedProfileImageLink === "")
          editedProfileImageLink = state.activeUser.profileImageLink;
        if (editedUsername === "") editedUsername = state.activeUser.username;

        // Change properties of user in DB
        state.deviceAccounts[indexOfUserInDB].username = editedUsername;
        state.deviceAccounts[indexOfUserInDB].profileImageLink =
          editedProfileImageLink;

        state.activeUser.username = editedUsername;
        state.activeUser.profileImageLink = editedProfileImageLink;

        // Set to localstorage
      }
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
} = userSlice.actions;

// getters
export const getDeviceAccounts = (state: RootState) =>
  state.userReducer.deviceAccounts;
export const getActiveUser = (state: RootState) => state.userReducer.activeUser;
export const getUserInputError = (state: RootState) =>
  state.userReducer.userInputError;
export const getUserLoggedIn = (state: RootState) => state.userReducer.loggedIn;

export default userSlice.reducer;
