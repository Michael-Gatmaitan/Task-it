import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

// Icons
import BurgerMenu from "../assets/icons/burger-menu.svg";
import CloseMenu from "../assets/icons/close.svg";

interface NavProps {
  toggleSideBar: boolean;
  setToggleSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NavButtons {
  centerButtons: { text: string; path: string }[];
}

const Nav: React.FC<NavProps> = (props: NavProps) => {
  const { toggleSideBar, setToggleSideBar } = props;

  const navBarButtons: NavButtons = {
    centerButtons: [
      {
        text: "Home",
        path: "/",
      },
      {
        text: "Projects",
        path: "projects",
      },
      {
        text: "Contact",
        path: "contact",
      },
      {
        text: "About",
        path: "about",
      },
      {
        text: "Settings",
        path: "settings",
      },
    ],
  };

  const location = useLocation();

  return (
    <nav>
      {/* Logo */}
      <div className='logo-container'>
        <div className='logo'></div>
        <div className='taskit-text'>Taskit</div>
      </div>

      {/* Buttons */}
      <div className='nav-buttons'>
        {navBarButtons.centerButtons.map(
          (button: { text: string; path: string }, key) => (
            <NavLink to={button.path} key={key}>
              {button.text}
            </NavLink>
          )
        )}
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
      {location.pathname === "/" && (
        <div className='starting-buttons'>
          <Link to={"/"} className='default-button invicible-button'>
            Login
          </Link>
          <Link to={"/get-started"} className='default-button bordered-button'>
            Get started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
