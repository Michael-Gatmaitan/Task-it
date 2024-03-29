import React from "react";
import { Link, NavLink } from "react-router-dom";

// Components
import ProfileRibbon from "../components/ProfileRibbon";

// CSS
import "../components/styles/Nav.css";

// MUI
import { Button, Tooltip } from "@mui/material";
import { MenuRounded, CloseRounded } from "@mui/icons-material";

// Redux
import { getUserLoggedIn } from "../slices/userSlice";
import { useAppSelector } from "../app/hooks";

import type { NavButtons } from "../types/types";

import TaskitLogo from "../assets/logos/Taskit-logo-full-black.svg";

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
        {/* <div className='logo'></div>
        <div className='taskit-text'>Taskit</div> */}
        <Link to='/'>
          <img src={TaskitLogo} alt='taskit-logo' />
        </Link>
      </div>

      {/* Buttons */}
      <div className='nav-buttons'>
        {navBarButtons.centerButtons.map((button, key) => (
          <Tooltip title={button.text} placement='bottom' key={key}>
            <NavLink to={button.path} className='nav-button'>
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
