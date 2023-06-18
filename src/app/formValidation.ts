import { useState, useEffect } from "react";
import { useAppSelector } from "./hooks";
import { getDeviceAccounts } from "./../slices/userSlice";

// Preventing user to use username that already exist
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

// Image checker if link is directly linked into a image
export const useImageLinkChecker = (url: string) => {
  const [isLinkValid, setIsLinkValid] = useState<boolean>(false);

  useEffect(() => {
    const image = new Image();
    image.src = url;

    image.addEventListener("load", () => {
      console.log("Link success.");
      setIsLinkValid(true);
    });
    image.addEventListener("error", () => {
      console.log("Link error.");
      setIsLinkValid(false);
    });
  }, [url]);

  return isLinkValid;
};
