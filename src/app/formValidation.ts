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

  const isImgUrl = (url: string) => {
    const img = new Image();
    img.src = url;

    return new Promise((resolve) => {
      img.onerror = () => resolve(false);
      img.onload = () => resolve(true);
    });
  };

  useEffect(() => {
    if (url === "") {
      setIsLinkValid(false);
      return;
    }

    // type safetiness bruh
    isImgUrl(url).then((e) => (typeof e === "boolean" ? setIsLinkValid(e) : e));
  }, [url]);

  return isLinkValid;
};
