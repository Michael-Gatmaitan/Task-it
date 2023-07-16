import React from "react";
import { Link, NavLink } from "react-router-dom";

// MUI Icons
import { MenuRounded, CloseRounded } from "@mui/icons-material";

// Components
import ProfileRibbon from "../components/ProfileRibbon";

// MUI
import { Button, Tooltip } from "@mui/material";

// Redux
import { getUserLoggedIn } from "../slices/userSlice";
import { useAppSelector } from "../app/hooks";

import type { NavButtons } from "../types/types";

interface NavProps {
  navBarButtons: NavButtons;
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav: React.FC<NavProps> = (props: NavProps) => {
  const { navBarButtons, toggleSidebar, setToggleSidebar } = props;

  const loggedIn = useAppSelector(getUserLoggedIn);

  return (
    <nav>
      {/* Logo */}
      <div className='logo-container'>
        <div className='logo'></div>
        <div className='taskit-text'>Taskit</div>
      </div>

      {/* Buttons */}
      <div className='nav-buttons'>
        {navBarButtons.centerButtons.map((button, key) => (
          <Tooltip title={button.text} placement='bottom'>
            <NavLink to={button.path} key={key}>
              <button.Icon />
              <span>{button.text}</span>
            </NavLink>
          </Tooltip>
        ))}
      </div>

      {/* Menu */}
      <div
        className='menu-container'
        onClick={() => setToggleSidebar(!toggleSidebar)}
      >
        {toggleSidebar ? (
          <CloseRounded fontSize='large' />
        ) : (
          <MenuRounded fontSize='large' />
        )}
      </div>

      {/* Desktop side buttons */}
      {loggedIn === false ? (
        <div className='get-started-button-container'>
          <Link to={"/get-started"}>
            <Button variant='outlined'>Get started</Button>
          </Link>
        </div>
      ) : (
        <ProfileRibbon platform='desktop' />
      )}
    </nav>
  );
};

export default Nav;
