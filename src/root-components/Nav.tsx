import React from "react";
import { Link, NavLink } from "react-router-dom";

// Icons
import BurgerMenu from "../assets/icons/burger-menu.svg";
import CloseMenu from "../assets/icons/close.svg";

// MUI Icons
import { MenuRounded, CloseRounded } from "@mui/icons-material";

// Components
import ProfileRibbon from "../components/ProfileRibbon";

// Redux
import { getUserLoggedIn } from "../slices/userSlice";
import { useAppSelector } from "../app/hooks";

import type { NavButtons } from "../app/types";

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
          <NavLink to={button.path} key={key}>
            <button.Icon />
            <span>{button.text}</span>
          </NavLink>
        ))}
      </div>

      {/* Menu */}
      <div
        className='menu-container'
        onClick={() => setToggleSidebar(!toggleSidebar)}
      >
        {toggleSidebar ? <CloseRounded /> : <MenuRounded />}
      </div>

      {/* Desktop side buttons */}
      {loggedIn === false ? (
        <div className='starting-buttons'>
          <Link to={"/get-started"} className='default-button bordered-button'>
            Get started
          </Link>
        </div>
      ) : (
        <ProfileRibbon platform='desktop' />
      )}
    </nav>
  );
};

export default Nav;
