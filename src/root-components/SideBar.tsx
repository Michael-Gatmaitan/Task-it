import React from "react";

import { NavLink } from "react-router-dom";

import type { NavButtons } from "../app/types";
import ProfileRibbon from "../components/ProfileRibbon";

// Reducers and getters, top: Reducers, bottom: Getters

interface SideBarProps {
  navBarButtons: NavButtons;
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
  const { navBarButtons, toggleSidebar, setToggleSidebar } = props;

  return (
    <div className={`sidebar ${!toggleSidebar ? "hide-sidebar" : ""}`}>
      <ProfileRibbon platform='mobile' />

      <div className='sidebar-buttons'>
        {navBarButtons.centerButtons.map((button, key) => (
          <NavLink
            to={button.path}
            className='header2 sidebar-button'
            onClick={() => setToggleSidebar(false)}
            key={key}
          >
            <button.Icon fontSize='large' />
            {button.text}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
