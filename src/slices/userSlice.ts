import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../app/types";

interface UserDeviceDB {
  activeUser: User;
  deviceAccounts: User[];
}

const initialState: UserDeviceDB = {
  activeUser: {
    username: "",
    profileImageLink: "",
    userID: 0,

    projects: [],
    favoriteProjects: [],
    doneProjects: [],
  },

  deviceAccounts: JSON.parse(localStorage.getItem("users") || "[]"),
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,

  reducers: {
    // Adding new account
    addUserAccount(state: UserDeviceDB, action: PayloadAction<User>) {
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
    },
  },
});

export const { addUserAccount } = userSlice.actions;
export default userSlice.reducer;
