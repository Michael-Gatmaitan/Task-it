import React, { useEffect } from "react";
import { getUserLoggedIn, logoutUser } from "../slices/userSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

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

  const loggedIn = useAppSelector(getUserLoggedIn);

  useEffect(() => {
    if (loggedIn === false && toggleSideBar) setToggleSideBar(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const { toggleSideBar, setToggleSideBar, navBarButtons } = props;

  return (
    <div className={`sidebar ${!toggleSideBar ? "hide-sidebar" : ""}`}>
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
          <NavLink
            to={button.path}
            className='header2'
            onClick={() => setToggleSideBar(false)}
            key={key}
          >
            {button.text}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
