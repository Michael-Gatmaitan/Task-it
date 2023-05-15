import React from "react";

import { NavLink } from "react-router-dom";

import type { NavButtons } from "../app/types";
import ProfileRibbon from "../components/ProfileRibbon";

// Reducers and getters, top: Reducers, bottom: Getters
import { useAppSelector } from "../app/hooks";
import { getUserLoggedIn } from "../slices/userSlice";

import LogoutButton from "../components/reusable-buttons/LogoutButton";

interface SideBarProps {
  navBarButtons: NavButtons;
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
  const { navBarButtons, toggleSidebar, setToggleSidebar } = props;

  const isLoggedIn = useAppSelector(getUserLoggedIn);

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

        {isLoggedIn ? (
          <LogoutButton setToggleSidebar={setToggleSidebar} />
        ) : null}
      </div>
    </div>
  );
};

export default SideBar;
