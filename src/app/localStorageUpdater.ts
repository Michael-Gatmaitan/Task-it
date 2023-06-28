import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./hooks";
import {
  getActiveUser,
  getUserLoggedIn,
  updateAccounts,
} from "../slices/userSlice";

/* For every update of ActiveUser and DeviceAccounts 
  we should also update the localStorage */

export const useLocalStorageUpdater = () => {
  const dispatch = useAppDispatch();

  const activeUser = useAppSelector(getActiveUser);
  const isLoggedIn = useAppSelector(getUserLoggedIn);
  const { userID } = activeUser;

  useEffect(() => {
    if (isLoggedIn) {
      console.log("only ID changed, means changing user occured");
    }
  }, [userID, isLoggedIn]);

  // Whenever the properties of dependencies has change,
  // we will update the localstorage
  useEffect(() => {
    // If user is logged out, we dont need to update the
    // states of the account
    if (!isLoggedIn) return;

    localStorage.setItem("activeUser", JSON.stringify(activeUser));

    console.log("Data updated.");

    dispatch(updateAccounts());
  }, [activeUser, dispatch, isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);
};
