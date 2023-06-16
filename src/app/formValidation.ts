import { useState, useEffect } from "react";
import { useAppSelector } from "./hooks";
import { getDeviceAccounts } from "./../slices/userSlice";

export const useIsUsernameExist = (username: string): boolean => {
  const accounts = useAppSelector(getDeviceAccounts);
  const [isUsernameExist, setIsUsernameExist] = useState<boolean>(false);

  useEffect(() => {
    setIsUsernameExist(
      accounts.find((acc) => acc.username === username) !== undefined
    );
  }, [username, accounts]);

  return isUsernameExist;
};
