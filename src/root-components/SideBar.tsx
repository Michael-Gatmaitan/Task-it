import React from "react";
import { logoutUser } from "../slices/userSlice";
import { useAppDispatch } from "../app/hooks";

import { NavLink } from "react-router-dom";

import type { NavButtons } from "../app/types";
import ProfileRibbon from "../components/ProfileRibbon";

interface SideBarProps {
  toggleSideBar: boolean;
  setToggleSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  navBarButtons: NavButtons;
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
  const dispatch = useAppDispatch();

  const { toggleSideBar, setToggleSideBar, navBarButtons } = props;

  return (
    <div
      className={`sidebar ${!toggleSideBar ? "hide-sidebar" : ""}`}
      onClick={() => setToggleSideBar(false)}
    >
      <button
        onClick={() => {
          console.log("Logged out");
          dispatch(logoutUser());
        }}
      >
        Log out
      </button>

      <ProfileRibbon platform='mobile' />

      <div className='sidebar-buttons'>
        {navBarButtons.centerButtons.map((button, key) => (
          <NavLink to={button.path} className='header2' key={key}>
            {button.text}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
