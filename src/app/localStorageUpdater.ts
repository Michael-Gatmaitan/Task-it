import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./hooks";
import {
  getActiveUser,
  getDeviceAccounts,
  updateAccounts,
} from "../slices/userSlice";

/* For every update of ActiveUser and DeviceAccounts 
  we should also update the localStorage */

export const useLocalStorageUpdater = () => {
  const dispatch = useAppDispatch();

  const activeUser = useAppSelector(getActiveUser);
  // const deviceAccounts = useAppSelector(getDeviceAccounts);

  const { userID } = activeUser;

  useEffect(() => {
    console.log("only ID changed, means changing user occured");
  }, [userID]);

  useEffect(() => {
    localStorage.setItem("activeUser", JSON.stringify(activeUser));

    console.log("Data updated.");

    dispatch(updateAccounts());
  }, [activeUser, dispatch]);
};
