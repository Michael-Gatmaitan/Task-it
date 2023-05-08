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
      // Check if username allready exist
      // if it is, cancel making new user
      for (const i in state.deviceAccounts) {
        if (
          action.payload.username.toLocaleLowerCase() ===
          state.deviceAccounts[i].username.toLocaleLowerCase()
        ) {
          state.userInputError = true;
          return;
        }
      }

      const accountsFromStorage = JSON.parse(
        localStorage.getItem("users") || "[]"
      );
      const { username, profileImageLink, userID } = action.payload;

      const newUser: User = {
        username: username,
        profileImageLink: profileImageLink,
        userID: userID,
      };

      // Append users
      const deviceAccountsTemp: User[] = [...accountsFromStorage, newUser];
      state.deviceAccounts.push(newUser);
      localStorage.setItem("users", JSON.stringify(deviceAccountsTemp));
      state.loggedIn = true;
    },

    setActiveUser(state: UserDeviceDB, action: PayloadAction<User>) {
      // If input error occured, we will not set it as active user.
      if (state.userInputError) return;

      const newActiveUser: User = {
        username: action.payload.username,
        profileImageLink: action.payload.profileImageLink,
        userID: action.payload.userID,
      };

      console.log("Setting new user", state.userInputError);

      state.activeUser = newActiveUser;
      localStorage.setItem("activeUser", JSON.stringify(newActiveUser));
    },

    logoutUser(state: UserDeviceDB) {
      const userLoggedout: User = {
        username: "",
        profileImageLink: "",
        userID: 0,
      };

      state.activeUser = userLoggedout;
      localStorage.setItem("activeUser", JSON.stringify(userLoggedout));

      // Set logged in as false
      state.loggedIn = false;
    },

    setUserInputError(state: UserDeviceDB, action: PayloadAction<boolean>) {
      state.userInputError = action.payload;
    },

    // editProfileInformation(
    //   state: UserDeviceDB,
    //   action: PayloadAction<EditProfilePayload>
    // ) {
    //   // Edit current user profile
    // },
  },
});

// Reducers
export const { addUserAccount, setActiveUser, setUserInputError, logoutUser } =
  userSlice.actions;

// getters
export const getDeviceAccounts = (state: RootState) =>
  state.userReducer.deviceAccounts;
export const getActiveUser = (state: RootState) => state.userReducer.activeUser;
export const getUserInputError = (state: RootState) =>
  state.userReducer.userInputError;
export const getUserLoggedIn = (state: RootState) => state.userReducer.loggedIn;

export default userSlice.reducer;
