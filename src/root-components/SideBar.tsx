import React from "react";
import { useAppDispatch } from "../app/hooks";

import { NavLink } from "react-router-dom";

import type { NavButtons } from "../app/types";
import ProfileRibbon from "../components/ProfileRibbon";

import { logoutUser } from "../slices/userSlice";
// Reducers and getters, top: Reducers, bottom: Getters

// svg
import LogOutIcon from "../assets/icons/logout.svg";

interface SideBarProps {
  navBarButtons: NavButtons;
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
  const dispatch = useAppDispatch();

  const { navBarButtons, toggleSidebar, setToggleSidebar } = props;

  return (
    <div className={`sidebar ${!toggleSidebar ? "hide-sidebar" : ""}`}>
      <ProfileRibbon platform='mobile' />

      <div className='sidebar-buttons'>
        {navBarButtons.centerButtons.map((button, key) => (
          <NavLink
            to={button.path}
            className='header2'
            onClick={() => setToggleSidebar(false)}
            key={key}
          >
            {button.text}
          </NavLink>
        ))}

        <button
          className='default-button logout-button'
          onClick={() => {
            dispatch(logoutUser());
            setToggleSidebar(false);
          }}
        >
          <img src={LogOutIcon} alt='logout' />
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
