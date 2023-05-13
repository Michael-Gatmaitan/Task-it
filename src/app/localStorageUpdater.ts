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
    localStorage.setItem("users", JSON.stringify(deviceAccounts));
  }, [activeUser, deviceAccounts]);
};
