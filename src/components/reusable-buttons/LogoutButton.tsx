import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { logoutUser } from "../../slices/userSlice";
import LogOutIcon from "../../assets/icons/logout.svg";

interface ButtonProps {
  customClass?: string;
  setToggleSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
}
const LogoutButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { customClass, setToggleSidebar } = props;
  const dispatch = useAppDispatch();

  return (
    <button
      className={`default-button logout-button ${
        customClass ? customClass : ""
      }`}
      onClick={() => {
        dispatch(logoutUser());

        if (setToggleSidebar !== undefined) {
          setToggleSidebar(false);
        }
      }}
    >
      <img src={LogOutIcon} alt='logout' />
      Log out
    </button>
  );
};

export default LogoutButton;
