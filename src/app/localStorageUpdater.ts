import { useEffect } from "react";
import { useAppSelector } from "./hooks";
import { getActiveUser, getDeviceAccounts } from "../slices/userSlice";

/* For every update of ActiveUser and DeviceAccounts 
  we should also update the localStorage */

export const useLocalStorageUpdater = () => {
  const activeUser = useAppSelector(getActiveUser);
  const deviceAccounts = useAppSelector(getDeviceAccounts);

  useEffect(() => {
    localStorage.setItem("activeUser", JSON.stringify(activeUser));

    // Set the value of the user in deviceAccounts if something in store is changed.
    // const indexOfUserOnDeviceAccounts = deviceAccounts.findIndex(
    //   (account) => account.userID === activeUser.userID
    // );

    // console.log(indexOfUserOnDeviceAccounts);

    localStorage.setItem("users", JSON.stringify(deviceAccounts));

    console.log("Data updated.");
  }, [activeUser, deviceAccounts]);
};
