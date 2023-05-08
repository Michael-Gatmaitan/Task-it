import React from "react";
import { Link, NavLink } from "react-router-dom";

// Icons
import BurgerMenu from "../assets/icons/burger-menu.svg";
import CloseMenu from "../assets/icons/close.svg";

// Components
import ProfileRibbon from "../components/ProfileRibbon";

// Redux
import { getActiveUser, getUserLoggedIn } from "../slices/userSlice";
import { useAppSelector } from "../app/hooks";

import type { NavButtons } from "../app/types";

interface NavProps {
  toggleSideBar: boolean;
  setToggleSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  navBarButtons: NavButtons;
}

const Nav: React.FC<NavProps> = (props: NavProps) => {
  const { toggleSideBar, setToggleSideBar, navBarButtons } = props;

  const loggedIn = useAppSelector(getUserLoggedIn);
  const activeUser = useAppSelector(getActiveUser);

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
          <NavLink
            to={button.path}
            key={key}
            style={{ display: button.display }}
          >
            {button.text}
          </NavLink>
        ))}
      </div>

      {/* Menu */}
      <div
        className='menu-container'
        onClick={() => setToggleSideBar(!toggleSideBar)}
      >
        {toggleSideBar ? (
          <img src={CloseMenu} alt='Close-Menu' />
        ) : (
          <img src={BurgerMenu} alt='Open-Menu' />
        )}
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
